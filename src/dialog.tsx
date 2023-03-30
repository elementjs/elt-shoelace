import { $click, Renderable, e, node_add_event_listener, node_append, node_remove } from "elt"
import { Future } from "./utils"


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

  node_append(container, res)
  // container.appendChild(res)

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
