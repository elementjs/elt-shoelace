
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlQrCode from "@shoelace-style/shoelace/dist/components/qr-code/qr-code.js"

export { SlQrCode }
declare module "elt" {
  interface attrs_sl_qr_code extends Attrs<HTMLElementTagNameMap["sl-qr-code"]> {
    /** The QR code's value. */
    value?: NRO<string>
    /** The label for assistive devices to announce. If unspecified, the value will be used instead. */
    label?: NRO<string>
    /** The size of the QR code, in pixels. */
    size?: NRO<number>
    /** The fill color. This can be any valid CSS color, but not a CSS custom property. */
    fill?: NRO<string>
    /** The background color. This can be any valid CSS color or `transparent`. It cannot be a CSS custom property. */
    background?: NRO<string>
    /** The edge radius of each module. Must be between 0 and 0.5. */
    radius?: NRO<number>
    /** The level of error correction to use. [Learn more](https://www.qrcode.com/en/about/error_correction.html) */
    "error-correction"?: NRO<'L' | 'M' | 'Q' | 'H'>
  }

  interface ElementMap {
    "sl-qr-code": attrs_sl_qr_code
  }

}
