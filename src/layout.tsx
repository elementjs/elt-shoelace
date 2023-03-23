import { Attrs, NRO } from "elt"
import { raw as css } from "osun"

declare module "elt" {
  interface ElementMap {
    "e-flex": EFlexAttrs
    "e-box": EBoxAttrs
  }
}

export type SpacingValues = "3x-small" | "2x-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "2x-large" | "3x-large" | "4x-large"

export type AlignValues = "center" | "start" | "end" | "self-start" | "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" | "normal" | "stretch"

export interface CommonAttrs extends Attrs<HTMLElement> {
  inline?: NRO<boolean>
  relative?: NRO<boolean>
  grow?: NRO<boolean>
  gap?: NRO<boolean | SpacingValues>
  pad?: NRO<boolean | SpacingValues>
  "self-align"?: NRO<AlignValues>
  "self-justify"?: NRO<AlignValues>
}

export interface EBoxAttrs extends CommonAttrs {

}

export interface EFlexAttrs extends CommonAttrs {
  wrap?: NRO<boolean>
  column?: NRO<boolean>
  reverse?: NRO<boolean>
  "align"?: NRO<AlignValues>
  "justify"?: NRO<AlignValues>
}

let more: string[] = []
let spaces = ["3x-small", "2x-small", "x-small", "small", "medium", "large", "x-large", "2x-large", "3x-large", "4x-large"]
let align = ["center", "start", "end", "self-start", "baseline", "first baseline", "last baseline", "safe center", "unsafe center", "normal", "stretch"]

for (let al of align) {
  more.push(`
:is(e-flex,e-grid)[align="${al}"] { align-items: ${al}; }
:is(e-flex,e-grid)[justify="${al}"] { justify-content: ${al}; }
:is(e-flex,e-grid,e-box)[self-justify="${al}"] { justify-self: ${al}; }
:is(e-flex,e-grid,e-box)[self-align="${al}"] { align-self: ${al}; }
`)
}

for (let att of ["gap", "pad"]) {
  for (let i = 0, l = spaces.length; i < l; i++) {
    const sp = spaces[i]
    const less = spaces[i - 1] ?? spaces[i]
    more.push(`
:is(e-flex,e-grid,e-box)[${att}="${sp}"] { --e-pad-vertical: var(--sl-spacing-${less}); --e-pad-horizontal: var(--sl-spacing-${sp}); }
`)
  }
}

css`
e-box[inline] { display: inline-box; }

e-flex { display: flex; flex-direction: row; }
e-flex[inline] { display: inline-flex; }
e-flex[column] { flex-direction: column; }
e-flex[reverse] { flex-direction: row-reverse; }
e-flex[column][reverse] { flex-direction: column-reverse; }
e-flex[wrap] { flex-wrap: wrap; }

:is(e-flex,e-grid,e-box) {
  --e-gap-vertical: var(--sl-spacing-small);
  --e-gap-horizontal: var(--sl-spacing-medium);
  --e-pad-vertical: var(--sl-spacing-small);
  --e-pad-horizontal: var(--sl-spacing-medium);
}

:is(e-flex,e-grid,e-box)[relative] { position: relative; }
:is(e-flex,e-grid,e-box)[grow] { flex-grow: 1; flex-basis: 0; }
:is(e-flex,e-grid,e-box)[pad] { padding: var(--e-pad-vertical) var(--e-pad-horizontal); }
:is(e-flex,e-grid)[gap] { gap: var(--e-pad-vertical) var(--e-pad-horizontal); }

${more.join("")}
`
