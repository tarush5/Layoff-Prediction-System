"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, TrendingUp, BarChart3, RefreshCw } from "lucide-react"
import type { Profile } from "@/lib/types"

interface RiskAssessmentProps {
  profile: Profile | null
  isProfileComplete: boolean | undefined
}

export function RiskAssessment({ profile, isProfileComplete }: RiskAssessmentProps) {
  const [prediction, setPrediction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runAssessment = async () => {
    if (!isProfileComplete) {
      setError("Please complete your profile first")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/prediction", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to run risk assessment")
      }

      const result = await response.json()
      setPrediction(result)
    } catch (error) {
      setError("Failed to run risk assessment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case "low":
        return <Shield className="w-5 h-5 text-green-500" />
      case "medium":
        return <TrendingUp className="w-5 h-5 text-yellow-500" />
      case "high":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <BarChart3 className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Career Risk Assessment</h2>
        <p className="text-muted-foreground">
          Analyze your layoff risk based on industry trends, role vulnerability, and skill relevance
        </p>
      </div>

      {!isProfileComplete && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            Complete your profile to run a personalized risk assessment.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Shield className="w-5 h-5" />
            Risk Assessment
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Get a comprehensive analysis of your career risk factors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!prediction ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Assess Your Risk?</h3>
              <p className="text-muted-foreground mb-6">
                Run a comprehensive analysis to understand your career security
              </p>
              <Button
                onClick={runAssessment}
                disabled={isLoading || !isProfileComplete}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Run Risk Assessment
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Risk Score */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  {getRiskLevelIcon(prediction.riskLevel)}
                  <div>
                    <div className="text-3xl font-bold text-foreground">{prediction.riskScore}/100</div>
                    <Badge
                      variant="outline"
                      className={`${getRiskLevelColor(prediction.riskLevel)} text-white border-0 mt-2`}
                    >
                      {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)} Risk
                    </Badge>
                  </div>
                </div>
                <Progress value={prediction.riskScore} className="w-full max-w-md mx-auto h-3" />
              </div>

              {/* Risk Factors Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Risk Factor Analysis</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(prediction.factors).map(([factor, score]) => (
                    <div key={factor} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground capitalize">
                          {factor.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="text-foreground font-medium">{score}/100</span>
                      </div>
                      <Progress value={score as number} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Immediate Recommendations</h4>
                <div className="space-y-2">
                  {prediction.recommendations.slice(0, 5).map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={runAssessment} disabled={isLoading} variant="outline" className="bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Assessment
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">View Detailed Report</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
