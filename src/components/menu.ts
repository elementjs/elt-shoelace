
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlMenu from "@shoelace-style/shoelace/dist/components/menu/menu.js"

export type {}
(SlMenu.prototype as any)[sym_sl_elt] = "sl-menu"

declare module "elt" {
  interface attrs_sl_menu extends Attrs<HTMLElementTagNameMap["sl-menu"]> {
  }

  interface ElementMap {
    "sl-menu": attrs_sl_menu
  }

}
