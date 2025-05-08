"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { ModeToggle } from "../../components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Menu, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { logoutUser } from "../../services/auth-service"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { DashboardSidebar } from "./dashboard-sidebar"
import { getCurrentUserProfile } from "../../services/user-service"

export function DashboardHeader() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({ name: "", email: "", avatar: "" })
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getCurrentUserProfile()
        setUser({
          name: userData.name || "",
          email: userData.email || "",
          avatar: userData.avatar || "/placeholder.svg"
        })
      } catch (error) {
        console.error("Error fetching user profile:", error)
      }
    }

    fetchUserProfile()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logoutUser()
      localStorage.removeItem("token") // Make sure token is removed
      router.push("/")
    } catch (error) {
      console.error("Logout failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user.name) return "U"
    return user.name.charAt(0).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold ml-6">NoteGenius</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Create</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/notes/new">New Note</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/ocr">OCR Scan</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/dashboard/notes/import">Import Notes</Link>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button> */}
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name || "User"} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name || "My Account"}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                {user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                {isLoading ? "Logging out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}