import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { installationId, userId } = await req.json();

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase.from("user_tokens").upsert({
    user_id: userId,
    provider: "github_app",
    installation_id: installationId,
  });

  return NextResponse.json({ success: true });
}
