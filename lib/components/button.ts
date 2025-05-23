
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.js"

import { NRO, Attrs } from "elt"

export { SlButton }
declare module "elt" {
  interface attrs_sl_button extends Attrs<HTMLElementTagNameMap["sl-button"]> {
    title?: NRO<string>
    /** The button's theme variant. */
    variant?: NRO<'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text'>
    /** The button's size. */
    size?: NRO<'small' | 'medium' | 'large'>
    /** Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior. */
    caret?: NRO<boolean>
    /** Disables the button. */
    disabled?: NRO<boolean>
    /** Draws the button in a loading state. */
    loading?: NRO<boolean>
    /** Draws an outlined button. */
    outline?: NRO<boolean>
    /** Draws a pill-style button with rounded edges. */
    pill?: NRO<boolean>
    /** Draws a circular icon button. When this attribute is present, the button expects a single `<sl-icon>` in the
default slot. */
    circle?: NRO<boolean>
    /** The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native
`<button>` elements behave. When the type is `submit`, the button will submit the surrounding form. */
    type?: NRO<'button' | 'submit' | 'reset'>
    /** The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter.
This attribute is ignored when `href` is present. */
    name?: NRO<string>
    /** The value of the button, submitted as a pair with the button's name as part of the form data, but only when this
button is the submitter. This attribute is ignored when `href` is present. */
    value?: NRO<string>
    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    href?: NRO<string>
    /** Tells the browser where to open the link. Only used when `href` is present. */
    target?: NRO<'_blank' | '_parent' | '_self' | '_top'>
    /** When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the
default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a
specific tab/window, this will prevent that from working correctly. You can remove or change the default value by
setting the attribute to an empty string or a value of your choice, respectively. */
    rel?: NRO<string>
    /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
    download?: NRO<string | undefined>
    /** The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
value of this attribute must be an id of a form in the same document or shadow root as the button. */
    form?: NRO<string>
    /** Used to override the form owner's `action` attribute. */
    formaction?: NRO<string>
    /** Used to override the form owner's `enctype` attribute. */
    formenctype?: NRO<'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'>
    /** Used to override the form owner's `method` attribute. */
    formmethod?: NRO<'post' | 'get'>
    /** Used to override the form owner's `novalidate` attribute. */
    formnovalidate?: NRO<boolean>
    /** Used to override the form owner's `target` attribute. */
    formtarget?: NRO<'_self' | '_blank' | '_parent' | '_top' | string>
  }

  interface ElementMap {
    "sl-button": attrs_sl_button
  }

}
