"use client"

import { Clock, Hash, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Plan } from "@/types/plan"
import { useRouter } from "next/navigation"


interface PlanCardProps {
  plan: Plan
  repo: string
}


export function PlanCard({ plan, repo }: PlanCardProps) {
  const router = useRouter();

  const handleViewPlan = () => {
    router.push(`/dashboard/${repo}/${plan.id}`);
  }

  return (
    <div className="p-4 rounded-md border border-[#30363d] bg-[#0d1117] hover:bg-[#161b22] hover:border-[#1f6feb] transition-all duration-150">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[#58a6ff]" />
          <h3 className="font-medium text-[#e6edf3] text-sm">{plan.plan_title}</h3>
        </div>
      </div>

      <p className="text-xs text-[#7d8590] mb-4 line-clamp-2">{plan.plan_description}</p>

      <div className="flex items-center justify-between text-xs text-[#7d8590] mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Hash className="w-3 h-3" />
            <span>{plan.selected_issues.join(", ")} issues</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{plan.estimated_days} d</span>
          </div>
        </div>
        <span>{new Date(plan.created_at).toLocaleDateString()}</span>
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleViewPlan} size="sm" className="flex-1 bg-[#238636] hover:bg-[#2ea043] text-white text-xs h-7">
          View Plan
        </Button>
      </div>
    </div>
  )
}
