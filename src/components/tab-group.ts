
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlTabGroup from "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js"

export type {}
(SlTabGroup.prototype as any)[sym_sl_elt] = "sl-tab-group"

declare module "elt" {
  interface attrs_sl_tab_group extends Attrs<HTMLElementTagNameMap["sl-tab-group"]> {
    placement?: NRO<'top' | 'bottom' | 'start' | 'end'>
    activation?: NRO<'auto' | 'manual'>
    "no-scroll-controls"?: NRO<boolean>
  }

  interface ElementMap {
    "sl-tab-group": attrs_sl_tab_group
  }

}
