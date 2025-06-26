"use client"

import { X, Clock, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types/plan"

interface TaskModalProps {
  task: Task
  onClose: () => void
  onUpdate: (task: Task) => void
}

export function TaskModal({ task, onClose }: TaskModalProps) {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#30363d]">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-[#e6edf3]">Task Details</h2>
            {/* {task.linkedIssue && (
              <div className="flex items-center space-x-1 text-sm text-[#58a6ff] bg-[#1f6feb1a] px-2 py-1 rounded-full">
                <Hash className="w-3 h-3" />
                <span>#{task.linkedIssue}</span>
              </div>
            )} */}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#e6edf3] mb-2">Title</label>
              <h3 className="text-lg font-medium text-[#e6edf3]">{task.title}</h3>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#e6edf3] mb-2">Description</label>

              <p className="text-[#7d8590]">{task.description}</p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-[#e6edf3] mb-2">Status</label>

                <span className="capitalize text-[#7d8590]">{task.status.replace("-", " ")}</span>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-[#e6edf3] mb-2">Priority</label>

                <span className="capitalize text-[#7d8590]">{task.priority}</span>
            </div>

            {/* Estimated Hours */}
            <div>
              <label className="block text-sm font-medium text-[#e6edf3] mb-2">Estimated Hours</label>
   
                <div className="flex items-center space-x-2 text-[#7d8590]">
                  <Clock className="w-4 h-4" />
                  <span>{task.eta}</span>
                </div>
            </div>
          </div>


          {/* GitHub Issue Link */}
          {task.pr_related_to && (
            <div>
              <label className="block text-sm font-medium text-[#e6edf3] mb-2">Linked PR</label>
              <div className="flex items-center space-x-2 text-[#7d8590]">
                <LinkIcon className="w-4 h-4" />
                <p>
                  {task.pr_related_to}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
