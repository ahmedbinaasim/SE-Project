import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Brain, FileText, Sparkles, Zap } from "lucide-react"
import FeatureCard from "@/components/home/feature-card"
import TestimonialCard from "@/components/home/testimonial-card"
import PricingCard from "@/components/home/pricing-card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">StudyAI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="glow">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                  data-text="Transform Your Study Notes with AI"
                >
                  <span className="">Transform Your Study Notes with AI</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Summarize, organize, and learn more effectively with our AI-powered study notes tool.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/signup">
                  <Button size="lg" className="pulse-glow">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="neon-border">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-24 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm border border-primary/20">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">
                  Everything You Need to Study Smarter
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our AI-powered tools help you understand and retain information more effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Smart Summaries"
                description="Convert lengthy notes into concise, easy-to-understand summaries."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="AI Insights"
                description="Get intelligent insights and connections between different topics."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Study Guides"
                description="Generate personalized study guides based on your learning style."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Quick Flashcards"
                description="Auto-generate flashcards from your notes for effective memorization."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="Concept Maps"
                description="Visualize connections between concepts with AI-generated maps."
              />
              <FeatureCard
                icon={<ArrowRight className="h-10 w-10 text-primary" />}
                title="Exam Prep"
                description="Get targeted practice questions based on your study materials."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 md:py-24 bg-secondary/50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm border border-primary/20">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">What Our Users Say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of students who have transformed their study habits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="float" style={{ animationDelay: "0s" }}>
                <TestimonialCard
                  quote="StudyAI helped me ace my finals. The summaries are spot-on and saved me hours of study time."
                  author="Alex Johnson"
                  role="Computer Science Student"
                  avatarUrl="/placeholder.svg?height=40&width=40"
                />
              </div>
              <div className="float" style={{ animationDelay: "0.2s" }}>
                <TestimonialCard
                  quote="I love how it connects concepts from different subjects. It's like having a personal tutor."
                  author="Sarah Chen"
                  role="Medical Student"
                  avatarUrl="/placeholder.svg?height=40&width=40"
                />
              </div>
              <div className="float" style={{ animationDelay: "0.4s" }}>
                <TestimonialCard
                  quote="The study guides are incredible. They adapt to exactly how I learn best."
                  author="Michael Rodriguez"
                  role="Law Student"
                  avatarUrl="/placeholder.svg?height=40&width=40"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 md:py-24 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm border border-primary/20">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that works best for your study needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
              <PricingCard
                title="Free"
                price="$0"
                description="Basic features for casual users"
                features={["5 summaries per month", "Basic study guides", "Standard AI insights"]}
                buttonText="Get Started"
                buttonVariant="outline"
                popular={false}
              />
              <PricingCard
                title="Pro"
                price="$9.99"
                period="/month"
                description="Advanced features for serious students"
                features={[
                  "Unlimited summaries",
                  "Advanced study guides",
                  "Priority AI insights",
                  "Flashcard generation",
                ]}
                buttonText="Subscribe Now"
                buttonVariant="default"
                popular={true}
              />
              <PricingCard
                title="Team"
                price="$19.99"
                period="/month"
                description="Perfect for study groups"
                features={[
                  "Everything in Pro",
                  "5 user accounts",
                  "Collaborative notes",
                  "Group study sessions",
                  "24/7 support",
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
                popular={false}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">
                  Ready to Transform Your Study Habits?
                </h2>
                <p className="max-w-[700px] md:text-xl">
                  Join thousands of students who are studying smarter, not harder.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/signup">
                  <Button size="lg" className="pulse-glow">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Animated elements */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </section>
      </main>
      <footer className="border-t border-border/40 py-6 md:py-8 relative">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold gradient-text">StudyAI</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} StudyAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

