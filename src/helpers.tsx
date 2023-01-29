import { Renderable, e } from "elt"
import { builder as CSS } from "osun"
import { show } from "./index"

export function modal(opts: {
  title: Renderable,
  agree: Renderable,
  disagree?: Renderable,
  prevent_outside_close?: boolean
}): Promise<boolean | undefined> {
  return show<boolean>(fut => <sl-dialog>
    <div slot="footer" class={CSS.row.gap("var(--sl-spacing-medium)").justifyEnd}>
      <sl-button>{opts.agree}</sl-button>
    </div>
  </sl-dialog>)
}
