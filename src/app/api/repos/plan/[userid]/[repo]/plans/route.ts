import { supabaseAdmin } from "@/lib/supabase/serverClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ userid: string; repo: string }>;
  }
) {
  const { userid, repo } = await params;

  if (!userid || !repo) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    // Step 1: Get user ID from username (assuming you have a 'profiles' table)

    // Step 2: Fetch plans
    const { data: plans, error: planError } = await supabaseAdmin
      .from("plans")
      .select("*")
      .eq("user_id", userid)
      .eq("repo_full_name", repo)
      .order("created_at", { ascending: false });

    if (planError) {
      return NextResponse.json({ error: planError.message }, { status: 500 });
    }

    return NextResponse.json({ plans });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Failed to fetch plans:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
    