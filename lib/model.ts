import { node_add_event_listener, node_observe, o } from "elt"
import type { SlInput, SlSelectEvent } from "@shoelace-style/shoelace"
import { SlElement } from "./components/_monkey"
import { node_on_connected } from "elt"
import { node_on_disconnected } from "elt"

/**
 * Binds an observable to a Node
*/
export function $model(ob: o.RO<Date | null | undefined>): (n: { type: "date" | "datetime-local", }) => void
export function $model(ob: o.RO<boolean | null | undefined>): (n: { checked: boolean }) => void
export function $model(ob: o.RO<number | null | undefined>, transformer?: (v: string) => string): (n: { valueAsNumber: number | null } | { value: number | null }) => void
export function $model(ob: o.RO<string[] | null | undefined>, transformer?: (v: string) => string): ((n: { readonly value: string | string[]}) => void )
export function $model(ob: o.RO<string | null | undefined>, transformer?: (v: string) => string): ((n: { readonly value: string | string[]}) => void )
export function $model(ob: o.IObservable<string | null | undefined, string>, transformer?: (v: string) => string): ((n: { readonly value: string | string[]}) => void )

export function $model(ob: o.RO<any>, unfocused_fn?: (v: string) => string): any {

  const o_has_focus = o(false)
  const lock = o.exclusive_lock()

  function bind(node: SlElement & { value: string }) {

    node_observe(node, o.join(o_has_focus, ob), ([focus, newval]) => {
      lock(() => {
        if (!focus && unfocused_fn) {
          newval = unfocused_fn(newval)
        }

        switch (node.tagName) {
          case "SL-CHECKBOX":
          case "SL-SWITCH":
          case "SL-MENU-ITEM": {
            node.checked = newval
            break
          }
          case "SL-SELECT": {
            if (newval == null) {
              node.value = ""
            } else {
              node.value = (node.multiple ?
                (Array.isArray(newval) ? newval : [newval] )
                : newval
              ) as any
            }
            break
          }
          case "SL-TREE": {
            break
          }
          default:
            if (node.tagName === "SL-INPUT" && (node.type === "text" || !node.type)) {
              node.value = newval ?? ""
            } else if (node.tagName === "SL-INPUT" && node.type === "number") {
              node.value = newval
            } else if (node.tagName === "SL-INPUT" && (node.type === "date" || node.type === "datetime-local")) {
              if (newval == null) {
                node.valueAsDate = null
              } else {
                const d = typeof newval === "string" ? new Date(newval) : newval
                function _pad(v: number) { return v < 10 ? "0" + v : "" + v }

                const val = node.type === "date" ? `${d.getFullYear()}-${_pad(d.getMonth()+1)}-${_pad(d.getDate())}` : `${d.getFullYear()}-${_pad(d.getMonth()+1)}-${_pad(d.getDate())}T${_pad(d.getHours())}:${_pad(d.getMinutes())}`
                node.value = val
              }
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
            if (ev.detail.item !== node) return
            lock(() => {
              ob.set(ev.detail.item.checked)
            })
          }

          node_on_connected(node, node => {

            menu = node.parentElement
            while (menu != null && menu.tagName !== "SL-MENU") {
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

          node_add_event_listener(node, "sl-input", ev => {
            lock(() => {
              let nval
              switch (node.tagName) {
                case "SL-SWITCH":
                case "SL-CHECKBOX":
                  nval = node.checked
                  // throw new Error("WHAT")
                  break
                case "SL-INPUT":
                  if (node.tagName === "SL-INPUT" && node.type === "number") {
                    nval = node.value === "" || node.value === null ? NaN : Number(node.value)
                  } else if (node.tagName === "SL-INPUT" && (node.type === "date" || node.type === "datetime-local")) {
                    nval = node.valueAsDate ?? new Date(node.value)
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
                if (typeof ob.set === "function") {
                  ob.set(Array.isArray(nval) ? nval[0] : nval)
                }
            })
          })
        }

      }
    }
  }

  return bind
}
