"use client"

import { useEffect } from "react"

interface KeyboardShortcutsProps {
  onCommandPalette: () => void
  onNewPlan?: () => void
  onSearch?: () => void
  onSettings?: () => void
  onHelp?: () => void
}

export function KeyboardShortcuts({
  onCommandPalette,
  onNewPlan,
  onSearch,
  onSettings,
  onHelp,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onCommandPalette()
        return
      }

      // New plan
      if ((e.metaKey || e.ctrlKey) && e.key === "n" && onNewPlan) {
        e.preventDefault()
        onNewPlan()
        return
      }

      // Search
      if ((e.metaKey || e.ctrlKey) && e.key === "f" && onSearch) {
        e.preventDefault()
        onSearch()
        return
      }

      // Settings
      if ((e.metaKey || e.ctrlKey) && e.key === "," && onSettings) {
        e.preventDefault()
        onSettings()
        return
      }

      // Help
      if ((e.metaKey || e.ctrlKey) && e.key === "/" && onHelp) {
        e.preventDefault()
        onHelp()
        return
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onCommandPalette, onNewPlan, onSearch, onSettings, onHelp])

  return null
}
