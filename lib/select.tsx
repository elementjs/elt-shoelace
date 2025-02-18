import { Renderable, o, e, $scrollable, Repeat, $click, $shadow, $disconnected, ElementMap, css  } from "elt"
import { popup } from "./popup"
import "./components/select"
import "./components/popup"
import "./components/button"

type attrs_sl_button = ElementMap["sl-button"]

export interface SelectAttributes<T> extends attrs_sl_button {
	model?: o.Observable<T>
	options: o.RO<Iterable<T>>
	labelfn?: (opt: T) => Renderable
	disabled?: o.RO<boolean>
}


export function Select<T>(at: SelectAttributes<T>) {
  const o_expanded = o(false)
  const {variant, caret, size, outline} = at
  const o_opts = o.tf(at.options, opts => Array.isArray(opts) ? opts:  [...opts])
  const model = at.model
  const labelfn = at.labelfn ?? (e => e?.toString())

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
        <div class={[cls.eltsl_select_popup, o.tf(size, s => s === "small" ? cls.eltsl_popup_small : s === "large" ? cls.eltsl_popup_big : undefined)]}>
        <e-flex style={{maxHeight: "50vh"}} column nowrap>
        {$scrollable}
        {Repeat(o_opts, (opt, i) => {
          const o_equals = o.join(model, opt).tf(([mod, opt]) => mod === opt)
          return <e-box class={[cls.eltsl_popup_cell, {[cls.eltsl_popup_selected]: o_equals}]} pad="small">
              {"\u200C"}
              {$click(() => {
                if (o.get(at.disabled)) return
                var val = o.get(opt)
                model?.set(val)
                fut.resolve(null)
              })}
              {o.tf(opt, val => labelfn(val))}
            </e-box>
        })}
      </e-flex></div></sl-popup>
    })
  }

  return <e-select class={cls.eltsl_select_outside}>
    {$shadow({ css: select_css.sheet() }, <>
      <div part="form-control" style={{display: "inline-flex", width: "100%", alignItems: "baseline"}}>
        <div part="form-control-label">
          <slot name="label"></slot>
        </div>
        <sl-button part="button" {...{variant,caret,size,outline}} disabled={at.disabled} class={cls.eltsl_select_button}>
          {$click(ev => {
            if (!o.get(at.disabled)) {
              show_values(ev.currentTarget)
            }
          })}
          <slot/>
          <sl-icon class={[[select_css.expander, {[select_css.expanded]: o_expanded}]]} library="system" name="chevron-down" slot="suffix"></sl-icon>
        </sl-button>
        <slot name="form-control-help-text"></slot>
      </div>
    </>)}
    {model?.tf(m => labelfn(m))}
  </e-select>
}

const select_css = $shadow.css`
${".expander"} {
  transition: var(--sl-transition-medium) rotate ease;
  rotate: 0deg;
}

${".expanded"} {
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

const cls = css`
${".eltsl_select_outside"} {
  display: inline-flex;
}

${".eltsl_select_button"}::part(label) {
  flex-grow: 1;
  text-align: left;
}

${".eltsl_popup_selected"} {
  background: var(--sl-color-primary-50);
}

${".eltsl_popup_cell"}:hover {
  background: var(--sl-color-neutral-50);
}

${".eltsl_select_popup"} {
  overflow: hidden;
  padding: var(--sl-spacing-small) 0px;
  background: var(--sl-color-neutral-0);
  border-radius: var(--sl-input-border-radius-medium);
  border: 1px solid var(--arrow-color);
  box-shadow: 0 2px 4px var(--sl-color-neutral-300);
}

${".eltsl_popup_small"} {
  font-size: 0.8em;
}

${".eltsl_popup_big"} {
  font-size: 1.25em;
}
`
