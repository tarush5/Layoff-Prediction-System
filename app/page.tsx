"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { LayoffRiskAnalyzer } from "@/components/layoff-risk-analyzer"
import { AuthForm } from "@/components/auth/login-form"
import { UserProfileForm } from "@/components/user-profile-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, FileText, Users } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
}

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  jobTitle: string
  department: string
  company: string
  industry: string
  yearsExperience: string
  currentSalary: string
  skills: string
  education: string
  certifications: string
  performanceRating: string
  careerGoals: string
  workPreferences: string
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("layoffguard_user")
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)

      // Check if user has completed profile
      const savedProfile = localStorage.getItem(`layoffguard_profile_${parsedUser.id}`)
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile)
        setUserProfile(parsedProfile)

        // Check if profile is complete
        const requiredFields = ["jobTitle", "department", "industry", "yearsExperience", "skills", "performanceRating"]
        const isComplete = requiredFields.every((field) => parsedProfile[field])
        setShowProfileForm(!isComplete)
      } else {
        setShowProfileForm(true)
      }
    }
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser)
    setShowProfileForm(true)
  }

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setShowProfileForm(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("layoffguard_user")
    localStorage.removeItem(`layoffguard_profile_${user?.id}`)
    setUser(null)
    setUserProfile(null)
    setShowProfileForm(false)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading LayoffGuard...</p>
        </div>
      </div>
    )
  }

  // Show auth form if no user
  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />
  }

  // Show profile form if user hasn't completed profile
  if (showProfileForm) {
    return (
      <div className="min-h-screen bg-background p-6">
        <UserProfileForm user={user} onProfileComplete={handleProfileComplete} />
      </div>
    )
  }

  // Main dashboard for authenticated users with complete profiles
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} userProfile={userProfile} onLogout={handleLogout} />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}!</h1>
              <p className="text-muted mt-2">
                {userProfile?.jobTitle && userProfile?.department
                  ? `${userProfile.jobTitle} • ${userProfile.department}`
                  : "AI-powered career security insights and recommendations"}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/employee">
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  My Profile
                </Button>
              </Link>
              <Link href="/reports">
                <Button size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </Link>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Your LayoffGuard Dashboard</span>
                <ArrowRight className="w-5 h-5 text-primary" />
              </CardTitle>
              <CardDescription>
                Personalized insights based on your profile: {userProfile?.jobTitle} in {userProfile?.industry}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/employee" className="group">
                  <div className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer">
                    <Users className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground group-hover:text-primary">Personal Dashboard</h3>
                    <p className="text-sm text-muted">View your risk assessment and career recommendations</p>
                  </div>
                </Link>
                <Link href="/skills" className="group">
                  <div className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer">
                    <BookOpen className="w-8 h-8 text-accent mb-2" />
                    <h3 className="font-semibold text-foreground group-hover:text-accent">Skill Analysis</h3>
                    <p className="text-sm text-muted">Identify gaps and get personalized learning paths</p>
                  </div>
                </Link>
                <Link href="/analytics" className="group">
                  <div className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer">
                    <FileText className="w-8 h-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-foreground group-hover:text-green-600">Company Insights</h3>
                    <p className="text-sm text-muted">Organizational analytics and strategic planning</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <DashboardOverview />
          <LayoffRiskAnalyzer userProfile={userProfile} />
        </div>
      </main>
    </div>
  )
}
