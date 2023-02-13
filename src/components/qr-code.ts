
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlQrCode from "@shoelace-style/shoelace/dist/components/qr-code/qr-code.js"

export { SlQrCode }
declare module "elt" {
  interface attrs_sl_qr_code extends Attrs<HTMLElementTagNameMap["sl-qr-code"]> {
    value?: NRO<string>
    label?: NRO<string>
    size?: NRO<number>
    fill?: NRO<string>
    background?: NRO<string>
    radius?: NRO<number>
    "error-correction"?: NRO<'L' | 'M' | 'Q' | 'H'>
  }

  interface ElementMap {
    "sl-qr-code": attrs_sl_qr_code
  }

}
