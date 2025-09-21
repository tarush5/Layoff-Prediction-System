"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react"
import { SkillGapCard } from "@/components/skill-gap-card"
import { SkillStrengthCard } from "@/components/skill-strength-card"
import type { Profile } from "@/lib/types"

interface SkillAnalysisProps {
  profile: Profile | null
}

export function SkillAnalysis({ profile }: SkillAnalysisProps) {
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runAnalysis = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/skill-analysis", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to run skill analysis")
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      setError("Failed to run skill analysis. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Auto-run analysis if profile is complete
    if (profile?.job_title && profile?.industry) {
      runAnalysis()
    }
  }, [profile])

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Skill Gap Analysis</h2>
        <p className="text-muted-foreground">Identify missing skills and get personalized learning recommendations</p>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {!analysis && !isLoading && (
        <Card className="border-border bg-card">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Analyze Your Skills</h3>
            <p className="text-muted-foreground mb-6">
              Get insights into your skill gaps and development opportunities
            </p>
            <Button
              onClick={runAnalysis}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Run Skill Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card className="border-border bg-card">
          <CardContent className="text-center py-8">
            <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing Your Skills</h3>
            <p className="text-muted-foreground">This may take a few moments...</p>
          </CardContent>
        </Card>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <TrendingUp className="w-5 h-5" />
                Overall Skill Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">{analysis.overallScore}/100</div>
                <p className="text-muted-foreground">Based on market demand and proficiency levels</p>
              </div>
            </CardContent>
          </Card>

          {/* Skill Strengths */}
          {analysis.strengthAreas.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Your Skill Strengths</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {analysis.strengthAreas.map((strength: any, index: number) => (
                  <SkillStrengthCard key={index} strength={strength} />
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps */}
          {analysis.skillGaps.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Critical Skill Gaps</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {analysis.skillGaps.slice(0, 6).map((gap: any, index: number) => (
                  <SkillGapCard key={index} skillGap={gap} />
                ))}
              </div>
            </div>
          )}

          {/* Refresh Button */}
          <div className="text-center">
            <Button onClick={runAnalysis} disabled={isLoading} variant="outline" className="bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
