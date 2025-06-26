import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions";
import { generatePlan } from "@/inngest/functions/generate-plan";
import { serve } from "inngest/next";

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    generatePlan
  ],
});