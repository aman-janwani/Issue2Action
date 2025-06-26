"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { TaskCard } from "@/components/task-card"
import { ColumnHeader } from "@/components/column-header"
import type { Task } from "@/types/plan"

interface KanbanBoardProps {
  tasks: Task[]
  onTaskMove: (taskId: string, newStatus: Task["status"]) => void
  onTaskClick: (task: Task) => void
}

const columns = [
  { id: "todo", title: "To Do", status: "todo" as const },
  { id: "in-progress", title: "In Progress", status: "in-progress" as const },
  { id: "review", title: "Review", status: "review" as const },
  { id: "completed", title: "Completed", status: "completed" as const },
]

export function KanbanBoard({ tasks, onTaskMove, onTaskClick }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (start: any) => {
    setDraggedTask(start.draggableId)
  }

  const handleDragEnd = (result: DropResult) => {
    setDraggedTask(null)

    if (!result.destination) return

    const taskId = result.draggableId
    const newStatus = result.destination.droppableId as Task["status"]

    onTaskMove(taskId, newStatus)
  }

  return (
    <div className="h-full p-6">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-6 h-full">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status)

            return (
              <div key={column.id} className="flex flex-col h-full">
                <ColumnHeader title={column.title} count={columnTasks.length} status={column.status} />

                <Droppable droppableId={column.status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-3 p-3 rounded-lg transition-colors ${
                        snapshot.isDraggingOver
                          ? "bg-[#1f6feb1a] border-2 border-dashed border-[#1f6feb]"
                          : "bg-[#161b22] border-2 border-transparent"
                      }`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`transition-transform ${
                                snapshot.isDragging ? "rotate-2 scale-105" : ""
                              } ${draggedTask === task.id ? "opacity-50" : ""}`}
                            >
                              <TaskCard
                                task={task}
                                onClick={() => onTaskClick(task)}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {columnTasks.length === 0 && !snapshot.isDraggingOver && (
                        <div className="flex items-center justify-center h-32 text-[#7d8590] text-sm border-2 border-dashed border-[#30363d] rounded-lg">
                          Drop tasks here
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}
