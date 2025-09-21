"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingUp, TrendingDown, Brain, Target, Activity, Zap, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Profile } from "@/lib/types"

interface AnimatedDashboardProps {
  profile: Profile | null
  isProfileComplete: boolean | undefined
}

export function AnimatedDashboard({ profile, isProfileComplete }: AnimatedDashboardProps) {
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      if (!isProfileComplete) {
        setIsLoading(false)
        return
      }

      try {
        // Simulate loading with animation steps
        setAnimationStep(1)
        await new Promise((resolve) => setTimeout(resolve, 500))

        const predictionResponse = await fetch("/api/prediction")
        const prediction = predictionResponse.ok ? await predictionResponse.json() : null

        setAnimationStep(2)
        await new Promise((resolve) => setTimeout(resolve, 300))

        const skillsResponse = await fetch("/api/user-skills")
        const skills = skillsResponse.ok ? await skillsResponse.json() : []

        setAnimationStep(3)
        await new Promise((resolve) => setTimeout(resolve, 300))

        const recommendationsResponse = await fetch("/api/career-recommendations")
        const recommendations = recommendationsResponse.ok ? await recommendationsResponse.json() : []

        setStats({
          prediction,
          skillsCount: skills.length,
          recommendationsCount: Array.isArray(recommendations)
            ? recommendations.length
            : recommendations.recommendations?.length || 0,
        })

        setAnimationStep(4)
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [isProfileComplete])

  if (!isProfileComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Shield className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-semibold text-foreground mb-2"
        >
          Welcome to CareerGuard
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground mb-6"
        >
          Complete your profile to start your advanced career risk assessment
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg">
            Complete Profile
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <motion.div
                    className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-3/4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  />
                  <motion.div
                    className="h-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-1/2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.2 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-emerald-500"
      case "medium":
        return "text-amber-500"
      case "high":
        return "text-orange-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getRiskLevelGradient = (level: string) => {
    switch (level) {
      case "low":
        return "from-emerald-500/20 to-emerald-600/20"
      case "medium":
        return "from-amber-500/20 to-amber-600/20"
      case "high":
        return "from-orange-500/20 to-orange-600/20"
      case "critical":
        return "from-red-500/20 to-red-600/20"
      default:
        return "from-gray-500/20 to-gray-600/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Cards with Animations */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {/* Risk Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card
              className={`border-border bg-gradient-to-br ${stats?.prediction ? getRiskLevelGradient(stats.prediction.risk_level) : "from-card to-card/80"} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Shield className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
                  </div>
                  {stats?.prediction?.trendAnalysis && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
                      {stats.prediction.trendAnalysis.direction === "improving" ? (
                        <TrendingDown className="w-4 h-4 text-emerald-500" />
                      ) : stats.prediction.trendAnalysis.direction === "declining" ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : (
                        <Activity className="w-4 h-4 text-amber-500" />
                      )}
                    </motion.div>
                  )}
                </div>
                <div className="space-y-2">
                  <motion.div
                    className="text-2xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    {stats?.prediction ? (
                      <span className={getRiskLevelColor(stats.prediction.risk_level)}>
                        {stats.prediction.risk_level.charAt(0).toUpperCase() + stats.prediction.risk_level.slice(1)}
                      </span>
                    ) : (
                      "Not assessed"
                    )}
                  </motion.div>
                  {stats?.prediction && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Progress value={stats.prediction.risk_score} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground">{stats.prediction.risk_score}/100</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="border-border bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Brain className="w-5 h-5 text-blue-500" />
                  </motion.div>
                  <span className="text-sm font-medium text-muted-foreground">Skills Tracked</span>
                </div>
                <motion.div
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {stats?.skillsCount || 0}
                </motion.div>
                <p className="text-sm text-muted-foreground">Professional skills</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommendations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="border-border bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Target className="w-5 h-5 text-emerald-500" />
                  </motion.div>
                  <span className="text-sm font-medium text-muted-foreground">Recommendations</span>
                </div>
                <motion.div
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {stats?.recommendationsCount || 0}
                </motion.div>
                <p className="text-sm text-muted-foreground">Career actions</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Confidence Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="border-border bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="w-5 h-5 text-purple-500" />
                  </motion.div>
                  <span className="text-sm font-medium text-muted-foreground">AI Confidence</span>
                </div>
                <motion.div
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {stats?.prediction?.confidence || 0}%
                </motion.div>
                <p className="text-sm text-muted-foreground">Prediction accuracy</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Market Insights Section */}
      {stats?.prediction?.marketInsights && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="border-border bg-card/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Globe className="w-5 h-5 text-primary" />
                <span>Market Insights</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Real-time analysis of your industry and role market conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <motion.div
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-bold text-blue-500">
                    {stats.prediction.marketInsights.industryGrowth > 0 ? "+" : ""}
                    {stats.prediction.marketInsights.industryGrowth.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Industry Growth</div>
                </motion.div>
                <motion.div
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-bold text-emerald-500">
                    {stats.prediction.marketInsights.roleGrowth.toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Role Security</div>
                </motion.div>
                <motion.div
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-bold text-purple-500">
                    {stats.prediction.marketInsights.skillDemandTrend > 0 ? "+" : ""}
                    {stats.prediction.marketInsights.skillDemandTrend.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Skill Demand</div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Enhanced Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <Card className="border-border bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">AI-Powered Actions</CardTitle>
            <CardDescription className="text-muted-foreground">
              Personalized recommendations to enhance your career security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: "Advanced Risk Analysis",
                  desc: "Deep ML-powered assessment",
                  color: "text-primary",
                  bg: "from-primary/10 to-primary/5",
                },
                {
                  icon: Brain,
                  title: "Skill Gap Analysis",
                  desc: "AI-identified learning priorities",
                  color: "text-blue-500",
                  bg: "from-blue-500/10 to-blue-500/5",
                },
                {
                  icon: Target,
                  title: "Career Pathfinding",
                  desc: "Personalized career roadmap",
                  color: "text-emerald-500",
                  bg: "from-emerald-500/10 to-emerald-500/5",
                },
              ].map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Button
                    variant="outline"
                    className={`h-auto p-4 flex flex-col items-start space-y-2 bg-gradient-to-br ${action.bg} border-border/50 hover:border-border transition-all duration-300`}
                  >
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.desc}</div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
