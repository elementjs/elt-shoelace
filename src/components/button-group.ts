
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlButtonGroup from "@shoelace-style/shoelace/dist/components/button-group/button-group.js"

export type {}
(SlButtonGroup.prototype as any)[sym_sl_elt] = "sl-button-group"

declare module "elt" {
  interface attrs_sl_button_group extends Attrs<HTMLElementTagNameMap["sl-button-group"]>, Global {
    label?: NRO<string>
  }

  interface ElementMap {
    "sl-button-group": attrs_sl_button_group
  }

}
