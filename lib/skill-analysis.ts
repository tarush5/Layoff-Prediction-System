import type { UserSkill, Skill } from "./types"

export interface SkillAnalysisResult {
  skillGaps: SkillGapAnalysis[]
  strengthAreas: SkillStrength[]
  overallScore: number
  recommendations: SkillRecommendation[]
}

export interface SkillGapAnalysis {
  skill: Skill
  importanceScore: number
  marketDemand: number
  gapSeverity: "low" | "medium" | "high" | "critical"
  learningResources: LearningResource[]
}

export interface SkillStrength {
  skill: Skill
  proficiencyLevel: number
  yearsExperience: number
  marketValue: number
}

export interface SkillRecommendation {
  type: "learn_new" | "improve_existing" | "maintain_strength"
  skill: Skill
  priority: number
  timeframe: string
  description: string
}

export interface LearningResource {
  type: "course" | "certification" | "book" | "practice" | "bootcamp"
  title: string
  provider: string
  url?: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  cost: "free" | "paid" | "subscription"
}

// Market demand scores for different skills (1-100)
const SKILL_MARKET_DEMAND: Record<string, number> = {
  // Programming Languages
  JavaScript: 95,
  Python: 92,
  TypeScript: 88,
  Java: 85,
  "C#": 80,
  Go: 78,
  Rust: 75,
  PHP: 70,

  // Frontend Technologies
  React: 90,
  "Vue.js": 75,
  Angular: 70,
  "Next.js": 85,
  HTML: 80,
  CSS: 80,

  // Backend Technologies
  "Node.js": 88,
  Express: 82,
  Django: 75,
  "Spring Boot": 78,
  FastAPI: 80,

  // Databases
  SQL: 90,
  PostgreSQL: 85,
  MongoDB: 80,
  Redis: 75,
  MySQL: 82,

  // Cloud & DevOps
  AWS: 95,
  Docker: 90,
  Kubernetes: 85,
  Azure: 88,
  "Google Cloud": 82,
  Terraform: 80,
  Jenkins: 75,

  // Data & AI
  "Machine Learning": 92,
  "Data Analysis": 88,
  "Data Science": 90,
  "Artificial Intelligence": 95,
  TensorFlow: 85,
  PyTorch: 82,
  Pandas: 80,
  NumPy: 78,

  // Soft Skills
  "Project Management": 85,
  Leadership: 88,
  Communication: 90,
  "Problem Solving": 92,
  Teamwork: 85,
  "Critical Thinking": 88,

  // Design
  "UX/UI Design": 85,
  Figma: 80,
  "Adobe Creative Suite": 75,
  Sketch: 70,

  // Security
  Cybersecurity: 95,
  "Information Security": 90,
  "Network Security": 85,

  // Business
  "Digital Marketing": 82,
  "Financial Analysis": 80,
  "Business Analysis": 78,
  "Product Management": 85,
}

// Learning resources database
const LEARNING_RESOURCES: Record<string, LearningResource[]> = {
  JavaScript: [
    {
      type: "course",
      title: "JavaScript: The Complete Guide",
      provider: "Udemy",
      duration: "52 hours",
      difficulty: "beginner",
      cost: "paid",
    },
    {
      type: "course",
      title: "JavaScript Algorithms and Data Structures",
      provider: "freeCodeCamp",
      duration: "300 hours",
      difficulty: "intermediate",
      cost: "free",
    },
    {
      type: "book",
      title: "Eloquent JavaScript",
      provider: "Marijn Haverbeke",
      duration: "2-3 weeks",
      difficulty: "intermediate",
      cost: "free",
    },
  ],
  Python: [
    {
      type: "course",
      title: "Python for Everybody",
      provider: "Coursera",
      duration: "8 months",
      difficulty: "beginner",
      cost: "subscription",
    },
    {
      type: "course",
      title: "100 Days of Code: Python",
      provider: "Udemy",
      duration: "100 days",
      difficulty: "beginner",
      cost: "paid",
    },
    {
      type: "practice",
      title: "Python Exercises",
      provider: "HackerRank",
      duration: "Ongoing",
      difficulty: "intermediate",
      cost: "free",
    },
  ],
  React: [
    {
      type: "course",
      title: "React - The Complete Guide",
      provider: "Udemy",
      duration: "48 hours",
      difficulty: "intermediate",
      cost: "paid",
    },
    {
      type: "course",
      title: "React Documentation",
      provider: "React.dev",
      duration: "2-3 weeks",
      difficulty: "beginner",
      cost: "free",
    },
  ],
  AWS: [
    {
      type: "certification",
      title: "AWS Certified Solutions Architect",
      provider: "Amazon",
      duration: "3-6 months",
      difficulty: "intermediate",
      cost: "paid",
    },
    {
      type: "course",
      title: "AWS Cloud Practitioner Essentials",
      provider: "AWS Training",
      duration: "6 hours",
      difficulty: "beginner",
      cost: "free",
    },
  ],
  "Machine Learning": [
    {
      type: "course",
      title: "Machine Learning Specialization",
      provider: "Coursera",
      duration: "3 months",
      difficulty: "intermediate",
      cost: "subscription",
    },
    {
      type: "course",
      title: "CS229: Machine Learning",
      provider: "Stanford Online",
      duration: "11 weeks",
      difficulty: "advanced",
      cost: "free",
    },
  ],
}

export class SkillAnalysisEngine {
  /**
   * Analyze user's skill profile and identify gaps
   */
  static analyzeSkills(
    userSkills: UserSkill[],
    allSkills: Skill[],
    jobTitle?: string,
    industry?: string,
  ): SkillAnalysisResult {
    const skillGaps = this.identifySkillGaps(userSkills, allSkills, jobTitle, industry)
    const strengthAreas = this.identifyStrengths(userSkills)
    const overallScore = this.calculateOverallSkillScore(userSkills)
    const recommendations = this.generateSkillRecommendations(skillGaps, strengthAreas, userSkills)

    return {
      skillGaps,
      strengthAreas,
      overallScore,
      recommendations,
    }
  }

  private static identifySkillGaps(
    userSkills: UserSkill[],
    allSkills: Skill[],
    jobTitle?: string,
    industry?: string,
  ): SkillGapAnalysis[] {
    const userSkillIds = new Set(userSkills.map((us) => us.skill_id))
    const missingSkills = allSkills.filter((skill) => !userSkillIds.has(skill.id))

    const skillGaps: SkillGapAnalysis[] = []

    for (const skill of missingSkills) {
      const marketDemand = SKILL_MARKET_DEMAND[skill.name] || 50
      const importanceScore = this.calculateSkillImportance(skill, jobTitle, industry)

      // Only include skills with reasonable importance/demand
      if (importanceScore > 30 || marketDemand > 60) {
        const gapSeverity = this.determineGapSeverity(importanceScore, marketDemand)
        const learningResources = LEARNING_RESOURCES[skill.name] || this.getGenericResources(skill)

        skillGaps.push({
          skill,
          importanceScore,
          marketDemand,
          gapSeverity,
          learningResources,
        })
      }
    }

    // Sort by importance and market demand
    return skillGaps
      .sort((a, b) => b.importanceScore + b.marketDemand - (a.importanceScore + a.marketDemand))
      .slice(0, 10) // Top 10 skill gaps
  }

  private static identifyStrengths(userSkills: UserSkill[]): SkillStrength[] {
    return userSkills
      .filter((us) => us.proficiency_level >= 4) // Only high proficiency skills
      .map((us) => ({
        skill: us.skill!,
        proficiencyLevel: us.proficiency_level,
        yearsExperience: us.years_experience,
        marketValue: SKILL_MARKET_DEMAND[us.skill!.name] || 50,
      }))
      .sort((a, b) => b.marketValue - a.marketValue)
  }

  private static calculateOverallSkillScore(userSkills: UserSkill[]): number {
    if (userSkills.length === 0) return 0

    const totalScore = userSkills.reduce((sum, skill) => {
      const marketDemand = SKILL_MARKET_DEMAND[skill.skill!.name] || 50
      const skillScore = (skill.proficiency_level / 5) * (marketDemand / 100) * 100
      return sum + skillScore
    }, 0)

    return Math.round(totalScore / userSkills.length)
  }

  private static generateSkillRecommendations(
    skillGaps: SkillGapAnalysis[],
    strengthAreas: SkillStrength[],
    userSkills: UserSkill[],
  ): SkillRecommendation[] {
    const recommendations: SkillRecommendation[] = []

    // Recommend learning critical skill gaps
    skillGaps.slice(0, 3).forEach((gap, index) => {
      recommendations.push({
        type: "learn_new",
        skill: gap.skill,
        priority: 5 - index,
        timeframe: gap.gapSeverity === "critical" ? "1-3 months" : "3-6 months",
        description: `Learn ${gap.skill.name} to address critical skill gap in your field`,
      })
    })

    // Recommend improving existing skills with low proficiency
    userSkills
      .filter((us) => us.proficiency_level < 3)
      .slice(0, 2)
      .forEach((skill) => {
        recommendations.push({
          type: "improve_existing",
          skill: skill.skill!,
          priority: 3,
          timeframe: "2-4 months",
          description: `Improve your ${skill.skill!.name} skills to increase proficiency`,
        })
      })

    // Recommend maintaining strengths
    strengthAreas.slice(0, 2).forEach((strength) => {
      recommendations.push({
        type: "maintain_strength",
        skill: strength.skill,
        priority: 2,
        timeframe: "Ongoing",
        description: `Continue developing ${strength.skill.name} to maintain competitive advantage`,
      })
    })

    return recommendations.sort((a, b) => b.priority - a.priority)
  }

  private static calculateSkillImportance(skill: Skill, jobTitle?: string, industry?: string): number {
    let importance = 50 // Base importance

    // Adjust based on job title
    if (jobTitle) {
      const titleLower = jobTitle.toLowerCase()
      const skillLower = skill.name.toLowerCase()

      if (titleLower.includes("engineer") && ["javascript", "python", "react", "sql"].includes(skillLower)) {
        importance += 30
      }
      if (titleLower.includes("data") && ["python", "sql", "machine learning", "data analysis"].includes(skillLower)) {
        importance += 35
      }
      if (
        titleLower.includes("manager") &&
        ["leadership", "project management", "communication"].includes(skillLower)
      ) {
        importance += 25
      }
    }

    // Adjust based on industry
    if (industry) {
      const industryLower = industry.toLowerCase()
      const skillLower = skill.name.toLowerCase()

      if (industryLower.includes("technology") && skill.category.toLowerCase().includes("programming")) {
        importance += 20
      }
      if (industryLower.includes("finance") && ["financial analysis", "sql", "python"].includes(skillLower)) {
        importance += 25
      }
    }

    return Math.min(100, importance)
  }

  private static determineGapSeverity(
    importanceScore: number,
    marketDemand: number,
  ): "low" | "medium" | "high" | "critical" {
    const combinedScore = (importanceScore + marketDemand) / 2

    if (combinedScore >= 85) return "critical"
    if (combinedScore >= 70) return "high"
    if (combinedScore >= 50) return "medium"
    return "low"
  }

  private static getGenericResources(skill: Skill): LearningResource[] {
    return [
      {
        type: "course",
        title: `Learn ${skill.name}`,
        provider: "Coursera",
        duration: "4-8 weeks",
        difficulty: "beginner",
        cost: "subscription",
      },
      {
        type: "course",
        title: `${skill.name} Tutorial`,
        provider: "YouTube",
        duration: "2-4 weeks",
        difficulty: "beginner",
        cost: "free",
      },
      {
        type: "practice",
        title: `${skill.name} Exercises`,
        provider: "Various Platforms",
        duration: "Ongoing",
        difficulty: "intermediate",
        cost: "free",
      },
    ]
  }
}
