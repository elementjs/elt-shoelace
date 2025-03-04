
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"

import { NRO, Attrs } from "elt"

export { SlDropdown }
declare module "elt" {
  interface attrs_sl_dropdown extends Attrs<HTMLElementTagNameMap["sl-dropdown"]> {
    /** Indicates whether or not the dropdown is open. You can toggle this attribute to show and hide the dropdown, or you
can use the `show()` and `hide()` methods and this attribute will reflect the dropdown's open state. */
    open?: NRO<boolean>
    /** The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
inside of the viewport. */
    placement?: NRO<'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'>
    /** Disables the dropdown so the panel will not open. */
    disabled?: NRO<boolean>
    /** By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
dropdowns that allow for multiple interactions. */
    "stay-open-on-select"?: NRO<boolean>
    /** The distance in pixels from which to offset the panel away from its trigger. */
    distance?: NRO<number>
    /** The distance in pixels from which to offset the panel along its trigger. */
    skidding?: NRO<number>
    /** Enable this option to prevent the panel from being clipped when the component is placed inside a container with
`overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios. */
    hoist?: NRO<boolean>
  }

  interface ElementMap {
    "sl-dropdown": attrs_sl_dropdown
  }

}
