
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlRadioButton from "@shoelace-style/shoelace/dist/components/radio-button/radio-button.js"

export { SlRadioButton }
declare module "elt" {
  interface attrs_sl_radio_button extends Attrs<HTMLElementTagNameMap["sl-radio-button"]> {
    value?: NRO<string>
    disabled?: NRO<boolean>
    size?: NRO<'small' | 'medium' | 'large'>
    pill?: NRO<boolean>
  }

  interface ElementMap {
    "sl-radio-button": attrs_sl_radio_button
  }

}
