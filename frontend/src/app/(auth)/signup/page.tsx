"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import AuthForm from "@/components/auth/auth-form"
import { signupUser } from "@/lib/auth-service"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState<string | null>(null)

  const handleSignup = async (formData: FormData) => {
    setIsLoading(true)
    setError("")

    try {
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      const name = formData.get("name") as string

      // Use the new service for signup
      const result = await signupUser({ email, password, name })
      
      // Store userId for verification if needed
      setUserId(result.userId)
      
      // Redirect to verification page with userId
      router.push(`/verify-account?userId=${result.userId}&email=${encodeURIComponent(email)}`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to create an account. Please try again.")
      } else {
        setError("Failed to create an account. Please try again.")
      }
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      </div>
      <div className="mx-auto w-full max-w-md space-y-6 relative z-10">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">StudyAI</span>
          </Link>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
        </div>

        {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

        <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6">
          <AuthForm type="signup" onSubmit={handleSignup} isLoading={isLoading} />
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}