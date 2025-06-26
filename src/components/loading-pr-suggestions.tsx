"use client"

import { LoadingSkeleton } from "@/components/loading-skeleton"

export function LoadingPRSuggestions() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
          <div className="flex items-start space-x-3">
            <LoadingSkeleton className="w-6 h-6 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-2">
                <LoadingSkeleton className="w-4 h-4" />
                <LoadingSkeleton className="h-4 w-48" />
                <LoadingSkeleton className="w-5 h-5 rounded-full" />
              </div>
              <LoadingSkeleton className="h-3 w-full" lines={2} />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LoadingSkeleton className="h-3 w-20" />
                  <LoadingSkeleton className="h-3 w-16" />
                </div>
                <LoadingSkeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
