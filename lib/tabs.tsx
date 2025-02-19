import { EltCustomElement, o, register, e, attr, CustomElementAttributes, Renderable, node_append, css, PartialStyle } from "elt"


declare global {
  interface HTMLElementTagNameMap {
    "esl-tab-panel": EltSlTabPanel
    "esl-tab-group": EltSlTabgroup
    "esl-tab": EltSlTab
  }
}

declare module "elt" {

  interface ElementMap {
    "esl-tab-group": CustomElementAttributes<EltSlTabgroup, "value">
    "esl-tab-panel": CustomElementAttributes<EltSlTabPanel, "name" | "render">
    "esl-tab": CustomElementAttributes<EltSlTab, "name">
  }
}


export class EslTabGroupChangeEvent extends Event {
  constructor(type: string = "change", public value: string | null, init?: EventInit) {
    super(type, init)
  }
}


@register("esl-tab-group")
export class EltSlTabgroup extends EltCustomElement {

  // @observable
  @attr({revert: true})
  set value(tabname: string) {

    const old = this.value
    const old_children = this._children.get(old)
    if (old_children) {
      for (const ch of old_children) {
        ch.active = false
      }
    }

    const new_children = this._children.get(tabname)
    if (new_children == null) {
      this._o_style.set({width: "0", transform: "0px"})
    } else {
      for (let ch of new_children) {
        if (ch instanceof EltSlTab) {
          const bbox = ch.getBoundingClientRect()
          const pbox = this.nav_div.getBoundingClientRect()
          // console.log(bbox, pbox)
          this._o_style.set({
            width: `${bbox.width}px`,
            transform: `translateX(${bbox.left - pbox.left}px)`,
          })
        }
        ch.active = true
      }
    }

    this.emitChange()
  }

  emitChange() {
    this.dispatchEvent(new EslTabGroupChangeEvent("change", this.value))
    this.dispatchEvent(new EslTabGroupChangeEvent("sl-input", this.value)) // to work with model
    this.dispatchEvent(new EslTabGroupChangeEvent("input", this.value)) // to work with model
  }

  protected _children = new Map<string, Set<EltSlTabGroupChild>>()

  protected _tabs = new Map<string, EltSlTab>()
  protected _panels = new Map<string, EltSlTabPanel>()

  protected _o_style = o({ width: "0px", transform: "none" }) as o.Observable<PartialStyle>

  register(child: EltSlTabGroupChild) {
    const name = child.name
    let ch = this._children.get(child.name)
    if (ch == null) {
      ch = new Set()
      this._children.set(name, ch)
    }
    ch.add(child)

    if (this.value == null) {
      this.value = name
    }

    if (this.value === name) {
      child.active = true
      if (child instanceof EltSlTab) {
        const bbox = child.getBoundingClientRect()
        const pbox = this.nav_div.getBoundingClientRect()
        // console.log(bbox, pbox)
        this._o_style.set({
          width: `${bbox.width}px`,
          transform: `translateX(${bbox.left - pbox.left}px)`,
        })
      }
    }
  }

  unregister(child: EltSlTabGroupChild) {
    const name = child.name
    const ch = this._children.get(name)
    if (ch == null) { return }
    child.active = false
    ch.delete(child)

    // should activate some tab if it was the current one ?
  }

  nav_div!: HTMLDivElement

  shadow(): Node | null {
    return <>
      <div part="nav">
        {node => { this.nav_div = node; }}
        <slot name="nav"/>
        <div part="indicator" style={this._o_style}/>
      </div>
      <slot/>
    </>
  }
}

export class EltSlTabGroupChild extends EltCustomElement {

  group!: EltSlTabgroup

  @attr({revert: true})
  name!: string

  @attr({revert: true})
  set active(active: boolean) {
    if (active) {  }
  }

  connected(): void {

    const group = this.closest("esl-tab-group")!
    if (group == null) {
      throw new Error("")
    }

    this.group = group
    group.register(this)
  }

  disconnected(): void {
    this.group.unregister(this)
  }

}


@register("esl-tab")
export class EltSlTab extends EltSlTabGroupChild {


  init(): void {
    super.init()

    this.addEventListener("click", ev => {
      this.group.value = this.name
    })
  }

}


@register("esl-tab-panel")
export class EltSlTabPanel extends EltSlTabGroupChild {

  @attr
  render!: null | (() => Renderable)

  init() {
    super.init()

    node_append(this, o.join(this.attrObservable("active"), this.attrObservable("render"))
    .tf(([active, render]) => {
      return active ? render?.() : null
    }))
  }

  setRender(render_fn: () => Renderable) {
    this.render = render_fn
    return this
  }

}


css/*css*/`

esl-tab-group, esl-tab-panel {
  display: contents
}

esl-tab-group::part(nav) {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  position: relative;
  border-bottom: var(--track-width, 2px) solid var(--track-color, var(--sl-color-neutral-200));
}

esl-tab-panel {
  display: none;
}

esl-tab-panel[active] {
  display: block;
}

esl-tab-group::part(indicator) {
  display: block;
  height: auto;

  position: absolute;
  transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) width ease;
  bottom: calc(-1* var(--track-width, 2px));
  border-bottom: solid var(--track-width, 2px) var(--indicator-color, var(--sl-color-primary-600));
}

esl-tab {
  display: inline-flex;
  align-items: center;
  font-family: var(--sl-font-sans);
  font-size: var(--sl-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
  border-radius: var(--sl-border-radius-medium);
  color: var(--sl-color-neutral-600);
  padding: var(--sl-spacing-medium) var(--sl-spacing-large);
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
}

esl-tab[active]:not([disabled]), esl-tab:hover:not([disabled]) {
  color: var(--sl-color-primary-600);
}
`