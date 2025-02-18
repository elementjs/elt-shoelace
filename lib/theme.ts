import { style, CssClass, CSSProperties } from 'osun'
import * as c from "./colorfn"

// console.log("theme")
let nbthemes = 0

export class Basetheme {
  baseprops: CSSProperties = {}

  p(name: string, value: string) {
    (this.baseprops as any)[name] = value
    return `var(${name})`
  }

  borderRadiusSmall = this.p("--sl-border-radius-small", `0.1875rem`)
  borderRadiusMedium = this.p("--sl-border-radius-medium", `0.25rem`)
  borderRadiusLarge = this.p("--sl-border-radius-large", `0.5rem`)
  borderRadiusXLarge = this.p("--sl-border-radius-x-large", `1rem`)
  borderRadiusCircle = this.p("--sl-border-radius-circle", `50%`)
  borderRadiusPill = this.p("--sl-border-radius-pill", `9999px`)
  shadowXSmall = this.p("--sl-shadow-x-small", `0 1px 2px hsl(240 3.8% 46.1% / 6%)`)
  shadowSmall = this.p("--sl-shadow-small", `0 1px 2px hsl(240 3.8% 46.1% / 12%)`)
  shadowMedium = this.p("--sl-shadow-medium", `0 2px 4px hsl(240 3.8% 46.1% / 12%)`)
  shadowLarge = this.p("--sl-shadow-large", `0 2px 8px hsl(240 3.8% 46.1% / 12%)`)
  shadowXLarge = this.p("--sl-shadow-x-large", `0 4px 16px hsl(240 3.8% 46.1% / 12%)`)
  spacing3xSmall = this.p("--sl-spacing-3x-small", `0.125rem`)
  spacing2xSmall = this.p("--sl-spacing-2x-small", `0.25rem`)
  spacingXSmall = this.p("--sl-spacing-x-small", `0.5rem`)
  spacingSmall = this.p("--sl-spacing-small", `0.75rem`)
  spacingMedium = this.p("--sl-spacing-medium", `1rem`)
  spacingLarge = this.p("--sl-spacing-large", `1.25rem`)
  spacingXLarge = this.p("--sl-spacing-x-large", `1.75rem`)
  spacing2xLarge = this.p("--sl-spacing-2x-large", `2.25rem`)
  spacing3xLarge = this.p("--sl-spacing-3x-large", `3rem`)
  spacing4xLarge = this.p("--sl-spacing-4x-large", `4.5rem`)
  transitionXSlow = this.p("--sl-transition-x-slow", `1000ms`)
  transitionSlow = this.p("--sl-transition-slow", `500ms`)
  transitionMedium = this.p("--sl-transition-medium", `250ms`)
  transitionFast = this.p("--sl-transition-fast", `150ms`)
  transitionXFast = this.p("--sl-transition-x-fast", `50ms`)
  fontMono = this.p("--sl-font-mono", `SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace`)
  fontSans = this.p("--sl-font-sans", `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`)
  fontSerif = this.p("--sl-font-serif", `Georgia, "Times New Roman", serif`)
  fontSize2xSmall = this.p("--sl-font-size-2x-small", `0.625rem`)
  fontSizeXSmall = this.p("--sl-font-size-x-small", `0.75rem`)
  fontSizeSmall = this.p("--sl-font-size-small", `0.875rem`)
  fontSizeMedium = this.p("--sl-font-size-medium", `1rem`)
  fontSizeLarge = this.p("--sl-font-size-large", `1.25rem`)
  fontSizeXLarge = this.p("--sl-font-size-x-large", `1.5rem`)
  fontSize2xLarge = this.p("--sl-font-size-2x-large", `2.25rem`)
  fontSize3xLarge = this.p("--sl-font-size-3x-large", `3rem`)
  fontSize4xLarge = this.p("--sl-font-size-4x-large", `4.5rem`)
  fontWeightLight = this.p("--sl-font-weight-light", `300`)
  fontWeightNormal = this.p("--sl-font-weight-normal", `400`)
  fontWeightSemibold = this.p("--sl-font-weight-semibold", `500`)
  fontWeightBold = this.p("--sl-font-weight-bold", `700`)
  letterSpacingDenser = this.p("--sl-letter-spacing-denser", `-0.03em`)
  letterSpacingDense = this.p("--sl-letter-spacing-dense", `-0.015em`)
  letterSpacingNormal = this.p("--sl-letter-spacing-normal", `normal`)
  letterSpacingLoose = this.p("--sl-letter-spacing-loose", `0.075em`)
  letterSpacingLooser = this.p("--sl-letter-spacing-looser", `0.15em`)
  lineHeightDenser = this.p("--sl-line-height-denser", `1`)
  lineHeightDense = this.p("--sl-line-height-dense", `1.4`)
  lineHeightNormal = this.p("--sl-line-height-normal", `1.8`)
  lineHeightLoose = this.p("--sl-line-height-loose", `2.2`)
  lineHeightLooser = this.p("--sl-line-height-looser", `2.6`)
  focusRingColor = this.p("--sl-focus-ring-color", `var(--sl-color-primary-600)`)
  focusRingStyle = this.p("--sl-focus-ring-style", `solid`)
  focusRingWidth = this.p("--sl-focus-ring-width", `3px`)
  focusRing = this.p("--sl-focus-ring", `var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color)`)
  focusRingOffset = this.p("--sl-focus-ring-offset", `1px`)
  buttonFontSizeSmall = this.p("--sl-button-font-size-small", `var(--sl-font-size-x-small)`)
  buttonFontSizeMedium = this.p("--sl-button-font-size-medium", `var(--sl-font-size-small)`)
  buttonFontSizeLarge = this.p("--sl-button-font-size-large", `var(--sl-font-size-medium)`)
  inputHeightSmall = this.p("--sl-input-height-small", `1.875rem`)
  inputHeightMedium = this.p("--sl-input-height-medium", `2.5rem`)
  inputHeightLarge = this.p("--sl-input-height-large", `3.125rem`)
  inputBackgroundColor = this.p("--sl-input-background-color", `var(--sl-color-neutral-0)`)
  inputBackgroundColorHover = this.p("--sl-input-background-color-hover", `var(--sl-input-background-color)`)
  inputBackgroundColorFocus = this.p("--sl-input-background-color-focus", `var(--sl-input-background-color)`)
  inputBackgroundColorDisabled = this.p("--sl-input-background-color-disabled", `var(--sl-color-neutral-100)`)
  inputBorderColor = this.p("--sl-input-border-color", `var(--sl-color-neutral-300)`)
  inputBorderColorHover = this.p("--sl-input-border-color-hover", `var(--sl-color-neutral-400)`)
  inputBorderColorFocus = this.p("--sl-input-border-color-focus", `var(--sl-color-primary-500)`)
  inputBorderColorDisabled = this.p("--sl-input-border-color-disabled", `var(--sl-color-neutral-300)`)
  inputBorderWidth = this.p("--sl-input-border-width", `1px`)
  inputRequiredContent = this.p("--sl-input-required-content", `"*"`)
  inputRequiredContentOffset = this.p("--sl-input-required-content-offset", `-2px`)
  inputRequiredContentColor = this.p("--sl-input-required-content-color", `var(--sl-input-label-color)`)
  inputBorderRadiusSmall = this.p("--sl-input-border-radius-small", `0.25rem 0.5rem`)
  inputBorderRadiusMedium = this.p("--sl-input-border-radius-medium", `0.25rem 0.5rem`)
  inputBorderRadiusLarge = this.p("--sl-input-border-radius-large", `0.25rem 0.5rem`)
  inputFontFamily = this.p("--sl-input-font-family", `var(--sl-font-sans)`)
  inputFontWeight = this.p("--sl-input-font-weight", `var(--sl-font-weight-normal)`)
  inputFontSizeSmall = this.p("--sl-input-font-size-small", `var(--sl-font-size-small)`)
  inputFontSizeMedium = this.p("--sl-input-font-size-medium", `var(--sl-font-size-medium)`)
  inputFontSizeLarge = this.p("--sl-input-font-size-large", `var(--sl-font-size-large)`)
  inputLetterSpacing = this.p("--sl-input-letter-spacing", `var(--sl-letter-spacing-normal)`)
  inputColor = this.p("--sl-input-color", `var(--sl-color-neutral-700)`)
  inputColorHover = this.p("--sl-input-color-hover", `var(--sl-color-neutral-700)`)
  inputColorFocus = this.p("--sl-input-color-focus", `var(--sl-color-neutral-700)`)
  inputColorDisabled = this.p("--sl-input-color-disabled", `var(--sl-color-neutral-900)`)
  inputIconColor = this.p("--sl-input-icon-color", `var(--sl-color-neutral-500)`)
  inputIconColorHover = this.p("--sl-input-icon-color-hover", `var(--sl-color-neutral-600)`)
  inputIconColorFocus = this.p("--sl-input-icon-color-focus", `var(--sl-color-neutral-600)`)
  inputPlaceholderColor = this.p("--sl-input-placeholder-color", `var(--sl-color-neutral-500)`)
  inputPlaceholderColorDisabled = this.p("--sl-input-placeholder-color-disabled", `var(--sl-color-neutral-600)`)
  inputSpacingSmall = this.p("--sl-input-spacing-small", `var(--sl-spacing-small)`)
  inputSpacingMedium = this.p("--sl-input-spacing-medium", `var(--sl-spacing-medium)`)
  inputSpacingLarge = this.p("--sl-input-spacing-large", `var(--sl-spacing-large)`)
  inputFocusRingColor = this.p("--sl-input-focus-ring-color", `var(--sl-color-primary-300)`)
  inputFocusRingOffset = this.p("--sl-input-focus-ring-offset", `0`)
  inputFilledBackgroundColor = this.p("--sl-input-filled-background-color", `var(--sl-color-neutral-100)`)
  inputFilledBackgroundColorHover = this.p("--sl-input-filled-background-color-hover", `var(--sl-color-neutral-100)`)
  inputFilledBackgroundColorFocus = this.p("--sl-input-filled-background-color-focus", `var(--sl-color-neutral-100)`)
  inputFilledBackgroundColorDisabled = this.p("--sl-input-filled-background-color-disabled", `var(--sl-color-neutral-100)`)
  inputFilledColor = this.p("--sl-input-filled-color", `var(--sl-color-neutral-800)`)
  inputFilledColorHover = this.p("--sl-input-filled-color-hover", `var(--sl-color-neutral-800)`)
  inputFilledColorFocus = this.p("--sl-input-filled-color-focus", `var(--sl-color-neutral-700)`)
  inputFilledColorDisabled = this.p("--sl-input-filled-color-disabled", `var(--sl-color-neutral-800)`)
  inputLabelFontSizeSmall = this.p("--sl-input-label-font-size-small", `var(--sl-font-size-small)`)
  inputLabelFontSizeMedium = this.p("--sl-input-label-font-size-medium", `var(--sl-font-size-medium)`)
  inputLabelFontSizeLarge = this.p("--sl-input-label-font-size-large", `var(--sl-font-size-large)`)
  inputLabelColor = this.p("--sl-input-label-color", `inherit`)
  inputHelpTextFontSizeSmall = this.p("--sl-input-help-text-font-size-small", `var(--sl-font-size-x-small)`)
  inputHelpTextFontSizeMedium = this.p("--sl-input-help-text-font-size-medium", `var(--sl-font-size-small)`)
  inputHelpTextFontSizeLarge = this.p("--sl-input-help-text-font-size-large", `var(--sl-font-size-medium)`)
  inputHelpTextColor = this.p("--sl-input-help-text-color", `var(--sl-color-neutral-500)`)
  toggleSizeSmall = this.p("--sl-toggle-size-small", `0.875rem`)
  toggleSizeMedium = this.p("--sl-toggle-size-medium", `1.125rem`)
  toggleSizeLarge = this.p("--sl-toggle-size-large", `1.375rem`)
  overlayBackgroundColor = this.p("--sl-overlay-background-color", `hsl(240 3.8% 46.1% / 33%)`)
  panelBackgroundColor = this.p("--sl-panel-background-color", `var(--sl-color-neutral-0)`)
  panelBorderColor = this.p("--sl-panel-border-color", `var(--sl-color-neutral-200)`)
  panelBorderWidth = this.p("--sl-panel-border-width", `1px`)
  tooltipBorderRadius = this.p("--sl-tooltip-border-radius", `var(--sl-border-radius-medium)`)
  tooltipBackgroundColor = this.p("--sl-tooltip-background-color", `var(--sl-color-neutral-800)`)
  tooltipColor = this.p("--sl-tooltip-color", `var(--sl-color-neutral-0)`)
  tooltipFontFamily = this.p("--sl-tooltip-font-family", `var(--sl-font-sans)`)
  tooltipFontWeight = this.p("--sl-tooltip-font-weight", `var(--sl-font-weight-normal)`)
  tooltipFontSize = this.p("--sl-tooltip-font-size", `var(--sl-font-size-small)`)
  tooltipLineHeight = this.p("--sl-tooltip-line-height", `var(--sl-line-height-dense)`)
  tooltipPadding = this.p("--sl-tooltip-padding", `var(--sl-spacing-2x-small) var(--sl-spacing-x-small)`)
  tooltipArrowSize = this.p("--sl-tooltip-arrow-size", `6px`)
  zIndexDrawer = this.p("--sl-z-index-drawer", `700`)
  zIndexDialog = this.p("--sl-z-index-dialog", `800`)
  zIndexDropdown = this.p("--sl-z-index-dropdown", `900`)
  zIndexToast = this.p("--sl-z-index-toast", `950`)
  zIndexTooltip = this.p("--sl-z-index-tooltip", `1000`)
}


export type MappedColors<T, K extends string> = {
  [Key in `${Extract<keyof T, string> | "primary" | "neutral"}${K}` | keyof T | "neutral0" | "neutral1000"]: CssClass & string
}


export interface ThemeColors {
  fg: string
  bg: string
  primary: string
  [name: string]: string
}

/**
 * From a color theme, I need to be able to
 *   - define a default tint
 *   - switch tint easily
 *   - every time a tint is used, all corresponding colors are generated as part of the class
 *   - create "derived" themes that keep the colors but change them according to a new bg
 *   - get the true RGB colors.
 */
export class Theme<T extends ThemeColors, K extends string> extends Basetheme {
  _own_class: string & CssClass

  public static fromColors<T extends ThemeColors, K extends string = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950">(

    spec: T, ...levels: K[]

    ): Theme<T, K> & MappedColors<T, K>
  {
    return new Theme(spec, levels.length === 0 ? ["50",  "100",  "200",  "300",  "400",  "500",  "600",  "700",  "800",  "900",  "950"] : levels) as any
  }

  /**
   * The original definitions of the colors, with computed values.
   */
  rgb: T & MappedColors<T, K> = {} as any

  private _original_colors = {} as any

  private constructor(
    /**
     * The original colors, stored in an object + all the calculated ones...
     */
    colors: T,
    private _levels: string[]
  ) {
    super()

    const bg = colors.bg
    const fg = colors.fg
    const primary = colors.primary

    // the original colors
    this._original_colors = colors = Object.assign({}, colors)
    const colordefs: any = this.rgb = Object.assign({}, colors) as any

    const keys = Object.keys(colors) as (Extract<keyof T, string>)[]

    const props = {} as any
    const self = this as any

    const addcol = (k: string, value: string, level: string, to_primary: any) => {
      const key = `${k}${level ?? ''}`
      const keyvar = `--sl-color-${k}-${level}`

      if (k !== "primary") {
        to_primary[`--sl-color-primary-${level ?? ''}`] = `var(${keyvar})`
      }

      props[keyvar] = value
      colordefs[key] = value as any
      ;(self as any)[key] = `var(${keyvar})`
    }

    for (let k of [...keys]) {
      const col = colors[k]
      ;(this.rgb as any)[k] = col

      const props_to_primary = {} as any

      // all colors have to be generated at all levels except for
      // neutral-0 and neutral-1000 which are background and foreground

      for (var level of this._levels) {
        // generate all levels
        const l = Number(level)
        // 500 is the color, so we interpolate to and from the color
        addcol(
          k,
          l <= 600 ?
            c.interpolate(bg, colors[k], l / 600)
            : c.interpolate(colors[k], fg, (l - 600) / 400)
          , level, props_to_primary)
      }

      self[k] = style(k, props_to_primary)
    }

    addcol("neutral", bg, "0", {})
    addcol("neutral", fg, "1000", {})
    for (let lvl of this._levels) {
      addcol("neutral", c.interpolate(bg, fg, Number(lvl) / 1000), lvl, {})

      addcol("primary", Number(lvl) <= 600 ? c.interpolate(bg, primary, Number(lvl) / 600) : c.interpolate(primary, fg, (Number(lvl) - 400) / 400), lvl, {})
    }

    // Push a regular theme
    this._own_class = style(`color-theme-${nbthemes++}`, props, this.baseprops, {
      color: `var(--sl-color-neutral-1000)`,
      background: `var(--sl-color-neutral-0)`,
    })
  }

  get className() { return this._own_class }

  /**
   * Reverse puts the given color as the background.
   * The fg color is changed to the value of bg if the contrast of the color is too low
   * with the current bg, otherwise it stays fg.
   * The tint becomes what color was chosen as FG.
   *
   * If recompute is true, all colors are recalculated to fit the new BG and keep their contrast
   * more or less the same it was before.
   */
  derive<T2 extends {[name: string]: string}>(new_colors: T2, opts?: { recompute?: boolean}): Theme<T & T2, K> & MappedColors<T & T2, K> {
    // return this
    const colors: ThemeColors = Object.assign({}, this._original_colors, new_colors)

    let bg = colors.bg
    if (bg[0] !== '#') {
      bg = colors[bg] ?? bg
    }

    let fg = colors.fg
    if (fg && fg[0] !== '#') {
      fg = colors[fg] ?? fg
    }

    let primary = colors.primary
    if (primary && primary[0] !== '#') {
      primary = colors[primary] ?? primary
    }
    const op = {...opts}

    let old_bg = this.rgb.bg

    if (op.recompute) {
      const adj = c.luminosity_adjuster(old_bg, bg)
      primary = adj(primary)
      const keys = Object.keys(colors)
      for (var k of keys) {
        if (k === "fg" || k === "bg") continue
        colors[k] = adj(colors[k])
      }
    }

    const res = new Theme(colors, this._levels)
    return res as any
  }

}


export const theme = Theme.fromColors({
  bg: "#ffffff",
  fg: "#1b1b1c",
  primary: "#0369a1",

  slate: "#334155",
  grey: "#3c3c3b",
  zinc: "#3f3f46",
  stone: "#44403c",

  red: "#b91c1c",
  orange: "#c2410c",
  amber: "#b45309",
  yellow: "#a16207",
  lime: "#4d7c0f",
  green: "#15803d",
  emerald: "#047857",
  teal: "#0f766e",
  cyan: "#0e7490",
  sky: "#0369a1",
  blue: "#1d4ed8",
  indigo: "#4338ca",
  violet: "#6d28d9",
  purple: "#7e22ce",
  fuschia: "#a21caf",
  pink: "#be185d",
  rose: "#be123c",
})


export type Color = "gray" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "primary" | "success" | "warning" | "danger"

export function $colorswap(tocolor: Color, replace = "neutral" as "neutral" | "primary") {
  return function (node: HTMLElement) {
    const st = node.style
    for (let c of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950])
      st.setProperty(`--sl-color-${replace}-${c}`, `var(--sl-color-${tocolor}-${c}`)
    st.setProperty(`--sl-color-${replace}-1000`, `var(--sl-color-${tocolor}-950`)
  }
}
