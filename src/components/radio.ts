
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlRadio from "@shoelace-style/shoelace/dist/components/radio/radio.js"

export { SlRadio }
declare module "elt" {
  interface attrs_sl_radio extends Attrs<HTMLElementTagNameMap["sl-radio"]> {
    value?: NRO<string>
    size?: NRO<'small' | 'medium' | 'large'>
    disabled?: NRO<boolean>
  }

  interface ElementMap {
    "sl-radio": attrs_sl_radio
  }

}
