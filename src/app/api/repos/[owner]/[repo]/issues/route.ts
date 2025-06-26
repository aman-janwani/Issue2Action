import { auth } from "@clerk/nextjs/server";
import { App } from "octokit";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/serverClient";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { owner, repo } = await params;

  // 1. Get user's GitHub App installation ID
  const { data, error } = await supabaseAdmin
    .from("user_tokens")
    .select("installation_id")
    .eq("user_id", userId)
    .single();

  if (error || !data?.installation_id) {
    return NextResponse.json(
      { error: "Installation not found" },
      { status: 400 }
    );
  }

  const installationId = data.installation_id;

  // 2. Generate installation token
  const app = new App({
    appId: process.env.GITHUB_APP_ID!,
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
  });

  //   const { data: slug } = await app.octokit.rest.apps.getAuthenticated();
  const octokit = await app.getInstallationOctokit(installationId);

  // 3. Fetch issues from the selected repo
  try {
    const issuesRes = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "open",
    });

    if (!issuesRes || !issuesRes.data) {
      return NextResponse.json({ error: "No issues found" }, { status: 404 });
    }

    const simplifiedIssues = issuesRes.data.map((issue) => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      labels: issue.labels.map((l: any) =>
        typeof l === "string" ? l : l.name
      ),
      state: issue.state,
      assignee: issue.assignee ? issue.assignee.login : null,
      comments: issue.comments,
      body: issue.body,
      created_at: issue.created_at,
      url: issue.html_url,
    }));

    // console.log("Fetched issues:", simplifiedIssues);

    return NextResponse.json({ issues: simplifiedIssues });
  } catch (err) {
    console.error("Failed to fetch issues:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
