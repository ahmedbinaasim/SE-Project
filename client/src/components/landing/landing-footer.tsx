// import Link from "next/link"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

// export function LandingFooter() {
//   return (
//     <footer className="w-full border-t bg-background py-12">
//       <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//         <div className="flex flex-col gap-2">
//           <Link href="/" className="flex items-center gap-2">
//             <span className="text-xl font-bold">NoteGenius</span>
//           </Link>
//           <p className="text-sm text-muted-foreground">
//             AI-powered note management and summarization for students and researchers.
//           </p>
//           <div className="mt-4 flex gap-4">
//             <Link href="#" className="text-muted-foreground hover:text-foreground">
//               <Facebook className="h-5 w-5" />
//               <span className="sr-only">Facebook</span>
//             </Link>
//             <Link href="#" className="text-muted-foreground hover:text-foreground">
//               <Twitter className="h-5 w-5" />
//               <span className="sr-only">Twitter</span>
//             </Link>
//             <Link href="#" className="text-muted-foreground hover:text-foreground">
//               <Instagram className="h-5 w-5" />
//               <span className="sr-only">Instagram</span>
//             </Link>
//             <Link href="#" className="text-muted-foreground hover:text-foreground">
//               <Linkedin className="h-5 w-5" />
//               <span className="sr-only">LinkedIn</span>
//             </Link>
//             <Link href="#" className="text-muted-foreground hover:text-foreground">
//               <Github className="h-5 w-5" />
//               <span className="sr-only">GitHub</span>
//             </Link>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2">
//           <h3 className="text-lg font-semibold">Product</h3>
//           <nav className="flex flex-col gap-2">
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Features
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Pricing
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Testimonials
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               FAQ
//             </Link>
//           </nav>
//         </div>
//         <div className="flex flex-col gap-2">
//           <h3 className="text-lg font-semibold">Company</h3>
//           <nav className="flex flex-col gap-2">
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               About
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Blog
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Careers
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Contact
//             </Link>
//           </nav>
//         </div>
//         <div className="flex flex-col gap-2">
//           <h3 className="text-lg font-semibold">Subscribe</h3>
//           <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates and tips.</p>
//           <div className="mt-2 flex gap-2">
//             <Input placeholder="Email address" type="email" className="max-w-[220px]" />
//             <Button>Subscribe</Button>
//           </div>
//         </div>
//       </div>
//       <div className="container mt-8 border-t pt-8">
//         <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//           <p className="text-center text-sm text-muted-foreground md:text-left">
//             © {new Date().getFullYear()} NoteGenius. All rights reserved.
//           </p>
//           <nav className="flex gap-4">
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Privacy Policy
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Terms of Service
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Cookie Policy
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </footer>
//   )
// }
"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function LandingFooter() {
  // Function to handle smooth scrolling
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2 ml-2">
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
          <h3 className="text-lg font-semibold">Explore</h3>
          <nav className="flex flex-col gap-2">
            <Link
              href="/#features"
              onClick={(e) => handleScroll(e, "features")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              onClick={(e) => handleScroll(e, "pricing")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              onClick={(e) => handleScroll(e, "testimonials")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Testimonials
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Support</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Help Center
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Community
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Support
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Get the App</h3>
          <p className="text-sm text-muted-foreground">Access NoteGenius on the go with our mobile apps.</p>
          <div className="mt-2 flex flex-col gap-2">
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 1c-1.3 0-2.4 1-2.8 2.3-.4-1.3-1.5-2.3-2.8-2.3-1.7 0-3 1.3-3 3 0 2.3 2.2 4.1 5.6 6.9l.2.2.2-.2c3.4-2.8 5.6-4.6 5.6-6.9 0-1.7-1.3-3-3-3zM12 12.7l-.7-.6C7.6 9.2 5 7.1 5 4.5 5 2 7 0 9.5 0c1.7 0 3.2 1.1 3.7 2.7h.6c.5-1.6 2-2.7 3.7-2.7C20 0 22 2 22 4.5c0 2.6-2.6 4.7-6.3 7.7l-.7.5z" />
              </svg>
              Download on the App Store
            </Link>
            <Link
              href="https://play.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3v18l18-9-18-9zm2 2.8l13.4 6.2L5 18.2V5.8zm15.7 6.2l-2.2 1-1.5-.7V11l1.5-.7 2.2 1z" />
              </svg>
              Get it on Google Play
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NoteGenius. All rights reserved.
        </p>
      </div>
    </footer>
  )
}