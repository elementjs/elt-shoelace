
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlDetails from "@shoelace-style/shoelace/dist/components/details/details.js"

export type {}
(SlDetails.prototype as any)[sym_sl_elt] = "sl-details"

declare module "elt" {
  interface attrs_sl_details extends Attrs<HTMLElementTagNameMap["sl-details"]>, Global {
    open?: NRO<boolean>
    summary?: NRO<string>
    disabled?: NRO<boolean>
  }

  interface ElementMap {
    "sl-details": attrs_sl_details
  }

}
