"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Command, Search, Hash, User, Folder, Zap, Settings, HelpCircle, ArrowRight } from "lucide-react"
import { Modal, ModalContent } from "@/components/ui/modal"
import { cn } from "@/lib/utils"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  action: () => void
  shortcut?: string
}

const mockCommands: CommandItem[] = [
  {
    id: "new-plan",
    title: "Create New Plan",
    description: "Generate a new development plan from selected issues",
    icon: Zap,
    category: "Actions",
    action: () => console.log("Create new plan"),
    shortcut: "⌘N",
  },
  {
    id: "search-tasks",
    title: "Search Tasks",
    description: "Find tasks across all plans",
    icon: Search,
    category: "Navigation",
    action: () => console.log("Search tasks"),
    shortcut: "⌘F",
  },
  {
    id: "goto-dashboard",
    title: "Go to Dashboard",
    description: "Navigate to the main dashboard",
    icon: Folder,
    category: "Navigation",
    action: () => console.log("Go to dashboard"),
    shortcut: "⌘D",
  },
  {
    id: "issue-42",
    title: "Issue #42: Implement user authentication",
    description: "OAuth integration with GitHub and Google providers",
    icon: Hash,
    category: "Issues",
    action: () => console.log("Open issue 42"),
  },
  {
    id: "issue-38",
    title: "Issue #38: Fix responsive layout",
    description: "Dashboard sidebar overlaps content on mobile",
    icon: Hash,
    category: "Issues",
    action: () => console.log("Open issue 38"),
  },
  {
    id: "user-john",
    title: "John Doe",
    description: "View profile and assigned tasks",
    icon: User,
    category: "People",
    action: () => console.log("View John's profile"),
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure application preferences",
    icon: Settings,
    category: "Settings",
    action: () => console.log("Open settings"),
    shortcut: "⌘,",
  },
  {
    id: "help",
    title: "Help & Documentation",
    description: "View keyboard shortcuts and guides",
    icon: HelpCircle,
    category: "Help",
    action: () => console.log("Open help"),
    shortcut: "⌘?",
  },
]

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = mockCommands.filter(
    (command) =>
      command.title.toLowerCase().includes(query.toLowerCase()) ||
      command.description?.toLowerCase().includes(query.toLowerCase()) ||
      command.category.toLowerCase().includes(query.toLowerCase()),
  )

  const groupedCommands = filteredCommands.reduce(
    (acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = []
      }
      acc[command.category].push(command)
      return acc
    },
    {} as Record<string, CommandItem[]>,
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        const selectedCommand = filteredCommands[selectedIndex]
        if (selectedCommand) {
          selectedCommand.action()
          onClose()
        }
      } else if (e.key === "Escape") {
        onClose()
      }
    },
    [isOpen, filteredCommands, selectedIndex, onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleCommandClick = (command: CommandItem) => {
    command.action()
    onClose()
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="lg" className="p-0 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-[#30363d] px-4">
          <Search className="w-4 h-4 text-[#7d8590] mr-3" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 py-4 bg-transparent text-[#e6edf3] placeholder-[#7d8590] outline-none"
            autoFocus
          />
          <div className="flex items-center space-x-1 text-xs text-[#7d8590]">
            <kbd className="px-2 py-1 bg-[#21262d] rounded border border-[#30363d]">⌘</kbd>
            <kbd className="px-2 py-1 bg-[#21262d] rounded border border-[#30363d]">K</kbd>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="p-8 text-center text-[#7d8590]">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No commands found</p>
              <p className="text-xs mt-1">Try searching for something else</p>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, commands]) => (
              <div key={category}>
                <div className="px-4 py-2 text-xs font-semibold text-[#7d8590] bg-[#0d1117] border-b border-[#30363d]">
                  {category}
                </div>
                {commands.map((command) => {
                  const globalIndex = filteredCommands.indexOf(command)
                  const isSelected = globalIndex === selectedIndex
                  const Icon = command.icon

                  return (
                    <button
                      key={command.id}
                      onClick={() => handleCommandClick(command)}
                      className={cn(
                        "w-full flex items-center px-4 py-3 text-left hover:bg-[#21262d] transition-colors",
                        isSelected && "bg-[#1f6feb1a] border-l-2 border-[#1f6feb]",
                      )}
                    >
                      <Icon className="w-4 h-4 text-[#7d8590] mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#e6edf3] truncate">{command.title}</div>
                        {command.description && (
                          <div className="text-xs text-[#7d8590] truncate mt-0.5">{command.description}</div>
                        )}
                      </div>
                      {command.shortcut && (
                        <div className="flex items-center space-x-1 text-xs text-[#7d8590] ml-3">
                          {command.shortcut.split("").map((key, i) => (
                            <kbd key={i} className="px-1.5 py-0.5 bg-[#21262d] rounded border border-[#30363d]">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                      {isSelected && <ArrowRight className="w-4 h-4 text-[#1f6feb] ml-2 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#30363d] px-4 py-2 bg-[#0d1117]">
          <div className="flex items-center justify-between text-xs text-[#7d8590]">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-[#21262d] rounded border border-[#30363d]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-[#21262d] rounded border border-[#30363d]">↓</kbd>
                <span>navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-[#21262d] rounded border border-[#30363d]">↵</kbd>
                <span>select</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-[#21262d] rounded border border-[#30363d]">esc</kbd>
                <span>close</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Command className="w-3 h-3" />
              <span>Command Palette</span>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
