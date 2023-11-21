import { $click, Attrs, e, o } from "elt"

import "./components/button"

/**
 * A toggle button
 */
export function Toggle(attrs: Attrs & {
  size?: o.RO<"small" | "medium" | "large">
  model: o.Observable<boolean> | o.Observable<boolean | null> | o.Observable<boolean | undefined>
}) {

  return <sl-button
    size={o.tf(attrs.size, s => s ?? "small")}
    variant={o.tf(attrs.model, m => m ? "primary" : "text")}
  >
    {$click(() => { attrs.model.mutate(m => !m) })}
  </sl-button>

}
