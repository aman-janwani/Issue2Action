"use client"

import { MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Issue {
  id: string
  number: number
  title: string
  description: string
  labels: string[]
  assignee: string | null
  createdAt: string
  comments: number
  state: "open" | "closed"
}

interface IssueCardProps {
  issue: Issue
  isSelected: boolean
  onSelect: () => void
}

const labelColors: Record<string, { bg: string; text: string }> = {
  enhancement: { bg: "#1f6feb1a", text: "#58a6ff" },
  bug: { bg: "#da36331a", text: "#f85149" },
  feature: { bg: "#2ea0431a", text: "#3fb950" },
  "high-priority": { bg: "#fb8500", text: "#ffffff" },
  "ui/ux": { bg: "#8b5cf61a", text: "#a5a5ff" },
}

export function IssueCard({ issue, isSelected, onSelect }: IssueCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-md border transition-all duration-150 cursor-pointer",
        "hover:bg-[#161b22] hover:border-[#30363d]",
        isSelected ? "bg-[#1f6feb1a] border-[#1f6feb] shadow-sm" : "bg-[#0d1117] border-[#30363d]",
      )}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
          className="mt-1 w-4 h-4 rounded border-[#30363d] bg-[#21262d] text-[#1f6feb] focus:ring-[#1f6feb] focus:ring-offset-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-[#e6edf3]">#{issue.number}</span>
            <h3 className="text-sm font-medium text-[#e6edf3] truncate">{issue.title}</h3>
          </div>

          <p className="text-sm text-[#7d8590] mb-3 line-clamp-2">{issue.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {issue.labels.map((label) => (
                <span
                  key={label}
                  className="px-2 py-1 text-xs rounded-full font-medium"
                  style={{
                    backgroundColor: labelColors[label]?.bg || "#21262d",
                    color: labelColors[label]?.text || "#7d8590",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#7d8590]">
              {issue.assignee && (
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{issue.assignee}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{issue.comments}</span>
              </div>
              <span>{issue.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
