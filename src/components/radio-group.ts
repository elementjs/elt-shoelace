
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlRadioGroup from "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js"

export { SlRadioGroup }
declare module "elt" {
  interface attrs_sl_radio_group extends Attrs<HTMLElementTagNameMap["sl-radio-group"]> {
    label?: NRO<string>
    "help-text"?: NRO<string>
    name?: NRO<string>
    value?: NRO<string>
    form?: NRO<string>
    required?: NRO<boolean>
  }

  interface ElementMap {
    "sl-radio-group": attrs_sl_radio_group
  }

}
