"use client"

import { Lightbulb } from "lucide-react"

export function EmptyPRState() {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 bg-[#d299221a] rounded-full flex items-center justify-center mx-auto mb-4">
        <Lightbulb className="w-6 h-6 text-[#d29922]" />
      </div>
      <h4 className="text-sm font-medium text-[#e6edf3] mb-2">No PR suggestions available</h4>
      <p className="text-xs text-[#7d8590] mb-4 max-w-sm mx-auto">
        AI suggestions will appear here based on your plan tasks and requirements.
      </p>
    </div>
  )
}
