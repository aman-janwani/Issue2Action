import { supabaseAdmin } from "@/lib/supabase/serverClient";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import jwt from "jsonwebtoken";

const appId = process.env.GITHUB_APP_ID!;
const privateKey = process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, "\n");

async function getInstallationAccessToken(installationId: string) {
  const now = Math.floor(Date.now() / 1000);
  const jwtToken = jwt.sign(
    { iat: now, exp: now + 600, iss: appId },
    privateKey,
    { algorithm: "RS256" }
  );

  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error("Error fetching access token from GitHub:", err);
      return NextResponse.json(
        { error: "Failed to fetch access token" },
        { status: 500 }
      );
    });
  const data = await res.json();
  return data.token;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's GitHub access token from Supabase
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

  const accessToken = await getInstallationAccessToken(data.installation_id);

  const octokit = new Octokit({
    auth: accessToken,
  });

  try {
    const githubRes = await octokit.rest.apps.listReposAccessibleToInstallation();
    const repos = githubRes.data;
    return NextResponse.json({ repos });
  } catch (err) {
    console.error("Error fetching repositories from GitHub:", err);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
