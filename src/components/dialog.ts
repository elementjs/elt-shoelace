
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.js"

export { SlDialog }
declare module "elt" {
  interface attrs_sl_dialog extends Attrs<HTMLElementTagNameMap["sl-dialog"]> {
    /** Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can
use the `show()` and `hide()` methods and this attribute will reflect the dialog's open state. */
    open?: NRO<boolean>
    /** The dialog's label as displayed in the header. You should always include a relevant label even when using
`no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead. */
    label?: NRO<string>
    /** Disables the header. This will also remove the default close button, so please ensure you provide an easy,
accessible way for users to dismiss the dialog. */
    "no-header"?: NRO<boolean>
  }

  interface ElementMap {
    "sl-dialog": attrs_sl_dialog
  }

}
