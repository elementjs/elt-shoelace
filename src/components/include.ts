
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlInclude from "@shoelace-style/shoelace/dist/components/include/include.js"

export { SlInclude }
declare module "elt" {
  interface attrs_sl_include extends Attrs<HTMLElementTagNameMap["sl-include"]> {
    /** The location of the HTML file to include. Be sure you trust the content you are including as it will be executed as
code and can result in XSS attacks. */
    src?: NRO<string>
    /** The fetch mode to use. */
    mode?: NRO<'cors' | 'no-cors' | 'same-origin'>
    /** Allows included scripts to be executed. Be sure you trust the content you are including as it will be executed as
code and can result in XSS attacks. */
    "allow-scripts"?: NRO<boolean>
  }

  interface ElementMap {
    "sl-include": attrs_sl_include
  }

}
