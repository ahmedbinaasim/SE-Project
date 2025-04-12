"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { ModeToggle } from "../../components/mode-toggle"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">NoteGenius</span>
          </Link>
          <nav className="hidden md:flex md:gap-6 md:text-sm md:font-medium">
            <Link href="/#features" className="transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="/#pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="/#testimonials" className="transition-colors hover:text-foreground/80">
              Testimonials
            </Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80">
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 pb-6 text-sm font-medium">
            <Link href="/#features" className="py-2 transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="/#pricing" className="py-2 transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="/#testimonials" className="py-2 transition-colors hover:text-foreground/80">
              Testimonials
            </Link>
            <Link href="/blog" className="py-2 transition-colors hover:text-foreground/80">
              Blog
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full justify-start">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
