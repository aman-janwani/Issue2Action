"use client"

import { Clock, GitCommit, Edit3, CheckCircle, ArrowRight } from "lucide-react"
import type { Activity } from "@/types/plan"

interface ActivityFeedProps {
  activities: Activity[]
}

const activityIcons = {
  task_moved: ArrowRight,
  task_updated: Edit3,
  task_completed: CheckCircle,
  task_created: GitCommit,
}

const activityColors = {
  task_moved: "#d29922",
  task_updated: "#58a6ff",
  task_completed: "#3fb950",
  task_created: "#7d8590",
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#30363d]">
        <h3 className="font-semibold text-[#e6edf3] text-sm">Activity Feed</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const color = activityColors[activity.type]

            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${color}1a` }}
                >
                  <Icon className="w-3 h-3" style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-[#e6edf3]">{activity.user}</span>
                    <span className="text-xs text-[#7d8590]">{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-[#7d8590] leading-relaxed">{activity.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {activities.length === 0 && (
          <div className="flex items-center justify-center h-32 text-[#7d8590] text-sm">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
