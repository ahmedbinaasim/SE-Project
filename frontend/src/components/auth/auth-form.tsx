"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordInput from "@/components/auth/password-input"

interface AuthFormProps {
  type: "login" | "signup"
  onSubmit: (formData: FormData) => void
  isLoading: boolean
}

export default function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
  return (
    <form action={onSubmit} className="space-y-4">
      {type === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            disabled={isLoading}
            className="w-full bg-background/50"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          disabled={isLoading}
          className="w-full bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <PasswordInput
          id="password"
          name="password"
          required
          disabled={isLoading}
          className="w-full bg-background/50"
        />
      </div>

      <Button type="submit" className="w-full pulse-glow" disabled={isLoading}>
        {isLoading ? (type === "login" ? "Logging in..." : "Signing up...") : type === "login" ? "Log in" : "Sign up"}
      </Button>

      {type === "login" && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me
          </Label>
        </div>
      )}
    </form>
  )
}

