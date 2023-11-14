
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.js"

export { SlAlert }
declare module "elt" {
  interface attrs_sl_alert extends Attrs<HTMLElementTagNameMap["sl-alert"]> {
    /** Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can
use the `show()` and `hide()` methods and this attribute will reflect the alert's open state. */
    open?: NRO<boolean>
    /** Enables a close button that allows the user to dismiss the alert. */
    closable?: NRO<boolean>
    /** The alert's theme variant. */
    variant?: NRO<'primary' | 'success' | 'neutral' | 'warning' | 'danger'>
    /** The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning
the alert will not close on its own. */
    duration?: NRO<string>
  }

  interface ElementMap {
    "sl-alert": attrs_sl_alert
  }

}
