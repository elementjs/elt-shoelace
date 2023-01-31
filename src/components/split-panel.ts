
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js"

export type {}
(SlSplitPanel.prototype as any)[sym_sl_elt] = "sl-split-panel"

declare module "elt" {
  interface attrs_sl_split_panel extends Attrs<HTMLElementTagNameMap["sl-split-panel"]> {
    position?: NRO<number>
    "position-in-pixels"?: NRO<number>
    vertical?: NRO<boolean>
    disabled?: NRO<boolean>
    primary?: NRO<'start' | 'end' | undefined>
    snap?: NRO<string | undefined>
    "snap-threshold"?: NRO<number>
  }

  interface ElementMap {
    "sl-split-panel": attrs_sl_split_panel
  }

}
