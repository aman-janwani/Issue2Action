import { Suspense } from "react";
import { GitHubCallbackHandler } from "./callback-client";

export default function GitHubCallbackPage() {
  return (
    <Suspense fallback={<p>Finalizing GitHub access…</p>}>
      <GitHubCallbackHandler />
    </Suspense>
  );
}
