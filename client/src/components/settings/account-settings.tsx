// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "../ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { Switch } from "../ui/switch"
// import { useToast } from "../../hooks/use-toast"
// import { updateAccountSettings } from "../../services/user-service"

// export function AccountSettings() {
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()
//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     twoFactorEnabled: false,
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSwitchChange = (checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       twoFactorEnabled: checked,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
//       toast({
//         title: "Passwords do not match",
//         description: "Please make sure your passwords match.",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsLoading(true)

//     try {
//       await updateAccountSettings(formData)
//       toast({
//         title: "Account settings updated",
//         description: "Your account settings have been updated successfully.",
//       })
//       setFormData({
//         ...formData,
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       })
//     } catch (error) {
//       console.error("Error updating account settings:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update account settings. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Password</CardTitle>
//             <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid gap-2">
//               <Label htmlFor="current-password">Current Password</Label>
//               <Input
//                 id="current-password"
//                 name="currentPassword"
//                 type="password"
//                 value={formData.currentPassword}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="new-password">New Password</Label>
//               <Input
//                 id="new-password"
//                 name="newPassword"
//                 type="password"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="confirm-password">Confirm Password</Label>
//               <Input
//                 id="confirm-password"
//                 name="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-end">
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Saving..." : "Change Password"}
//             </Button>
//           </CardFooter>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Two-Factor Authentication</CardTitle>
//             <CardDescription>Add an extra layer of security to your account.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <p className="font-medium">Two-Factor Authentication</p>
//                 <p className="text-sm text-muted-foreground">Protect your account with an authentication app.</p>
//               </div>
//               <Switch checked={formData.twoFactorEnabled} onCheckedChange={handleSwitchChange} />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Delete Account</CardTitle>
//             <CardDescription>Permanently delete your account and all of your content.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Once you delete your account, there is no going back. Please be certain.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Button variant="destructive">Delete Account</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </form>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { useToast } from "../../hooks/use-toast"
import { 
  updateAccountSettings, 
  deleteUserAccount 
} from "../../services/user-service"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"

export function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      twoFactorEnabled: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await updateAccountSettings(formData)
      toast({
        title: "Account settings updated",
        description: "Your account settings have been updated successfully.",
      })
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // If password was changed, redirect to login after a delay
      if (formData.newPassword) {
        toast({
          title: "Password changed",
          description: "You will be logged out in 3 seconds.",
        })
        setTimeout(() => {
          localStorage.removeItem("token")
          router.push("/login")
        }, 3000)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      toast({
        title: "Error",
        description: errorMessage || "Failed to update account settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    try {
      await deleteUserAccount()
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      })
      router.push("/")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      toast({
        title: "Error",
        description: errorMessage || "Failed to delete account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Change Password"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Protect your account with an authentication app.</p>
              </div>
              <Switch checked={formData.twoFactorEnabled} onCheckedChange={handleSwitchChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>Permanently delete your account and all of your content.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="destructive" 
              onClick={() => setIsDeleteDialogOpen(true)}
              type="button"
            >
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground">
              {isLoading ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  )
}