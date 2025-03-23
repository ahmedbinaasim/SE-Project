"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import type { User } from "@/lib/types"
import { Menu, Search, Bell, UserIcon, Settings, LogOut, ChevronDown } from "lucide-react"

interface HeaderProps {
  user: User
  onMenuClick: () => void
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }

      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:bg-primary/10 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <div className="relative hidden md:block w-72">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder="Search notes, tags, subjects..."
              className="w-full py-2 pl-10 pr-4 text-sm bg-background/50 border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="md:hidden p-2 rounded-md hover:bg-primary/10" aria-label="Search">
            <Search size={20} />
          </button>

          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-md hover:bg-primary/10"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-border/40 rounded-md shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-border/40">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-border/40 hover:bg-primary/5">
                    <p className="text-sm font-medium">New note shared with you</p>
                    <p className="text-xs text-muted-foreground mt-1">Sarah shared &quot;Physics Formulas&quot; with you</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                  <div className="p-4 border-b border-border/40 hover:bg-primary/5">
                    <p className="text-sm font-medium">AI Summary completed</p>
                    <p className="text-xs text-muted-foreground mt-1">Your summary for &quot;Biology Notes&quot; is ready</p>
                    <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                  </div>
                  <div className="p-4 hover:bg-primary/5">
                    <p className="text-sm font-medium">Reminder: Exam preparation</p>
                    <p className="text-xs text-muted-foreground mt-1">Don&apos;t forget to review your Math notes</p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>
                <div className="p-2 border-t border-border/40 text-center">
                  <Link href="/dashboard/notifications" className="text-xs text-primary hover:underline">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-primary/10"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/20">
                <img
                  src={user.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden md:block text-sm font-medium">{user.name}</span>
              <ChevronDown size={16} className="hidden md:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border/40 rounded-md shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-border/40">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10"
                  >
                    <UserIcon size={16} />
                    <span>Your Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                </div>
                <div className="py-1 border-t border-border/40">
                  <Link href="/logout" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10">
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

