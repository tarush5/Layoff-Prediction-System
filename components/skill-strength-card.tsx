import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp } from "lucide-react"
import type { SkillStrength } from "@/lib/skill-analysis"

interface SkillStrengthCardProps {
  strength: SkillStrength
}

export function SkillStrengthCard({ strength }: SkillStrengthCardProps) {
  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 5:
        return "Expert"
      case 4:
        return "Advanced"
      case 3:
        return "Intermediate"
      case 2:
        return "Beginner"
      default:
        return "Novice"
    }
  }

  const getMarketValueColor = (value: number) => {
    if (value >= 90) return "text-green-500"
    if (value >= 70) return "text-blue-500"
    if (value >= 50) return "text-yellow-500"
    return "text-gray-500"
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-card-foreground">{strength.skill.name}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-card-foreground">Strength</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Proficiency Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Proficiency</span>
            <Badge variant="secondary">{getProficiencyLabel(strength.proficiencyLevel)}</Badge>
          </div>
          <Progress value={(strength.proficiencyLevel / 5) * 100} className="h-2" />
        </div>

        {/* Experience and Market Value */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Experience</span>
            <div className="text-lg font-semibold text-card-foreground">
              {strength.yearsExperience} {strength.yearsExperience === 1 ? "year" : "years"}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Market Value</span>
            <div
              className={`text-lg font-semibold flex items-center gap-1 ${getMarketValueColor(strength.marketValue)}`}
            >
              <TrendingUp className="w-4 h-4" />
              {strength.marketValue}%
            </div>
          </div>
        </div>

        {/* Skill Category */}
        <div className="pt-2 border-t border-border">
          <Badge variant="outline" className="text-xs">
            {strength.skill.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
