
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlProgressBar from "@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js"

export { SlProgressBar }
declare module "elt" {
  interface attrs_sl_progress_bar extends Attrs<HTMLElementTagNameMap["sl-progress-bar"]> {
    value?: NRO<number>
    indeterminate?: NRO<boolean>
    label?: NRO<string>
  }

  interface ElementMap {
    "sl-progress-bar": attrs_sl_progress_bar
  }

}
