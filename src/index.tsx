import { node_add_event_listener, o, node_observe, Renderable, node_remove, node_append, Repeat, e, $click, attrs_sl_button, $scrollable, } from "elt"
import { Future } from "./utils"
import { SlElement } from "./components/_monkey"
export * from "./css"
import "./layout"
import "./base"
import { animate, animate_hide, animate_show, stop_animations } from "./animation"
import { style, } from "osun"

/** Helper function to not have to type everything */
function is_show_hide(node: Node): node is Node & { show(): void, hide(): void } {
  const _node = node as any
  return typeof _node?.show === "function" && typeof _node?.hide === "function"
}

export function modal(opts: {
  title: Renderable,
  text: Renderable,
  agree: Renderable,
  disagree?: Renderable,
}): Promise<boolean> {
  return show(fut => <sl-dialog>
    <span slot="label">{opts.title}</span>
    {opts.text}

    {!opts.disagree ? null : <sl-button slot="footer">
      {$click(() => fut.resolve(false))}
      {opts.disagree}
    </sl-button>}
    <sl-button slot="footer" variant="primary">
      {$click(() => fut.resolve(true))}
      {opts.agree}
    </sl-button>
  </sl-dialog>).then(r => !!r)
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


export function $options<T>(ob: o.Observable<T>, options: o.RO<T[]>, render: (v: o.ReadonlyObservable<T>) => Renderable) {
  return Repeat(options as o.ReadonlyObservable<T[]>, (o_opt, idx) => {
    const res = render(o_opt) as SlElement
    if (res instanceof Element && res.tagName === "SL-OPTION") {
      res.value = "" + o.get(idx)
    }
    return res
  })
}

/**
 * Binds an observable to a Node
 */
export function $model(ob: o.RO<boolean> | o.RO<boolean | null>): (n: { checked: boolean }) => void
export function $model(ob: o.RO<number>): (n: { value: number }) => void
export function $model(ob: o.RO<string>): ((n: { readonly value: string | string[]}) => void )
export function $model(ob: o.RO<any>): any {

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
    // node_append(anchor.parentElement!, popup_root, anchor.nextSibling)
    node_append(doc.body, popup_root)

    // doc.body.appendChild(popup_root)
    popups.add(popup_root)
    popups_futures.set(popup_root, fut)
    await popup.updateComplete
    animate(popup.popup, animate_show, { duration: 150 })
  })
}

popup.closed = sym_popup_closed

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export interface SelectAttributes<T> extends attrs_sl_button {
	model: o.Observable<T>
	options: o.RO<Iterable<T>>
	prelabelfn?: (opt: o.ReadonlyObservable<T>) => Renderable
	labelfn: (opt: T) => Renderable
	postlabelfn?: (opt: o.ReadonlyObservable<T>) => Renderable
	disabled?: o.RO<boolean>
}


export function Select<T>(at: SelectAttributes<T>) {
  const o_expanded = o(false)
  const {variant, caret, size, outline} = at
  const o_opts = o.tf(at.options, opts => Array.isArray(opts) ? opts:  [...opts])
  const model = at.model
  const labelfn = at.labelfn

  function show_values() {
    o_expanded.set(true)

	  popup(btn, fut => {
      fut.finally(() => o_expanded.set(false))
      return <sl-popup
        placement="bottom"
        flip-fallback-placements="bottom top"
        flip
      >
        <e-flex column class={cls_select_popup}>
        {$scrollable}
        {Repeat(o_opts, (opt, i) => <e-flex class={cls_popup_cell} pad="small">
            &zwnj;
            {$click(() => {
              if (o.get(at.disabled)) return
              var val = o.get(opt)
              model.set(val)
              fut.resolve(null)
            })}
            {o.tf(opt, val => labelfn(val))}
          </e-flex>
        )}
      </e-flex></sl-popup>
    })
  }


  const btn = <sl-button {...{variant,caret,size,outline}} >

    {$click(ev => { show_values() })}
    &zwnj;
    {model.tf(m => labelfn(m))}
    <sl-icon class={[cls_expander, {[cls_expander_expanded]: o_expanded}]} library="system" name="chevron-down" slot="suffix"></sl-icon>
  </sl-button> as HTMLElement

  return btn
}

const cls_popup_cell = style("select-popup-cell", { })
cls_popup_cell.hover({
  background: "var(--sl-color-neutral-100)"
})

const cls_select_popup = style("select-popup", {
  padding: "var(--sl-spacing-small) 0px",
  background: "var(--sl-color-neutral-0)",
  borderRadius: "var(--sl-input-border-radius-medium)",
  border: `1px solid var(--sl-color-neutral-300)`,
})
const cls_expander = style("expander", {
  transition: `var(--sl-transition-medium) rotate ease`,
  rotate: "0deg",
})

const cls_expander_expanded = style("expanded", { rotate: "180deg" })


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