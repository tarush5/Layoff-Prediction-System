import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Circle, Clock } from "lucide-react"
import type { ActionPlan as ActionPlanType } from "@/lib/career-recommendations"

interface ActionPlanProps {
  actionPlan: ActionPlanType
}

export function ActionPlan({ actionPlan }: ActionPlanProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "skill":
        return "📚"
      case "network":
        return "🤝"
      case "experience":
        return "💼"
      case "certification":
        return "🏆"
      default:
        return "📋"
    }
  }

  const ActionSection = ({
    title,
    items,
    timeframe,
  }: {
    title: string
    items: ActionPlanType["immediate"]
    timeframe: string
  }) => (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-card-foreground">{title}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {timeframe}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border">
              <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{getCategoryIcon(item.category)}</span>
                  <span className="text-sm font-medium text-card-foreground">{item.task}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {item.timeline}
                  </div>
                  <Badge variant="outline" className={`${getPriorityColor(item.priority)} text-white border-0 text-xs`}>
                    {item.priority}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Your Career Action Plan</h2>
        <p className="text-muted-foreground">A structured roadmap to improve your career security</p>
      </div>

      <div className="grid gap-6">
        <ActionSection title="Immediate Actions" items={actionPlan.immediate} timeframe="Next 30 days" />
        <ActionSection title="Short-term Goals" items={actionPlan.shortTerm} timeframe="1-6 months" />
        <ActionSection title="Long-term Strategy" items={actionPlan.longTerm} timeframe="6+ months" />
      </div>
    </div>
  )
}
