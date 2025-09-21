import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ExternalLink, Clock, DollarSign } from "lucide-react"
import type { SkillGapAnalysis } from "@/lib/skill-analysis"

interface SkillGapCardProps {
  skillGap: SkillGapAnalysis
}

export function SkillGapCard({ skillGap }: SkillGapCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  const getCostIcon = (cost: string) => {
    switch (cost) {
      case "free":
        return "text-green-500"
      case "paid":
        return "text-orange-500"
      default:
        return "text-blue-500"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-card-foreground">{skillGap.skill.name}</CardTitle>
          <Badge variant="outline" className={`${getSeverityColor(skillGap.gapSeverity)} text-white border-0`}>
            {skillGap.gapSeverity}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">{skillGap.skill.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Importance and Market Demand */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Importance</span>
              <span className="text-card-foreground font-medium">{skillGap.importanceScore}%</span>
            </div>
            <Progress value={skillGap.importanceScore} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Market Demand</span>
              <span className="text-card-foreground font-medium">{skillGap.marketDemand}%</span>
            </div>
            <Progress value={skillGap.marketDemand} className="h-2" />
          </div>
        </div>

        {/* Learning Resources */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Learning Resources
          </h4>
          <div className="space-y-2">
            {skillGap.learningResources.slice(0, 3).map((resource, index) => (
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
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.duration}
                    </div>
                    <div className={`flex items-center gap-1 ${getCostIcon(resource.cost)}`}>
                      <DollarSign className="w-3 h-3" />
                      {resource.cost}
                    </div>
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
      </CardContent>
    </Card>
  )
}
