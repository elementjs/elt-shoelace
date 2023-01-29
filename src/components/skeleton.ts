
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlSkeleton from "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"

export type {}
(SlSkeleton.prototype as any)[sym_sl_elt] = "sl-skeleton"

declare module "elt" {
  interface attrs_sl_skeleton extends Attrs<HTMLElementTagNameMap["sl-skeleton"]>, Global {
    effect?: NRO<'pulse' | 'sheen' | 'none'>
  }

  interface ElementMap {
    "sl-skeleton": attrs_sl_skeleton
  }

}
