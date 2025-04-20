"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { useToast } from "../../hooks/use-toast"
import { createFolder } from "../../services/notes-service"

interface CreateFolderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateFolder({ open, onOpenChange }: CreateFolderProps) {
  const [folderName, setFolderName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      setError("Folder name cannot be empty")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await createFolder(folderName)
      toast({
        title: "Folder Created",
        description: `Folder "${folderName}" has been created successfully.`,
      })
      setFolderName("")
      onOpenChange(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Failed to create folder")
      toast({
        title: "Error",
        description: error.message || "Failed to create folder",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              disabled={isLoading}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleCreateFolder} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}