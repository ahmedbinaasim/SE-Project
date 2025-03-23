"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Brain, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { verifyOTP, resendOTP } from "@/lib/auth-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const userId = searchParams.get('userId')
  const email = searchParams.get('email')
  
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [resendSuccess, setResendSuccess] = useState(false)

  useEffect(() => {
    // Redirect if no userId is provided
    if (!userId || !email) {
      router.push('/signup')
    }
  }, [userId, email, router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userId) return
    
    setIsLoading(true)
    setError("")

    try {
      await verifyOTP({
        userId,
        otp
      })
      
      // Redirect to login page with success message
      router.push("/login?registered=true")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to verify account. Please try again.")
      } else {
        setError("Failed to verify account. Please try again.")
      }
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (!email) return
    
    setIsResending(true)
    setError("")
    setResendSuccess(false)

    try {
      await resendOTP(email)
      setResendSuccess(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to resend verification code. Please try again.")
      } else {
        setError("Failed to resend verification code. Please try again.")
      }
      console.error(err)
    } finally {
      setIsResending(false)
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
          <h1 className="text-2xl font-bold">Verify Your Account</h1>
          <p className="text-sm text-muted-foreground">
            We sent a verification code to {email}. Please enter it below.
          </p>
        </div>

        {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}
        
        {resendSuccess && (
          <Alert className="bg-green-900/20 border-green-700/30 text-green-400">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              Verification code has been resent to your email.
            </AlertDescription>
          </Alert>
        )}

        <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full bg-background/50"
              />
            </div>
            <Button type="submit" className="w-full pulse-glow" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Account"}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm">
          Didn&apos;t receive a code?{" "}
          <button 
            onClick={handleResendOTP} 
            className="font-medium text-primary hover:underline"
            disabled={isResending}
          >
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  )
}