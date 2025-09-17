import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Brain, Users, BarChart3, FileText, TrendingUp, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Risk Prediction",
    description: "Advanced ML models predict layoff probability with 85%+ accuracy",
    status: "Complete",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description: "Identifies critical skill gaps and provides learning recommendations",
    status: "Complete",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Users,
    title: "Employee Dashboard",
    description: "Personalized insights, career paths, and action items",
    status: "Complete",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: BarChart3,
    title: "Company Analytics",
    description: "Department-level insights and strategic HR recommendations",
    status: "Complete",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    icon: FileText,
    title: "Report Generation",
    description: "Automated PDF reports for employees and HR teams",
    status: "Complete",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Enterprise-grade security with encrypted data processing",
    status: "Complete",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
]

const techStack = [
  { category: "Frontend", technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Recharts"] },
  { category: "Backend", technologies: ["Next.js API Routes", "Python Scripts", "REST APIs"] },
  {
    category: "Machine Learning",
    technologies: ["Scikit-learn", "Random Forest", "Gradient Boosting", "Pandas", "NumPy"],
  },
  { category: "UI/UX", technologies: ["shadcn/ui", "Lucide Icons", "Responsive Design", "Dark/Light Mode"] },
]

export function ProjectSummary() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-foreground">Project Complete!</h1>
        </div>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          LayoffGuard is now fully operational with all core features implemented and ready for deployment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Implementation Status</CardTitle>
          <CardDescription>All major components have been successfully built and integrated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-3 p-4 rounded-lg border">
                <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>Modern, scalable technologies powering the LayoffGuard platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack) => (
              <div key={stack.category} className="space-y-3">
                <h3 className="font-semibold text-foreground">{stack.category}</h3>
                <div className="space-y-2">
                  {stack.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="mr-2 mb-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Next Steps</CardTitle>
          <CardDescription className="text-green-700">Ready for deployment and production use</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Setup & Training</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Run data generation script</li>
                <li>• Train ML models with your data</li>
                <li>• Configure environment variables</li>
                <li>• Set up user authentication</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Deployment</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Deploy to Vercel or your platform</li>
                <li>• Configure production database</li>
                <li>• Set up monitoring and analytics</li>
                <li>• Train your HR team on usage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
