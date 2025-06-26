"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
// import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
// import { CommandPalette } from "@/components/command-palette"

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])

  // Add state for command palette
  // const [showCommandPalette, setShowCommandPalette] = useState(false)

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <div className="flex h-screen">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          selectedRepo={selectedRepo}
          onSelectRepo={setSelectedRepo}
        />
        <MainContent
          selectedRepo={selectedRepo}
          selectedIssues={selectedIssues}
          onSelectIssues={setSelectedIssues}
          sidebarCollapsed={sidebarCollapsed}
        />
      </div>
    </div>
  )
}
