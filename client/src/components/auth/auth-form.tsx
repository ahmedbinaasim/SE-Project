// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { Icons } from "../icons"
// import { useToast } from "../../hooks/use-toast"
// import { loginUser, registerUser } from "../../services/auth-service"

// const authSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
// })

// type AuthFormValues = z.infer<typeof authSchema>

// interface AuthFormProps {
//   mode: "login" | "register"
// }

// export function AuthForm({ mode }: AuthFormProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AuthFormValues>({
//     resolver: zodResolver(authSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(data: AuthFormValues) {
//     setIsLoading(true)

//     try {
//       if (mode === "login") {
//         await loginUser(data.email, data.password)
//         toast({
//           title: "Success",
//           description: "You have been logged in.",
//         })
//         router.push("/dashboard")
//       } else {
//         await registerUser(data.email, data.password)
//         toast({
//           title: "Account Created",
//           description: "Your account has been created. Please check your email for confirmation.",
//         })
//         // Redirect to login page after successful registration
//         router.push("/login")
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
//       toast({
//         title: "Error",
//         description: mode === "login" ? "Invalid credentials." : errorMessage,
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="grid gap-6">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               placeholder="name@example.com"
//               type="email"
//               autoCapitalize="none"
//               autoComplete="email"
//               autoCorrect="off"
//               disabled={isLoading}
//               {...register("email")}
//             />
//             {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               placeholder="••••••••"
//               type="password"
//               autoCapitalize="none"
//               autoComplete={mode === "login" ? "current-password" : "new-password"}
//               autoCorrect="off"
//               disabled={isLoading}
//               {...register("password")}
//             />
//             {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
//           </div>
//           <Button disabled={isLoading}>
//             {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
//             {mode === "login" ? "Sign In" : "Create Account"}
//           </Button>
//         </div>
//       </form>
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
//         </div>
//       </div>
//       <Button variant="outline" type="button" disabled={isLoading}>
//         {isLoading ? (
//           <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//         ) : (
//           <Icons.google className="mr-2 h-4 w-4" />
//         )}{" "}
//         Google
//       </Button>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Icons } from "../icons"
import { useToast } from "../../hooks/use-toast"
import { loginUser, registerUser } from "../../services/auth-service"

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().optional(),
}).refine(
  (data) => (data.confirmPassword && data.confirmPassword !== "" ? data.password === data.confirmPassword : true),
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
)

type AuthFormValues = z.infer<typeof authSchema>

interface AuthFormProps {
  mode: "login" | "register"
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const password = watch("password")

  // Calculate password strength for display (visual feedback only)
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const passwordStrength = getPasswordStrength(password)

  async function onSubmit(data: AuthFormValues) {
    console.log("Form submitted:", data) // Temporary debug log
    setIsLoading(true)

    try {
      if (mode === "login") {
        await loginUser(data.email, data.password)
        toast({
          title: "Success",
          description: "You have been logged in successfully.",
        })
        router.push("/dashboard")
      } else {
        await registerUser(data.email, data.password)
        toast({
          title: "Success",
          description: "Your account has been created. Please check your email for confirmation.",
        })
        router.push("/login")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      toast({
        title: "Error",
        description: mode === "login" ? "Invalid email or password." : errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                autoCorrect="off"
                disabled={isLoading}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icons.eyeOff className="h-4 w-4" />
                ) : (
                  <Icons.eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            {mode === "register" && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 rounded">
                  <div
                    className={`h-full rounded transition-all ${
                      passwordStrength === 0
                        ? "w-0"
                        : passwordStrength === 1
                        ? "w-1/4 bg-red-500"
                        : passwordStrength === 2
                        ? "w-2/4 bg-yellow-500"
                        : passwordStrength === 3
                        ? "w-3/4 bg-blue-500"
                        : "w-full bg-green-500"
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Password strength: {passwordStrength === 0 ? "None" : passwordStrength === 1 ? "Weak" : passwordStrength === 2 ? "Fair" : passwordStrength === 3 ? "Good" : "Strong"}
                </p>
              </div>
            )}
          </div>
          {mode === "register" && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Icons.eyeOff className="h-4 w-4" />
                  ) : (
                    <Icons.eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}