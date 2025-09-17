"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BookOpen, Video, Award, Clock } from "lucide-react"

interface LearningResource {
  title: string
  provider: string
  type: "course" | "certification" | "bootcamp" | "tutorial"
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  price: string
  url: string
  skills: string[]
}

const learningResources: LearningResource[] = [
  {
    title: "AWS Cloud Practitioner Certification",
    provider: "Amazon Web Services",
    type: "certification",
    duration: "40 hours",
    level: "Beginner",
    rating: 4.8,
    price: "$100",
    url: "#",
    skills: ["Cloud Computing", "AWS", "Infrastructure"],
  },
  {
    title: "Machine Learning Specialization",
    provider: "Coursera",
    type: "course",
    duration: "3 months",
    level: "Intermediate",
    rating: 4.9,
    price: "$49/month",
    url: "#",
    skills: ["Machine Learning", "Python", "Data Science"],
  },
  {
    title: "React Complete Developer Course",
    provider: "Udemy",
    type: "course",
    duration: "52 hours",
    level: "Intermediate",
    rating: 4.7,
    price: "$89.99",
    url: "#",
    skills: ["React", "JavaScript", "Frontend Development"],
  },
  {
    title: "Project Management Professional (PMP)",
    provider: "PMI",
    type: "certification",
    duration: "6 months",
    level: "Advanced",
    rating: 4.6,
    price: "$555",
    url: "#",
    skills: ["Project Management", "Leadership", "Agile"],
  },
  {
    title: "Full Stack Web Development Bootcamp",
    provider: "The Odin Project",
    type: "bootcamp",
    duration: "12 months",
    level: "Beginner",
    rating: 4.5,
    price: "Free",
    url: "#",
    skills: ["Full Stack", "JavaScript", "Node.js", "React"],
  },
  {
    title: "Cybersecurity Fundamentals",
    provider: "edX",
    type: "course",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.4,
    price: "$99",
    url: "#",
    skills: ["Cybersecurity", "Network Security", "Risk Management"],
  },
]

interface LearningResourcesProps {
  recommendedSkills?: string[]
}

export function LearningResources({ recommendedSkills = [] }: LearningResourcesProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "certification":
        return <Award className="w-4 h-4" />
      case "bootcamp":
        return <Video className="w-4 h-4" />
      case "tutorial":
        return <BookOpen className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "certification":
        return "bg-purple-100 text-purple-800"
      case "bootcamp":
        return "bg-blue-100 text-blue-800"
      case "course":
        return "bg-green-100 text-green-800"
      case "tutorial":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Filter resources based on recommended skills if provided
  const filteredResources =
    recommendedSkills.length > 0
      ? learningResources.filter((resource) =>
          resource.skills.some((skill) =>
            recommendedSkills.some(
              (rec) =>
                skill.toLowerCase().includes(rec.toLowerCase()) || rec.toLowerCase().includes(skill.toLowerCase()),
            ),
          ),
        )
      : learningResources

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Learning Resources</h2>
          <p className="text-muted mt-1">
            {recommendedSkills.length > 0
              ? "Curated resources based on your skill gaps"
              : "Popular courses and certifications to advance your career"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(resource.type)}
                  <Badge className={getTypeColor(resource.type)} variant="secondary">
                    {resource.type}
                  </Badge>
                </div>
                <Badge className={getLevelColor(resource.level)} variant="secondary">
                  {resource.level}
                </Badge>
              </div>
              <CardTitle className="text-lg text-card-foreground">{resource.title}</CardTitle>
              <CardDescription>{resource.provider}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-muted" />
                  <span className="text-muted">{resource.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-muted">{resource.rating}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted">Skills covered:</p>
                <div className="flex flex-wrap gap-1">
                  {resource.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-bold text-card-foreground">{resource.price}</span>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && recommendedSkills.length > 0 && (
        <Card className="bg-card">
          <CardContent className="text-center py-8">
            <p className="text-muted">No specific resources found for your recommended skills.</p>
            <p className="text-muted mt-2">Check out our general learning resources above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
