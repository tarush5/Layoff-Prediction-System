import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Clock, BarChart } from "lucide-react"
import type { CareerPath } from "@/lib/career-recommendations"

interface CareerPathCardProps {
  careerPath: CareerPath
}

export function CareerPathCard({ careerPath }: CareerPathCardProps) {
  const getGrowthColor = (outlook: string) => {
    switch (outlook) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "moderate":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-card-foreground">{careerPath.title}</CardTitle>
          <Badge variant="outline" className={`${getDifficultyColor(careerPath.difficulty)} text-white border-0`}>
            {careerPath.difficulty} difficulty
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">{careerPath.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              Average Salary
            </div>
            <div className="text-sm font-semibold text-card-foreground">{careerPath.averageSalary}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart className="w-4 h-4" />
              Growth Outlook
            </div>
            <div className={`text-sm font-semibold capitalize ${getGrowthColor(careerPath.growthOutlook)}`}>
              {careerPath.growthOutlook}
            </div>
          </div>
        </div>

        {/* Transition Timeline */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Time to Transition
          </div>
          <div className="text-sm font-medium text-card-foreground">{careerPath.timeToTransition}</div>
        </div>

        {/* Required Skills */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {careerPath.requiredSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button variant="outline" className="w-full bg-transparent">
            <TrendingUp className="w-4 h-4 mr-2" />
            Explore This Path
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
