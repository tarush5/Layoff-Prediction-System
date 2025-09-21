"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, User } from "lucide-react"
import type { Profile } from "@/lib/types"

interface ProfileSetupProps {
  profile: Profile | null
  onProfileUpdate: (profile: Profile) => void
}

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Media",
  "Energy",
  "Consulting",
  "Government",
  "Non-profit",
  "Real Estate",
]

export function ProfileSetup({ profile, onProfileUpdate }: ProfileSetupProps) {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    job_title: profile?.job_title || "",
    company: profile?.company || "",
    industry: profile?.industry || "",
    experience_years: profile?.experience_years?.toString() || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          experience_years: Number.parseInt(formData.experience_years) || 0,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const updatedProfile = await response.json()
      onProfileUpdate(updatedProfile)
      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isComplete =
    formData.full_name && formData.job_title && formData.company && formData.industry && formData.experience_years

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Complete Your Profile</h2>
        <p className="text-muted-foreground">
          Provide your professional information to get personalized career risk assessments
        </p>
      </div>

      <Card className="border-border bg-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <User className="w-5 h-5" />
            Professional Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            This information helps us provide accurate risk assessments and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-card-foreground">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange("full_name", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_title" className="text-card-foreground">
                  Job Title
                </Label>
                <Input
                  id="job_title"
                  type="text"
                  placeholder="Software Engineer"
                  value={formData.job_title}
                  onChange={(e) => handleInputChange("job_title", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-card-foreground">
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="TechCorp Inc."
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-card-foreground">
                  Industry
                </Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_years" className="text-card-foreground">
                Years of Experience
              </Label>
              <Input
                id="experience_years"
                type="number"
                placeholder="5"
                min="0"
                max="50"
                value={formData.experience_years}
                onChange={(e) => handleInputChange("experience_years", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>

            {message && (
              <Alert
                className={
                  message.type === "success"
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                }
              >
                {message.type === "success" && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
                <AlertDescription
                  className={
                    message.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                  }
                >
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                {isComplete ? (
                  <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Profile complete
                  </span>
                ) : (
                  "Complete all fields to unlock full features"
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
