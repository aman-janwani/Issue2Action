"use client"

import { Button } from "@/components/ui/button"
interface BulkOperationsProps {
  selectedCount: number
  onClearSelection: () => void
}

export function BulkOperations({ selectedCount, onClearSelection }: BulkOperationsProps) {

  if (selectedCount === 0) return null

  return (
    <>
      <div className="flex items-center space-x-3 my-5 p-3 bg-[#1f6feb1a] border border-[#1f6feb] rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-[#e6edf3]">
          <span className="font-medium">{selectedCount}</span>
          <span>task{selectedCount === 1 ? "" : "s"} selected</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            className="border-[#30363d] hover:text-[#e6edf3] bg-[#21262d] cursor-pointer hover:bg-[#21262d]]"
          >
            Clear selection
          </Button>
        </div>
      </div>

    </>
  )
}
