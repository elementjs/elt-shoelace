
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.js"

import { NRO, Attrs } from "elt"

export { SlIcon }
declare module "elt" {
  interface attrs_sl_icon extends Attrs<HTMLElementTagNameMap["sl-icon"]> {
    /** The name of the icon to draw. Available names depend on the icon library being used. */
    name?: NRO<string | undefined>
    /** An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
can result in XSS attacks. */
    src?: NRO<string | undefined>
    /** An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and
ignored by assistive devices. */
    label?: NRO<string>
    /** The name of a registered custom icon library. */
    library?: NRO<string>
  }

  interface ElementMap {
    "sl-icon": attrs_sl_icon
  }

}
