
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlCarousel from "@shoelace-style/shoelace/dist/components/carousel/carousel.js"

import { NRO, Attrs } from "elt"

export { SlCarousel }
declare module "elt" {
  interface attrs_sl_carousel extends Attrs<HTMLElementTagNameMap["sl-carousel"]> {
    /** When set, allows the user to navigate the carousel in the same direction indefinitely. */
    loop?: NRO<boolean>
    /** When set, show the carousel's navigation. */
    navigation?: NRO<boolean>
    /** When set, show the carousel's pagination indicators. */
    pagination?: NRO<boolean>
    /** When set, the slides will scroll automatically when the user is not interacting with them. */
    autoplay?: NRO<boolean>
    /** Specifies the amount of time, in milliseconds, between each automatic scroll. */
    "autoplay-interval"?: NRO<number>
    /** Specifies how many slides should be shown at a given time. */
    "slides-per-page"?: NRO<number>
    /** Specifies the number of slides the carousel will advance when scrolling, useful when specifying a `slides-per-page`
greater than one. It can't be higher than `slides-per-page`. */
    "slides-per-move"?: NRO<number>
    /** Specifies the orientation in which the carousel will lay out. */
    orientation?: NRO<'horizontal' | 'vertical'>
    /** When set, it is possible to scroll through the slides by dragging them with the mouse. */
    "mouse-dragging"?: NRO<boolean>
  }

  interface ElementMap {
    "sl-carousel": attrs_sl_carousel
  }

}
