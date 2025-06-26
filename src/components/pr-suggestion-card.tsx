"use client"

import { Hash, GitPullRequest } from "lucide-react"
import type { PRSuggestion } from "@/types/pr-suggestion"

interface PRSuggestionCardProps {
  suggestion: PRSuggestion
  index: number
}


export function PRSuggestionCard({ suggestion, index }: PRSuggestionCardProps) {
  // const typeStyle = typeConfig[suggestion.type]
  // const complexityStyle = complexityConfig[suggestion.estimatedComplexity]
  // const ComplexityIcon = complexityStyle.icon

  return (
    <div className="group p-4 bg-[#0d1117] border border-[#30363d] rounded-lg hover:border-[#1f6feb] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start space-x-3">
        {/* Index Number */}
        <div className="w-6 h-6 bg-[#21262d] rounded-full flex items-center justify-center text-xs font-medium text-[#e6edf3] flex-shrink-0 mt-0.5">
          {index}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-2">
            <GitPullRequest className="w-4 h-4 text-[#3fb950]" />
            <h4 className="font-medium text-[#e6edf3] text-sm">{suggestion.title}</h4>
            {/* <IconBadge type={suggestion.type} /> */}
          </div>

          {/* Description */}
          <p className="text-sm text-[#7d8590] mb-3 leading-relaxed">{suggestion.description}</p>

          {/* Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-[#7d8590]">
              {/* Complexity */}
              {/* <div className="flex items-center space-x-1">
                <ComplexityIcon className="w-3 h-3" style={{ color: complexityStyle.color }} />
                <span>{complexityStyle.label} complexity</span>
              </div> */}

              {/* Related Issues */}
              {suggestion.relatedIssues && (
                <div className="flex items-center space-x-1">
                  <Hash className="w-3 h-3" />
                  <span>{suggestion.relatedIssues}</span>
                </div>
              )}
            </div>

            {/* Type Badge */}
            {/* <div
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: typeStyle.bg,
                color: typeStyle.color,
              }}
            >
              {typeStyle.label}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
