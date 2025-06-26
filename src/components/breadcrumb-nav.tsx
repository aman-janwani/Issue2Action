"use client"

import Link from "next/link"
import { ChevronRight, Home, GitBranch } from "lucide-react"

interface BreadcrumbNavProps {
  repo: string
  planTitle: string
}

export function BreadcrumbNav({ repo, planTitle }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-[#7d8590] mb-4">
      <Link href="/dashboard" className="flex items-center hover:text-[#58a6ff] transition-colors">
        <Home className="w-4 h-4 mr-1" />
        Dashboard
      </Link>

      <ChevronRight className="w-4 h-4" />

      <Link href={`/dashboard/${repo}`} className="flex items-center hover:text-[#58a6ff] transition-colors">
        <GitBranch className="w-4 h-4 mr-1" />
        {repo}
      </Link>

      <ChevronRight className="w-4 h-4" />

      <span className="text-[#e6edf3] font-medium truncate max-w-xs">{planTitle}</span>
    </nav>
  )
}
