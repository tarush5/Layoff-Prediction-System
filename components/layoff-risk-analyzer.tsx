"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, Brain, Loader2, RefreshCw } from "lucide-react"

interface RiskAnalysis {
  riskScore: number
  riskLevel: "Low" | "Medium" | "High"
  factors: Array<{
    factor: string
    impact: number
    description: string
  }>
  recommendations: Array<{
    skill: string
    priority: "High" | "Medium" | "Low"
    timeToLearn: string
    impact: string
  }>
  confidence: number
  modelVersion: string
}

interface UserProfile {
  jobTitle: string
  department: string
  industry: string
  yearsExperience: string
  skills: string
  performanceRating: string
}

interface LayoffRiskAnalyzerProps {
  userProfile?: UserProfile | null
}

export function LayoffRiskAnalyzer({ userProfile }: LayoffRiskAnalyzerProps) {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    department: "",
    skills: "",
    performance: "",
    industry: "",
  })
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userProfile) {
      setFormData({
        role: userProfile.jobTitle || "",
        experience: userProfile.yearsExperience || "",
        department: userProfile.department || "",
        skills: userProfile.skills || "",
        performance: userProfile.performanceRating || "",
        industry: userProfile.industry || "",
      })

      // Auto-analyze if profile is complete
      if (userProfile.jobTitle && userProfile.yearsExperience && userProfile.department) {
        handleAnalyze()
      }
    }
  }, [userProfile])

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/predict-layoff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze layoff risk")
      }

      const result = await response.json()
      setAnalysis(result.prediction)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "High":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <Brain className="w-5 h-5 text-accent" />
            <span>{userProfile ? "Your Personalized Risk Assessment" : "AI Layoff Risk Analyzer"}</span>
          </CardTitle>
          <CardDescription>
            {userProfile
              ? "Based on your profile information and current market conditions"
              : "Get personalized risk assessment and skill recommendations"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {(!userProfile || formData.role !== userProfile.jobTitle) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Job Role</Label>
                <Input
                  id="role"
                  placeholder="e.g., Software Engineer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
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
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Current Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g., React, Python, AWS"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="performance">Performance Rating</Label>
                <Select
                  value={formData.performance}
                  onValueChange={(value) => setFormData({ ...formData, performance: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="below-average">Below Average</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
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
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex space-x-2">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !formData.role || !formData.experience}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing with AI Model...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  {analysis ? "Update Analysis" : "Analyze Risk & Get Recommendations"}
                </>
              )}
            </Button>

            {analysis && (
              <Button variant="outline" onClick={handleAnalyze} disabled={isAnalyzing}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-card-foreground">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span>Risk Assessment</span>
              </CardTitle>
              <CardDescription>
                Model v{analysis.modelVersion} • {analysis.confidence}% confidence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-card-foreground">{analysis.riskScore}%</div>
                <Badge className={getRiskColor(analysis.riskLevel)}>{analysis.riskLevel} Risk</Badge>
                <Progress value={analysis.riskScore} className="h-3" />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-card-foreground">Risk Factors</h4>
                {analysis.factors.map((factor) => (
                  <div key={factor.factor} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-card-foreground">{factor.factor}</span>
                      <span className="text-sm text-muted">{Math.round(factor.impact)}%</span>
                    </div>
                    <Progress value={factor.impact} className="h-2" />
                    <p className="text-xs text-muted">{factor.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-card-foreground">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span>AI-Powered Recommendations</span>
              </CardTitle>
              <CardDescription>Personalized skills to reduce your layoff risk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.recommendations.map((rec) => (
                <div key={rec.skill} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-card-foreground">{rec.skill}</h5>
                    <Badge className={getPriorityColor(rec.priority)}>{rec.priority} Priority</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted">Time to Learn:</span>
                      <p className="font-medium text-card-foreground">{rec.timeToLearn}</p>
                    </div>
                    <div>
                      <span className="text-muted">Risk Reduction:</span>
                      <p className="font-medium text-green-600">{rec.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
