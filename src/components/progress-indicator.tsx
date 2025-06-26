"use client"

import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  completed: number
  total: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function ProgressIndicator({
  completed,
  total,
  size = "md",
  showLabel = false,
  className,
}: ProgressIndicatorProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  const sizeConfig = {
    sm: { height: "h-1.5", width: "w-16" },
    md: { height: "h-2", width: "w-24" },
    lg: { height: "h-3", width: "w-32" },
  }

  const config = sizeConfig[size]

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("bg-[#21262d] rounded-full", config.height, config.width)}>
        <div
          className={cn("bg-[#3fb950] rounded-full transition-all duration-300", config.height)}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabel && <span className="text-xs text-[#7d8590] font-medium">{percentage}%</span>}
    </div>
  )
}
