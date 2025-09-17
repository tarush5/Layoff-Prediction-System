import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Shield, TrendingUp, Users } from "lucide-react"

const metrics = [
  {
    title: "Overall Risk Level",
    value: "23%",
    description: "Company-wide layoff probability",
    icon: AlertTriangle,
    trend: "+2.1% from last month",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "Employees at Risk",
    value: "47",
    description: "High-risk employees identified",
    icon: Users,
    trend: "+5 from last week",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "Skill Gap Score",
    value: "67%",
    description: "Average skill alignment",
    icon: TrendingUp,
    trend: "+8.2% improvement",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Protected Employees",
    value: "156",
    description: "Low-risk with strong skills",
    icon: Shield,
    trend: "+12 this quarter",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
]

const riskDistribution = [
  { level: "Low Risk", count: 156, percentage: 68, color: "bg-green-500" },
  { level: "Medium Risk", count: 47, percentage: 21, color: "bg-yellow-500" },
  { level: "High Risk", count: 25, percentage: 11, color: "bg-red-500" },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Key Metrics</h2>
          <p className="text-sm text-muted">Real-time insights across your organization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
              <p className="text-xs text-muted mt-1">{metric.description}</p>
              <p className="text-xs text-muted mt-2">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Risk Distribution</CardTitle>
            <CardDescription>Employee risk levels across the organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskDistribution.map((item) => (
              <div key={item.level} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-card-foreground">{item.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted">{item.count} employees</span>
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Top Skills in Demand</CardTitle>
            <CardDescription>Skills that reduce layoff risk in your industry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { skill: "Cloud Computing (AWS/Azure)", demand: 92, growth: "+15%" },
                { skill: "Data Analysis & ML", demand: 87, growth: "+22%" },
                { skill: "Project Management", demand: 78, growth: "+8%" },
                { skill: "Cybersecurity", demand: 74, growth: "+18%" },
                { skill: "Full-Stack Development", demand: 69, growth: "+12%" },
              ].map((item) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">{item.skill}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.growth}
                      </Badge>
                      <span className="text-sm text-muted">{item.demand}%</span>
                    </div>
                  </div>
                  <Progress value={item.demand} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
