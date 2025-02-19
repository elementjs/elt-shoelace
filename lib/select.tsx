import { Renderable, o, e, $scrollable, Repeat, $click, $shadow, $disconnected, ElementMap, css, DisplayPromise  } from "elt"
import { popup } from "./popup"
import "./components/select"
import "./components/popup"
import "./components/button"
import "./components/spinner"

type attrs_sl_button = ElementMap["sl-button"]

export interface SelectAttributes<T, T2 = T> extends attrs_sl_button {
	model?: o.Observable<T>
	options: o.RO<Iterable<T2> | Promise<Iterable<T2>> | (() => Iterable<T2> | Promise<Iterable<T2>>)>
  fn_convert?: (opt: T2) => T
	labelfn?: (opt: T2) => Renderable
	disabled?: o.RO<boolean>
}


export function Select<T, T2 = T>(at: SelectAttributes<T, T2>) {
  const o_expanded = o(false)
  const {variant, caret, size, outline} = at
  const o_opts = o(at.options).tf(opts => (typeof opts === 'function' ? Promise.resolve(opts()) : Promise.resolve(opts)))
  const model = at.model
  const labelfn = at.labelfn ?? (e => e?.toString())

  const fn_convert = at.fn_convert ?? ((o: T2) => o as unknown as T)
  const o_conversion_map = o(new Map<T, T2>())

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
        {DisplayPromise(o_opts)
          .WhileWaiting(() => <sl-spinner/>)
          .WhenResolved(o_res => {

            const mp = new Map<T, T2>()
            for (const val of o_res.get()) {
              mp.set(fn_convert(val), val)
            }
            o_conversion_map.set(mp)

            const o_res2 = o_res.tf(r => (Array.isArray(r) ? r : [...r]))
            return Repeat(o_res2, (opt, i) => {
              const o_equals = o.join(model, opt).tf(([mod, opt]) => mod === opt)
              return <e-box class={[cls.eltsl_popup_cell, {[cls.eltsl_popup_selected]: o_equals}]} pad="small">
                  {"\u200C"}
                  {$click(() => {
                    if (o.get(at.disabled)) return
                    var val = o.get(opt)
                    model?.set(fn_convert(val))
                    fut.resolve(null)
                  })}
                  {o.tf(opt, val => labelfn(val))}
                </e-box>
              })
            })}
        {/* {Repeat(o_opts, (opt, i) => {
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
        })} */}
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
    {o.join(model, o_conversion_map).tf(([mod, conv]) => labelfn(conv.get(mod!)!))}
    {/* {model?.tf(m => labelfn(m))} */}
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
