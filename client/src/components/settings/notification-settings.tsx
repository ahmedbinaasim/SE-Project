"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { useToast } from "../../hooks/use-toast"
import { updateNotificationSettings } from "../../services/user-service"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newShare: true,
    newComment: true,
    mentionNotification: true,
    reminderNotification: true,
    marketingEmails: false,
  })

  const handleToggle = (key: keyof typeof settings) => (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateNotificationSettings(settings)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      console.error("Error updating notification settings:", error)
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications and updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Channels</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={handleToggle("emailNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your device.</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={handleToggle("pushNotifications")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Types</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-share">Shared Notes</Label>
                <p className="text-sm text-muted-foreground">When someone shares a note with you.</p>
              </div>
              <Switch id="new-share" checked={settings.newShare} onCheckedChange={handleToggle("newShare")} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-comment">Comments</Label>
                <p className="text-sm text-muted-foreground">When someone comments on your notes.</p>
              </div>
              <Switch id="new-comment" checked={settings.newComment} onCheckedChange={handleToggle("newComment")} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mention-notification">Mentions</Label>
                <p className="text-sm text-muted-foreground">When someone mentions you in a note or comment.</p>
              </div>
              <Switch
                id="mention-notification"
                checked={settings.mentionNotification}
                onCheckedChange={handleToggle("mentionNotification")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminder-notification">Reminders</Label>
                <p className="text-sm text-muted-foreground">For scheduled study sessions and deadlines.</p>
              </div>
              <Switch
                id="reminder-notification"
                checked={settings.reminderNotification}
                onCheckedChange={handleToggle("reminderNotification")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Marketing</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and promotions.</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={settings.marketingEmails}
                onCheckedChange={handleToggle("marketingEmails")}
              />
            </div>
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
