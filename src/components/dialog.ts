
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.js"

export type {}
(SlDialog.prototype as any)[sym_sl_elt] = "sl-dialog"

declare module "elt" {
  interface attrs_sl_dialog extends Attrs<HTMLElementTagNameMap["sl-dialog"]> {
    open?: NRO<boolean>
    label?: NRO<string>
    "no-header"?: NRO<boolean>
  }

  interface ElementMap {
    "sl-dialog": attrs_sl_dialog
  }

}
