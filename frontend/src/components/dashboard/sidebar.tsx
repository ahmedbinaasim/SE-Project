"use client"

import Link from "next/link"
import type { User } from "@/lib/types"
import { Home, FileText, FolderOpen, Share2, Settings, LogOut, X } from "lucide-react"

interface SidebarProps {
  user: User
  isOpen: boolean
  isMobile: boolean
  onClose: () => void
}

export default function Sidebar({ user, isOpen, isMobile, onClose }: SidebarProps) {
  const sidebarClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`
    : `w-64 min-h-screen sticky top-0 ${isOpen ? "" : "hidden lg:block"}`

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside className={`${sidebarClasses} bg-card border-r border-border/40 flex flex-col`} data-sidebar="true">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">StudyAI</span>
          </Link>
          {isMobile && (
            <button onClick={onClose} className="p-1 rounded-md hover:bg-primary/10" aria-label="Close sidebar">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="pt-4">
              <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                My Notes
              </div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/notes"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FileText size={20} />
                    <span>All Notes</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/notes/favorites"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FileText size={20} />
                    <span>Favorites</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="pt-4">
              <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Folders
              </div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/folders"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FolderOpen size={20} />
                    <span>All Folders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/folders/recent"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FolderOpen size={20} />
                    <span>Recent</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="pt-4">
              <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Shared
              </div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/shared"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Share2 size={20} />
                    <span>Shared with me</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/shared/by-me"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Share2 size={20} />
                    <span>Shared by me</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-border/40">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>

          <div className="flex items-center gap-3 mt-4 p-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20">
              <img
                src={user.avatar || "/placeholder.svg?height=40&width=40"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              className="p-1.5 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

