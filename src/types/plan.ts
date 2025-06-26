import { PRSuggestion } from "./pr-suggestion";

export interface Plan {
  id: string;
  plan_title: string;
  plan_description: string;
  pr_suggestions: PRSuggestion[];
  estimated_days: string;
  created_at: string;
  selected_issues: number[];
  repo_full_name: string;
  repo_id: string;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  eta: string;
  pr_related_to: string;
  description?: string;
}

export interface Activity {
  id: string;
  type: "task_moved" | "task_updated" | "task_completed" | "task_created";
  user: string;
  timestamp: string;
  description: string;
  taskId: string;
}
