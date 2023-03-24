
/////////////////////////////////////////////////////////////

export type ColorArray = [number, number, number]

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
export function luminosity_adjuster(old_bg: string, new_bg: string) {

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
