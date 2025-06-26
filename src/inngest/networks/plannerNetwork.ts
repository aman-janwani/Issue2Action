// inngest/networks/plannerNetwork.ts
import {
  createNetwork,
  gemini,
} from "@inngest/agent-kit";
import { plannerAgent } from "../agents/plannerAgent";

export const plannerNetwork = createNetwork({
  name: "plannerNetwork",
  agents: [plannerAgent],
  defaultModel: gemini({ model: "gemini-1.5-flash" }), // Use valid Gemini model name
   router: ({  callCount }) => {
    // First call: use the planner agent
    if (callCount === 0) {
      return plannerAgent;
    }
    // Otherwise, we're done!
    return undefined;
  }, // Always route to this agent for now
});

