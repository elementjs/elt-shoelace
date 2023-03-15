import { node_add_event_listener, o, node_observe, Renderable, node_remove, } from "elt"
import { Future } from "./utils"
import { SlElement } from "./components/_monkey"
export * from "./css"
import "./base"
import { animate, animate_hide, animate_show, stop_animations } from "./animation"

/** Helper function to not have to type everything */
function is_show_hide(node: Node): node is Node & { show(): void, hide(): void } {
  const _node = node as any
  return typeof _node?.show === "function" && typeof _node?.hide === "function"
}

/**
 * It would be better to have the `fn` return SlDialog or SlDrawer, but JSX in typescript won't let us know that, which is a shame.
 */
export function show<T>(fn: (future: Future<T | undefined>) => Node, container = document.body) {
  const fut = new Future<T | undefined>()
  const res = fn(fut)

  if (!is_show_hide(res))
    throw new Error(`show() expects sl-dialog, sl-drawer or anything that has .show() and .hide() and the "sl-after-hide" event`)

  node_add_event_listener(res, "sl-after-hide", () => {
    node_remove(res)
    fut.resolve(undefined)
  })

  container.appendChild(res)

  if (typeof res.show === "function") {
    requestAnimationFrame(() => {
      res.show()
    })
  }

  return fut.finally(() => {
    fut.resolve(undefined)
    if (res.isConnected) res.hide()
  })
}

const wm_data = new WeakMap<Node, any>()

/**
 * Associate a value to a node, used by bindOption.
 * @param val
 */
export function $data(val: o.RO<any>): (node: Node) => void {
  return node => {
    node_observe(node, val, nval => wm_data.set(node, nval), { immediate: true })
  }
}

// Events :
//   - sl-select de MenuItem, avec { item: SlMenuItem }. MAIS après tout le menu c'est du $click() et du $() sur les checkboxs.
//   - sl-selection-change depuis sl-tree, avec { selection: TreeItem[] }
// <sl-select> utilise le value, mais pourrait avoir besoin de faire un mapping
// checkboxes multiples -> [] ou Set ? (voire Map ?)
// Quid de ce qui est itérable ?


/**
 * Binds an observable to a Node
 */
export function $model(ob: o.RO<boolean> | o.RO<boolean | null>): (n: { checked: boolean }) => void
export function $model(ob: o.RO<number>): (n: { value: number }) => void
export function $model(ob: o.RO<string>): ((n: { value: string | string[]}) => void) | ((n: { value: string }) => void)
export function $model<T>(ob: o.RO<T>): { using(fn: ($value: ((v: o.RO<T>) => ((n: Node) => void))) => Renderable): (n: Node) => void }
export function $model<T>(ob: o.RO<any>): any {

  let value_map = new WeakMap()
  let value_map_used = false
  let _last_value = 0

  function bind(node: SlElement & { value: string }) {

    const lock = o.exclusive_lock()
    node_observe(node, ob, (newval) => {
      lock(() => {
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
            const set = new Set(Array.isArray(newval) ? newval : [newval])
            iterate(node)
            function iterate(node: Element) {
              let iter = node.firstElementChild
              while (iter) {
                let _node = iter as SlElement
                if (value_map.has(iter) && _node.tagName === "SL-TREE-ITEM") {
                  _node.selected = set.has(value_map.get(iter)!)
                } else {
                  if (iter.firstElementChild) iterate(iter.firstElementChild)
                }
                iter = iter.nextElementSibling
              }
            }
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
        node_add_event_listener(node, "sl-selection-change", ev => {
          if (node.tagName !== "SL-TREE") return
          const selection = (ev as unknown as CustomEvent<{ selection: Node[] }>).detail.selection

          let values = !value_map_used ? selection : selection.map(n => {
            return value_map.get(n)
          }).filter(v => v !== undefined)

          lock(() => {
            ob.set(node.selection === "multiple" ? values : values[0])
          })
        })
      } else {
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

  bind.using = function (fn: ($value: (v: o.RO<T>) => ((n: Node) => void)) => Renderable) {
    return function (node: Node) {
      let res = fn(function (val) {
        return function (node) {
          value_map_used = true
          if (val instanceof o.Observable) {
            node_observe(node, val, nval => {
              value_map.set(node, nval)
            }, { immediate: true })
          } else {
            value_map.set(node, val)
          }
          const _ = node as SlElement
          if (_.tagName === "SL-OPTION") {
            const vstr = `v${_last_value++}`
            _.value = vstr
          }
          // create a string value
        }
      })
      bind(node as any)
      return res
    }
  }

  return bind
}



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/**
 * Some popup handling.
 */

export type PopupResolution<T> =
  | { resolution: "value", value: T }
  | { resolution: "closed" }

const popups = new Set<Element>()
const popups_futures = new WeakMap<Element, Future<any | undefined>>()

async function _popup_resolve(p: Element) {
  popups.delete(p)
  popups_futures.delete(p)
  popups_futures.get(p)?.resolve(sym_popup_closed)
  const _p = p as SlElement
  if (_p.tagName === "SL-POPUP") {
    await stop_animations(_p.popup)
    await animate(_p.popup, animate_hide, { duration: 150 })
  }
  p.remove()
}

function _close_popups() {
  if (popups.size === 0) return
  for (let p of popups) {
    _popup_resolve(p)
  }
  if (popups.size === 0) {
    document.removeEventListener("click", _eval_popup_click)
  }
}

function _eval_popup_click(ev: MouseEvent) {
  if (popups.size === 0) return
  let found_contain = false
  for (let p of popups) {
    if (found_contain) {
      _popup_resolve(p)
      continue
    }
    if (p.contains(ev.target as Node)) {
      found_contain = true
      continue
    }
  }
  // If we get here, no popup contained the click, we close them all
  if (!found_contain) _close_popups()
}

export const sym_popup_closed = Symbol("popup closed")

export function popup<T>(anchor: Element, fn: (fut: Future<T | typeof sym_popup_closed>) => Node) {

  const doc = anchor.ownerDocument
  const fut = new Future<T | typeof sym_popup_closed>()
  fut.then(val => {
    if (val !== sym_popup_closed) {
      _close_popups()
    }
  })

  const popup_root = fn(fut) as SlElement
  const popup = popup_root.querySelector("sl-popup") ?? popup_root

  if (popup.tagName !== "SL-POPUP") {
    throw new Error("popup() must explicitely return a popup element")
  }

  // Figure out if we were created from inside a popup, in which case
  // we do not close the previous pop-ups
  let creator_is_popup = false
  let iter = anchor as Element | null

  while (iter != null) {
    if (iter.tagName === "SL-POPUP") {
      creator_is_popup = true
      break
    }
    iter = iter.parentElement
  }

  if (!creator_is_popup) {
    _close_popups()
  }

  popup.anchor = anchor
  popup.active = true
  popup.style.setProperty("--arrow-color", "var(--sl-color-neutral-200)")

  setTimeout(async () => {
    if (popups.size === 0) {
      doc.addEventListener("click", _eval_popup_click)
    }
    doc.body.appendChild(popup_root)
    popups.add(popup_root)
    popups_futures.set(popup_root, fut)
    await popup.updateComplete
    animate(popup.popup, animate_show, { duration: 150 })
  })
}

popup.closed = sym_popup_closed

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


export type Color = "gray" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "primary" | "success" | "warning" | "danger"

export function $colorswap(tocolor: Color, replace = "neutral" as "neutral" | "primary") {
  return function (node: HTMLElement) {
    const st = node.style
    for (let c of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950])
      st.setProperty(`--sl-color-${replace}-${c}`, `var(--sl-color-${tocolor}-${c}`)
    st.setProperty(`--sl-color-${replace}-1000`, `var(--sl-color-${tocolor}-950`)
  }
}