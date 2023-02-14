
import { node_on_inserted, node_on_removed, Renderable, o, e } from "elt"
import { animate, animate_hide, animate_show, stop_animations } from "./animation"
import { SlPopup } from "./components/popup"

import "./tooltip.css"

export type Content = Renderable | (() => Renderable)
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
  }

  // Default options
  skidding = this.options.skidding ?? 0
  distance = this.options.distance ?? 8
  disabled = this.options.disabled ?? false
  placement = this.options.placement ?? "bottom"
  trigger = this.options.trigger ?? ["hover", "focus"]
  show_delay = this.options.show_delay ?? 200
  hide_delay = this.options.hide_delay ?? 200

  o_open = o(false)

  popup: SlPopup | null = null
  node: Element | null = null

  async show() {
    if (!this.node) return
    if (this.o_open.get()) return

    this.o_open.set(true)
    if (this.popup) {
      if (!this.popup.isConnected)
        this.node.ownerDocument.body.appendChild(this.popup)
    } else {
      this.popup = <sl-popup
        class="eltsl-tooltip"
        placement={this.placement}
        skidding={this.skidding}
        distance={this.distance}
        shift
        arrow
      >
        {typeof this.content === "function" ? this.content() : this.content}
      </sl-popup> as SlPopup

      this.popup.anchor = this.node
      this.node.ownerDocument.body.appendChild(this.popup)
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
    this.popup.remove()
  }

  delay_timeout: number | undefined
  delayedshow() {
    clearTimeout(this.delay_timeout)
    this.delay_timeout = setTimeout(() => { this.show() }, this.show_delay)
  }

  delayedhide() {
    clearTimeout(this.delay_timeout)
    this.delay_timeout = setTimeout(() => { this.hide() }, this.hide_delay)
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
    node_on_inserted(node, () => this.setup(node))
    node_on_removed(node, () => this.teardown())
  }
}

export function $tooltip(ct: Content, options: TooltipOptions = {}) {
  const tm = new TooltipManager(ct, options)
  return tm.$decorate
}
