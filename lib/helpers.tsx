import { Renderable, If, css } from "elt"
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
  return show<boolean>(fut => <sl-dialog class={cls_dialog.classes.eltsl_dialog}>
    <header slot="header">{opts.title}</header>
    {opts.body}
    <footer slot="footer">
      <sl-button variant="success">{opts.agree}</sl-button>
      {If(opts.disagree, dis => <sl-button variant="neutral">
        {dis}
      </sl-button>)}
    </footer>
  </sl-dialog>)
}

const cls_dialog = css`
sl-dialog${".eltsl_dialog"}::part(footer) {
  display: flex;
  justify-content: flex-end;
  gap: var(--sl-spacing-medium);
}
`
