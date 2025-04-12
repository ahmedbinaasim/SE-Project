import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Organize Your Notes with AI-Powered Summaries
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                NoteGenius helps you organize, summarize, and collaborate on your notes with AI assistance. Extract text
                from images, generate summaries, and share with your team.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-2 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
                  <div className="h-6 w-24 rounded-md bg-primary/20"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-4 w-[80%] rounded-md bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-4 w-[90%] rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                  <div className="h-32 rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="flex justify-end">
                    <div className="h-8 w-24 rounded-md bg-primary/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
