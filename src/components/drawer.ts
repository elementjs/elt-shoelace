
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js"

export { SlDrawer }
declare module "elt" {
  interface attrs_sl_drawer extends Attrs<HTMLElementTagNameMap["sl-drawer"]> {
    open?: NRO<boolean>
    label?: NRO<string>
    placement?: NRO<'top' | 'end' | 'bottom' | 'start'>
    contained?: NRO<boolean>
    "no-header"?: NRO<boolean>
  }

  interface ElementMap {
    "sl-drawer": attrs_sl_drawer
  }

}
