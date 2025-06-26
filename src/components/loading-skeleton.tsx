"use client"

import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: "text" | "card" | "avatar" | "button" | "table"
  lines?: number
}

export function LoadingSkeleton({ className, variant = "text", lines = 1 }: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-[#21262d] rounded"

  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={cn(baseClasses, "h-4", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full")} />
        ))}
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className={cn("p-4 border border-[#30363d] rounded-lg bg-[#161b22]", className)}>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className={cn(baseClasses, "w-4 h-4")} />
            <div className={cn(baseClasses, "h-4 flex-1")} />
          </div>
          <div className={cn(baseClasses, "h-3 w-full")} />
          <div className={cn(baseClasses, "h-3 w-2/3")} />
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <div className={cn(baseClasses, "h-5 w-12 rounded-full")} />
              <div className={cn(baseClasses, "h-5 w-16 rounded-full")} />
            </div>
            <div className={cn(baseClasses, "h-3 w-20")} />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "avatar") {
    return <div className={cn(baseClasses, "w-8 h-8 rounded-full", className)} />
  }

  if (variant === "button") {
    return <div className={cn(baseClasses, "h-9 w-20", className)} />
  }

  if (variant === "table") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines || 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className={cn(baseClasses, "w-4 h-4")} />
            <div className={cn(baseClasses, "h-4 flex-1")} />
            <div className={cn(baseClasses, "h-4 w-20")} />
            <div className={cn(baseClasses, "h-4 w-16")} />
          </div>
        ))}
      </div>
    )
  }

  return <div className={cn(baseClasses, "h-4 w-full", className)} />
}

export function TaskCardSkeleton() {
  return <LoadingSkeleton variant="card" />
}

export function RepositoryCardSkeleton() {
  return (
    <div className="p-3 border border-[#30363d] rounded-md bg-[#161b22]">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LoadingSkeleton className="w-3 h-3" />
            <LoadingSkeleton className="h-4 w-32" />
          </div>
          <LoadingSkeleton className="h-3 w-8" />
        </div>
        <LoadingSkeleton className="h-3 w-full" lines={2} />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LoadingSkeleton className="w-2 h-2 rounded-full" />
            <LoadingSkeleton className="h-3 w-16" />
          </div>
          <LoadingSkeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  )
}
