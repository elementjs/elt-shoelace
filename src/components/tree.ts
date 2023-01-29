
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlTree from "@shoelace-style/shoelace/dist/components/tree/tree.js"

export type {}
(SlTree.prototype as any)[sym_sl_elt] = "sl-tree"

declare module "elt" {
  interface attrs_sl_tree extends Attrs<HTMLElementTagNameMap["sl-tree"]>, Global {
    selection?: NRO<'single' | 'multiple' | 'leaf'>
  }

  interface ElementMap {
    "sl-tree": attrs_sl_tree
  }

}
