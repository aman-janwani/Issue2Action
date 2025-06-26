"use client"

import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types/plan"

interface ColumnHeaderProps {
  title: string
  count: number
  status: Task["status"]
}

const statusColors = {
  todo: "#7d8590",
  "in-progress": "#d29922",
  review: "#8b5cf6",
  completed: "#3fb950",
}

export function ColumnHeader({ title, count, status }: ColumnHeaderProps) {
  const color = statusColors[status as keyof typeof statusColors]

  return (
    <div className="flex items-center justify-between p-3 mb-3">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <h3 className="font-semibold text-[#e6edf3] text-sm">{title}</h3>
        <span
          className="px-2 py-1 text-xs font-medium rounded-full"
          style={{
            backgroundColor: `${color}1a`,
            color: color,
          }}
        >
          {count}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d]"
        >
          <Plus className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d]"
        >
          <MoreHorizontal className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
