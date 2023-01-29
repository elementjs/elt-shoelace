import "@shoelace-style/shoelace/dist/themes/light.css"
import "@shoelace-style/shoelace/dist/themes/dark.css"

import { e } from "elt"

export const sym_sl_elt = Symbol("sl-element")

document.head.appendChild(<style>
{`html {
-webkit-tap-highlight-color: transparent;
}
:focus {
  outline: none !important;
}

body {
  font-family: var(--sl-font-sans);
  font-size: var(--sl-font-size-medium);
  font-weight: var(--sl-font-weight-normal);
  letter-spacing: var(--sl-letter-spacing-normal);
  background-color: var(--sl-color-neutral-0);
  color: var(--sl-color-neutral-900);
  line-height: var(--sl-line-height-normal);
}`}
</style>)
