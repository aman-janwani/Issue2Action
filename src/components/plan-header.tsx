"use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { ProgressIndicator } from "@/components/progress-indicator"
import { Zap, Clock } from "lucide-react"
import type { Plan } from "@/types/plan"

interface PlanHeaderProps {
  plan: Plan
}

// const priorityConfig = {
//   low: { color: "#7d8590", bg: "#21262d", icon: CheckCircle },
//   medium: { color: "#d29922", bg: "#d299221a", icon: Clock },
//   high: { color: "#f85149", bg: "#da36331a", icon: AlertCircle },
// }

// const statusConfig = {
//   "not-started": { color: "#7d8590", bg: "#21262d", label: "Not Started" },
//   "in-progress": { color: "#d29922", bg: "#d299221a", label: "In Progress" },
//   completed: { color: "#3fb950", bg: "#2ea0431a", label: "Completed" },
//   archived: { color: "#7d8590", bg: "#21262d", label: "Archived" },
// }

export function PlanHeader({ plan }: PlanHeaderProps) {
  // const [isEditing, setIsEditing] = useState(false)
  // const priority = priorityConfig[plan.priority]
  // const status = statusConfig[plan.status]
  // const PriorityIcon = priority.icon

  // const completionPercentage = Math.round((plan.completedHours / plan.estimatedHours) * 100)

  return (
    <div className="space-y-4">
      {/* Title and Actions */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-5 h-5 text-[#58a6ff] flex-shrink-0" />
            <h1 className="text-2xl font-bold text-[#e6edf3] truncate">{plan.plan_title}</h1>
            {/* <div
              className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
              style={{ backgroundColor: priority.bg, color: priority.color }}
            >
              // {/* <PriorityIcon className="w-3 h-3" /> 
              <span className="capitalize">{plan.priority}</span>
            </div> */}
            {/* <div
              className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
              style={{ backgroundColor: status.bg, color: status.color }}
            >
              {status.label}
            </div> */}
          </div>
          <p className="text-[#7d8590] text-sm max-w-2xl">{plan.plan_description}</p>
        </div>

        {/* <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleActivity}
            className={`border-[#30363d] hover:bg-[#21262d] ${
              showActivityFeed ? "bg-[#21262d] text-[#58a6ff]" : "text-[#e6edf3]"
            }`}
          >
            <Activity className="w-4 h-4 mr-2" />
            Activity
          </Button>
          <Button variant="outline" size="sm" className="border-[#30363d] text-[#e6edf3] hover:bg-[#21262d]">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="border-[#30363d] text-[#e6edf3] hover:bg-[#21262d]">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div> */}
      </div>

      {/* Metadata and Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm text-[#7d8590]">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>
              {plan.estimated_days}  days estimated
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Issues: {plan.selected_issues.map((issue) => `#${issue}`).join(", ")}</span>
          </div>
          <div>
            <span>Created: {new Date(plan.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* <div className="flex items-center space-x-4">
          <ProgressIndicator completed={plan.completedHours} total={plan.estimatedHours} size="sm" />
          <span className="text-sm font-medium text-[#e6edf3]">{completionPercentage}% complete</span>
        </div> */}
      </div>
    </div>
  )
}
