"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  Building,
  Globe,
  Users,
  Zap,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  Target,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Profile } from "@/lib/types"

interface EnhancedRiskAssessmentProps {
  profile: Profile | null
  isProfileComplete: boolean | undefined
}

export function EnhancedRiskAssessment({ profile, isProfileComplete }: EnhancedRiskAssessmentProps) {
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
        throw new Error("Failed to run assessment")
      }

      const result = await response.json()
      setPrediction(result)
    } catch (error) {
      setError("Failed to run risk assessment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isProfileComplete && !prediction) {
      // Auto-run assessment if profile is complete
      runAssessment()
    }
  }, [isProfileComplete])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return { text: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" }
      case "medium":
        return { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" }
      case "high":
        return { text: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" }
      case "critical":
        return { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" }
      default:
        return { text: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" }
    }
  }

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "improving":
        return <TrendingDown className="w-4 h-4 text-emerald-500" />
      case "declining":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-amber-500" />
    }
  }

  if (!isProfileComplete) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Risk Assessment</h2>
        <p className="text-muted-foreground mb-6">Complete your profile to get an AI-powered career risk assessment</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {/* Assessment Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">Advanced Risk Assessment</h2>
          <p className="text-muted-foreground">AI-powered career risk analysis with market insights</p>
        </div>
        <Button onClick={runAssessment} disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Run Assessment
            </>
          )}
        </Button>
      </motion.div>

      {prediction && (
        <AnimatePresence>
          {/* Main Risk Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card
              className={`${getRiskColor(prediction.riskLevel).bg} ${getRiskColor(prediction.riskLevel).border} border-2`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className={`w-6 h-6 ${getRiskColor(prediction.riskLevel).text}`} />
                    <span>Overall Risk Assessment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {prediction.trendAnalysis && getTrendIcon(prediction.trendAnalysis.direction)}
                    <Badge variant="outline" className={getRiskColor(prediction.riskLevel).text}>
                      {prediction.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <motion.div
                      className={`text-4xl font-bold ${getRiskColor(prediction.riskLevel).text}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    >
                      {prediction.riskScore}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {prediction.confidence}%
                    </motion.div>
                    <div className="text-sm text-muted-foreground">AI Confidence</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {prediction.trendAnalysis?.projectedRisk || prediction.riskScore}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">6-Month Projection</div>
                  </div>
                </div>

                {prediction.trendAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-3 rounded-lg bg-background/50"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Career Trend:</span>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(prediction.trendAnalysis.direction)}
                        <span className="font-medium capitalize">{prediction.trendAnalysis.direction}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Factors Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Risk Factor Analysis</span>
                </CardTitle>
                <CardDescription>Detailed breakdown of factors contributing to your career risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(prediction.factors).map(([factor, value], index) => (
                    <motion.div
                      key={factor}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium capitalize">{factor.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span
                          className={`font-bold ${value > 60 ? "text-red-500" : value > 40 ? "text-amber-500" : "text-emerald-500"}`}
                        >
                          {Math.round(value as number)}%
                        </span>
                      </div>
                      <Progress value={value as number} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Market Insights */}
          {prediction.marketInsights && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span>Market Intelligence</span>
                  </CardTitle>
                  <CardDescription>Real-time market analysis for your industry and role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <motion.div
                      className="text-center p-4 rounded-lg bg-blue-500/10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Building className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-500">
                        {prediction.marketInsights.industryGrowth > 0 ? "+" : ""}
                        {prediction.marketInsights.industryGrowth.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Industry Growth</div>
                    </motion.div>
                    <motion.div
                      className="text-center p-4 rounded-lg bg-emerald-500/10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Users className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-emerald-500">
                        {prediction.marketInsights.roleGrowth.toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Role Security</div>
                    </motion.div>
                    <motion.div
                      className="text-center p-4 rounded-lg bg-purple-500/10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-500">
                        {prediction.marketInsights.skillDemandTrend > 0 ? "+" : ""}
                        {prediction.marketInsights.skillDemandTrend.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Skill Demand</div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* AI Recommendations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <span>AI-Generated Recommendations</span>
                </CardTitle>
                <CardDescription>Personalized actions to reduce your career risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prediction.recommendations.map((recommendation: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">{recommendation}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
