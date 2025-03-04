
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlRange from "@shoelace-style/shoelace/dist/components/range/range.js"

import { NRO, Attrs } from "elt"

export { SlRange }
declare module "elt" {
  interface attrs_sl_range extends Attrs<HTMLElementTagNameMap["sl-range"]> {
    title?: NRO<string>
    /** The name of the range, submitted as a name/value pair with form data. */
    name?: NRO<string>
    /** The current value of the range, submitted as a name/value pair with form data. */
    value?: NRO<number>
    /** The range's label. If you need to display HTML, use the `label` slot instead. */
    label?: NRO<string>
    /** The range's help text. If you need to display HTML, use the help-text slot instead. */
    "help-text"?: NRO<string>
    /** Disables the range. */
    disabled?: NRO<boolean>
    /** The minimum acceptable value of the range. */
    min?: NRO<number>
    /** The maximum acceptable value of the range. */
    max?: NRO<number>
    /** The interval at which the range will increase and decrease. */
    step?: NRO<number>
    /** The preferred placement of the range's tooltip. */
    tooltip?: NRO<'top' | 'bottom' | 'none'>
    /** By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
the same document or shadow root for this to work. */
    form?: NRO<string>
  }

  interface ElementMap {
    "sl-range": attrs_sl_range
  }

}
