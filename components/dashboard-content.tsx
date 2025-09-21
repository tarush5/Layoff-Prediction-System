"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, UserIcon, Brain, Target, FileText, AlertTriangle, BarChart3, LogOut, RefreshCw } from "lucide-react"
import { ProfileSetup } from "@/components/profile-setup"
import { SkillManagement } from "@/components/skill-management"
import { EnhancedRiskAssessment } from "@/components/enhanced-risk-assessment"
import { SkillAnalysis } from "@/components/skill-analysis"
import { CareerRecommendations } from "@/components/career-recommendations"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Profile } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { AnimatedDashboard } from "@/components/animated-dashboard"

interface DashboardContentProps {
  user: any
  profile: Profile | null
}

export function DashboardContent({ user, profile: initialProfile }: DashboardContentProps) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const isProfileComplete = profile?.job_title && profile?.company && profile?.industry && profile?.experience_years

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CareerGuard</h1>
                <p className="text-sm text-muted-foreground">Advanced Career Risk Assessment Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{profile?.full_name || user.email}</p>
                <p className="text-xs text-muted-foreground">{profile?.job_title || "Complete your profile"}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Completion Alert */}
        {!isProfileComplete && (
          <Alert className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              Complete your profile to get personalized career risk assessments and recommendations.{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-orange-600 dark:text-orange-400"
                onClick={() => setActiveTab("profile")}
              >
                Complete now
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnimatedDashboard profile={profile} isProfileComplete={isProfileComplete} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileSetup profile={profile} onProfileUpdate={setProfile} />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <EnhancedRiskAssessment profile={profile} isProfileComplete={isProfileComplete} />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillManagement profile={profile} />
            <SkillAnalysis profile={profile} />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <CareerRecommendations profile={profile} isProfileComplete={isProfileComplete} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsSection profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ReportsSection({ profile }: { profile: Profile | null }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const generateReport = async (reportType: string) => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportType }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate report")
      }

      const result = await response.json()
      setReport(result)
    } catch (error) {
      setError("Failed to generate report. Please ensure you have completed your profile and risk assessment.")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadReport = () => {
    if (!report) return

    const content = report.sections.map((section: any) => section.content).join("\n\n")
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `career-report-${new Date().toISOString().split("T")[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {!report ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Career Reports</h2>
          <p className="text-muted-foreground mb-6">
            Generate comprehensive reports about your career risk and recommendations
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => generateReport("comprehensive")}
              disabled={isGenerating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Comprehensive Report"
              )}
            </Button>
            <div className="grid gap-2 md:grid-cols-2">
              <Button
                onClick={() => generateReport("risk-only")}
                disabled={isGenerating}
                variant="outline"
                className="bg-transparent"
              >
                Risk Assessment Report
              </Button>
              <Button
                onClick={() => generateReport("skills-only")}
                disabled={isGenerating}
                variant="outline"
                className="bg-transparent"
              >
                Skills Analysis Report
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-card-foreground">
                <span>Career Assessment Report</span>
                <Badge variant="outline">
                  {report.metadata.riskLevel.charAt(0).toUpperCase() + report.metadata.riskLevel.slice(1)} Risk
                </Badge>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Generated on {new Date(report.metadata.generatedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{report.metadata.riskScore}/100</div>
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{report.sections.length}</div>
                  <div className="text-sm text-muted-foreground">Report Sections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {report.sections.reduce((acc: number, section: any) => acc + section.content.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Characters</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={downloadReport} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button onClick={() => setReport(null)} variant="outline" className="bg-transparent">
                  Generate New Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Preview */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Report Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {report.sections.slice(0, 2).map((section: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {section.content.substring(0, 500)}
                      {section.content.length > 500 && "..."}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
