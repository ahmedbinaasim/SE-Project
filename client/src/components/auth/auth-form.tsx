// /* eslint-disable @typescript-eslint/no-unused-vars */
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
//       } else {
//         await registerUser(data.email, data.password)
//         toast({
//           title: "Success",
//           description: "Your account has been created.",
//         })
//       }
//       router.push("/dashboard")
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: mode === "login" ? "Invalid credentials." : "Failed to create account.",
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
})

type AuthFormValues = z.infer<typeof authSchema>

interface AuthFormProps {
  mode: "login" | "register"
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: AuthFormValues) {
    setIsLoading(true)

    try {
      if (mode === "login") {
        await loginUser(data.email, data.password)
        toast({
          title: "Success",
          description: "You have been logged in.",
        })
        router.push("/dashboard")
      } else {
        await registerUser(data.email, data.password)
        toast({
          title: "Account Created",
          description: "Your account has been created. Please check your email for confirmation.",
        })
        // Redirect to login page after successful registration
        router.push("/login")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      toast({
        title: "Error",
        description: mode === "login" ? "Invalid credentials." : errorMessage,
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
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}