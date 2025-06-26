"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  debounceMs?: number
}

export function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  className,
  debounceMs = 300,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [localValue, onChange, debounceMs])

  const handleClear = () => {
    setLocalValue("")
    onChange("")
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7d8590]" />
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className={cn(
          "w-full pl-10 pr-10 py-2 text-sm",
          "bg-[#0d1117] border border-[#30363d] rounded-md",
          "text-[#e6edf3] placeholder-[#7d8590]",
          "focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent",
          "hover:border-[#7d8590] transition-colors",
        )}
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7d8590] hover:text-[#e6edf3] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
