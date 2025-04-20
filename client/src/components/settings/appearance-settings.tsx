// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "../ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
// import { Label } from "../ui/label"
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
// import { useToast } from "../../hooks/use-toast"
// import { updateAppearanceSettings } from "../../services/user-service"

// export function AppearanceSettings() {
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()
//   const [theme, setTheme] = useState("system")
//   const [fontSize, setFontSize] = useState("normal")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       await updateAppearanceSettings({ theme, fontSize })
//       toast({
//         title: "Appearance updated",
//         description: "Your appearance settings have been updated successfully.",
//       })
//     } catch (error) {
//       console.error("Error updating appearance settings:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update appearance settings. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Appearance</CardTitle>
//           <CardDescription>
//             Customize the appearance of the app. Automatically switch between day and night themes.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label>Theme</Label>
//             <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
//               <Label
//                 htmlFor="theme-light"
//                 className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
//               >
//                 <RadioGroupItem value="light" id="theme-light" className="sr-only" />
//                 <div className="mb-3 h-10 w-10 rounded-full border-2 border-muted bg-background"></div>
//                 <span className="block w-full text-center">Light</span>
//               </Label>
//               <Label
//                 htmlFor="theme-dark"
//                 className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
//               >
//                 <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
//                 <div className="mb-3 h-10 w-10 rounded-full border-2 border-muted bg-gray-950"></div>
//                 <span className="block w-full text-center">Dark</span>
//               </Label>
//               <Label
//                 htmlFor="theme-system"
//                 className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
//               >
//                 <RadioGroupItem value="system" id="theme-system" className="sr-only" />
//                 <div className="mb-3 flex h-10 w-10">
//                   <div className="h-full w-1/2 rounded-l-full border-2 border-muted bg-background"></div>
//                   <div className="h-full w-1/2 rounded-r-full border-2 border-muted bg-gray-950"></div>
//                 </div>
//                 <span className="block w-full text-center">System</span>
//               </Label>
//             </RadioGroup>
//           </div>

//           <div className="space-y-2">
//             <Label>Font Size</Label>
//             <RadioGroup value={fontSize} onValueChange={setFontSize} className="grid grid-cols-3 gap-4">
//               <Label
//                 htmlFor="font-small"
//                 className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
//               >
//                 <RadioGroupItem value="small" id="font-small" className="sr-only" />
//                 <span className="text-sm">Aa</span>
//                 <span className="block w-full text-center">Small</span>
//               </Label>
//               <Label
//                 htmlFor="font-normal"
//                 className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
//               >
//                 <RadioGroupItem value="normal" id="font-normal" className="sr-only" />
//                 <span className="text-base">Aa</span>
//                 <span className="block w-full text-center">Normal</span>
//               </Label>
//               <Label
//                 htmlFor="font-large"
//                 className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
//               >
//                 <RadioGroupItem value="large" id="font-large" className="sr-only" />
//                 <span className="text-lg">Aa</span>
//                 <span className="block w-full text-center">Large</span>
//               </Label>
//             </RadioGroup>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-end">
//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? "Saving..." : "Save Changes"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </form>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useToast } from "../../hooks/use-toast"
import { getCurrentUserProfile, updateAppearanceSettings } from "../../services/user-service"

export function AppearanceSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const { toast } = useToast()
  const [theme, setTheme] = useState("system")
  const [fontSize, setFontSize] = useState("normal")

  // Fetch user appearance settings on component mount
  useEffect(() => {
    const fetchAppearanceSettings = async () => {
      try {
        const userData = await getCurrentUserProfile()
        
        // Check if we have settings data before updating state
        if (userData.settings?.appearance) {
          setTheme(userData.settings.appearance.theme || "system")
          setFontSize(userData.settings.appearance.fontSize || "normal")
        }
      } catch (error) {
        console.error("Error fetching appearance settings:", error)
        toast({
          title: "Error",
          description: "Failed to load appearance settings. Default settings applied.",
          variant: "destructive",
        })
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchAppearanceSettings()
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateAppearanceSettings({ theme, fontSize })
      
      // Also apply the theme to the document
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark")
      } else {
        // System preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
      
      // Apply font size
      document.documentElement.dataset.fontSize = fontSize
      
      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated successfully.",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      toast({
        title: "Error",
        description: errorMessage || "Failed to update appearance settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading appearance settings...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the appearance of the app. Automatically switch between day and night themes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
              <Label
                htmlFor="theme-light"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                <div className="mb-3 h-10 w-10 rounded-full border-2 border-muted bg-background"></div>
                <span className="block w-full text-center">Light</span>
              </Label>
              <Label
                htmlFor="theme-dark"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                <div className="mb-3 h-10 w-10 rounded-full border-2 border-muted bg-gray-950"></div>
                <span className="block w-full text-center">Dark</span>
              </Label>
              <Label
                htmlFor="theme-system"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                <div className="mb-3 flex h-10 w-10">
                  <div className="h-full w-1/2 rounded-l-full border-2 border-muted bg-background"></div>
                  <div className="h-full w-1/2 rounded-r-full border-2 border-muted bg-gray-950"></div>
                </div>
                <span className="block w-full text-center">System</span>
              </Label>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <RadioGroup value={fontSize} onValueChange={setFontSize} className="grid grid-cols-3 gap-4">
              <Label
                htmlFor="font-small"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="small" id="font-small" className="sr-only" />
                <span className="text-sm">Aa</span>
                <span className="block w-full text-center">Small</span>
              </Label>
              <Label
                htmlFor="font-normal"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="normal" id="font-normal" className="sr-only" />
                <span className="text-base">Aa</span>
                <span className="block w-full text-center">Normal</span>
              </Label>
              <Label
                htmlFor="font-large"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="large" id="font-large" className="sr-only" />
                <span className="text-lg">Aa</span>
                <span className="block w-full text-center">Large</span>
              </Label>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}