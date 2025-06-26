"use client"

import { useEffect, useState } from "react"
import { IssueCard } from "@/components/issue-card"
import { PlanCard } from "@/components/plan-card"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { EmptyState } from "@/components/empty-state"
import { GitBranch, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { BulkOperations } from "@/components/bulk-operations"
import { useUser } from "@clerk/nextjs"

import { useRouter } from "next/navigation";
import { toast } from "sonner"; // optional
import { Plan } from "@/types/plan"

interface MainContentProps {
  selectedRepo: string | null
  selectedIssues: string[]
  onSelectIssues: (issues: string[]) => void
  sidebarCollapsed: boolean
}


export function MainContent({ selectedRepo, selectedIssues, onSelectIssues, sidebarCollapsed }: MainContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [issues, setIssues] = useState<any[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingPlans, setLoadingPlans] = useState(true)

  console.log("Selected Repo:", selectedRepo);
  

  const {user} = useUser();

  console.log(user); 

  useEffect(() => {
      if (!user) return;
      if (!selectedRepo) return;

      async function fetchIssues() {
        try {
          const res = await fetch(`/api/repos/${user?.username}/${selectedRepo}/issues`);
          if (!res.ok) throw new Error("Failed to fetch issues");
          const data = await res.json();
          console.log("Fetched issues:", data);
          setIssues(data.issues);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error("Error fetching repositories:", err);
          alert(err);
        } finally {
          setLoading(false);
        }
      }
      
      async function fetchPlans() {
        try {
          const res = await fetch(`/api/repos/plan/${user?.id}/${selectedRepo}/plans`);
          if (!res.ok) throw new Error("Failed to fetch plans");
          const data = await res.json();
          console.log("Fetched plans:", data);
          setPlans(data.plans);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error("Error fetching plans:", err);
          alert(err);
        }  finally {
          setLoadingPlans(false);
        }
      }

      fetchIssues()
      fetchPlans();

    }, [user, selectedRepo]);

  // Add state for filters and loading

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleIssueSelect = (issueId: string) => {
    if (selectedIssues.includes(issueId)) {
      onSelectIssues(selectedIssues.filter((id) => id !== issueId))
    } else {
      onSelectIssues([...selectedIssues, issueId])
    }
  }

  const handleSelectAll = () => {
    if (selectedIssues.length === filteredIssues.length) {
      onSelectIssues([])
    } else {
      onSelectIssues(filteredIssues.map((issue) => issue.id))
    }
  }

  // Add bulk operations handler
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setButtonLoading(true);
      toast.info("Generating plan...");
      const res = await fetch("/api/trigger-plan", {
        method: "POST",
        body: JSON.stringify({ repo: selectedRepo, owner: user?.username, user_id: user?.id, issues: filteredIssues.filter(issue => selectedIssues.includes(issue.id)) }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Plan generated!");
      router.push(`/dashboard/${selectedRepo}/${data.plan_id}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Plan generation failed");
    } finally {
      setButtonLoading(false);
    }
  };

  if (!selectedRepo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0d1117]">
        <EmptyState
          icon={GitBranch}
          title="Select a repository"
          description="Choose a repository from the sidebar to view issues and generate plans"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex-1 flex flex-col bg-[#0d1117] transition-all duration-200 max-h-screen overflow-y-scroll",
        sidebarCollapsed ? "ml-0" : "ml-0",
      )}
    >
      {/* Header */}
      <div className="border-b border-[#30363d] bg-[#161b22] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#e6edf3]">Project Dashboard</h1>
            <p className="text-[#7d8590] mt-1">Manage issues and generate development plans</p>
          </div>
          <Button onClick={handleGenerate} className="bg-[#238636] hover:bg-[#2ea043] text-white" disabled={selectedIssues.length  === 0 || buttonLoading}>
            <Zap className="w-4 h-4 mr-2" />
            {buttonLoading ? "Generating..." : "Generate Plan"} ({selectedIssues.length})
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <SearchInput
            placeholder="Search issues..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="flex-1 max-w-[39rem]"
          />
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={`border-[#30363d] hover:bg-[#21262d] ${showFilters ? "bg-[#21262d] text-[#58a6ff]" : "text-[#e6edf3]"}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button> */}
          {/* <Button variant="outline" size="sm" className="border-[#30363d] hover:text-[#e6edf3] bg-[#21262d]">
            <SortDesc className="w-4 h-4 mr-2" />
            Sort
          </Button> */}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Issues Section */}
        <div className="flex-1 p-6">
          <BulkOperations
            selectedCount={selectedIssues.length}
            onClearSelection={() => onSelectIssues([])}
          />
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#e6edf3]">Issues ({filteredIssues.length})</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="border-[#30363d] hover:text-[#e6edf3] bg-[#21262d] cursor-pointer hover:bg-[#21262d] "
            >
              {selectedIssues.length === filteredIssues.length ? "Deselect All" : "Select All"}
            </Button>
          </div>

          {filteredIssues.length > 0 ? (
            <div className="space-y-3">
              {filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  isSelected={selectedIssues.includes(issue.id)}
                  onSelect={() => handleIssueSelect(issue.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={GitBranch}
              title={loading ? "Loading issues..." : "No issues found"}
              description={loading ? "Fetching issues..." : "Try adjusting your search terms or create a new issue"}
            />
          )}
        </div>

        {/* Plans Section */}
        <div className="w-96 border-l border-[#30363d] bg-[#161b22] p-6">
          <h2 className="text-lg font-semibold text-[#e6edf3] mb-6">Generated Plans ({plans.length})</h2>

          {plans.length > 0 ? (
            <div className="space-y-4">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} repo={selectedRepo} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Zap}
              title={loadingPlans ? "Loading plans..." : "No plans generated"}
              description={loadingPlans ? "Fetching plans..." : "Generate a plan by selecting issues and clicking 'Generate Plan'"}
              size="sm"
            />
          )}
        </div>
      </div>
    </div>
  )
}
