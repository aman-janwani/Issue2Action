"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function EmptyState({ icon: Icon, title, description, size = "md", className }: EmptyStateProps) {
  const sizeConfig = {
    sm: {
      container: "py-8",
      icon: "w-8 h-8",
      title: "text-sm",
      description: "text-xs",
    },
    md: {
      container: "py-12",
      icon: "w-12 h-12",
      title: "text-base",
      description: "text-sm",
    },
    lg: {
      container: "py-16",
      icon: "w-16 h-16",
      title: "text-lg",
      description: "text-base",
    },
  }

  const config = sizeConfig[size]

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", config.container, className)}>
      <Icon className={cn(config.icon, "text-[#7d8590] mb-4")} />
      <h3 className={cn("font-medium text-[#e6edf3] mb-2", config.title)}>{title}</h3>
      <p className={cn("text-[#7d8590] max-w-sm", config.description)}>{description}</p>
    </div>
  )
}
