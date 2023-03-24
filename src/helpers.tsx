import { Renderable, e, If } from "elt"
import { builder as CSS } from "osun"
import { show } from "./dialog"

import "./components/dialog"
import "./components/button"

export function modal(opts: {
  title: Renderable,
  agree: Renderable,
  body: Renderable,
  disagree?: Renderable,
  prevent_outside_close?: boolean
}): Promise<boolean | undefined> {
  return show<boolean>(fut => <sl-dialog>
    <header slot="header">{opts.title}</header>
    {opts.body}
    <footer slot="footer" class={CSS.row.gap("var(--sl-spacing-medium)").justifyEnd}>
      <sl-button variant="success">{opts.agree}</sl-button>
      {If(opts.disagree, dis => <sl-button variant="neutral">
        {dis}
      </sl-button>)}
    </footer>
  </sl-dialog>)
}
