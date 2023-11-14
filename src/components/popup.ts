
/**
 * This file is generated by genshoelace.js using the custom-elements.json file provided.
 */
import SlPopup, { VirtualElement } from "@shoelace-style/shoelace/dist/components/popup/popup.js"

export { SlPopup }
declare module "elt" {
  interface attrs_sl_popup extends Attrs<HTMLElementTagNameMap["sl-popup"]> {
    /** The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide the anchor
element `id`, a DOM element reference, or a `VirtualElement`. If the anchor lives inside the popup, use the
`anchor` slot instead. */
    anchor?: NRO<Element | string | VirtualElement>
    /** Activates the positioning logic and shows the popup. When this attribute is removed, the positioning logic is torn
down and the popup will be hidden. */
    active?: NRO<boolean>
    /** The preferred placement of the popup. Note that the actual placement will vary as configured to keep the
panel inside of the viewport. */
    placement?: NRO<'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'>
    /** Determines how the popup is positioned. The `absolute` strategy works well in most cases, but if overflow is
clipped, using a `fixed` position strategy can often workaround it. */
    strategy?: NRO<'absolute' | 'fixed'>
    /** The distance in pixels from which to offset the panel away from its anchor. */
    distance?: NRO<number>
    /** The distance in pixels from which to offset the panel along its anchor. */
    skidding?: NRO<number>
    /** Attaches an arrow to the popup. The arrow's size and color can be customized using the `--arrow-size` and
`--arrow-color` custom properties. For additional customizations, you can also target the arrow using
`::part(arrow)` in your stylesheet. */
    arrow?: NRO<boolean>
    /** The placement of the arrow. The default is `anchor`, which will align the arrow as close to the center of the
anchor as possible, considering available space and `arrow-padding`. A value of `start`, `end`, or `center` will
align the arrow to the start, end, or center of the popover instead. */
    "arrow-placement"?: NRO<'start' | 'end' | 'center' | 'anchor'>
    /** The amount of padding between the arrow and the edges of the popup. If the popup has a border-radius, for example,
this will prevent it from overflowing the corners. */
    "arrow-padding"?: NRO<number>
    /** When set, placement of the popup will flip to the opposite site to keep it in view. You can use
`flipFallbackPlacements` to further configure how the fallback placement is determined. */
    flip?: NRO<boolean>
    /** If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits. Must be a
string of any number of placements separated by a space, e.g. "top bottom left". If no placement fits, the flip
fallback strategy will be used instead. */
    "flip-fallback-placements"?: NRO<string>
    /** When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether
the popup should be positioned using the best available fit based on available space or as it was initially
preferred. */
    "flip-fallback-strategy"?: NRO<'best-fit' | 'initial'>
    /** The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping. By
default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
change the boundary by passing a reference to one or more elements to this property. */
    flipBoundary?: NRO<Element | Element[]>
    /** The amount of padding, in pixels, to exceed before the flip behavior will occur. */
    "flip-padding"?: NRO<number>
    /** Moves the popup along the axis to keep it in view when clipped. */
    shift?: NRO<boolean>
    /** The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By
default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
change the boundary by passing a reference to one or more elements to this property. */
    shiftBoundary?: NRO<Element | Element[]>
    /** The amount of padding, in pixels, to exceed before the shift behavior will occur. */
    "shift-padding"?: NRO<number>
    /** When set, this will cause the popup to automatically resize itself to prevent it from overflowing. */
    "auto-size"?: NRO<'horizontal' | 'vertical' | 'both'>
    /** Syncs the popup's width or height to that of the anchor element. */
    sync?: NRO<'width' | 'height' | 'both'>
    /** The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By
default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
change the boundary by passing a reference to one or more elements to this property. */
    autoSizeBoundary?: NRO<Element | Element[]>
    /** The amount of padding, in pixels, to exceed before the auto-size behavior will occur. */
    "auto-size-padding"?: NRO<number>
  }

  interface ElementMap {
    "sl-popup": attrs_sl_popup
  }

}
