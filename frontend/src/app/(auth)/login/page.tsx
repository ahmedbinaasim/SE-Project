"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Brain } from "lucide-react"
import AuthForm from "@/components/auth/auth-form"
import { loginUser } from "@/lib/auth-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isRegistered = searchParams.get("registered") === "true"
  const isReset = searchParams.get("reset") === "true"

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [needsVerification, setNeedsVerification] = useState(false)

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true)
    setError("")
    setNeedsVerification(false)

    try {
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      // Use the new service to log in
      await loginUser({ email, password })

      // If successful, redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      if (err instanceof Error) {
        // Check for verification error
        if (err.message.includes('not verified')) {
          setNeedsVerification(true)
          setError("Account not verified. Please check your email for the verification code.")
        } else {
          setError(err.message || "Invalid email or password. Please try again.")
        }
      } else {
        setError("Invalid email or password. Please try again.")
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
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>

        {isRegistered && (
          <Alert className="bg-green-900/20 border-green-700/30 text-green-400">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>Account created successfully! Please log in.</AlertDescription>
          </Alert>
        )}

        {isReset && (
          <Alert className="bg-green-900/20 border-green-700/30 text-green-400">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>Password reset successfully! Please log in with your new password.</AlertDescription>
          </Alert>
        )}

        {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

        <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6">
          <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />
        </div>

        {needsVerification && (
          <div className="text-center text-sm">
            <Link href="/verify-account" className="font-medium text-primary hover:underline">
              Verify my account
            </Link>
          </div>
        )}

        <div className="text-center text-sm">
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot your password?
          </Link>
          <div className="mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}