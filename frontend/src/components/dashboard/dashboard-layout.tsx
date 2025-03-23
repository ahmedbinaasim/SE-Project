"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { User } from "@/lib/types"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

interface DashboardLayoutProps {
  children: React.ReactNode
  user: User
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobile && sidebarOpen && !target.closest('[data-sidebar="true"]')) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, sidebarOpen])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} isOpen={sidebarOpen} isMobile={isMobile} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 w-full">
        <Header user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}

