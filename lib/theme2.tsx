import { css, CSSBuilder, push_css_to_head } from "elt"

export const theme_base = css`
${".theme_class"} {
  ${"--sl-border-radius-small"}: 0.1875rem;
  ${"--sl-border-radius-medium"}: 0.25rem;
  ${"--sl-border-radius-large"}: 0.5rem;
  ${"--sl-border-radius-x-large"}: 1rem;
  ${"--sl-border-radius-circle"}: 50%;
  ${"--sl-border-radius-pill"}: 9999px;
  ${"--sl-shadow-x-small"}: 0 1px 2px hsl(240 3.8% 46.1% / 6%);
  ${"--sl-shadow-small"}: 0 1px 2px hsl(240 3.8% 46.1% / 12%);
  ${"--sl-shadow-medium"}: 0 2px 4px hsl(240 3.8% 46.1% / 12%);
  ${"--sl-shadow-large"}: 0 2px 8px hsl(240 3.8% 46.1% / 12%);
  ${"--sl-shadow-x-large"}: 0 4px 16px hsl(240 3.8% 46.1% / 12%);
  ${"--sl-spacing-3x-small"}: 0.125rem;
  ${"--sl-spacing-2x-small"}: 0.25rem;
  ${"--sl-spacing-x-small"}: 0.5rem;
  ${"--sl-spacing-small"}: 0.75rem;
  ${"--sl-spacing-medium"}: 1rem;
  ${"--sl-spacing-large"}: 1.25rem;
  ${"--sl-spacing-x-large"}: 1.75rem;
  ${"--sl-spacing-2x-large"}: 2.25rem;
  ${"--sl-spacing-3x-large"}: 3rem;
  ${"--sl-spacing-4x-large"}: 4.5rem;
  ${"--sl-transition-x-slow"}: 1000ms;
  ${"--sl-transition-slow"}: 500ms;
  ${"--sl-transition-medium"}: 250ms;
  ${"--sl-transition-fast"}: 150ms;
  ${"--sl-transition-x-fast"}: 50ms;
  ${"--sl-font-mono"}: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  ${"--sl-font-sans"}: -apple-system, BlinkMacSystemFont, "Segoe UI", "Open Sans", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  ${"--sl-font-serif"}: Georgia, "Times New Roman", serif;
  ${"--sl-font-size-2x-small"}: 0.625rem;
  ${"--sl-font-size-x-small"}: 0.75rem;
  ${"--sl-font-size-small"}: 0.875rem;
  ${"--sl-font-size-medium"}: 1rem;
  ${"--sl-font-size-large"}: 1.25rem;
  ${"--sl-font-size-x-large"}: 1.5rem;
  ${"--sl-font-size-2x-large"}: 2.25rem;
  ${"--sl-font-size-3x-large"}: 3rem;
  ${"--sl-font-size-4x-large"}: 4.5rem;
  ${"--sl-font-weight-light"}: 300;
  ${"--sl-font-weight-normal"}: 400;
  ${"--sl-font-weight-semibold"}: 500;
  ${"--sl-font-weight-bold"}: 700;
  ${"--sl-letter-spacing-denser"}: -0.03em;
  ${"--sl-letter-spacing-dense"}: -0.015em;
  ${"--sl-letter-spacing-normal"}: normal;
  ${"--sl-letter-spacing-loose"}: 0.075em;
  ${"--sl-letter-spacing-looser"}: 0.15em;
  ${"--sl-line-height-denser"}: 1;
  ${"--sl-line-height-dense"}: 1.4;
  ${"--sl-line-height-normal"}: 1.8;
  ${"--sl-line-height-loose"}: 2.2;
  ${"--sl-line-height-looser"}: 2.6;
  ${"--sl-focus-ring-color"}: var(--sl-color-primary-600);
  ${"--sl-focus-ring-style"}: solid;
  ${"--sl-focus-ring-width"}: 3px;
  ${"--sl-focus-ring"}: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);
  ${"--sl-focus-ring-offset"}: 1px;
  ${"--sl-button-font-size-small"}: var(--sl-font-size-x-small);
  ${"--sl-button-font-size-medium"}: var(--sl-font-size-small);
  ${"--sl-button-font-size-large"}: var(--sl-font-size-medium);
  ${"--sl-input-height-small"}: 1.875rem;
  ${"--sl-input-height-medium"}: 2.5rem;
  ${"--sl-input-height-large"}: 3.125rem;
  ${"--sl-input-background-color"}: var(--sl-color-neutral-0);
  ${"--sl-input-background-color-hover"}: var(--sl-input-background-color);
  ${"--sl-input-background-color-focus"}: var(--sl-input-background-color);
  ${"--sl-input-background-color-disabled"}: var(--sl-color-neutral-100);
  ${"--sl-input-border-color"}: var(--sl-color-neutral-300);
  ${"--sl-input-border-color-hover"}: var(--sl-color-neutral-400);
  ${"--sl-input-border-color-focus"}: var(--sl-color-primary-500);
  ${"--sl-input-border-color-disabled"}: var(--sl-color-neutral-300);
  ${"--sl-input-border-width"}: 1px;
  ${"--sl-input-required-content"}: "*";
  ${"--sl-input-required-content-offset"}: -2px;
  ${"--sl-input-required-content-color"}: var(--sl-input-label-color);
  ${"--sl-input-border-radius-small"}: 0.5rem;
  ${"--sl-input-border-radius-medium"}: 0.5rem;
  ${"--sl-input-border-radius-large"}: 0.5rem;
  ${"--sl-input-font-family"}: var(--sl-font-sans);
  ${"--sl-input-font-weight"}: var(--sl-font-weight-normal);
  ${"--sl-input-font-size-small"}: var(--sl-font-size-small);
  ${"--sl-input-font-size-medium"}: var(--sl-font-size-medium);
  ${"--sl-input-font-size-large"}: var(--sl-font-size-large);
  ${"--sl-input-letter-spacing"}: var(--sl-letter-spacing-normal);
  ${"--sl-input-color"}: var(--sl-color-neutral-700);
  ${"--sl-input-color-hover"}: var(--sl-color-neutral-700);
  ${"--sl-input-color-focus"}: var(--sl-color-neutral-700);
  ${"--sl-input-color-disabled"}: var(--sl-color-neutral-900);
  ${"--sl-input-icon-color"}: var(--sl-color-neutral-500);
  ${"--sl-input-icon-color-hover"}: var(--sl-color-neutral-600);
  ${"--sl-input-icon-color-focus"}: var(--sl-color-neutral-600);
  ${"--sl-input-placeholder-color"}: var(--sl-color-neutral-500);
  ${"--sl-input-placeholder-color-disabled"}: var(--sl-color-neutral-600);
  ${"--sl-input-spacing-small"}: var(--sl-spacing-small);
  ${"--sl-input-spacing-medium"}: var(--sl-spacing-medium);
  ${"--sl-input-spacing-large"}: var(--sl-spacing-large);
  ${"--sl-input-focus-ring-color"}: var(--sl-color-primary-300);
  ${"--sl-input-focus-ring-offset"}: 0;
  ${"--sl-input-filled-background-color"}: var(--sl-color-neutral-100);
  ${"--sl-input-filled-background-color-hover"}: var(--sl-color-neutral-100);
  ${"--sl-input-filled-background-color-focus"}: var(--sl-color-neutral-100);
  ${"--sl-input-filled-background-color-disabled"}: var(--sl-color-neutral-100);
  ${"--sl-input-filled-color"}: var(--sl-color-neutral-800);
  ${"--sl-input-filled-color-hover"}: var(--sl-color-neutral-800);
  ${"--sl-input-filled-color-focus"}: var(--sl-color-neutral-700);
  ${"--sl-input-filled-color-disabled"}: var(--sl-color-neutral-800);
  ${"--sl-input-label-font-size-small"}: var(--sl-font-size-small);
  ${"--sl-input-label-font-size-medium"}: var(--sl-font-size-medium);
  ${"--sl-input-label-font-size-large"}: var(--sl-font-size-large);
  ${"--sl-input-label-color"}: inherit;
  ${"--sl-input-help-text-font-size-small"}: var(--sl-font-size-x-small);
  ${"--sl-input-help-text-font-size-medium"}: var(--sl-font-size-small);
  ${"--sl-input-help-text-font-size-large"}: var(--sl-font-size-medium);
  ${"--sl-input-help-text-color"}: var(--sl-color-neutral-500);
  ${"--sl-toggle-size-small"}: 0.875rem;
  ${"--sl-toggle-size-medium"}: 1.125rem;
  ${"--sl-toggle-size-large"}: 1.375rem;
  ${"--sl-overlay-background-color"}: hsl(240 3.8% 46.1% / 33%);
  ${"--sl-panel-background-color"}: var(--sl-color-neutral-0);
  ${"--sl-panel-border-color"}: var(--sl-color-neutral-200);
  ${"--sl-panel-border-width"}: 1px;
  ${"--sl-tooltip-border-radius"}: var(--sl-border-radius-medium);
  ${"--sl-tooltip-background-color"}: var(--sl-color-neutral-800);
  ${"--sl-tooltip-color"}: var(--sl-color-neutral-0);
  ${"--sl-tooltip-font-family"}: var(--sl-font-sans);
  ${"--sl-tooltip-font-weight"}: var(--sl-font-weight-normal);
  ${"--sl-tooltip-font-size"}: var(--sl-font-size-small);
  ${"--sl-tooltip-line-height"}: var(--sl-line-height-dense);
  ${"--sl-tooltip-padding"}: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
  ${"--sl-tooltip-arrow-size"}: 6px;
  ${"--sl-z-index-drawer"}: 700;
  ${"--sl-z-index-dialog"}: 800;
  ${"--sl-z-index-dropdown"}: 900;
  ${"--sl-z-index-toast"}: 950;
  ${"--sl-z-index-tooltip"}: 1000;
}
/* */
`


export interface LCH {
  l: number
  c: number
  h: number
  a?: number
}

export interface BaseThemeColors {
  fg: LCH
  bg: LCH
  primary: LCH
}

export class Theme<
  C extends BaseThemeColors & { [key: string]: LCH },
  Levels extends string = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950"
>
extends CSSBuilder<
  "theme_class" | "neutral" |Extract<keyof C, string>,
  (`${Extract<keyof C, string> | "neutral" | "primary"}${"" | "0" | Levels | "1000"}`) | keyof (typeof theme_base)["vars"]
> {

  rgb: {[name in `${Extract<keyof C, string> | "neutral" | "primary"}${"" | "0" | Levels | "1000"}`]: string} = {} as any

  constructor(
    public base_colors: C,
    public levels: Levels[] = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as Levels[])
  {
    super()

    const _colors = this.base_colors
    Object.assign(this.classes, theme_base.classes)
    Object.assign(this.vars, theme_base.vars)

    const _raw = [] as string[]
    const _all_colors = [] as string[]

    const bg = _colors.bg
    const fg = _colors.fg
    const primary = _colors.primary

    Object.assign(this.rgb, _colors)

    const addcol = (k: Extract<keyof C, string> | "neutral" | "primary", value: LCH, level: Levels | "0" | "1000" | "", to_primary?: string[]) => {
      const key = `${k}${level ?? ""}`
      const keyvar = `--sl-color-${k}-${level}`

      if (k !== "primary" && k !== "neutral" && k !== "fg" && k !== "bg") {
        to_primary?.push(`--sl-color-primary-${level ?? ""}: var(--sl-color-${k}-${level});`)
      }

      ;(this.rgb as any)[key] = value
      _all_colors.push(`${keyvar}: oklch(${value.l}% ${value.c} ${value.h} ${value.a ? "/ " + value.a : ""});`)
      this.vars[`${k}${level ?? ""}`] = `var(--sl-color-${k}-${level})`

    }

    const keys = Object.keys(_colors) as (Extract<keyof C, string>)[]

    function __(level: number, col: LCH) {
      const target = level <= 600 ? bg : fg
      const ratio = level <= 600 ? level / 600 : (level - 600) / 400
      return {
        l: target.l + (col.l - target.l) * ratio,
        c: target.c + (col.c - target.c) * ratio,
        h: col.h,
      }
    }

    for (let k of [...keys]) {
      const col = _colors[k]

      ;(this.rgb as any)[k] = col

      const _color_primary = [] as string[]

      // all colors have to be generated at all levels except for
      // neutral-0 and neutral-1000 which are background and foreground

      _all_colors.push(`--sl-color-${k}: oklch(${col.l}% ${col.c} ${col.h} ${col.a ? "/ " + col.a : ""});`)
      this.vars[`${k}`] = `var(--sl-color-${k})`
      for (var level of levels) {
        // generate all levels
        const l = Number(level)

        addcol(
          k,
          __(l, col)
          , level, _color_primary
        )
      }
      const color_class = `-color-theme-${this.id}-${k}`
      _raw.push(`.${color_class} { ${_color_primary.join("")} }`)
      this.classes[k] = color_class

    }

    addcol("neutral", bg, "0")
    addcol("neutral", fg, "1000")
    for (let lvl of levels) {
      const l = Number(lvl)
      const _ = (val_from: number, val_to: number) => val_from + (val_to - val_from) * l / 1000
      addcol("neutral", {l: _(bg.l, fg.l), c: fg.c, h: fg.h, a: fg.a}, lvl)
      addcol("primary", __(l, primary), lvl)
    }

    // Push a regular theme
    _raw.push(`.-color-theme-${this.id} {
      ${_all_colors.join("")}
    }`)

    this.__raw = _raw.join("\n")
    this.classes.theme_class = `-color-theme-${this.id} ${theme_base.classes.theme_class}`
  }

    /**
   * Reverse puts the given color as the background.
   * The fg color is changed to the value of bg if the contrast of the color is too low
   * with the current bg, otherwise it stays fg.
   * The tint becomes what color was chosen as FG.
   *
   * If recompute is true, all colors are recalculated to fit the new BG and keep their contrast
   * more or less the same it was before.
   */
    derive<C2 extends {[name: string]: LCH}>(new_colors: C2, opts?: { recompute?: boolean}): Theme<C & C2, Levels> {
      // return this
      let old_bg = this.base_colors.bg
      const colors = Object.assign({}, this.base_colors, new_colors)

      let bg = colors.bg
      let l_old_bg = old_bg.l
      const old_is_dark = l_old_bg < 50
      if (old_is_dark) l_old_bg *= -1

      let l_new_bg = bg.l
      const new_is_dark = l_new_bg < 50
      if (new_is_dark) l_new_bg -= 100

      if (opts?.recompute) {

        const keys = Object.keys(colors)
        for (var k of keys) {
          if (k === "fg" || k === "bg") continue
          function _(l_old_col: number) {
            if (old_is_dark) l_old_col -= 100
            let ratio = l_old_col / l_old_bg
            let new_lum = l_new_bg * ratio
            if (new_is_dark) new_lum += 100
            return new_lum
          }

          const c = colors[k]
          const col = {l: _(c.l), c: c.c, h: c.h, a: c.a}
          ;(colors as any)[k] = col
        }
      }

      const res = new Theme(colors, this.levels)
      push_css_to_head(res.__raw)
      return res as any
    }


}

export function makeTheme<
  C extends BaseThemeColors & { [key: string]: LCH },
  Levels extends string = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950"
> (
  colors: C,
  levels: Levels[] = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as Levels[]
): typeof theme_base
  & { classes: {[name in keyof C]: string} }
  & { vars: {[name in `${Extract<keyof C, string>}${"0" | Levels | "1000"}`]: string} }
  & { rgb: {[name in `${Extract<keyof C, string>}${"" | "0" | Levels | "1000"}`]: string} }
{
  const res = new Theme(colors, levels)
  push_css_to_head(res.__raw)
  return res as any
}

const _ = (l: number, c: number, h: number, a?: number) => ({l, c, h, a})
export const theme = new Theme({
  bg: _(100, 0, 0),
  fg: _(0, 0, 0),
  primary: _(50, 0.119, 242.75),

  slate: _(37.17, 0.039, 257.29),
  grey: _(35.58, 0.002, 106.49),
  zinc: _(37.03, 0.012, 285.81),
  stone: _(37.41, 0.009, 67.56),

  red: _(50.54, 0.190, 27.52),
  orange: _(55.34, 0.174, 38.40),
  amber: _(55.53, 0.146, 49.00),
  yellow: _(55.38, 0.121, 66.44),
  lime: _(53.22, 0.141, 131.59),
  green: _(52.73, 0.137, 150.07),
  emerald: _(50.81, 0.105, 165.61),
  teal: _(51.09, 0.086, 186.39),
  cyan: _(51.98, 0.094, 223.13),
  sky: _(50.00, 0.119, 242.75),
  blue: _(48.82, 0.217, 264.38),
  indigo: _(45.68, 0.215, 277.02),
  violet: _(49.07, 0.241, 292.58),
  purple: _(49.55, 0.237, 301.92),
  fuschia: _(51.80, 0.226, 323.95),
  pink: _(52.46, 0.199, 3.96),
  rose: _(51.43, 0.198, 16.93),
})
// bg|fg|primary|slate|grey|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuschia|pink|rose
