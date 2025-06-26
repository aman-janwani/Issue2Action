import { supabaseAdmin } from "@/lib/supabase/serverClient";
import { inngest } from "../client";
import { plannerNetwork } from "../networks/plannerNetwork";
import { z } from "zod";

export const generatePlan = inngest.createFunction(
  { id: "generate-plan" },
  { event: "issue2action/plan.requested" },
  async ({ event }) => {
    try {
      // Validate input
      const schema = z.object({
        repo: z.string(),
        owner: z.string(),
        user_id: z.string(),
        issues: z.array(
          z.object({
            number: z.number(),
            title: z.string(),
            body: z.string(),
            labels: z.array(z.string()),
          })
        ),
      });
      const input = schema.parse(event.data);

      // Format issues for the prompt
      const issuesAsText = input.issues
        .map(
          (issue) => `Issue #${issue.number}: ${issue.title}
Description: ${issue.body || "No description provided."}
Labels: ${issue.labels.join(", ") || "None"}`
        )
        .join("\n\n");

      const plannerInput = `Here are the issues for the next sprint:

${issuesAsText}

Instructions:
1. Break these issues into actionable dev tasks.
2. Suggest PR titles and descriptions related to the tasks.
3. Estimate total time required in days.

Return your response in this strict JSON format:
{
  "title": "Sprint Title",
  "description": "Brief plan summary",
  "estimated_days": 5,
  "prs": [{ "title": "Fix login bug", "description": "Resolves Safari login click issue" }],
  "tasks": [{ "title": "Investigate Safari click event", "status": "todo", "pr_related_to": "Fix login bug" }]
}`;

      // Call planner agent with step (important!)
      const result = await plannerNetwork.run(plannerInput);

      const message = result?.state?.results?.[0]?.output?.[0];
      const content = message && 'content' in message ? message.content : "";

      // Clean out ```json and ``` from response
      const cleaned = typeof content === 'string' ? content
        .replace(/^\s*```json\s*/, "")
        .replace(/\s*```$/, "")
        .trim() : "";

      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (err) {
        throw new Error("Invalid JSON from agent output", { cause: err });
      }

      //   Save plan
      const { data: plan, error } = await supabaseAdmin
        .from("plans")
        .insert([
          {
            user_id: input.user_id,
            repo_full_name: input.repo,
            repo_id: 123, // Assuming repo is unique for plan_id
            selected_issues: input.issues.map((issue) => issue.number),
            plan_title: parsed.title,
            plan_description: parsed.description,
            estimated_days: parsed.estimated_days,
            pr_suggestions: parsed.prs,
          },
        ])
        .select()
        .single();

      if (!plan || error)
        throw new Error(error?.message || "Failed to save plan");

      // Save tasks
      //   if (parsed.tasks?.length > 0) {
      const task = await supabaseAdmin.from("tasks").insert(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parsed.tasks.map((task: any) => ({
          plan_id: plan.id,
          title: task.title,
          description: task.description || "",
          eta: task.time_estimated || "1 day",
          priority: task.priority || "Medium",
          pr_related_to: task.pr_related_to || "",
          status: task.status || "todo",
        }))
      );

      if (!task || task.error) {
        throw new Error(task.error?.message || "Failed to save tasks");
      }

      //   }

      return {
        status: "success and saved",
        plan_id: plan.id,
        // plan_id: parsed, // Assuming repo is unique for plan_id
      };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ Plan generation failed:", err);
      return {
        status: "error",
        message: err.message,
      };
    }
  }
);
