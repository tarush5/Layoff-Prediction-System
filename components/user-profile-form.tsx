"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Briefcase, GraduationCap, Calendar, Save, CheckCircle } from "lucide-react"

interface UserProfile {
  // Personal Info
  name: string
  email: string
  phone: string
  location: string

  // Professional Info
  jobTitle: string
  department: string
  company: string
  industry: string
  yearsExperience: string
  currentSalary: string

  // Skills & Education
  skills: string
  education: string
  certifications: string

  // Performance & Goals
  performanceRating: string
  careerGoals: string
  workPreferences: string
}

interface UserProfileFormProps {
  user: { id: string; name: string; email: string }
  onProfileComplete: (profile: UserProfile) => void
}

export function UserProfileForm({ user, onProfileComplete }: UserProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: user.name,
    email: user.email,
    phone: "",
    location: "",
    jobTitle: "",
    department: "",
    company: "",
    industry: "",
    yearsExperience: "",
    currentSalary: "",
    skills: "",
    education: "",
    certifications: "",
    performanceRating: "",
    careerGoals: "",
    workPreferences: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem(`layoffguard_profile_${user.id}`)
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [user.id])

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Save to localStorage (replace with actual API call)
      localStorage.setItem(`layoffguard_profile_${user.id}`, JSON.stringify(profile))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)

      // If profile is complete, notify parent
      if (isProfileComplete()) {
        onProfileComplete(profile)
      }
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const isProfileComplete = () => {
    const requiredFields = ["jobTitle", "department", "industry", "yearsExperience", "skills", "performanceRating"]
    return requiredFields.every((field) => profile[field as keyof UserProfile])
  }

  const getCompletionPercentage = () => {
    const allFields = Object.keys(profile).filter((key) => key !== "name" && key !== "email")
    const filledFields = allFields.filter((key) => profile[key as keyof UserProfile])
    return Math.round((filledFields.length / allFields.length) * 100)
  }

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 4))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Complete Your Profile</span>
              </CardTitle>
              <CardDescription>Help us provide personalized career insights and risk assessments</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{getCompletionPercentage()}%</div>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2" />
        </CardHeader>
      </Card>

      {/* Step Navigation */}
      <div className="flex justify-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <Button
            key={step}
            variant={currentStep === step ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentStep(step)}
            className="w-10 h-10 rounded-full p-0"
          >
            {step}
          </Button>
        ))}
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="City, State"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Professional Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Professional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={profile.jobTitle}
                  onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={profile.department}
                  onValueChange={(value) => setProfile({ ...profile, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  placeholder="Current company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={profile.industry} onValueChange={(value) => setProfile({ ...profile, industry: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="media">Media & Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience *</Label>
                <Select
                  value={profile.yearsExperience}
                  onValueChange={(value) => setProfile({ ...profile, yearsExperience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-6">4-6 years</SelectItem>
                    <SelectItem value="7-10">7-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentSalary">Current Salary (Optional)</Label>
                <Input
                  id="currentSalary"
                  value={profile.currentSalary}
                  onChange={(e) => setProfile({ ...profile, currentSalary: e.target.value })}
                  placeholder="e.g., $75,000"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Skills & Education */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Skills & Education</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Technical Skills *</Label>
              <Textarea
                id="skills"
                value={profile.skills}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                placeholder="e.g., React, Python, AWS, Machine Learning, Project Management"
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                List your key technical and professional skills, separated by commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                placeholder="e.g., Bachelor's in Computer Science, Stanford University"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Textarea
                id="certifications"
                value={profile.certifications}
                onChange={(e) => setProfile({ ...profile, certifications: e.target.value })}
                placeholder="e.g., AWS Certified Solutions Architect, PMP, Google Analytics"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Performance & Goals */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Performance & Career Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="performanceRating">Recent Performance Rating *</Label>
              <Select
                value={profile.performanceRating}
                onValueChange={(value) => setProfile({ ...profile, performanceRating: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exceeds">Exceeds Expectations</SelectItem>
                  <SelectItem value="meets">Meets Expectations</SelectItem>
                  <SelectItem value="below">Below Expectations</SelectItem>
                  <SelectItem value="new">New Employee (No Rating Yet)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Textarea
                id="careerGoals"
                value={profile.careerGoals}
                onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
                placeholder="Describe your short-term and long-term career aspirations"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workPreferences">Work Preferences</Label>
              <Textarea
                id="workPreferences"
                value={profile.workPreferences}
                onChange={(e) => setProfile({ ...profile, workPreferences: e.target.value })}
                placeholder="e.g., Remote work, flexible hours, leadership opportunities, specific technologies"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-transparent"
          >
            {isSaving ? (
              <>
                <Save className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : saved ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Progress</span>
              </>
            )}
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button
              onClick={handleSave}
              disabled={!isProfileComplete() || isSaving}
              className="bg-primary text-primary-foreground"
            >
              Complete Profile
            </Button>
          )}
        </div>
      </div>

      {/* Completion Alert */}
      {isProfileComplete() && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Profile complete! You can now access personalized layoff predictions and career insights.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
