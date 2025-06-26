"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleSectionProps {
  isExpanded: boolean
  onToggle: () => void
  header: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function CollapsibleSection({ isExpanded, onToggle, header, children, className }: CollapsibleSectionProps) {
  return (
    <div className={cn("w-full", className)}>
      <button
        onClick={onToggle}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:ring-offset-2 focus:ring-offset-[#161b22] rounded-md"
      >
        {header}
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  )
}
