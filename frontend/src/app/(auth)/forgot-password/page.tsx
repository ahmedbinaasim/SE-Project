"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestPasswordReset } from "@/lib/auth-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { resetPassword } from "@/lib/auth-service"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [userId, setUserId] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Using the new requestPasswordReset function to send OTP to email
      const result = await requestPasswordReset(email)
      setUserId(result.userId)
      setIsSubmitted(true)
      setShowVerification(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to send reset email. Please try again.")
      }
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Call the resetPassword function with userId, OTP, and new password
      await resetPassword({
        userId,
        otp,
        newPassword
      })
      setIsSubmitted(true)
      setShowVerification(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to reset password. Please try again.")
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
          <h1 className="text-2xl font-bold">Reset your password</h1>
          {!showVerification ? (
            <p className="text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a verification code to reset your password
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter the verification code sent to your email and your new password
            </p>
          )}
        </div>

        {isSubmitted && !showVerification ? (
          <div className="space-y-4">
            <Alert className="bg-green-900/20 border-green-700/30 text-green-400">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Password has been reset successfully. You can now log in with your new password.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Link href="/login" className="text-primary hover:underline">
                Return to login
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

            <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6">
              {!showVerification ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-background/50"
                    />
                  </div>
                  <Button type="submit" className="w-full pulse-glow" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send verification code"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full bg-background/50"
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full pulse-glow" disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              )}
            </div>

            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}