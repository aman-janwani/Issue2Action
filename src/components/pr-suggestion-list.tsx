"use client"

import { PRSuggestionCard } from "@/components/pr-suggestion-card"
import type { PRSuggestion } from "@/types/pr-suggestion"

interface PRSuggestionListProps {
  suggestions: PRSuggestion[]
}

export function PRSuggestionList({ suggestions }: PRSuggestionListProps) {
  return (
    <div className="space-y-3">
      {suggestions.map((suggestion, index) => (
        <PRSuggestionCard key={index} suggestion={suggestion} index={index + 1} />
      ))}
    </div>
  )
}
