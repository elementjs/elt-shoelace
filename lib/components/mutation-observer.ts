
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlMutationObserver from "@shoelace-style/shoelace/dist/components/mutation-observer/mutation-observer.js"

import { NRO, Attrs } from "elt"

export { SlMutationObserver }
declare module "elt" {
  interface attrs_sl_mutation_observer extends Attrs<HTMLElementTagNameMap["sl-mutation-observer"]> {
    /** Watches for changes to attributes. To watch only specific attributes, separate them by a space, e.g.
`attr="class id title"`. To watch all attributes, use `*`. */
    attr?: NRO<string>
    /** Indicates whether or not the attribute's previous value should be recorded when monitoring changes. */
    "attr-old-value"?: NRO<boolean>
    /** Watches for changes to the character data contained within the node. */
    "char-data"?: NRO<boolean>
    /** Indicates whether or not the previous value of the node's text should be recorded. */
    "char-data-old-value"?: NRO<boolean>
    /** Watches for the addition or removal of new child nodes. */
    "child-list"?: NRO<boolean>
    /** Disables the observer. */
    disabled?: NRO<boolean>
  }

  interface ElementMap {
    "sl-mutation-observer": attrs_sl_mutation_observer
  }

}
