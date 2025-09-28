import type { UserSkill, Skill } from "./types"

export interface SkillAnalysisResult {
  skillGaps: SkillGapAnalysis[]
  strengthAreas: SkillStrength[]
  overallScore: number
  recommendations: SkillRecommendation[]
  marketAnalysis: MarketAnalysis
  careerPathSuggestions: CareerPathSuggestion[]
}

export interface SkillGapAnalysis {
  skill: Skill
  importanceScore: number
  marketDemand: number
  gapSeverity: "low" | "medium" | "high" | "critical"
  learningResources: LearningResource[]
  estimatedLearningTime: string
  salaryImpact: number
}

export interface SkillStrength {
  skill: Skill
  proficiencyLevel: number
  yearsExperience: number
  marketValue: number
  competitiveAdvantage: number
  futureProofing: number
}

export interface SkillRecommendation {
  type: "learn_new" | "improve_existing" | "maintain_strength" | "specialize_deeper"
  skill: Skill
  priority: number
  timeframe: string
  description: string
  expectedROI: number
}

export interface MarketAnalysis {
  totalMarketValue: number
  skillDiversityScore: number
  automationResistance: number
  industryAlignment: number
  emergingSkillsGap: number
}

export interface CareerPathSuggestion {
  title: string
  description: string
  requiredSkills: string[]
  timeToTransition: string
  salaryRange: string
  demandLevel: "low" | "medium" | "high" | "very_high"
}

export interface LearningResource {
  type: "course" | "certification" | "book" | "practice" | "bootcamp" | "project"
  title: string
  provider: string
  url?: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  cost: "free" | "paid" | "subscription"
  rating?: number
  completionRate?: number
}

// Enhanced market demand scores with salary impact and automation resistance
const SKILL_MARKET_DEMAND: Record<
  string,
  {
    demand: number
    salaryImpact: number
    automationResistance: number
    growthRate: number
    learningDifficulty: number
  }
> = {
  // AI & Machine Learning (Highest demand)
  "Artificial Intelligence": {
    demand: 98,
    salaryImpact: 1.6,
    automationResistance: 0.95,
    growthRate: 1.9,
    learningDifficulty: 8,
  },
  "Machine Learning": {
    demand: 95,
    salaryImpact: 1.5,
    automationResistance: 0.9,
    growthRate: 1.8,
    learningDifficulty: 7,
  },
  "Data Science": { demand: 92, salaryImpact: 1.4, automationResistance: 0.85, growthRate: 1.6, learningDifficulty: 7 },
  "Deep Learning": {
    demand: 90,
    salaryImpact: 1.55,
    automationResistance: 0.9,
    growthRate: 1.8,
    learningDifficulty: 9,
  },
  "Natural Language Processing": {
    demand: 88,
    salaryImpact: 1.5,
    automationResistance: 0.88,
    growthRate: 1.7,
    learningDifficulty: 8,
  },

  // Cybersecurity (Critical demand)
  Cybersecurity: { demand: 96, salaryImpact: 1.6, automationResistance: 0.9, growthRate: 1.9, learningDifficulty: 6 },
  "Information Security": {
    demand: 92,
    salaryImpact: 1.5,
    automationResistance: 0.88,
    growthRate: 1.8,
    learningDifficulty: 6,
  },
  "Network Security": {
    demand: 88,
    salaryImpact: 1.4,
    automationResistance: 0.85,
    growthRate: 1.7,
    learningDifficulty: 6,
  },
  "Penetration Testing": {
    demand: 85,
    salaryImpact: 1.45,
    automationResistance: 0.8,
    growthRate: 1.6,
    learningDifficulty: 7,
  },

  // Cloud & DevOps (High demand)
  AWS: { demand: 94, salaryImpact: 1.4, automationResistance: 0.8, growthRate: 1.7, learningDifficulty: 5 },
  Azure: { demand: 90, salaryImpact: 1.35, automationResistance: 0.78, growthRate: 1.6, learningDifficulty: 5 },
  "Google Cloud": { demand: 85, salaryImpact: 1.3, automationResistance: 0.75, growthRate: 1.5, learningDifficulty: 5 },
  Kubernetes: { demand: 88, salaryImpact: 1.35, automationResistance: 0.8, growthRate: 1.6, learningDifficulty: 7 },
  Docker: { demand: 85, salaryImpact: 1.2, automationResistance: 0.7, growthRate: 1.4, learningDifficulty: 4 },
  Terraform: { demand: 82, salaryImpact: 1.25, automationResistance: 0.75, growthRate: 1.5, learningDifficulty: 6 },

  // Programming Languages
  Python: { demand: 92, salaryImpact: 1.3, automationResistance: 0.8, growthRate: 1.5, learningDifficulty: 4 },
  JavaScript: { demand: 90, salaryImpact: 1.2, automationResistance: 0.7, growthRate: 1.3, learningDifficulty: 3 },
  TypeScript: { demand: 88, salaryImpact: 1.25, automationResistance: 0.75, growthRate: 1.6, learningDifficulty: 4 },
  Go: { demand: 85, salaryImpact: 1.3, automationResistance: 0.8, growthRate: 1.4, learningDifficulty: 5 },
  Rust: { demand: 82, salaryImpact: 1.4, automationResistance: 0.85, growthRate: 1.7, learningDifficulty: 8 },
  Java: { demand: 80, salaryImpact: 1.15, automationResistance: 0.7, growthRate: 1.1, learningDifficulty: 5 },

  // Frontend Technologies
  React: { demand: 88, salaryImpact: 1.2, automationResistance: 0.6, growthRate: 1.4, learningDifficulty: 4 },
  "Next.js": { demand: 85, salaryImpact: 1.25, automationResistance: 0.65, growthRate: 1.6, learningDifficulty: 5 },
  "Vue.js": { demand: 75, salaryImpact: 1.1, automationResistance: 0.55, growthRate: 1.2, learningDifficulty: 4 },
  Angular: { demand: 70, salaryImpact: 1.05, automationResistance: 0.5, growthRate: 1.0, learningDifficulty: 6 },

  // Data & Analytics
  "Data Analysis": {
    demand: 88,
    salaryImpact: 1.25,
    automationResistance: 0.7,
    growthRate: 1.4,
    learningDifficulty: 5,
  },
  SQL: { demand: 85, salaryImpact: 1.1, automationResistance: 0.6, growthRate: 1.2, learningDifficulty: 3 },
  Tableau: { demand: 75, salaryImpact: 1.15, automationResistance: 0.5, growthRate: 1.1, learningDifficulty: 4 },
  "Power BI": { demand: 78, salaryImpact: 1.1, automationResistance: 0.45, growthRate: 1.2, learningDifficulty: 3 },

  // Soft Skills (Automation resistant)
  Leadership: { demand: 90, salaryImpact: 1.4, automationResistance: 0.95, growthRate: 1.1, learningDifficulty: 6 },
  "Project Management": {
    demand: 85,
    salaryImpact: 1.15,
    automationResistance: 0.7,
    growthRate: 1.2,
    learningDifficulty: 4,
  },
  Communication: { demand: 88, salaryImpact: 1.2, automationResistance: 0.9, growthRate: 1.0, learningDifficulty: 5 },
  "Problem Solving": {
    demand: 92,
    salaryImpact: 1.3,
    automationResistance: 0.85,
    growthRate: 1.3,
    learningDifficulty: 6,
  },
  "Critical Thinking": {
    demand: 90,
    salaryImpact: 1.25,
    automationResistance: 0.88,
    growthRate: 1.2,
    learningDifficulty: 7,
  },

  // Design
  "UX/UI Design": { demand: 82, salaryImpact: 1.2, automationResistance: 0.6, growthRate: 1.3, learningDifficulty: 5 },
  Figma: { demand: 78, salaryImpact: 1.1, automationResistance: 0.5, growthRate: 1.4, learningDifficulty: 3 },

  // Business & Product
  "Product Management": {
    demand: 85,
    salaryImpact: 1.3,
    automationResistance: 0.8,
    growthRate: 1.3,
    learningDifficulty: 6,
  },
  "Business Analysis": {
    demand: 75,
    salaryImpact: 1.1,
    automationResistance: 0.6,
    growthRate: 1.0,
    learningDifficulty: 4,
  },
  "Digital Marketing": {
    demand: 70,
    salaryImpact: 1.05,
    automationResistance: 0.4,
    growthRate: 1.1,
    learningDifficulty: 3,
  },
}

// Comprehensive learning resources database
const LEARNING_RESOURCES: Record<string, LearningResource[]> = {
  "Artificial Intelligence": [
    {
      type: "course",
      title: "AI for Everyone",
      provider: "Coursera",
      duration: "4 weeks",
      difficulty: "beginner",
      cost: "subscription",
      rating: 4.8,
      completionRate: 85,
    },
    {
      type: "course",
      title: "Introduction to Artificial Intelligence",
      provider: "edX",
      duration: "12 weeks",
      difficulty: "intermediate",
      cost: "free",
      rating: 4.6,
      completionRate: 70,
    },
    {
      type: "book",
      title: "Artificial Intelligence: A Modern Approach",
      provider: "Pearson",
      duration: "3-4 months",
      difficulty: "advanced",
      cost: "paid",
      rating: 4.9,
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
      rating: 4.9,
      completionRate: 78,
    },
    {
      type: "course",
      title: "CS229: Machine Learning",
      provider: "Stanford Online",
      duration: "11 weeks",
      difficulty: "advanced",
      cost: "free",
      rating: 4.8,
      completionRate: 65,
    },
    {
      type: "project",
      title: "Kaggle Learn: Machine Learning",
      provider: "Kaggle",
      duration: "2-3 weeks",
      difficulty: "beginner",
      cost: "free",
      rating: 4.5,
      completionRate: 82,
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
      rating: 4.8,
      completionRate: 88,
    },
    {
      type: "course",
      title: "100 Days of Code: Python",
      provider: "Udemy",
      duration: "100 days",
      difficulty: "beginner",
      cost: "paid",
      rating: 4.7,
      completionRate: 75,
    },
    {
      type: "practice",
      title: "Python Exercises",
      provider: "HackerRank",
      duration: "Ongoing",
      difficulty: "intermediate",
      cost: "free",
      rating: 4.4,
      completionRate: 90,
    },
  ],
  Cybersecurity: [
    {
      type: "certification",
      title: "CompTIA Security+",
      provider: "CompTIA",
      duration: "3-6 months",
      difficulty: "intermediate",
      cost: "paid",
      rating: 4.6,
      completionRate: 70,
    },
    {
      type: "course",
      title: "Cybersecurity Fundamentals",
      provider: "Coursera",
      duration: "6 months",
      difficulty: "beginner",
      cost: "subscription",
      rating: 4.5,
      completionRate: 80,
    },
    {
      type: "practice",
      title: "TryHackMe",
      provider: "TryHackMe",
      duration: "Ongoing",
      difficulty: "intermediate",
      cost: "subscription",
      rating: 4.8,
      completionRate: 85,
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
      rating: 4.7,
      completionRate: 65,
    },
    {
      type: "course",
      title: "AWS Cloud Practitioner Essentials",
      provider: "AWS Training",
      duration: "6 hours",
      difficulty: "beginner",
      cost: "free",
      rating: 4.5,
      completionRate: 90,
    },
    {
      type: "practice",
      title: "AWS Hands-On Labs",
      provider: "AWS",
      duration: "Ongoing",
      difficulty: "intermediate",
      cost: "free",
      rating: 4.6,
      completionRate: 75,
    },
  ],
}

// Career path suggestions based on skills
const CAREER_PATHS: Record<string, CareerPathSuggestion[]> = {
  "AI/ML": [
    {
      title: "Machine Learning Engineer",
      description: "Design and implement ML systems and algorithms",
      requiredSkills: ["Python", "Machine Learning", "TensorFlow", "AWS"],
      timeToTransition: "6-12 months",
      salaryRange: "$120k-$200k",
      demandLevel: "very_high",
    },
    {
      title: "Data Scientist",
      description: "Extract insights from data using statistical methods and ML",
      requiredSkills: ["Python", "Data Science", "SQL", "Statistics"],
      timeToTransition: "4-8 months",
      salaryRange: "$100k-$180k",
      demandLevel: "very_high",
    },
  ],
  Security: [
    {
      title: "Cybersecurity Analyst",
      description: "Monitor and protect organizational systems from threats",
      requiredSkills: ["Cybersecurity", "Network Security", "Incident Response"],
      timeToTransition: "3-6 months",
      salaryRange: "$80k-$140k",
      demandLevel: "very_high",
    },
    {
      title: "Security Engineer",
      description: "Design and implement security systems and protocols",
      requiredSkills: ["Information Security", "Python", "Cloud Security"],
      timeToTransition: "6-12 months",
      salaryRange: "$110k-$170k",
      demandLevel: "very_high",
    },
  ],
  Cloud: [
    {
      title: "Cloud Solutions Architect",
      description: "Design scalable cloud infrastructure and solutions",
      requiredSkills: ["AWS", "Azure", "Kubernetes", "Terraform"],
      timeToTransition: "4-8 months",
      salaryRange: "$130k-$200k",
      demandLevel: "high",
    },
    {
      title: "DevOps Engineer",
      description: "Automate deployment and infrastructure management",
      requiredSkills: ["Docker", "Kubernetes", "CI/CD", "Python"],
      timeToTransition: "3-6 months",
      salaryRange: "$100k-$160k",
      demandLevel: "high",
    },
  ],
}

export class SkillAnalysisEngine {
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
    const marketAnalysis = this.performMarketAnalysis(userSkills, industry)
    const careerPathSuggestions = this.suggestCareerPaths(userSkills, jobTitle)

    return {
      skillGaps,
      strengthAreas,
      overallScore,
      recommendations,
      marketAnalysis,
      careerPathSuggestions,
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
      const marketData = SKILL_MARKET_DEMAND[skill.name]
      if (!marketData) continue

      const importanceScore = this.calculateSkillImportance(skill, jobTitle, industry)
      const marketDemand = marketData.demand

      // Only include skills with reasonable importance/demand
      if (importanceScore > 40 || marketDemand > 70) {
        const gapSeverity = this.determineGapSeverity(importanceScore, marketDemand)
        const learningResources = LEARNING_RESOURCES[skill.name] || this.getGenericResources(skill)
        const estimatedLearningTime = this.estimateLearningTime(marketData.learningDifficulty)
        const salaryImpact = Math.round(marketData.salaryImpact * 100 - 100)

        skillGaps.push({
          skill,
          importanceScore,
          marketDemand,
          gapSeverity,
          learningResources,
          estimatedLearningTime,
          salaryImpact,
        })
      }
    }

    // Sort by combined importance and market demand
    return skillGaps
      .sort((a, b) => b.importanceScore + b.marketDemand - (a.importanceScore + a.marketDemand))
      .slice(0, 12) // Top 12 skill gaps
  }

  private static identifyStrengths(userSkills: UserSkill[]): SkillStrength[] {
    return userSkills
      .filter((us) => us.proficiency_level >= 4) // Only high proficiency skills
      .map((us) => {
        const marketData = SKILL_MARKET_DEMAND[us.skill!.name] || {
          demand: 50,
          salaryImpact: 1.0,
          automationResistance: 0.5,
          growthRate: 1.0,
        }

        const competitiveAdvantage = this.calculateCompetitiveAdvantage(us, marketData)
        const futureProofing = marketData.automationResistance * marketData.growthRate * 50

        return {
          skill: us.skill!,
          proficiencyLevel: us.proficiency_level,
          yearsExperience: us.years_experience,
          marketValue: marketData.demand,
          competitiveAdvantage,
          futureProofing: Math.round(futureProofing),
        }
      })
      .sort((a, b) => b.marketValue - a.marketValue)
  }

  private static calculateCompetitiveAdvantage(userSkill: UserSkill, marketData: any): number {
    const proficiencyWeight = userSkill.proficiency_level / 10
    const experienceWeight = Math.min(userSkill.years_experience / 5, 1)
    const marketWeight = marketData.demand / 100

    return Math.round((proficiencyWeight + experienceWeight + marketWeight) * 33.33)
  }

  private static calculateOverallSkillScore(userSkills: UserSkill[]): number {
    if (userSkills.length === 0) return 0

    const totalScore = userSkills.reduce((sum, skill) => {
      const marketData = SKILL_MARKET_DEMAND[skill.skill!.name] || { demand: 50, salaryImpact: 1.0 }
      const skillScore = (skill.proficiency_level / 10) * (marketData.demand / 100) * marketData.salaryImpact * 100
      return sum + skillScore
    }, 0)

    return Math.round(totalScore / userSkills.length)
  }

  private static performMarketAnalysis(userSkills: UserSkill[], industry?: string): MarketAnalysis {
    const totalMarketValue = userSkills.reduce((sum, skill) => {
      const marketData = SKILL_MARKET_DEMAND[skill.skill!.name] || { demand: 50, salaryImpact: 1.0 }
      return sum + (marketData.demand * marketData.salaryImpact * skill.proficiency_level) / 10
    }, 0)

    const skillCategories = new Set(userSkills.map((s) => s.skill?.category))
    const skillDiversityScore = Math.min(100, skillCategories.size * 20)

    const automationResistance =
      (userSkills.reduce((sum, skill) => {
        const marketData = SKILL_MARKET_DEMAND[skill.skill!.name] || { automationResistance: 0.5 }
        return sum + marketData.automationResistance
      }, 0) /
        Math.max(1, userSkills.length)) *
      100

    const industryAlignment = this.calculateIndustryAlignment(userSkills, industry)

    const emergingSkills = userSkills.filter((skill) => {
      const marketData = SKILL_MARKET_DEMAND[skill.skill!.name]
      return marketData && marketData.growthRate > 1.5
    })
    const emergingSkillsGap = Math.max(0, 100 - emergingSkills.length * 25)

    return {
      totalMarketValue: Math.round(totalMarketValue),
      skillDiversityScore,
      automationResistance: Math.round(automationResistance),
      industryAlignment,
      emergingSkillsGap,
    }
  }

  private static calculateIndustryAlignment(userSkills: UserSkill[], industry?: string): number {
    if (!industry) return 50

    const industrySkillMap: Record<string, string[]> = {
      Technology: ["Python", "JavaScript", "React", "AWS", "Machine Learning"],
      Finance: ["Python", "SQL", "Financial Analysis", "Risk Management"],
      Healthcare: ["Data Analysis", "Python", "Healthcare Analytics"],
      Consulting: ["Project Management", "Business Analysis", "Communication"],
    }

    const relevantSkills = industrySkillMap[industry] || []
    const userSkillNames = userSkills.map((s) => s.skill?.name || "")

    const alignmentScore = relevantSkills.reduce((score, skill) => {
      return userSkillNames.some((userSkill) => userSkill.includes(skill)) ? score + 20 : score
    }, 0)

    return Math.min(100, alignmentScore)
  }

  private static suggestCareerPaths(userSkills: UserSkill[], jobTitle?: string): CareerPathSuggestion[] {
    const userSkillNames = userSkills.map((s) => s.skill?.name || "")
    const suggestions: CareerPathSuggestion[] = []

    // Check for AI/ML path
    if (userSkillNames.some((skill) => ["Python", "Machine Learning", "Data Science"].includes(skill))) {
      suggestions.push(...(CAREER_PATHS["AI/ML"] || []))
    }

    // Check for Security path
    if (userSkillNames.some((skill) => ["Cybersecurity", "Information Security"].includes(skill))) {
      suggestions.push(...(CAREER_PATHS["Security"] || []))
    }

    // Check for Cloud path
    if (userSkillNames.some((skill) => ["AWS", "Azure", "Docker", "Kubernetes"].includes(skill))) {
      suggestions.push(...(CAREER_PATHS["Cloud"] || []))
    }

    return suggestions.slice(0, 4) // Top 4 suggestions
  }

  private static generateSkillRecommendations(
    skillGaps: SkillGapAnalysis[],
    strengthAreas: SkillStrength[],
    userSkills: UserSkill[],
  ): SkillRecommendation[] {
    const recommendations: SkillRecommendation[] = []

    // Recommend learning critical skill gaps
    skillGaps.slice(0, 3).forEach((gap, index) => {
      const expectedROI = this.calculateExpectedROI(gap)
      recommendations.push({
        type: "learn_new",
        skill: gap.skill,
        priority: 5 - index,
        timeframe: gap.estimatedLearningTime,
        description: `Learn ${gap.skill.name} to address critical skill gap. Expected ${gap.salaryImpact}% salary increase.`,
        expectedROI,
      })
    })

    // Recommend improving existing skills with low proficiency but high market value
    userSkills
      .filter((us) => us.proficiency_level < 4)
      .sort((a, b) => {
        const aMarket = SKILL_MARKET_DEMAND[a.skill!.name]?.demand || 0
        const bMarket = SKILL_MARKET_DEMAND[b.skill!.name]?.demand || 0
        return bMarket - aMarket
      })
      .slice(0, 2)
      .forEach((skill) => {
        const marketData = SKILL_MARKET_DEMAND[skill.skill!.name]
        const expectedROI = marketData ? marketData.salaryImpact * 20 : 10

        recommendations.push({
          type: "improve_existing",
          skill: skill.skill!,
          priority: 3,
          timeframe: "2-4 months",
          description: `Improve your ${skill.skill!.name} skills from level ${skill.proficiency_level} to expert level`,
          expectedROI,
        })
      })

    // Recommend maintaining and deepening strengths
    strengthAreas.slice(0, 2).forEach((strength) => {
      recommendations.push({
        type: "maintain_strength",
        skill: strength.skill,
        priority: 2,
        timeframe: "Ongoing",
        description: `Continue developing ${strength.skill.name} expertise to maintain competitive advantage`,
        expectedROI: 15,
      })
    })

    // Recommend specialization in high-growth areas
    const highGrowthSkills = skillGaps
      .filter((gap) => {
        const marketData = SKILL_MARKET_DEMAND[gap.skill.name]
        return marketData && marketData.growthRate > 1.6
      })
      .slice(0, 1)

    highGrowthSkills.forEach((skill) => {
      recommendations.push({
        type: "specialize_deeper",
        skill: skill.skill,
        priority: 4,
        timeframe: "6-12 months",
        description: `Specialize in ${skill.skill.name} - a rapidly growing field with ${skill.salaryImpact}% salary premium`,
        expectedROI: skill.salaryImpact,
      })
    })

    return recommendations.sort((a, b) => b.priority - a.priority)
  }

  private static calculateExpectedROI(gap: SkillGapAnalysis): number {
    const marketData = SKILL_MARKET_DEMAND[gap.skill.name]
    if (!marketData) return 10

    return Math.round(marketData.salaryImpact * 20 + gap.marketDemand * 0.2)
  }

  private static calculateSkillImportance(skill: Skill, jobTitle?: string, industry?: string): number {
    let importance = 50 // Base importance

    // Adjust based on job title
    if (jobTitle) {
      const titleLower = jobTitle.toLowerCase()
      const skillLower = skill.name.toLowerCase()

      if (titleLower.includes("engineer") && ["javascript", "python", "react", "sql"].includes(skillLower)) {
        importance += 35
      }
      if (titleLower.includes("data") && ["python", "sql", "machine learning", "data analysis"].includes(skillLower)) {
        importance += 40
      }
      if (
        titleLower.includes("manager") &&
        ["leadership", "project management", "communication"].includes(skillLower)
      ) {
        importance += 30
      }
      if (titleLower.includes("security") && ["cybersecurity", "information security"].includes(skillLower)) {
        importance += 45
      }
    }

    // Adjust based on industry
    if (industry) {
      const industryLower = industry.toLowerCase()
      const skillLower = skill.name.toLowerCase()

      if (industryLower.includes("technology") && skill.category.toLowerCase().includes("programming")) {
        importance += 25
      }
      if (industryLower.includes("finance") && ["financial analysis", "sql", "python"].includes(skillLower)) {
        importance += 30
      }
      if (industryLower.includes("healthcare") && ["data analysis", "python"].includes(skillLower)) {
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

    if (combinedScore >= 90) return "critical"
    if (combinedScore >= 75) return "high"
    if (combinedScore >= 55) return "medium"
    return "low"
  }

  private static estimateLearningTime(difficulty: number): string {
    if (difficulty <= 3) return "2-4 weeks"
    if (difficulty <= 5) return "2-3 months"
    if (difficulty <= 7) return "4-6 months"
    return "6-12 months"
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
        rating: 4.0,
        completionRate: 75,
      },
      {
        type: "course",
        title: `${skill.name} Tutorial`,
        provider: "YouTube",
        duration: "2-4 weeks",
        difficulty: "beginner",
        cost: "free",
        rating: 3.8,
        completionRate: 85,
      },
      {
        type: "practice",
        title: `${skill.name} Exercises`,
        provider: "Various Platforms",
        duration: "Ongoing",
        difficulty: "intermediate",
        cost: "free",
        rating: 4.2,
        completionRate: 70,
      },
    ]
  }
}
