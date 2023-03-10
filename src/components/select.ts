
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.js"

export { SlSelect }
declare module "elt" {
  interface attrs_sl_select extends Attrs<HTMLElementTagNameMap["sl-select"]> {
    name?: NRO<string>
    value?: NRO<string | string[]>
    size?: NRO<'small' | 'medium' | 'large'>
    placeholder?: NRO<string>
    multiple?: NRO<boolean>
    "max-options-visible"?: NRO<number>
    disabled?: NRO<boolean>
    clearable?: NRO<boolean>
    open?: NRO<boolean>
    hoist?: NRO<boolean>
    filled?: NRO<boolean>
    pill?: NRO<boolean>
    label?: NRO<string>
    placement?: NRO<'top' | 'bottom'>
    "help-text"?: NRO<string>
    form?: NRO<string>
    required?: NRO<boolean>
  }

  interface ElementMap {
    "sl-select": attrs_sl_select
  }

}
