"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { Filter, X, User, Tag, AlertCircle, Clock, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  onFiltersChange: (filters: FilterState) => void
  className?: string
}

export interface FilterState {
  search: string
  status: string[]
  priority: string[]
  assignee: string[]
  labels: string[]
  dateRange: {
    from: string | null
    to: string | null
  }
}

const statusOptions = [
  { value: "todo", label: "To Do", icon: Clock, color: "#7d8590" },
  { value: "in-progress", label: "In Progress", icon: AlertCircle, color: "#d29922" },
  { value: "review", label: "Review", icon: CheckCircle, color: "#8b5cf6" },
  { value: "completed", label: "Completed", icon: CheckCircle, color: "#3fb950" },
]

const priorityOptions = [
  { value: "low", label: "Low", color: "#7d8590" },
  { value: "medium", label: "Medium", color: "#d29922" },
  { value: "high", label: "High", color: "#f85149" },
]

const assigneeOptions = [
  { value: "john-doe", label: "John Doe" },
  { value: "jane-smith", label: "Jane Smith" },
  { value: "unassigned", label: "Unassigned" },
]

const labelOptions = [
  { value: "setup", label: "Setup", color: "#1f6feb" },
  { value: "oauth", label: "OAuth", color: "#2ea043" },
  { value: "backend", label: "Backend", color: "#8b5cf6" },
  { value: "frontend", label: "Frontend", color: "#fb8500" },
  { value: "security", label: "Security", color: "#da3633" },
  { value: "ui", label: "UI", color: "#d29922" },
]

export function FilterPanel({ isOpen, onClose, onFiltersChange, className }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: [],
    priority: [],
    assignee: [],
    labels: [],
    dateRange: { from: null, to: null },
  })

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleArrayFilter = (key: "status" | "priority" | "assignee" | "labels", value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      search: "",
      status: [],
      priority: [],
      assignee: [],
      labels: [],
      dateRange: { from: null, to: null },
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const activeFilterCount =
    filters.status.length +
    filters.priority.length +
    filters.assignee.length +
    filters.labels.length +
    (filters.search ? 1 : 0) +
    (filters.dateRange.from || filters.dateRange.to ? 1 : 0)

  if (!isOpen) return null

  return (
    <div className={cn("bg-[#161b22] border-l border-[#30363d] w-80 h-full flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#30363d]">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#7d8590]" />
          <h3 className="font-semibold text-[#e6edf3]">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs bg-[#1f6feb] text-white rounded-full">{activeFilterCount}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-[#7d8590] hover:text-[#e6edf3] text-xs"
            >
              Clear all
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose} className="text-[#7d8590] hover:text-[#e6edf3]">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-[#e6edf3] mb-2">Search</label>
          <SearchInput
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(value) => updateFilter("search", value)}
            className="w-full"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-[#e6edf3] mb-2">Status</label>
          <div className="space-y-2">
            {statusOptions.map((option) => {
              const Icon = option.icon
              return (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(option.value)}
                    onChange={() => toggleArrayFilter("status", option.value)}
                    className="w-4 h-4 rounded border-[#30363d] bg-[#21262d] text-[#1f6feb] focus:ring-[#1f6feb] focus:ring-offset-0"
                  />
                  <Icon className="w-4 h-4" style={{ color: option.color }} />
                  <span className="text-sm text-[#e6edf3]">{option.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-[#e6edf3] mb-2">Priority</label>
          <div className="space-y-2">
            {priorityOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.priority.includes(option.value)}
                  onChange={() => toggleArrayFilter("priority", option.value)}
                  className="w-4 h-4 rounded border-[#30363d] bg-[#21262d] text-[#1f6feb] focus:ring-[#1f6feb] focus:ring-offset-0"
                />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }} />
                <span className="text-sm text-[#e6edf3]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-medium text-[#e6edf3] mb-2">Assignee</label>
          <div className="space-y-2">
            {assigneeOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.assignee.includes(option.value)}
                  onChange={() => toggleArrayFilter("assignee", option.value)}
                  className="w-4 h-4 rounded border-[#30363d] bg-[#21262d] text-[#1f6feb] focus:ring-[#1f6feb] focus:ring-offset-0"
                />
                <User className="w-4 h-4 text-[#7d8590]" />
                <span className="text-sm text-[#e6edf3]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Labels */}
        <div>
          <label className="block text-sm font-medium text-[#e6edf3] mb-2">Labels</label>
          <div className="space-y-2">
            {labelOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.labels.includes(option.value)}
                  onChange={() => toggleArrayFilter("labels", option.value)}
                  className="w-4 h-4 rounded border-[#30363d] bg-[#21262d] text-[#1f6feb] focus:ring-[#1f6feb] focus:ring-offset-0"
                />
                <Tag className="w-4 h-4" style={{ color: option.color }} />
                <span className="text-sm text-[#e6edf3]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-[#e6edf3] mb-2">Date Range</label>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-[#7d8590] mb-1">From</label>
              <input
                type="date"
                value={filters.dateRange.from || ""}
                onChange={(e) => updateFilter("dateRange", { ...filters.dateRange, from: e.target.value || null })}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#e6edf3] text-sm focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-[#7d8590] mb-1">To</label>
              <input
                type="date"
                value={filters.dateRange.to || ""}
                onChange={(e) => updateFilter("dateRange", { ...filters.dateRange, to: e.target.value || null })}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#e6edf3] text-sm focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
