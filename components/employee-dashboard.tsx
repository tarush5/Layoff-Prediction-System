"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  User,
  Shield,
  TrendingUp,
  Calendar,
  Target,
  BookOpen,
  Award,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react"

interface EmployeeProfile {
  id: string
  name: string
  email: string
  role: string
  department: string
  experience: number
  joinDate: string
  avatar: string
  riskScore: number
  riskLevel: "Low" | "Medium" | "High"
  skillScore: number
  lastAssessment: string
}

interface ActionItem {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  category: "skill" | "performance" | "networking" | "certification"
  estimatedTime: string
  impact: string
  completed: boolean
  dueDate: string
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: "skill" | "certification" | "performance" | "milestone"
}

// Mock employee data
const mockEmployee: EmployeeProfile = {
  id: "EMP_001",
  name: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  role: "Senior Software Engineer",
  department: "Engineering",
  experience: 6,
  joinDate: "2019-03-15",
  avatar: "/professional-woman-diverse.png",
  riskScore: 23,
  riskLevel: "Low",
  skillScore: 78,
  lastAssessment: "2024-01-10",
}

const mockActionItems: ActionItem[] = [
  {
    id: "1",
    title: "Complete AWS Cloud Practitioner Certification",
    description: "Gain cloud computing skills to stay competitive in the market",
    priority: "High",
    category: "certification",
    estimatedTime: "40 hours",
    impact: "Reduces risk by 15%",
    completed: false,
    dueDate: "2024-03-01",
  },
  {
    id: "2",
    title: "Learn Machine Learning Fundamentals",
    description: "Add AI/ML skills to your technical toolkit",
    priority: "High",
    category: "skill",
    estimatedTime: "60 hours",
    impact: "Reduces risk by 20%",
    completed: false,
    dueDate: "2024-04-15",
  },
  {
    id: "3",
    title: "Attend Industry Networking Event",
    description: "Build professional connections in your field",
    priority: "Medium",
    category: "networking",
    estimatedTime: "4 hours",
    impact: "Improves visibility",
    completed: true,
    dueDate: "2024-01-20",
  },
  {
    id: "4",
    title: "Update LinkedIn Profile",
    description: "Showcase your latest skills and achievements",
    priority: "Medium",
    category: "performance",
    estimatedTime: "2 hours",
    impact: "Improves marketability",
    completed: false,
    dueDate: "2024-02-01",
  },
]

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "React Advanced Certification",
    description: "Completed advanced React development course",
    date: "2024-01-05",
    type: "certification",
  },
  {
    id: "2",
    title: "Performance Excellence Award",
    description: "Recognized for outstanding project delivery",
    date: "2023-12-15",
    type: "performance",
  },
  {
    id: "3",
    title: "5 Years of Service",
    description: "Celebrating 5 years with the company",
    date: "2024-03-15",
    type: "milestone",
  },
]

export function EmployeeDashboard() {
  const [employee] = useState<EmployeeProfile>(mockEmployee)
  const [actionItems, setActionItems] = useState<ActionItem[]>(mockActionItems)
  const [achievements] = useState<Achievement[]>(mockAchievements)

  const toggleActionItem = (id: string) => {
    setActionItems((items) => items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "High":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "skill":
        return <BookOpen className="w-4 h-4" />
      case "certification":
        return <Award className="w-4 h-4" />
      case "networking":
        return <User className="w-4 h-4" />
      case "performance":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "certification":
        return <Award className="w-5 h-5 text-yellow-600" />
      case "performance":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "milestone":
        return <Calendar className="w-5 h-5 text-blue-600" />
      case "skill":
        return <BookOpen className="w-5 h-5 text-purple-600" />
      default:
        return <Target className="w-5 h-5 text-gray-600" />
    }
  }

  const completedActions = actionItems.filter((item) => item.completed).length
  const totalActions = actionItems.length
  const progressPercentage = (completedActions / totalActions) * 100

  return (
    <div className="space-y-6">
      {/* Employee Profile Header */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback className="text-lg">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground">{employee.name}</h2>
              <p className="text-muted">
                {employee.role} • {employee.department}
              </p>
              <p className="text-sm text-muted mt-1">
                {employee.experience} years experience • Joined {new Date(employee.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right space-y-2">
              <Badge className={getRiskColor(employee.riskLevel)}>{employee.riskLevel} Risk</Badge>
              <p className="text-sm text-muted">
                Last assessment: {new Date(employee.lastAssessment).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Risk Score</CardTitle>
            <Shield className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{employee.riskScore}%</div>
            <Progress value={employee.riskScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Skill Score</CardTitle>
            <TrendingUp className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{employee.skillScore}%</div>
            <Progress value={employee.skillScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Action Items</CardTitle>
            <Target className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {completedActions}/{totalActions}
            </div>
            <Progress value={progressPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Achievements</CardTitle>
            <Award className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{achievements.length}</div>
            <p className="text-xs text-muted mt-2">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="actions">Action Items</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Career Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">{employee.riskScore}%</div>
                  <Badge className={getRiskColor(employee.riskLevel)}>{employee.riskLevel} Risk Level</Badge>
                </div>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Good News!</AlertTitle>
                  <AlertDescription>
                    Your job security is strong. Keep developing your skills to maintain this position.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Clock className="w-5 h-5 text-destructive" />
                  <span>Upcoming Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {actionItems
                  .filter((item) => !item.completed)
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(item.category)}
                        <div>
                          <p className="font-medium text-card-foreground text-sm">{item.title}</p>
                          <p className="text-xs text-muted">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(item.priority)} variant="secondary">
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Completed React Advanced Certification", date: "2 days ago", type: "success" },
                  { action: "Updated skill profile with new technologies", date: "1 week ago", type: "info" },
                  { action: "Attended virtual networking event", date: "2 weeks ago", type: "info" },
                  { action: "Risk assessment updated", date: "3 weeks ago", type: "warning" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">{activity.action}</p>
                      <p className="text-xs text-muted">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {actionItems.map((item) => (
              <Card key={item.id} className={`bg-card ${item.completed ? "opacity-75" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(item.category)}
                      <CardTitle className="text-lg text-card-foreground">{item.title}</CardTitle>
                    </div>
                    <Badge className={getPriorityColor(item.priority)} variant="secondary">
                      {item.priority}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted">Estimated Time:</p>
                      <p className="font-medium text-card-foreground">{item.estimatedTime}</p>
                    </div>
                    <div>
                      <p className="text-muted">Impact:</p>
                      <p className="font-medium text-green-600">{item.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                    <Button
                      variant={item.completed ? "secondary" : "default"}
                      size="sm"
                      onClick={() => toggleActionItem(item.id)}
                      className="flex items-center space-x-2"
                    >
                      {item.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4" />
                          <span>Start</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="bg-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {getAchievementIcon(achievement.type)}
                    <div>
                      <CardTitle className="text-lg text-card-foreground">{achievement.title}</CardTitle>
                      <CardDescription>{new Date(achievement.date).toLocaleDateString()}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Career Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>Skill Development Focus</AlertTitle>
                  <AlertDescription>
                    Cloud computing and AI/ML skills are in high demand in your field. Consider prioritizing these
                    areas.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <User className="h-4 w-4" />
                  <AlertTitle>Networking Opportunity</AlertTitle>
                  <AlertDescription>
                    Attend the upcoming Tech Leadership Summit to expand your professional network.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Your Role Outlook</h4>
                  <p className="text-sm text-muted">
                    Senior Software Engineers with cloud and AI skills are seeing 15% salary growth year-over-year.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Industry Trends</h4>
                  <p className="text-sm text-muted">
                    Remote work flexibility and technical leadership skills are becoming increasingly valuable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
