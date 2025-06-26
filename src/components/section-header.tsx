"use client"

import type React from "react"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export function SectionHeader({ icon: Icon, title, subtitle, actions, className }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#1f6feb1a] rounded-full flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#58a6ff]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#e6edf3]">{title}</h3>
          {subtitle && <p className="text-sm text-[#7d8590]">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center space-x-2">{actions}</div>}
    </div>
  )
}
