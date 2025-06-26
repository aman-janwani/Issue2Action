"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search, Plus, RecycleIcon as Repo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { RepositoryCard } from "@/components/repository-card"
import { EmptyState } from "@/components/empty-state"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  selectedRepo: string | null
  onSelectRepo: (repo: string | null) => void
}


export  function Sidebar({ collapsed, onToggleCollapse, selectedRepo, onSelectRepo }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

 useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/repos");
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data = await res.json();
        setRepositories(data.repos.repositories);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error fetching repositories:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [user]);

  // const [repositories] = useState(await data.json())

  
interface Repository {
  id: string
  name: string
  owner: string
  description: string
  language: string
  updated_at: string
}
  const filteredRepos: Repository[] = repositories.filter(
    (repo: Repository) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo?.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  

  return (
    <div
      className={cn(
        "flex flex-col bg-[#161b22] border-r border-[#30363d] transition-all duration-200 ease-in-out",
        collapsed ? "w-16" : "w-80",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#30363d]">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#f78166] to-[#fa7970] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{user?.username?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#e6edf3]">{user?.fullName}</h2>
              <p className="text-xs text-[#7d8590]">{user?.username}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d] p-2"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {!collapsed && (
        <>
          {/* Search */}
          <div className="p-4 border-b border-[#30363d]">
            <SearchInput
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-full"
            />
          </div>

          {/* Repository Actions */}
          {/* <div className="p-4 border-b border-[#30363d]">
            <Button className="w-full justify-start text-sm bg-[#238636] hover:bg-[#2ea043] text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Repository
            </Button>
          </div> */}

          {/* Repositories List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#e6edf3]">Repositories</h3>
                <span className="text-xs text-[#7d8590] bg-[#21262d] px-2 py-1 rounded-full">
                  {filteredRepos.length}
                </span>
              </div>

              {filteredRepos.length > 0 ? (
                <div className="space-y-2">
                  {filteredRepos.map((repo) => (
                    <RepositoryCard
                      key={repo.id}
                      repository={repo}
                      isSelected={selectedRepo === repo.name}
                      onSelect={() => onSelectRepo(repo.name === selectedRepo ? null : repo.name)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState icon={Repo} title={loading ? "Loading..." : "No repositories found"} description={loading ? "Fetching repositories..." : "Try adjusting your search terms"} />
              )}
            </div>
          </div>
        </>
      )}

      {collapsed && (
        <div className="flex flex-col items-center py-4 space-y-4">
          <Button variant="ghost" size="sm" className="text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d] p-2">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d] p-2">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d] p-2">
            <Repo className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
