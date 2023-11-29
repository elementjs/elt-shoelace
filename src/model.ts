import { node_add_event_listener, node_observe, o } from "elt"
import type { SlInput, SlSelectEvent } from "@shoelace-style/shoelace"
import { SlElement } from "./components/_monkey"
import { node_on_connected } from "elt"
import { node_on_disconnected } from "elt"

/**
 * Binds an observable to a Node
 */
export function $model(ob: o.RO<boolean> | o.RO<boolean | null>): (n: { checked: boolean }) => void
export function $model(ob: o.RO<number>, transformer?: (v: string) => string): (n: { value: number }) => void
export function $model(ob: o.RO<string> | o.RO<string | null>, transformer?: (v: string) => string): ((n: { readonly value: string | string[]}) => void )
export function $model(ob: o.RO<any>, unfocused_fn?: (v: string) => string): any {

  const o_has_focus = o(false)

  function bind(node: SlElement & { value: string }) {

    const lock = o.exclusive_lock()

    node_observe(node, o.join(o_has_focus, ob), ([focus, newval]) => {
      lock(() => {
        if (!focus && unfocused_fn) {
          newval = unfocused_fn(newval)
        }

        switch (node.tagName) {
          case "SL-SWITCH":
          case "SL-CHECKBOX":
          case "SL-MENU-ITEM":
            node.checked = newval
            break
          case "SL-SELECT": {
            node.value = (node.multiple ?
              (Array.isArray(newval) ? newval : [newval] )
              : newval
            ) as any
            break
          }
          case "SL-TREE": {
            break
          }
          default:
            if (node.tagName === "SL-INPUT" && node.type === "number") {
              node.valueAsNumber = newval || null
            } else {
              node.value = newval
            }
            break
        }
      })
    }, { immediate: true })

    if (o.is_observable(ob)) {
      if (node.tagName === "SL-TREE") {
        // FIXME
      } else {
        if (unfocused_fn) {
          node_add_event_listener(node, "focus", () => {
            o_has_focus.set(true)
            requestAnimationFrame(() => {
              (node as SlInput).setSelectionRange(0, node.value.length)
            })
          })
          node_add_event_listener(node, "blur", () => {
            o_has_focus.set(false)
          })
        }

        // menu-item is a bitch and needs to be bound to the menu item itself.
        if (node.tagName === "SL-MENU-ITEM") {
          let menu: HTMLElement | null = null

          function _menu_from_event(ev: SlSelectEvent) {
            lock(() => {
              ob.set(ev.detail.item.checked)
            })
          }

          node_on_connected(node, node => {

            menu = node.parentElement
            while (menu != null && menu.tagName !== "SL-MENU") {
              console.log(menu.tagName)
              menu = menu.parentElement
            }

            if (menu == null) {
              console.warn("trying to bind on an sl-menu-item without sl-menu")
              return
            }

            menu.addEventListener("sl-select", _menu_from_event)
          })

          node_on_disconnected(node, () => {
            menu?.removeEventListener("sl-select", _menu_from_event)
          })

        } else {
          node_add_event_listener(node, "sl-input", () => {
            lock(() => {
              let nval
              switch (node.tagName) {
                case "SL-SWITCH":
                case "SL-CHECKBOX":
                  nval = node.checked
                  break
                case "SL-INPUT":
                  if (node.tagName === "SL-INPUT" && node.type === "number") {
                    nval = node.valueAsNumber
                  } else {
                    nval = node.value
                  }
                  break
                case "SL-SELECT":
                  nval = node.value
                  if (node.multiple) {
                    ob.set(Array.isArray(nval) ? nval : [nval])
                  } else {
                    ob.set(nval)
                  }
                  return
                default:
                  nval = node.value
                  break
                }
                ob.set(Array.isArray(nval) ? nval[0] : nval)
            })
          })
        }

      }
    }
  }

  return bind
}
