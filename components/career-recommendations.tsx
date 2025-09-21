"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, TrendingUp, AlertTriangle, RefreshCw, MapPin } from "lucide-react"
import { CareerRecommendationCard } from "@/components/career-recommendation-card"
import { CareerPathCard } from "@/components/career-path-card"
import { ActionPlan } from "@/components/action-plan"
import type { Profile } from "@/lib/types"

interface CareerRecommendationsProps {
  profile: Profile | null
  isProfileComplete: boolean | undefined
}

export function CareerRecommendations({ profile, isProfileComplete }: CareerRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateRecommendations = async () => {
    if (!isProfileComplete) {
      setError("Please complete your profile and run a risk assessment first")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/career-recommendations", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to generate recommendations")
      }

      const result = await response.json()
      setRecommendations(result)
    } catch (error) {
      setError("Failed to generate recommendations. Please ensure you have completed a risk assessment first.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Auto-generate recommendations if profile is complete
    if (isProfileComplete) {
      generateRecommendations()
    }
  }, [isProfileComplete])

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Career Recommendations</h2>
        <p className="text-muted-foreground">
          Personalized guidance to improve your career security and growth prospects
        </p>
      </div>

      {!isProfileComplete && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            Complete your profile and run a risk assessment to get personalized career recommendations.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {!recommendations && !isLoading && isProfileComplete && (
        <Card className="border-border bg-card">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Get Career Recommendations</h3>
            <p className="text-muted-foreground mb-6">
              Generate personalized recommendations based on your risk assessment and skills
            </p>
            <Button
              onClick={generateRecommendations}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate Recommendations
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
            <h3 className="text-lg font-semibold text-foreground mb-2">Generating Recommendations</h3>
            <p className="text-muted-foreground">Analyzing your profile and creating personalized guidance...</p>
          </CardContent>
        </Card>
      )}

      {recommendations && (
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="career-paths" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Career Paths
            </TabsTrigger>
            <TabsTrigger value="action-plan" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Action Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {recommendations.recommendations.map((rec: any, index: number) => (
                <CareerRecommendationCard key={index} recommendation={rec} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="career-paths" className="space-y-6">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Alternative Career Paths</h3>
                <p className="text-muted-foreground">
                  Explore career opportunities that match your skills and reduce risk
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {recommendations.careerPaths.map((path: any, index: number) => (
                  <CareerPathCard key={index} careerPath={path} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="action-plan" className="space-y-6">
            <ActionPlan actionPlan={recommendations.actionPlan} />
          </TabsContent>
        </Tabs>
      )}

      {recommendations && (
        <div className="text-center">
          <Button onClick={generateRecommendations} disabled={isLoading} variant="outline" className="bg-transparent">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Recommendations
          </Button>
        </div>
      )}
    </div>
  )
}
