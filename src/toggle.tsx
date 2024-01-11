import { $click, Attrs, e, o } from "elt"

import "./components/button"
import { style } from "osun"
import { theme } from "./theme"

/**
 * A toggle button
 */
export function Toggle(attrs: Attrs & {
  size?: o.RO<"small" | "medium" | "large">
  model: o.Observable<boolean> | o.Observable<boolean | null> | o.Observable<boolean | undefined>
}) {

  return <sl-button
    size={o.tf(attrs.size, s => s ?? "small")}
    class={o.tf(attrs.model, m => m ? cls_selected : false)}
  >
    {$click(() => { attrs.model.mutate(m => !m) })}
  </sl-button>

}

const cls_selected = style("selected")
cls_selected.part("base", {
  backgroundColor: theme.primary600,
  color: theme.bg600
})