"use client"

import { AlertTriangle, Trash2, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "destructive" | "warning" | "default"
  icon?: "delete" | "archive" | "warning" | "default"
  isLoading?: boolean
}

const iconMap = {
  delete: Trash2,
  archive: Archive,
  warning: AlertTriangle,
  default: AlertTriangle,
}

const variantConfig = {
  destructive: {
    iconColor: "#f85149",
    confirmButtonClass: "bg-[#da3633] hover:bg-[#b62324] text-white",
  },
  warning: {
    iconColor: "#d29922",
    confirmButtonClass: "bg-[#d29922] hover:bg-[#b08800] text-white",
  },
  default: {
    iconColor: "#58a6ff",
    confirmButtonClass: "bg-[#238636] hover:bg-[#2ea043] text-white",
  },
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  icon = "default",
  isLoading = false,
}: ConfirmDialogProps) {
  const IconComponent = iconMap[icon]
  const config = variantConfig[variant]

  const handleConfirm = () => {
    onConfirm()
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="sm">
        <ModalHeader>
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${config.iconColor}1a` }}
            >
              <IconComponent className="w-5 h-5" style={{ color: config.iconColor }} />
            </div>
            <div>
              <ModalTitle>{title}</ModalTitle>
              <ModalDescription className="mt-1">{description}</ModalDescription>
            </div>
          </div>
        </ModalHeader>

        <ModalFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="border-[#30363d] text-[#e6edf3] hover:bg-[#21262d]"
          >
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading} className={config.confirmButtonClass}>
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
