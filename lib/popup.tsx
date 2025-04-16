/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/**
 * Some popup handling.
 */

import { node_append, node_do_disconnect, node_remove, css } from "elt"
import { animate, animate_hide, animate_show, stop_animations } from "./animation"
import { Future } from "./utils"
import type { SlElement } from "./components"

export type PopupResolution<T> =
  | { resolution: "value", value: T }
  | { resolution: "closed" }

const popups = new Set<Element>()
const popups_futures = new WeakMap<Element, Future<any | undefined>>()

async function _popup_resolve(p: Element) {
  popups.delete(p)
  popups_futures.get(p)?.resolve(sym_popup_closed)
  popups_futures.delete(p)
  const _p = p as SlElement
  node_do_disconnect(_p)
  if (_p.tagName === "SL-POPUP") {
    await stop_animations(_p.popup)
    await animate(_p.popup, animate_hide, { duration: 150 })
  }
  node_remove(p)
}

function _close_popups() {
  if (popups.size === 0) return
  for (let p of popups) {
    _popup_resolve(p)
  }
  if (popups.size === 0) {
    document.removeEventListener("click", _eval_popup_click)
  }
}

function _eval_popup_click(ev: MouseEvent) {
  if (popups.size === 0) return
  let found_contain = false
  for (let p of popups) {
    if (found_contain) {
      _popup_resolve(p)
      continue
    }
    if (p.contains(ev.target as Node)) {
      found_contain = true
      continue
    }
  }
  // If we get here, no popup contained the click, we close them all
  if (!found_contain) _close_popups()
}

export const sym_popup_closed = Symbol("popup closed")

export function popup<T>(
  anchor: Element,
  fn: (fut: Future<T | typeof sym_popup_closed>) => Node,
  parent: Element | null = null
) {

  const doc = anchor.ownerDocument
  const fut = new Future<T | typeof sym_popup_closed>()
  fut.then(val => {
    if (val !== sym_popup_closed) {
      _close_popups()
    }
  })

  const popup_root = fn(fut) as SlElement
  const popup = popup_root.querySelector("sl-popup") ?? popup_root

  if (popup.tagName !== "SL-POPUP") {
    throw new Error("popup() must explicitely return a popup element")
  }

  // Figure out if we were created from inside a popup, in which case
  // we do not close the previous pop-ups
  let creator_is_popup = false
  let iter = anchor as Element | null

  while (iter != null) {
    if (iter.tagName === "SL-POPUP") {
      creator_is_popup = true
      break
    }
    iter = iter.parentElement
  }

  if (!creator_is_popup) {
    _close_popups()
  }

  popup.classList.add(cls.eltsl_popup)
  popup.anchor = anchor
  popup.active = true
  popup.style.setProperty("--arrow-color", "var(--sl-color-neutral-300)")

  setTimeout(async () => {
    if (popups.size === 0) {
      doc.addEventListener("click", _eval_popup_click)
    }
    // node_append(anchor.parentElement!, popup_root, anchor.nextSibling)
    node_append(parent ?? doc.body, popup_root)

    // doc.body.appendChild(popup_root)
    popups.add(popup_root)
    popups_futures.set(popup_root, fut)
    await popup.updateComplete
    animate(popup.popup, animate_show, { duration: 150 })
  })

  return fut
}

popup.closed = sym_popup_closed
// const eltsl_popup = style("elt-popup")
// eltsl_popup.part("popup", {
//   zIndex: "var(--sl-z-index-dropdown)"
// })


const cls = css`
${".eltsl_popup"}::part(popup) {
  z-index: var(--sl-z-index-dropdown);
}

sl-popup[data-current-placement^='top'][data-current-placement^='top']::part(popup) {
  transform-origin: bottom;
}

sl-popup[data-current-placement^='bottom'][data-current-placement^='bottom']::part(popup) {
  transform-origin: top;
}

`