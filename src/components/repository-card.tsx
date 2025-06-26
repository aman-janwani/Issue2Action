"use client"

import { cn } from "@/lib/utils"

interface Repository {
  id: string
  name: string
  owner: string
  description: string
  language: string
  updated_at: string
}

interface RepositoryCardProps {
  repository: Repository
  isSelected: boolean
  onSelect: () => void
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
}

export function RepositoryCard({ repository, isSelected, onSelect }: RepositoryCardProps) {
  
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left p-3 rounded-md border transition-all duration-150",
        "hover:bg-[#21262d] hover:border-[#30363d]",
        isSelected ? "bg-[#1f6feb1a] border-[#1f6feb] shadow-sm" : "bg-[#161b22] border-[#30363d]",
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 min-w-0 flex-1">

          <span className="font-medium text-[#e6edf3] truncate">{repository.name}</span>
        </div>
      </div>

      <p className="text-xs text-[#7d8590] mb-3 line-clamp-2">{repository.description}</p>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: languageColors[repository.language] || "#7d8590" }}
            />
            <span className="text-[#7d8590]">{repository.language}</span>
          </div>
        </div>
        <span className="text-[#7d8590]">Updated {new Date(repository.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
      </div>
    </button>
  )
}
