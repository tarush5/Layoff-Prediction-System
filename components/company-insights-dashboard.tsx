"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Building,
  Target,
  Award,
  Calendar,
  DollarSign,
} from "lucide-react"

// Mock data for company insights
const departmentRiskData = [
  { department: "Marketing", employees: 45, highRisk: 12, mediumRisk: 18, lowRisk: 15, avgRisk: 35 },
  { department: "Sales", employees: 38, highRisk: 8, mediumRisk: 15, lowRisk: 15, avgRisk: 28 },
  { department: "Engineering", employees: 85, highRisk: 5, mediumRisk: 25, lowRisk: 55, avgRisk: 18 },
  { department: "HR", employees: 12, highRisk: 3, mediumRisk: 4, lowRisk: 5, avgRisk: 42 },
  { department: "Finance", employees: 28, highRisk: 4, mediumRisk: 8, lowRisk: 16, avgRisk: 22 },
  { department: "Operations", employees: 32, highRisk: 6, mediumRisk: 12, lowRisk: 14, avgRisk: 31 },
]

const layoffTrendsData = [
  { month: "Jan", layoffs: 8, predictions: 12, industry: 15 },
  { month: "Feb", layoffs: 12, predictions: 10, industry: 18 },
  { month: "Mar", layoffs: 6, predictions: 8, industry: 22 },
  { month: "Apr", layoffs: 15, predictions: 14, industry: 25 },
  { month: "May", layoffs: 9, predictions: 11, industry: 20 },
  { month: "Jun", layoffs: 4, predictions: 6, industry: 16 },
]

const skillGapData = [
  { skill: "Cloud Computing", gap: 65, demand: 92, supply: 27 },
  { skill: "AI/ML", gap: 58, demand: 87, supply: 29 },
  { skill: "Data Analysis", gap: 45, demand: 85, supply: 40 },
  { skill: "Cybersecurity", gap: 52, demand: 74, supply: 22 },
  { skill: "Project Management", gap: 38, demand: 78, supply: 40 },
  { skill: "Leadership", gap: 42, demand: 65, supply: 23 },
]

const retentionData = [
  { quarter: "Q1 2023", retention: 94, satisfaction: 78, engagement: 82 },
  { quarter: "Q2 2023", retention: 92, satisfaction: 75, engagement: 79 },
  { quarter: "Q3 2023", retention: 89, satisfaction: 72, engagement: 76 },
  { quarter: "Q4 2023", retention: 91, satisfaction: 76, engagement: 80 },
  { quarter: "Q1 2024", retention: 93, satisfaction: 79, engagement: 83 },
]

const riskDistribution = [
  { name: "Low Risk", value: 156, color: "#10b981" },
  { name: "Medium Risk", value: 67, color: "#f59e0b" },
  { name: "High Risk", value: 25, color: "#ef4444" },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

export function CompanyInsightsDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const totalEmployees = departmentRiskData.reduce((sum, dept) => sum + dept.employees, 0)
  const totalHighRisk = departmentRiskData.reduce((sum, dept) => sum + dept.highRisk, 0)
  const avgCompanyRisk = Math.round(
    departmentRiskData.reduce((sum, dept) => sum + dept.avgRisk * dept.employees, 0) / totalEmployees,
  )

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Employees</CardTitle>
            <Users className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{totalEmployees}</div>
            <p className="text-xs text-muted mt-1">+12 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Average Risk Score</CardTitle>
            <Shield className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{avgCompanyRisk}%</div>
            <p className="text-xs text-green-600 mt-1">-3% from last quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">High Risk Employees</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{totalHighRisk}</div>
            <p className="text-xs text-destructive mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Retention Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">93%</div>
            <p className="text-xs text-green-600 mt-1">+2% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="recommendations">Actions</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Distribution */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Risk Distribution</CardTitle>
                <CardDescription>Employee risk levels across the organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  {riskDistribution.map((item, index) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-card-foreground">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Layoff Trends */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Layoff Trends</CardTitle>
                <CardDescription>Company vs Industry comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={layoffTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="layoffs" stroke="#8b5cf6" strokeWidth={2} name="Our Company" />
                      <Line type="monotone" dataKey="industry" stroke="#ef4444" strokeWidth={2} name="Industry Avg" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Gap Analysis */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Organization Skill Gaps</CardTitle>
              <CardDescription>Critical skills needed across the company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillGapData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="demand" fill="#8b5cf6" name="Market Demand" />
                    <Bar dataKey="supply" fill="#10b981" name="Current Supply" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Risk Breakdown */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Department Risk Analysis</CardTitle>
                <CardDescription>Risk distribution by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentRiskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="lowRisk" stackId="a" fill="#10b981" name="Low Risk" />
                      <Bar dataKey="mediumRisk" stackId="a" fill="#f59e0b" name="Medium Risk" />
                      <Bar dataKey="highRisk" stackId="a" fill="#ef4444" name="High Risk" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Department Details */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Department Insights</CardTitle>
                <CardDescription>Detailed breakdown by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departmentRiskData.map((dept) => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-accent" />
                        <span className="font-medium text-card-foreground">{dept.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="secondary"
                          className={
                            dept.avgRisk > 40
                              ? "bg-red-100 text-red-800"
                              : dept.avgRisk > 25
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {dept.avgRisk}% avg risk
                        </Badge>
                        <span className="text-sm text-muted">{dept.employees} employees</span>
                      </div>
                    </div>
                    <Progress value={dept.avgRisk} className="h-2" />
                    <div className="flex justify-between text-xs text-muted">
                      <span>High: {dept.highRisk}</span>
                      <span>Medium: {dept.mediumRisk}</span>
                      <span>Low: {dept.lowRisk}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Retention Trends */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Employee Retention Trends</CardTitle>
                <CardDescription>Retention, satisfaction, and engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={retentionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="retention"
                        stackId="1"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.6}
                        name="Retention %"
                      />
                      <Area
                        type="monotone"
                        dataKey="satisfaction"
                        stackId="2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                        name="Satisfaction %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Predictive Analytics */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Predictive Insights</CardTitle>
                <CardDescription>AI-powered predictions for next quarter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-card-foreground">Layoff Risk Decreasing</span>
                  </div>
                  <p className="text-sm text-muted">
                    Predicted 15% reduction in high-risk employees by Q2 2024 based on current skill development
                    initiatives.
                  </p>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="font-medium text-card-foreground">Skill Gap Improvement</span>
                  </div>
                  <p className="text-sm text-muted">
                    Cloud computing skills expected to improve by 25% with current training programs.
                  </p>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-card-foreground">Retention Forecast</span>
                  </div>
                  <p className="text-sm text-muted">
                    Employee retention expected to reach 95% by end of year with current engagement initiatives.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strategic Recommendations */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Target className="w-5 h-5 text-accent" />
                  <span>Strategic Recommendations</span>
                </CardTitle>
                <CardDescription>High-impact actions for leadership</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">Implement Cloud Training Program</h4>
                    <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                  </div>
                  <p className="text-sm text-muted mb-2">
                    65% skill gap in cloud computing. Immediate training could reduce layoff risk by 20%.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>$50K investment</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>3-month timeline</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">Focus on Marketing Department</h4>
                    <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                  </div>
                  <p className="text-sm text-muted mb-2">
                    Marketing has highest average risk (35%). Consider targeted skill development and role
                    restructuring.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>45 employees affected</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">Leadership Development Program</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
                  </div>
                  <p className="text-sm text-muted mb-2">
                    42% skill gap in leadership. Developing internal leaders can improve retention and reduce external
                    hiring costs.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Department-Specific Actions */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>Department Actions</span>
                </CardTitle>
                <CardDescription>Targeted interventions by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    dept: "Marketing",
                    action: "Digital Marketing Certification Program",
                    impact: "Reduce risk by 25%",
                    timeline: "2 months",
                  },
                  {
                    dept: "HR",
                    action: "People Analytics Training",
                    impact: "Reduce risk by 30%",
                    timeline: "6 weeks",
                  },
                  {
                    dept: "Sales",
                    action: "CRM and Sales Tech Upskilling",
                    impact: "Reduce risk by 18%",
                    timeline: "1 month",
                  },
                  {
                    dept: "Operations",
                    action: "Process Automation Workshop",
                    impact: "Reduce risk by 22%",
                    timeline: "3 months",
                  },
                ].map((item, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-card-foreground">{item.dept}</span>
                      <span className="text-xs text-green-600">{item.impact}</span>
                    </div>
                    <p className="text-sm text-muted mb-1">{item.action}</p>
                    <span className="text-xs text-muted">Timeline: {item.timeline}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
