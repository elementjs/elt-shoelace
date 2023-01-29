
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlVisuallyHidden from "@shoelace-style/shoelace/dist/components/visually-hidden/visually-hidden.js"

export type {}
(SlVisuallyHidden.prototype as any)[sym_sl_elt] = "sl-visually-hidden"

declare module "elt" {
  interface attrs_sl_visually_hidden extends Attrs<HTMLElementTagNameMap["sl-visually-hidden"]>, Global {
  }

  interface ElementMap {
    "sl-visually-hidden": attrs_sl_visually_hidden
  }

}
