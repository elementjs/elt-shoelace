
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlTag from "@shoelace-style/shoelace/dist/components/tag/tag.js"

export { SlTag }
declare module "elt" {
  interface attrs_sl_tag extends Attrs<HTMLElementTagNameMap["sl-tag"]> {
    /** The tag's theme variant. */
    variant?: NRO<'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text'>
    /** The tag's size. */
    size?: NRO<'small' | 'medium' | 'large'>
    /** Draws a pill-style tag with rounded edges. */
    pill?: NRO<boolean>
    /** Makes the tag removable and shows a remove button. */
    removable?: NRO<boolean>
  }

  interface ElementMap {
    "sl-tag": attrs_sl_tag
  }

}
