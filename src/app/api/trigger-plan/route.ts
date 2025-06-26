// app/api/trigger-plan/route.ts
import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/serverClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const schema = z.object({
      repo: z.string(),
      owner: z.string(),
      user_id: z.string(),
      issues: z.array(z.object({
        number: z.number(),
        title: z.string(),
        body: z.string(),
        labels: z.array(z.string()),
      })),
    });

    const input = schema.parse(body);

    // Trigger Inngest function and wait for result
    await inngest.send({
      name: "issue2action/plan.requested",
      data: input,
    });

    // Poll for plan (simplified wait method — or use `waitForCompletion` in dev)
    const checkForPlan = async (retries = 10, delay = 1000): Promise<number> => {
      for (let i = 0; i < retries; i++) {
        const { data } = await supabaseAdmin
          .from("plans")
          .select("id")
          .eq("user_id", input.user_id)
          .eq("repo_full_name", input.repo)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (data?.id) return data.id;
        await new Promise((r) => setTimeout(r, delay));
      }
      throw new Error("Timeout waiting for plan");
    };

    const planId = await checkForPlan();

    return NextResponse.json({ status: "success", plan_id: planId });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("API Trigger Error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
