"use client"

import { useEffect } from "react"

/**
 * Mounts once and adds a dynamic ripple at the pointer position whenever the
 * user clicks (or taps) any button / interactive element. Pure DOM, no state,
 * so it never causes re-renders. Respects prefers-reduced-motion via CSS.
 */
export function ClickRipple() {
  useEffect(() => {
    const interactiveSelector =
      'button:not(:disabled), a, [role="button"], label[for], summary, input[type="checkbox"], input[type="radio"]'

    function spawn(x: number, y: number, size: number) {
      const ripple = document.createElement("span")
      ripple.className = "click-ripple"
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      document.body.appendChild(ripple)
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true })
      // Safety cleanup in case animationend doesn't fire
      window.setTimeout(() => ripple.remove(), 800)
    }

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Element | null
      if (!target) return
      const el = target.closest(interactiveSelector)
      if (!el) return
      // Size the ripple to comfortably cover the element
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.8
      // Use the actual pointer position for a natural origin
      spawn(e.clientX, e.clientY, Math.max(size, 48))
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  return null
}
