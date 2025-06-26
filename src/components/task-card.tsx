"use client"

import { Clock, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/plan"

interface TaskCardProps {
  task: Task
  onClick: () => void
  isDragging?: boolean
}

const priorityConfig = {
  low: { color: "#7d8590", icon: CheckCircle },
  medium: { color: "#d29922", icon: Clock },
  high: { color: "#f85149", icon: AlertCircle },
}

export function TaskCard({ task, onClick, isDragging = false }: TaskCardProps) {
  const priority = priorityConfig[task.priority as keyof typeof priorityConfig] || priorityConfig.low
  const PriorityIcon = priority.icon

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border cursor-pointer transition-all duration-200",
        "hover:border-[#1f6feb] hover:shadow-lg",
        isDragging ? "bg-[#21262d] border-[#1f6feb] shadow-xl" : "bg-[#0d1117] border-[#30363d]",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <PriorityIcon className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: priority.color }} />
          <h4 className="font-medium text-[#e6edf3] text-sm line-clamp-2 leading-tight">{task.title}</h4>
        </div>
        {/* {task.linkedIssue && (
          <div className="flex items-center space-x-1 text-xs text-[#58a6ff] bg-[#1f6feb1a] px-2 py-1 rounded-full flex-shrink-0 ml-2">
            <Hash className="w-3 h-3" />
            <span>{task.linkedIssue}</span>
          </div>
        )} */}
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-[#7d8590] mb-3 line-clamp-2 leading-relaxed">{task.description}</p>
      )}

      {/* Labels */}
      {/* {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.slice(0, 3).map((label) => (
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
          {task.labels.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full font-medium bg-[#21262d] text-[#7d8590]">
              +{task.labels.length - 3}
            </span>
          )}
        </div>
      )} */}


      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-[#7d8590]">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{task.eta}</span>
        </div>
      </div>
    </div>
  )
}
