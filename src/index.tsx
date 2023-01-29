import { node_add_event_listener, o, node_observe, Repeat, Renderable } from "elt"
import { Future } from "./utils"

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

/**
 *
 * T *must* extend object, otherwise you can just bind "classically ?"
 * @param obs
 * @param options
 */
export function $options<T extends object>(
  obs: o.Observable<T>, opts: {
    options: o.RO<T[]>,
    render: (v: o.ReadonlyObservable<T>) => Renderable,
    stringvalue?: (v: T) => string, // should be unique
    multiple?: boolean // hmm ?
  }): (n: Node & { value: string }) => Renderable {

  // We're going to map options to generated ids.
  let opts_map = new Map<any, string>()

  return node => {


    return Repeat(opts.options, o_option => {
      const rd = opts.render(o_option as o.ReadonlyObservable<T>)
      return rd
    })
  }
  // we should use a symbol when using primitive values
}

/**
 * Binds an observable to a Node
 */
export function $model(ob: o.RO<number>): (n: { value: number }) => void
export function $model(ob: o.RO<string>): (n: { value: string }) => void
export function $model(ob: o.RO<string>): (n: { value: string | string[] }) => void
export function $model<T>(ob: o.RO<any>): (n: any) => void {
  return (node: Node & { value: string }) => {
    // node.value = o.get(ob)

    if (ob instanceof o.Observable) {
      const lock = o.exclusive_lock()
      node_observe(node, ob, (newval) => {
        lock(() => {
          node.value = newval
        })
      }, undefined, true)

      node_add_event_listener(node, "sl-input", () => {
        lock(() => {
          const nval = node.value
          // $model is only for single value.
          ob.set(Array.isArray(nval) ? nval[0] : nval)
        })
      })
    }
  }
}
