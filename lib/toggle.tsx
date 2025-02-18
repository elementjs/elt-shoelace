import { $click, Attrs, e, o, css } from "elt"

import "./components/button"

/**
 * A toggle button
 */
export function Toggle(attrs: Attrs & {
  size?: o.RO<"small" | "medium" | "large">
  model: o.Observable<boolean> | o.Observable<boolean | null> | o.Observable<boolean | undefined>
  disabled?: o.RO<boolean>
}) {

  return <sl-button
    size={o.tf(attrs.size, s => s ?? "small")}
    class={o.tf(attrs.model, m => m ? cls.eltsl_selected : false)}
    disabled={attrs.disabled}
  >
    {$click(() => { attrs.model.mutate(m => !m) })}
    &zwnj;
  </sl-button>

}


const cls = css`
${".eltsl_selected"}:part(base) {
  background-color: var(--sl-color-primary-500);
  color: var(--sl-color-bg-200);
  border-color: var(--sl-color-primary-600);
  box-shadow: 2px 2px 2px var(--sl-color-primary-200);
}
`