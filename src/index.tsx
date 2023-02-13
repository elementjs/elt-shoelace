import { node_add_event_listener, o, node_observe, } from "elt"
import { Future } from "./utils"
import { SlElement } from "./components/_monkey"
export * from "./css"
import "./base"

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
    container.removeChild(res)
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
    node_observe(node, val, nval => wm_data.set(node, nval), undefined, true)
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
export function $model(ob: o.RO<boolean>): (n: { checked: boolean }) => void
export function $model(ob: o.RO<number>): (n: { value: number }) => void
export function $model(ob: o.RO<string>): (n: { value: string }) => void
export function $model(ob: o.RO<string>): (n: { value: string | string[] }) => void
export function $model<T>(ob: o.RO<any>): (n: any) => void {

  function res(node: SlElement & { value: string }) {
    // node.value = o.get(ob)
    if (ob instanceof o.Observable) {
      const lock = o.exclusive_lock()
      node_observe(node, ob, (newval) => {
        lock(() => {
          switch (node.tagName) {
            case "SL-SWITCH":
            case "SL-CHECKBOX":
              node.checked = newval
              break
            default:
              if (node.tagName === "SL-INPUT" && node.type === "number") {
                node.valueAsNumber = newval || null
              } else {
                node.value = newval
              }
              break
          }
        })
      }, undefined, true)

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
            default:
              nval = node.value
              break
          }
          // $model is only for single value.
          ob.set(Array.isArray(nval) ? nval[0] : nval)
        })
      })
    }
  }

  res.using = function (elts: o.RO<Iterable<T>>, fn: (elt: T) => Node) {
    return function (_node: Element) {
      const node = _node as SlElement
      const lock = o.exclusive_lock()

      node_observe(node, ob, val => {
        lock(() => {
          // This is where we find out which options or trees are marked as selected ?
          // or is it done downwards ?
        })
      })

      //
      node_add_event_listener(node, "sl-input", () => {

      })

      return o.tf(elts, elts => {

      })
    }
  }

  return res
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

function _popup_resolve(p: Element) {
  popups.delete(p)
  popups_futures.delete(p)
  p.remove()
  popups_futures.get(p)?.resolve(sym_popup_closed)
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

  setTimeout(() => {
    if (popups.size === 0) {
      doc.addEventListener("click", _eval_popup_click)
    }
    doc.body.appendChild(popup_root)
    popups.add(popup_root)
    popups_futures.set(popup_root, fut)
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