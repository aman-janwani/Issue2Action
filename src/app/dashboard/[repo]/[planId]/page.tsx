// app/dashboard/[repo]/[planId]/page.tsx

import { supabaseAdmin } from "@/lib/supabase/serverClient";
import { PlanLayout } from "@/components/plan-layout";
import { notFound } from "next/navigation";

interface PlanPageProps {
  params: {
    repo: string;
    planId: string;
  };
}

export default async function PlanPage({ params }: { params: Promise<PlanPageProps["params"]> }) {
  const { planId, repo } = await params;

  // Fetch plan
  const { data: plan, error: planError } = await supabaseAdmin
    .from("plans")
    .select("*")
    .eq("id", planId)
    .single();

  if (!plan || planError) {
    console.error("Failed to fetch plan:", planError);
    return notFound();
  }

  // Fetch tasks
  const { data: tasks, error: taskError } = await supabaseAdmin
    .from("tasks")
    .select("*")
    .eq("plan_id", planId);

  if (taskError) {
    console.error("Failed to fetch tasks:", taskError);
    return notFound();
  }

  return <PlanLayout repo={repo} plan={plan} tasks={tasks} />;
}
