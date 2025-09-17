"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Target, BookOpen, Loader2, Star, Clock, DollarSign } from "lucide-react"

interface SkillAnalysis {
  skillScore: number
  skillLevel: string
  currentSkills: Array<{
    skill: string
    demand: number
    growth: number
    hasSkill: boolean
  }>
  skillGaps: Array<{
    skill: string
    demand: number
    growth: number
    priority: string
    timeToLearn: string
    riskReduction: string
    avgSalaryIncrease: number
  }>
  careerPaths: Array<{
    title: string
    requiredSkills: string[]
    timeframe: string
    salaryIncrease: string
  }>
  industryTrends: {
    growingSkills: string[]
    decliningSkills: string[]
    emergingSkills: string[]
  }
}

export function SkillGapAnalyzer() {
  const [formData, setFormData] = useState({
    role: "",
    industry: "",
    experience: "",
    skills: "",
    careerGoals: "",
  })
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/skill-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze skills")
      }

      const result = await response.json()
      setAnalysis(result.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "text-green-600 bg-green-100"
      case "proficient":
        return "text-blue-600 bg-blue-100"
      case "developing":
        return "text-yellow-600 bg-yellow-100"
      case "beginner":
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
            <span>AI Skill Gap Analyzer</span>
          </CardTitle>
          <CardDescription>Discover skill gaps and get personalized learning recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Current Role</Label>
              <Input
                id="role"
                placeholder="e.g., Software Engineer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
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

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => setFormData({ ...formData, experience: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                  <SelectItem value="expert">Expert Level (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skills">Current Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., React, Python, AWS, Project Management"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Select
                value={formData.careerGoals}
                onValueChange={(value) => setFormData({ ...formData, careerGoals: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotion">Get Promoted</SelectItem>
                  <SelectItem value="leadership">Move to Leadership</SelectItem>
                  <SelectItem value="technical">Become Technical Expert</SelectItem>
                  <SelectItem value="transition">Career Transition</SelectItem>
                  <SelectItem value="security">Job Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !formData.role || !formData.industry}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Skills...
              </>
            ) : (
              "Analyze Skills & Get Learning Path"
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
            <TabsTrigger value="career">Career Paths</TabsTrigger>
            <TabsTrigger value="trends">Industry Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <Target className="w-5 h-5 text-accent" />
                    <span>Skill Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-card-foreground">{analysis.skillScore}%</div>
                    <Badge className={getSkillLevelColor(analysis.skillLevel)}>{analysis.skillLevel}</Badge>
                    <Progress value={analysis.skillScore} className="h-3" />
                    <p className="text-sm text-muted">Overall skill alignment with industry demands</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Current Skills Portfolio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.currentSkills.slice(0, 5).map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-card-foreground">{skill.skill}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            +{skill.growth}%
                          </Badge>
                          <span className="text-sm text-muted">{skill.demand}%</span>
                        </div>
                      </div>
                      <Progress value={skill.demand} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gaps" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analysis.skillGaps.map((skill) => (
                <Card key={skill.skill} className="bg-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-card-foreground">{skill.skill}</CardTitle>
                      <Badge className={getPriorityColor(skill.priority)}>{skill.priority} Priority</Badge>
                    </div>
                    <CardDescription>
                      Market demand: {skill.demand}% • Growth: +{skill.growth}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted" />
                        <div>
                          <p className="text-muted">Time to Learn</p>
                          <p className="font-medium text-card-foreground">{skill.timeToLearn}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-muted">Risk Reduction</p>
                          <p className="font-medium text-green-600">{skill.riskReduction}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-muted">Salary Impact</p>
                          <p className="font-medium text-accent">+${skill.avgSalaryIncrease.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <Progress value={skill.demand} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analysis.careerPaths.map((path, index) => (
                <Card key={index} className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-card-foreground">
                      <Star className="w-5 h-5 text-accent" />
                      <span>{path.title}</span>
                    </CardTitle>
                    <CardDescription>Recommended career progression path</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted">Timeframe</p>
                        <p className="font-medium text-card-foreground">{path.timeframe}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted">Salary Increase</p>
                        <p className="font-medium text-green-600">{path.salaryIncrease}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {path.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Growing Skills</span>
                  </CardTitle>
                  <CardDescription>High-growth skills in your industry</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.industryTrends.growingSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-card-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>Emerging Skills</span>
                  </CardTitle>
                  <CardDescription>New skills gaining traction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.industryTrends.emergingSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm text-card-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                    <span>Declining Skills</span>
                  </CardTitle>
                  <CardDescription>Skills losing market relevance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.industryTrends.decliningSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-sm text-card-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
