import { style, CssClass, CSSProperties } from 'osun'


export type ColorArray = [number, number, number]



var nbthemes = 0

export class BaseColortheme {
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
  fontSans = this.p("--sl-font-sans", `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,     Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",     "Segoe UI Symbol"`)
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
  focusRing = this.p("--sl-focus-ring", `var(--sl-focus-ring-style) var(--sl-focus-ring-width)     var(--sl-focus-ring-color)`)
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
  inputFocusRingColor = this.p("--sl-input-focus-ring-color", `hsl(198.6 88.7% 48.4% / 40%)`)
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

/**
 * From a color theme, I need to be able to
 *   - define a default tint
 *   - switch tint easily
 *   - every time a tint is used, all corresponding colors are generated as part of the class
 *   - create "derived" themes that keep the colors but change them according to a new bg
 *   - get the true RGB colors.
 */
export class ColorTheme<T extends ColorTheme.Spec, K extends string = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950"> extends BaseColortheme {
  _own_class: string & CssClass

  public static fromColors<T extends ColorTheme.Spec, K extends string = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950">(

    bg: string, fg: string, primary: string, spec: T, ...levels: K[]

    ): ColorTheme<T, K> & {[Key in `${Extract<keyof T, string> | "primary" | "neutral"}${K}` | keyof T | "neutral0" | "neutral1000"]: CssClass & string}
  {
    return new ColorTheme(bg, fg, primary, spec, levels.length === 0 ? ["50",  "100",  "200",  "300",  "400",  "500",  "600",  "700",  "800",  "900",  "950"] : levels) as any
  }

  private _reversed_cache = new Map<string, ColorTheme<any>>()

  /**
   * The original definitions of the colors, with computed values.
   */
  _colors: T = {} as any

  private _original_colors = {} as any
  /**
   * Temporary colors used for computation.
   */
  // private _colors: {[K in keyof T]: Color} = {} as any

  private constructor(
    /**
     * The original colors, stored in an object + all the calculated ones...
     */
    public bg: string,
    public fg: string,
    public primary: string,
    colors: T,
    private _levels: string[]
  ) {
    super()
    // the original colors
    this._original_colors = colors = Object.assign({}, colors)
    const colordefs: any = this._colors = Object.assign({}, colors)

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
      ;(this._colors as any)[k] = col

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
            interpolate(bg, colors[k], l / 600)
            : interpolate(colors[k], fg, (l - 600) / 400)
          , level, props_to_primary)
      }

      self[k] = style(k, props_to_primary)
    }

    addcol("neutral", bg, "0", {})
    addcol("neutral", fg, "1000", {})
    for (let lvl of this._levels) {
      addcol("neutral", interpolate(bg, fg, Number(lvl) / 1000), lvl, {})

      addcol("primary", Number(lvl) <= 600 ? interpolate(bg, primary, Number(lvl) / 600) : interpolate(primary, fg, (Number(lvl) - 400) / 400), lvl, {})
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
  derive(bg: string, fg: string, primary: string, opts: { recompute?: boolean}): this {
    // return this
    const colors = Object.assign({}, this._original_colors)

    if (bg[0] !== '#') {
      bg = colors[bg] ?? bg
    }

    if (fg && fg[0] !== '#') {
      fg = colors[fg] ?? fg
    }

    if (primary && primary[0] !== '#') {
      primary = colors[primary] ?? primary
    }
    const op = {...opts}

    var key = `${bg}-${fg ?? ''}-${primary ?? ''}-${opts.recompute ?? 'false'}`

    if (this._reversed_cache.has(key)) {
      return this._reversed_cache.get(key)! as any
    }

    var old_bg = this.bg

    if (op.recompute) {
      const adj = luminosity_adjuster(old_bg, bg)
      primary = adj(primary)
      const keys = Object.keys(colors)
      for (var k of keys) {
        if (k in op) continue
        colors[k] = adj(colors[k])
      }
    }

    const res = new ColorTheme(bg, fg, primary, colors, this._levels)
    this._reversed_cache.set(key, res)
    return res as any
  }



}

export namespace ColorTheme {
  export interface Spec {
    [name: string]: string
    // contrast: string
  }
}

/////////////////////////////////////////////////////////////

function expand(hex: string) {
  var result = "#";

  for (var i = 1; i < hex.length; i++) {
    var val = hex.charAt(i);
    result += val + val;
  }

  return result;
}

const maxZeroTolerance = Math.pow(10, -12)
/** d65 standard illuminant in XYZ */
const d65 = [95.05, 100, 108.9]

function luvToXyz(luv: ColorArray): ColorArray {
  const L = luv[0];
  const u = luv[1];
  const v = luv[2];
  const eps = 216 / 24389;
  const kap = 24389 / 27;
  const Xn = d65[0];
  const Yn = d65[1];
  const Zn = d65[2];
  const v0 = 9 * Yn / (Xn + 15 * Yn + 3 * Zn);
  const u0 = 4 * Xn / (Xn + 15 * Yn + 3 * Zn);
  const y = (L > kap * eps) ? Math.pow((L + 16) / 116, 3) : L / kap;
  // If L is 0 (black), will evaluate to NaN, use 0
  const d = y * (39 * L / (v + 13 * L * v0) - 5) || 0;
  const c = -1 / 3;
  const b = -5 * y;
  // If L is 0 (black), will evaluate to NaN, use 0
  const a = (52 * L / (u + 13 * L * u0) - 1) / 3 || 0;
  const x = (d - b) / (a - c);
  const z = x * a + b;
  // x,y,z in [0,1] multiply by 100 to scale to [0,100]
  // Add zero to prevent signed zeros (force 0 rather than -0)
  return [x * 100 + 0, y * 100 + 0, z * 100 + 0];
}

/**
* Convert a 3 element luv tuple to a 3 element lchuv tuple.
* @param {number[]} luv - The luv tuple
* @return {number[]} The lchuv tuple
*/
function luvToLCHuv(luv: ColorArray): ColorArray {
  const L = luv[0];
  const u = (Math.abs(luv[1]) < maxZeroTolerance) ? 0 : luv[1];
  // Since atan2 behaves unpredicably for non-zero values of v near 0,
  // round v within the given tolerance
  const v = (Math.abs(luv[2]) < maxZeroTolerance) ? 0 : luv[2];
  const c = Math.sqrt(u * u + v * v);
  // Math.atan2 returns angle in radians so convert to degrees
  let h = Math.atan2(v, u) * 180 / Math.PI;
  // If hue is negative add 360
  h = (h >= 0) ? h : h + 360;
  // Add zero to prevent signed zeros (force 0 rather than -0)
  return [L + 0, c + 0, h + 0];
}

function xyzToLuv(xyz: ColorArray): ColorArray {
  const x = xyz[0];
  const y = xyz[1];
  const z = xyz[2];
  const eps = 216 / 24389;
  const kap = 24389 / 27;
  const Xn = d65[0];
  const Yn = d65[1];
  const Zn = d65[2];
  const vR = 9 * Yn / (Xn + 15 * Yn + 3 * Zn);
  const uR = 4 * Xn / (Xn + 15 * Yn + 3 * Zn);
  // If XYZ = [0,0,0], avoid division by zero and return conversion
  if (x === 0 && y === 0 && z === 0) {
    return [0, 0, 0];
  }
  const v1 = 9 * y / (x + 15 * y + 3 * z);
  const u1 = 4 * x / (x + 15 * y + 3 * z);
  const yR = y / Yn;
  const cbrt = (Math.cbrt != null) ?
    Math.cbrt :
    (val: number, exp: number) => Math.pow(val, exp);
  const L = (yR > eps) ? 116 * cbrt(yR, 1 / 3) - 16 : kap * yR;
  const u = 13 * L * (u1 - uR);
  const v = 13 * L * (v1 - vR);
  // Add zero to prevent signed zeros (force 0 rather than -0)
  return [L + 0, u + 0, v + 0];
}

function lchUVToLuv(lchUV: ColorArray): ColorArray {
  const L = lchUV[0];
  const c = lchUV[1];
  // Convert hue to radians for use with Math.cos and Math.sin
  const h = lchUV[2] / 180 * Math.PI;
  const u = c * Math.cos(h);
  const v = c * Math.sin(h);
  return [L + 0, u + 0, v + 0];
}

function hex2rgb(hex: string): ColorArray {
  // #RGB or #RGBA
  if(hex.length === 4 || hex.length === 5) {
    hex = expand(hex);
  }

  var rgb = [
    parseInt(hex.substring(1,3), 16),
    parseInt(hex.substring(3,5), 16),
    parseInt(hex.substring(5,7), 16)
  ] as ColorArray

  // #RRGGBBAA
  // if (hex.length === 9) {
  //   var alpha = parseFloat((parseInt(hex.substring(7,9), 16) / 255).toFixed(2));
  //   rgb.push(alpha);
  // }

  return rgb;
}


function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}


function componentToHex(c: number) {
  var value = Math.round(clamp(c, 0, 255));
  var hex   = value.toString(16)

  return hex.length == 1 ? "0" + hex : hex
}


function rgb2hex(rgb: ColorArray): string {
  // var alpha = rgb.length === 4 ? componentToHex(rgb[3] * 255) : "";

  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2])
}


export function rgb2xyz(rgb: ColorArray): ColorArray {
  var r = rgb[0] / 256,
      g = rgb[1] / 256,
      b = rgb[2] / 256;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}


export function rgb2lch(rgb: ColorArray): ColorArray {
  return luvToLCHuv(xyzToLuv(rgb2xyz(rgb)))
}

export function xyz2rgb(xyz: ColorArray): ColorArray {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}


/**
 * Adjust a color from its old background to its new background, keeping its distance
 * from the old to the new.
 *
 * The distances are calculated in the lch color space
 *
 * @param color
 * @param old_bg
 * @param new_bg
 */
function luminosity_adjuster(old_bg: string, new_bg: string) {

  // old background
  const lch_old_bg = rgb2lch(hex2rgb(old_bg))
  let l_old_bg = lch_old_bg[0]
  const l_old_is_dark = l_old_bg < 50
  if (l_old_is_dark) l_old_bg *= -1

  // new background
  const lch_new_bg = rgb2lch(hex2rgb(new_bg))
  let l_new_bg = lch_new_bg[0]
  const l_new_is_dark = l_new_bg < 50
  if (l_new_is_dark) l_new_bg -= 100

  return function adjust_color(color: string, ): string {
    // old_color
    const lch_col = rgb2lch(hex2rgb(color))
    let l_old_col = lch_col[0]
    if (l_old_is_dark) l_old_col -= 100

    let ratio = l_old_col / l_old_bg
    let new_lum = l_new_bg * ratio
    if (l_new_is_dark) new_lum += 100

    const res = rgb2hex(xyz2rgb(luvToXyz(lchUVToLuv([
      new_lum, // luminosity_center is used as a symmetry point
      lch_col[1], // chroma is untouched, colors keep their original saturation.
      lch_col[2],
      // (oc[2] + hue_distance) % 360
    ]))))
    return res
    // now, try to maintain this distance to the new background
  }
}

export function interpolate(from: string, to: string, pct: number) {
  const frgb = hex2rgb(from)
  const trgb = hex2rgb(to)
  return rgb2hex([
    frgb[0] + (trgb[0] - frgb[0]) * pct,
    frgb[1] + (trgb[1] - frgb[1]) * pct,
    frgb[2] + (trgb[2] - frgb[2]) * pct,
  ])
}
