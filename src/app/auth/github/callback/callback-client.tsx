"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function GitHubCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const installationId = searchParams.get("installation_id");
    const userId = searchParams.get("state"); // Passed earlier as state

    if (!installationId || !userId) return;

    fetch("/api/github/oauth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ installationId, userId }),
    }).then(() => {
      router.push("/dashboard");
    });
  }, [searchParams, router]);

  return <p>Finalizing GitHub access…</p>;
}
