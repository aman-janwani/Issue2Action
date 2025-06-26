"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface ActionButtonGroupProps {
  onCopy: () => void
}

export function ActionButtonGroup({ onCopy}: ActionButtonGroupProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="border-[#30363d] hover:text-[#e6edf3] bg-[#21262d] cursor-pointer hover:bg-[#212629] focus:scale-100 active:scale-90  transition-all duration-300"
      >
        <Copy className="w-3 h-3 mr-1" />
        Copy
      </Button>
    </div>
  )
}
