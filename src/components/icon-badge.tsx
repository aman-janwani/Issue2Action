"use client"

import { Plus, Bug, RefreshCw, FileText, TestTube } from "lucide-react"

interface IconBadgeProps {
  type: keyof typeof typeIcons
  size?: "sm" | "md"
}

const typeIcons = {
  feat: Plus,
  fix: Bug,
  refactor: RefreshCw,
  docs: FileText,
  test: TestTube,
}

const typeColors = {
  feat: "#3fb950",
  fix: "#f85149",
  refactor: "#58a6ff",
  docs: "#d29922",
  test: "#8b5cf6",
}

export function IconBadge({ type, size = "sm" }: IconBadgeProps) {
  const Icon = typeIcons[type]
  const color = typeColors[type]
  const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4"

  return (
    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}1a` }}>
      <Icon className={sizeClass} style={{ color }} />
    </div>
  )
}
