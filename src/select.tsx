import { Renderable, attrs_sl_button, o, e, $scrollable, RepeatScroll, $click, $shadow, css, $disconnected } from "elt"
import { style } from "osun"
import { popup } from "./popup"
import "./components/select"
import "./components/popup"


export interface SelectAttributes<T> extends attrs_sl_button {
	model: o.Observable<T>
	options: o.RO<Iterable<T>>
	labelfn: (opt: T) => Renderable
	disabled?: o.RO<boolean>
}


export function Select<T>(at: SelectAttributes<T>) {
  const o_expanded = o(false)
  const {variant, caret, size, outline} = at
  const o_opts = o.tf(at.options, opts => Array.isArray(opts) ? opts:  [...opts])
  const model = at.model
  const labelfn = at.labelfn

  function show_values(anchor: HTMLElement) {
    o_expanded.set(true)

	  popup(anchor, fut => {
      return <sl-popup
        arrow
        distance={6}
        placement="bottom"
        flip-fallback-placements="bottom top"
        flip
        sync="width"
      >
        {$disconnected(() => {
          o_expanded.set(false)
        })}
        <div class={cls_select_popup}>
        <e-flex style={{maxHeight: "50vh"}} column>
        {$scrollable}
        {RepeatScroll(o_opts, (opt, i) => {
          const o_equals = o.join(model, opt).tf(([mod, opt]) => mod === opt)
          return <e-box class={[cls_popup_cell, {[cls_popup_selected]: o_equals}]} pad="small">
              {"\u200C"}
              {$click(() => {
                if (o.get(at.disabled)) return
                var val = o.get(opt)
                model.set(val)
                fut.resolve(null)
              })}
              {o.tf(opt, val => labelfn(val))}
            </e-box>
        })}
      </e-flex></div></sl-popup>
    })
  }

  return <e-select class={cls_select_outside}>
    {$shadow({ css: select_css }, <>
      <div part="form-control" style={{display: "inline-flex", width: "100%", alignItems: "baseline"}}>
        <div part="form-control-label">
          <slot name="label"></slot>
        </div>
        <sl-button part="button" {...{variant,caret,size,outline}} disabled={at.disabled} class={cls_select_button}>
          {$click(ev => {
            if (!o.get(at.disabled)) {
              show_values(ev.currentTarget)
            }
          })}
          <slot/>
          <sl-icon class={["expander", {"expanded": o_expanded}]} library="system" name="chevron-down" slot="suffix"></sl-icon>
        </sl-button>
        <slot name="form-control-help-text"></slot>
      </div>
    </>)}
    {model.tf(m => labelfn(m))}
  </e-select>
}


const select_css = css`
.expander {
  transition: var(--sl-transition-medium) rotate ease;
  rotate: 0deg;
}

.expanded {
  rotate: 180deg
}

sl-button {
  width: 100%;
}

sl-button::part(label) {
  flex-grow: 1;
  text-align: left;
}
`

const cls_select_outside = style("select-outside", {
  display: "inline-flex",
})

const cls_select_button = style("select-button")
cls_select_button.part("label", { flexGrow: 1, textAlign: "left" })
const cls_popup_selected = style("select-selected", {
  background: "var(--sl-color-primary-50)",
})
const cls_popup_cell = style("select-popup-cell", { })
cls_popup_cell.hover({
  background: "var(--sl-color-neutral-50)"
})

const cls_select_popup = style("select-popup", {
  overflow: "hidden",
  padding: "var(--sl-spacing-small) 0px",
  background: "var(--sl-color-neutral-0)",
  borderRadius: "var(--sl-input-border-radius-medium)",
  border: `1px solid var(--arrow-color)`,
  boxShadow: "0 2px 4px var(--sl-color-neutral-300)",
})

