
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlBadge from "@shoelace-style/shoelace/dist/components/badge/badge.js"

export { SlBadge }
declare module "elt" {
  interface attrs_sl_badge extends Attrs<HTMLElementTagNameMap["sl-badge"]> {
    variant?: NRO<'primary' | 'success' | 'neutral' | 'warning' | 'danger'>
    pill?: NRO<boolean>
    pulse?: NRO<boolean>
  }

  interface ElementMap {
    "sl-badge": attrs_sl_badge
  }

}
