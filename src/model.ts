import { node_add_event_listener, node_observe, o } from "elt"
import type { SlInput } from "@shoelace-style/shoelace"
import { SlElement } from "./components/_monkey"

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

    if (ob instanceof o.Observable) {
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

        node_add_event_listener(node, "sl-input", () => {
          lock(() => {
            let nval
            switch (node.tagName) {
              case "SL-SWITCH":
              case "SL-CHECKBOX":
              case "SL-MENU-ITEM":
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

  return bind
}
