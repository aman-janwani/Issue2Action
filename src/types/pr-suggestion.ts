export interface PRSuggestion {
  title: string
  complexity: "low" | "medium" | "high"
  description: string
  relatedIssues: string
}
