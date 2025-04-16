
import { node_on_connected, node_on_disconnected, Renderable, o, node_append, node_remove, css } from "elt"
import { animate, animate_hide, animate_show, stop_animations } from "./animation"
import { SlPopup } from "./components/popup"

export type Content = Renderable
export interface TooltipOptions {
  disabled?: o.RO<boolean>
  trigger?: ("focus" | "hover" | "click")[]
  skidding?: number
  distance?: number
  delay?: number
  show_delay?: number
  hide_delay?: number
  // hoist?: boolean // maybe we don't need that
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
}

class TooltipManager {

  constructor(public content: Content, public options: TooltipOptions) {
    // bound methods
    this.onclick = this.onclick.bind(this)
    this.onblur = this.onblur.bind(this)
    this.onfocus = this.onfocus.bind(this)
    this.onkeydown = this.onkeydown.bind(this)
    this.onmouseleave = this.onmouseleave.bind(this)
    this.onmouseenter = this.onmouseenter.bind(this)
    this.$decorate = this.$decorate.bind(this)

    this.skidding = this.options.skidding ?? 0
    this.distance = this.options.distance ?? 8
    this.disabled = this.options.disabled ?? false
    this.placement = this.options.placement ?? "bottom"
    this.trigger = this.options.trigger ?? ["hover", "focus"]
    this.show_delay = this.options.show_delay ?? 200
    this.hide_delay = this.options.hide_delay ?? 200
  }

  skidding: number
  distance: number
  disabled: o.RO<boolean>
  placement: o.RO<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end">
  trigger: ("focus" | "hover" | "click")[]
  show_delay: number
  hide_delay: number

  // Default options

  o_open = o(false)

  popup: SlPopup | null = null
  node: Element | null = null

  async show() {
    if (!this.node) return
    if (this.o_open.get()) return

    this.o_open.set(true)
    if (this.popup) {
      if (!this.popup.isConnected)
        node_append(this.node.ownerDocument.body, this.popup)
    } else {
      this.popup = <sl-popup
        class={cls_tooltip.eltsl_tooltip}
        placement={this.placement}
        skidding={this.skidding}
        distance={this.distance}
        shift
        arrow
      >
        {node => typeof this.content === "function" ? this.content(node) : this.content}
      </sl-popup> as SlPopup

      this.popup.anchor = this.node
      node_append(this.node.ownerDocument.body, this.popup)
      this.popup.active = true
    }

    await this.popup.updateComplete
    await stop_animations(this.popup.popup)
    await animate(this.popup.popup, animate_show, { duration: 150 })
  }

  async hide() {
    if (this.popup == null) return
    this.o_open.set(false)
    await stop_animations(this.popup.popup)
    await animate(this.popup.popup, animate_hide, { duration: 150 })
    node_remove(this.popup)
  }

  delay_timeout: number | undefined
  delayedshow() {
    clearTimeout(this.delay_timeout)
    this.delay_timeout = window.setTimeout(() => { this.show() }, this.show_delay)
  }

  delayedhide() {
    clearTimeout(this.delay_timeout)
    this.delay_timeout = window.setTimeout(() => { this.hide() }, this.hide_delay)
  }

  onblur() {

  }

  onfocus() {

  }

  onclick() {

  }

  onkeydown(ev: KeyboardEvent) {
    // Pressing escape when the target element has focus should dismiss the tooltip
    if (this.o_open.get() && ev.key === 'Escape') {
      ev.stopPropagation();
      this.hide();
    }
  }

  onmouseenter() {
    this.delayedshow()
  }

  onmouseleave() {
    this.delayedhide()
  }

  setup(node: Element) {
    this.node = node

    if (this.trigger.includes("hover")) {
      node.addEventListener("mouseenter", this.onmouseenter)
      node.addEventListener("mouseleave", this.onmouseleave)
    }
    if (this.trigger.includes("focus")) {
      node.addEventListener("focus", this.onfocus, true)
      node.addEventListener("blur", this.onblur, true)
    }
    node.addEventListener("keydown", this.onkeydown as any)
  }

  teardown() {
    if (this.node) {
      this.node.removeEventListener("mouseenter", this.onmouseenter)
      this.node.removeEventListener("mouseleave", this.onmouseleave)
      this.node.removeEventListener("focus", this.onfocus, true)
      this.node.removeEventListener("blur", this.onblur, true)
    }
    this.hide()
    this.node = null
  }

  $decorate(node: Element) {
    node_on_connected(node, () => this.setup(node))
    node_on_disconnected(node, () => this.teardown())
  }
}

export function $tooltip(ct: Content, options: TooltipOptions = {}) {
  const tm = new TooltipManager(ct, options)
  return tm.$decorate
}

const cls_tooltip = css`
sl-popup${".eltsl_tooltip"} {
  --arrow-size: var(--sl-tooltip-arrow-size);
  --arrow-color: var(--sl-tooltip-background-color);
}

sl-popup${".eltsl_tooltip"}::part(popup) {
  border-radius: var(--sl-tooltip-border-radius);
  background-color: var(--sl-tooltip-background-color);
  color: var(--sl-tooltip-color);
  padding: var(--sl-tooltip-padding);
  font-family: var(--sl-tooltip-font-family);
  font-weight: var(--sl-tooltip-font-weight);
  font-size: var(--sl-tooltip-font-size);
  line-height: var(--sl-tooltip-line-height);
  z-index: 1000;
}

sl-popup[placement^='top']::part(popup) {
  transform-origin: bottom;
}

sl-popup[placement^='bottom']::part(popup) {
  transform-origin: top;
}

sl-popup[placement^='left']::part(popup) {
  transform-origin: right;
}

sl-popup[placement^='right']::part(popup) {
  transform-origin: left;
}
`