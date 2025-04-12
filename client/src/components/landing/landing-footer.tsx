import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">NoteGenius</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            AI-powered note management and summarization for students and researchers.
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Product</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Company</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Careers
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Subscribe</h3>
          <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates and tips.</p>
          <div className="mt-2 flex gap-2">
            <Input placeholder="Email address" type="email" className="max-w-[220px]" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} NoteGenius. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
