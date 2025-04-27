"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { FileText, Home, ImageIcon, Settings, Share2, Star, Users } from "lucide-react"
import { Button } from "../ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function DashboardSidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const items = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/notes",
      title: "My Notes",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/favorites",
      title: "Favorites",
      icon: <Star className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/shared",
      title: "Shared",
      icon: <Share2 className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/ocr",
      title: "OCR",
      icon: <ImageIcon className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/collaborators",
      title: "Collaborators",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      title: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1 py-4 ", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-transparent hover:text-foreground",
          )}
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
