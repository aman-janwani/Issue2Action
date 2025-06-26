"use client"

import { useState } from "react"
import { PlanHeader } from "@/components/plan-header"
import { SuggestedPRSection } from "@/components/suggested-pr-section"
import { KanbanBoard } from "@/components/kanban-board"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { TaskModal } from "@/components/task-modal"
import type { Plan, Task } from "@/types/plan"
import type { PRSuggestion } from "@/types/pr-suggestion"
import { Button } from "./ui/button"

interface PlanLayoutProps {
  repo: string;
  plan: {
      id: string;
  plan_title: string;
  plan_description: string;
  pr_suggestions: PRSuggestion[];
  estimated_days: string;
  created_at: string;
  selected_issues: number[];
  repo_full_name: string;
  repo_id: string;
  };
  tasks: {
    id: string;
    title: string;
    status: string;
    priority: string;
    eta: string;
    pr_related_to: string;
    description?: string;
  }[];
}

// Mock data - in real app this would come from API
// const mockPlan: Plan = {
//   id: "plan-1",
//   title: "Authentication System Implementation",
//   description: "Complete OAuth integration with security best practices and user management",
//   repository: "awesome-project",
//   owner: "github",
//   status: "in-progress",
//   priority: "high",
//   createdAt: "2024-01-15T10:00:00Z",
//   updatedAt: "2024-01-16T14:30:00Z",
//   estimatedHours: 24,
//   completedHours: 8,
//   assignees: ["john-doe", "jane-smith"],
//   labels: ["authentication", "security", "backend"],
//   linkedIssues: [42, 38, 35],
// }

// const mockTasks: Task[] = [
//   {
//     id: "task-1",
//     title: "Set up OAuth providers configuration",
//     description: "Configure GitHub and Google OAuth applications with proper redirect URIs",
//     status: "completed",
//     priority: "high",
//     assignee: "john-doe",
//     estimatedHours: 4,
//     actualHours: 3,
//     linkedIssue: 42,
//     labels: ["setup", "oauth"],
//     createdAt: "2024-01-15T10:00:00Z",
//     updatedAt: "2024-01-15T16:00:00Z",
//     comments: 3,
//   },
//   {
//     id: "task-2",
//     title: "Implement OAuth callback handlers",
//     description: "Create secure callback endpoints for OAuth flow completion",
//     status: "in-progress",
//     priority: "high",
//     assignee: "john-doe",
//     estimatedHours: 6,
//     actualHours: 2,
//     linkedIssue: 42,
//     labels: ["backend", "oauth"],
//     createdAt: "2024-01-15T11:00:00Z",
//     updatedAt: "2024-01-16T09:00:00Z",
//     comments: 5,
//   },
//   {
//     id: "task-3",
//     title: "Design user session management",
//     description: "Implement secure session handling with JWT tokens",
//     status: "todo",
//     priority: "medium",
//     assignee: "jane-smith",
//     estimatedHours: 8,
//     actualHours: 0,
//     linkedIssue: 38,
//     labels: ["security", "backend"],
//     createdAt: "2024-01-15T12:00:00Z",
//     updatedAt: "2024-01-15T12:00:00Z",
//     comments: 1,
//   },
//   {
//     id: "task-4",
//     title: "Create user profile UI components",
//     description: "Build responsive user profile and settings interface",
//     status: "todo",
//     priority: "medium",
//     assignee: "jane-smith",
//     estimatedHours: 6,
//     actualHours: 0,
//     linkedIssue: 35,
//     labels: ["frontend", "ui"],
//     createdAt: "2024-01-15T13:00:00Z",
//     updatedAt: "2024-01-15T13:00:00Z",
//     comments: 0,
//   },
//   {
//     id: "task-5",
//     title: "Write authentication middleware",
//     description: "Implement route protection and authentication checks",
//     status: "in-progress",
//     priority: "high",
//     assignee: "john-doe",
//     estimatedHours: 4,
//     actualHours: 3,
//     linkedIssue: 42,
//     labels: ["middleware", "security"],
//     createdAt: "2024-01-15T14:00:00Z",
//     updatedAt: "2024-01-16T11:00:00Z",
//     comments: 2,
//   },
//   {
//     id: "task-6",
//     title: "Add comprehensive error handling",
//     description: "Implement proper error handling for OAuth failures and edge cases",
//     status: "review",
//     priority: "medium",
//     assignee: "jane-smith",
//     estimatedHours: 2,
//     actualHours: 2,
//     linkedIssue: 38,
//     labels: ["error-handling", "testing"],
//     createdAt: "2024-01-15T15:00:00Z",
//     updatedAt: "2024-01-16T14:00:00Z",
//     comments: 4,
//   },
// ]

// const mockActivities: Activity[] = [
//   {
//     id: "activity-1",
//     type: "task_moved",
//     user: "john-doe",
//     timestamp: "2024-01-16T14:30:00Z",
//     description: "moved task 'Add comprehensive error handling' from In Progress to Review",
//     taskId: "task-6",
//   },
//   {
//     id: "activity-2",
//     type: "task_updated",
//     user: "jane-smith",
//     timestamp: "2024-01-16T13:15:00Z",
//     description: "updated estimated hours for 'Design user session management'",
//     taskId: "task-3",
//   },
//   {
//     id: "activity-3",
//     type: "task_completed",
//     user: "john-doe",
//     timestamp: "2024-01-15T16:00:00Z",
//     description: "completed task 'Set up OAuth providers configuration'",
//     taskId: "task-1",
//   },
// ]

// // Mock PR suggestions
// const mockPRSuggestions: PRSuggestion[] = [
//   {
//     id: "pr-1",
//     title: "feat: oauth-provider-setup",
//     description: "Includes OAuth callbacks, session tokens, and redirect handling for GitHub and Google providers.",
//     type: "feat",
//     estimatedComplexity: "medium",
//     relatedIssues: ["42"],
//   },
//   {
//     id: "pr-2",
//     title: "feat: user-session-management",
//     description: "Implements JWT-based session handling with secure token storage and refresh mechanisms.",
//     type: "feat",
//     estimatedComplexity: "high",
//     relatedIssues: ["38", "42"],
//   },
//   {
//     id: "pr-3",
//     title: "feat: user-profile-ui",
//     description: "Adds responsive user profile components with settings interface and avatar management.",
//     type: "feat",
//     estimatedComplexity: "medium",
//     relatedIssues: ["35"],
//   },
//   {
//     id: "pr-4",
//     title: "refactor: authentication-middleware",
//     description: "Consolidates route protection logic and improves authentication flow consistency.",
//     type: "refactor",
//     estimatedComplexity: "low",
//     relatedIssues: ["42"],
//   },
// ]

export function PlanLayout({ repo, plan, tasks }: PlanLayoutProps) {
  const [planState] = useState<Plan>(plan)
  const [tasksState, setTasksState] = useState<Task[]>(tasks)
  // const [activities] = useState<Activity[]>(mockActivities)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  // const [showActivityFeed, setShowActivityFeed] = useState(false)

  const handleTaskMove = (taskId: string, newStatus: Task["status"]) => {
    setTasksState((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } : task,
      ),
    )
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasksState((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setSelectedTask(null)
  }

  // const handleRegeneratePRSuggestions = async () => {
  //   setIsLoadingPRSuggestions(true)
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000))

  //   // Generate new suggestions (in real app, this would be an AI API call)
  //   const newSuggestions: PRSuggestion[] = [
  //     {
  //       id: "pr-5",
  //       title: "feat: enhanced-oauth-security",
  //       description: "Adds PKCE flow support and improved security measures for OAuth authentication.",
  //       type: "feat",
  //       estimatedComplexity: "high",
  //       relatedIssues: ["42"],
  //     },
  //     {
  //       id: "pr-6",
  //       title: "fix: session-token-refresh",
  //       description: "Fixes automatic token refresh logic and handles edge cases for expired sessions.",
  //       type: "fix",
  //       estimatedComplexity: "medium",
  //       relatedIssues: ["38"],
  //     },
  //     {
  //       id: "pr-7",
  //       title: "test: authentication-test-suite",
  //       description: "Comprehensive test coverage for authentication flows and edge cases.",
  //       type: "test",
  //       estimatedComplexity: "medium",
  //       relatedIssues: ["42", "38"],
  //     },
  //   ]

  //   setPRSuggestions(newSuggestions)
  //   setIsLoadingPRSuggestions(false)
  // }

  const handleCopyPRSuggestions = (markdown: string) => {
    // This would typically log to analytics or trigger other side effects
    console.log("PR suggestions copied:", markdown)
  }

 function exportTasksToCSV(tasks: Task[]) {
  const headers = [
    "Title",
    "Description",
    "Status",
    "Priority",
    "ETA",
    "PR Related To",
  ];

  const rows = tasks.map((task) => [
    task.title,
    task.description || "",
    task.status,
    task.priority,
    task.eta,
    task.pr_related_to || "",
  ]);

  const csvContent =
    [headers.join(","), ...rows.map((r) => r.map(cell => `"${cell}"`).join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `plan-tasks-${new Date().toISOString()}.csv`;
  a.click();

  URL.revokeObjectURL(url);
}


  return (
    <div className="bg-[#0d1117] text-[#e6edf3]">
      <div className="border-b border-[#30363d] bg-[#161b22] px-6 py-4">
        <BreadcrumbNav repo={repo} planTitle={planState.plan_title} />
        <PlanHeader
          plan={planState}
        />
      </div>

      {/* PR Suggestions Section */}
      <div className="px-6 py-4">
        <SuggestedPRSection
          planId={planState.id}
          suggestions={planState.pr_suggestions}
          onCopy={handleCopyPRSuggestions}
        />
      </div>


    <div className="my-5 px-10 flex items-center justify-end">
            <Button className="border-[#30363d] hover:text-[#e6edf3] bg-[#21262d] cursor-pointer hover:bg-[#212629] focus:scale-100 active:scale-90  transition-all duration-300" onClick={() => exportTasksToCSV(tasksState)}>Export as CSV</Button>

    </div>

      <div className="flex ">
        <div className={`flex-1 transition-all duration-300 `}>
          <KanbanBoard tasks={tasksState} onTaskMove={handleTaskMove} onTaskClick={setSelectedTask} />
        </div>
      </div>

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={handleTaskUpdate} />
      )}
    </div>
  )
}
