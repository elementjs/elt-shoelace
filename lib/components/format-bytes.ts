
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlFormatBytes from "@shoelace-style/shoelace/dist/components/format-bytes/format-bytes.js"

import { NRO, Attrs } from "elt"

export { SlFormatBytes }
declare module "elt" {
  interface attrs_sl_format_bytes extends Attrs<HTMLElementTagNameMap["sl-format-bytes"]> {
    /** The number to format in bytes. */
    value?: NRO<number>
    /** The type of unit to display. */
    unit?: NRO<'byte' | 'bit'>
    /** Determines how to display the result, e.g. "100 bytes", "100 b", or "100b". */
    display?: NRO<'long' | 'short' | 'narrow'>
  }

  interface ElementMap {
    "sl-format-bytes": attrs_sl_format_bytes
  }

}
