import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, TrendingUp, ExternalLink, Star } from "lucide-react"
import type { CareerRecommendation } from "@/lib/career-recommendations"

interface CareerRecommendationCardProps {
  recommendation: CareerRecommendation
}

export function CareerRecommendationCard({ recommendation }: CareerRecommendationCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "skill_development":
        return "bg-blue-500"
      case "career_pivot":
        return "bg-purple-500"
      case "industry_switch":
        return "bg-green-500"
      case "role_upgrade":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "skill_development":
        return "Skill Development"
      case "career_pivot":
        return "Career Pivot"
      case "industry_switch":
        return "Industry Switch"
      case "role_upgrade":
        return "Role Upgrade"
      default:
        return type
    }
  }

  const getPriorityStars = (priority: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < priority ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${getTypeColor(recommendation.type)} text-white border-0`}>
            {getTypeLabel(recommendation.type)}
          </Badge>
          <div className="flex items-center gap-1">{getPriorityStars(recommendation.priority)}</div>
        </div>
        <CardTitle className="text-lg text-card-foreground">{recommendation.title}</CardTitle>
        <CardDescription className="text-muted-foreground">{recommendation.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timeline and Risk Reduction */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Timeline
            </div>
            <div className="text-sm font-medium text-card-foreground">{recommendation.estimatedTimeline}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              Risk Reduction
            </div>
            <div className="flex items-center gap-2">
              <Progress value={recommendation.riskReduction} className="h-2 flex-1" />
              <span className="text-sm font-medium text-card-foreground">{recommendation.riskReduction}%</span>
            </div>
          </div>
        </div>

        {/* Expected Outcome */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-card-foreground">Expected Outcome</h4>
          <p className="text-sm text-muted-foreground">{recommendation.expectedOutcome}</p>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">Recommended Resources</h4>
          <div className="space-y-2">
            {recommendation.resources.slice(0, 2).map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-card-foreground">{resource.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{resource.provider}</span>
                    <span>{resource.timeCommitment}</span>
                    <Badge variant="outline" className="text-xs">
                      {resource.cost}
                    </Badge>
                  </div>
                </div>
                {resource.url && (
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Start This Recommendation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
