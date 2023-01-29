
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import { sym_sl_elt } from "../base"

import SlAnimatedImage from "@shoelace-style/shoelace/dist/components/animated-image/animated-image.js"

export type {}
(SlAnimatedImage.prototype as any)[sym_sl_elt] = "sl-animated-image"

declare module "elt" {
  interface attrs_sl_animated_image extends Attrs<HTMLElementTagNameMap["sl-animated-image"]>, Global {
    src?: NRO<string>
    alt?: NRO<string>
    play?: NRO<boolean>
  }

  interface ElementMap {
    "sl-animated-image": attrs_sl_animated_image
  }

}
