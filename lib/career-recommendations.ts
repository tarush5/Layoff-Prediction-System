import type { Profile, UserSkill, LayoffPrediction } from "./types"
import type { SkillAnalysisResult } from "./skill-analysis"

export interface CareerRecommendationResult {
  recommendations: CareerRecommendation[]
  careerPaths: CareerPath[]
  actionPlan: ActionPlan
}

export interface CareerRecommendation {
  id: string
  type: "skill_development" | "career_pivot" | "industry_switch" | "role_upgrade"
  title: string
  description: string
  priority: number
  estimatedTimeline: string
  resources: RecommendationResource[]
  expectedOutcome: string
  riskReduction: number
}

export interface CareerPath {
  title: string
  description: string
  requiredSkills: string[]
  averageSalary: string
  growthOutlook: "excellent" | "good" | "moderate" | "limited"
  timeToTransition: string
  difficulty: "low" | "medium" | "high"
}

export interface ActionPlan {
  immediate: ActionItem[]
  shortTerm: ActionItem[]
  longTerm: ActionItem[]
}

export interface ActionItem {
  task: string
  timeline: string
  priority: "high" | "medium" | "low"
  category: "skill" | "network" | "experience" | "certification"
}

export interface RecommendationResource {
  type: "course" | "certification" | "networking" | "job_board" | "mentor"
  title: string
  provider: string
  url?: string
  cost: "free" | "paid" | "subscription"
  timeCommitment: string
}

// Career paths database with growth potential
const CAREER_PATHS: Record<string, CareerPath[]> = {
  Technology: [
    {
      title: "AI/ML Engineer",
      description: "Design and implement machine learning systems and AI solutions",
      requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "Statistics"],
      averageSalary: "$120k - $180k",
      growthOutlook: "excellent",
      timeToTransition: "6-12 months",
      difficulty: "high",
    },
    {
      title: "Cloud Solutions Architect",
      description: "Design and oversee cloud infrastructure and migration strategies",
      requiredSkills: ["AWS", "Azure", "Docker", "Kubernetes", "System Design"],
      averageSalary: "$130k - $200k",
      growthOutlook: "excellent",
      timeToTransition: "4-8 months",
      difficulty: "medium",
    },
    {
      title: "DevOps Engineer",
      description: "Streamline development and deployment processes",
      requiredSkills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"],
      averageSalary: "$110k - $160k",
      growthOutlook: "excellent",
      timeToTransition: "3-6 months",
      difficulty: "medium",
    },
    {
      title: "Cybersecurity Specialist",
      description: "Protect organizations from digital threats and vulnerabilities",
      requiredSkills: ["Cybersecurity", "Network Security", "Risk Assessment", "Compliance"],
      averageSalary: "$100k - $150k",
      growthOutlook: "excellent",
      timeToTransition: "6-12 months",
      difficulty: "medium",
    },
  ],
  Finance: [
    {
      title: "Data Analyst",
      description: "Analyze financial data to drive business decisions",
      requiredSkills: ["SQL", "Python", "Data Analysis", "Financial Modeling", "Excel"],
      averageSalary: "$70k - $120k",
      growthOutlook: "good",
      timeToTransition: "3-6 months",
      difficulty: "low",
    },
    {
      title: "FinTech Product Manager",
      description: "Lead product development in financial technology companies",
      requiredSkills: ["Product Management", "Financial Analysis", "Agile", "User Research"],
      averageSalary: "$120k - $180k",
      growthOutlook: "excellent",
      timeToTransition: "6-12 months",
      difficulty: "medium",
    },
  ],
  Healthcare: [
    {
      title: "Health Data Analyst",
      description: "Analyze healthcare data to improve patient outcomes",
      requiredSkills: ["Data Analysis", "SQL", "Healthcare Systems", "Statistics"],
      averageSalary: "$65k - $100k",
      growthOutlook: "excellent",
      timeToTransition: "4-8 months",
      difficulty: "medium",
    },
    {
      title: "Healthcare IT Specialist",
      description: "Manage technology systems in healthcare organizations",
      requiredSkills: ["Healthcare Systems", "Database Management", "Security", "Compliance"],
      averageSalary: "$70k - $110k",
      growthOutlook: "good",
      timeToTransition: "6-12 months",
      difficulty: "medium",
    },
  ],
}

// Industry stability and growth data
const INDUSTRY_OUTLOOK: Record<string, { stability: number; growth: number; futureProof: number }> = {
  Technology: { stability: 85, growth: 95, futureProof: 90 },
  Healthcare: { stability: 95, growth: 80, futureProof: 85 },
  Finance: { stability: 70, growth: 75, futureProof: 70 },
  Education: { stability: 80, growth: 60, futureProof: 75 },
  Government: { stability: 95, growth: 50, futureProof: 80 },
  Manufacturing: { stability: 60, growth: 65, futureProof: 60 },
  Retail: { stability: 40, growth: 45, futureProof: 40 },
  Media: { stability: 35, growth: 50, futureProof: 45 },
  Energy: { stability: 65, growth: 70, futureProof: 75 },
  Consulting: { stability: 75, growth: 80, futureProof: 80 },
}

export class CareerRecommendationEngine {
  /**
   * Generate personalized career recommendations
   */
  static generateRecommendations(
    profile: Profile,
    userSkills: UserSkill[],
    prediction: LayoffPrediction,
    skillAnalysis: SkillAnalysisResult,
  ): CareerRecommendationResult {
    const recommendations = this.createRecommendations(profile, userSkills, prediction, skillAnalysis)
    const careerPaths = this.suggestCareerPaths(profile, userSkills, skillAnalysis)
    const actionPlan = this.createActionPlan(recommendations, skillAnalysis)

    return {
      recommendations,
      careerPaths,
      actionPlan,
    }
  }

  private static createRecommendations(
    profile: Profile,
    userSkills: UserSkill[],
    prediction: LayoffPrediction,
    skillAnalysis: SkillAnalysisResult,
  ): CareerRecommendation[] {
    const recommendations: CareerRecommendation[] = []

    // Skill development recommendations
    if (skillAnalysis.skillGaps.length > 0) {
      const topSkillGaps = skillAnalysis.skillGaps.slice(0, 3)
      topSkillGaps.forEach((gap, index) => {
        recommendations.push({
          id: `skill-dev-${index}`,
          type: "skill_development",
          title: `Develop ${gap.skill.name} Skills`,
          description: `Learn ${gap.skill.name} to address critical skill gaps and improve job security`,
          priority: 5 - index,
          estimatedTimeline: gap.gapSeverity === "critical" ? "1-3 months" : "3-6 months",
          resources: gap.learningResources.map((resource) => ({
            type: resource.type as any,
            title: resource.title,
            provider: resource.provider,
            url: resource.url,
            cost: resource.cost as any,
            timeCommitment: resource.duration,
          })),
          expectedOutcome: `Increase proficiency in ${gap.skill.name} and improve market competitiveness`,
          riskReduction: Math.round(gap.importanceScore * 0.3),
        })
      })
    }

    // Industry switch recommendation for high-risk industries
    if (profile.industry && INDUSTRY_OUTLOOK[profile.industry]?.stability < 60) {
      const stableIndustries = Object.entries(INDUSTRY_OUTLOOK)
        .filter(([_, outlook]) => outlook.stability > 80)
        .sort((a, b) => b[1].growth - a[1].growth)
        .slice(0, 2)

      stableIndustries.forEach(([industry, outlook], index) => {
        recommendations.push({
          id: `industry-switch-${index}`,
          type: "industry_switch",
          title: `Consider Transitioning to ${industry}`,
          description: `${industry} offers better stability (${outlook.stability}%) and growth potential (${outlook.growth}%)`,
          priority: 4,
          estimatedTimeline: "6-18 months",
          resources: [
            {
              type: "networking",
              title: `${industry} Professional Networks`,
              provider: "LinkedIn",
              cost: "free",
              timeCommitment: "2-3 hours/week",
            },
            {
              type: "course",
              title: `Introduction to ${industry}`,
              provider: "Coursera",
              cost: "subscription",
              timeCommitment: "4-6 weeks",
            },
          ],
          expectedOutcome: `Transition to a more stable industry with better long-term prospects`,
          riskReduction: 40,
        })
      })
    }

    // Role upgrade recommendations
    if (prediction.riskLevel === "high" || prediction.riskLevel === "critical") {
      recommendations.push({
        id: "role-upgrade",
        type: "role_upgrade",
        title: "Pursue Leadership or Senior Roles",
        description: "Move into management or senior technical positions to reduce layoff risk",
        priority: 3,
        estimatedTimeline: "6-12 months",
        resources: [
          {
            type: "course",
            title: "Leadership and Management Skills",
            provider: "LinkedIn Learning",
            cost: "subscription",
            timeCommitment: "3-4 weeks",
          },
          {
            type: "certification",
            title: "Project Management Professional (PMP)",
            provider: "PMI",
            cost: "paid",
            timeCommitment: "3-6 months",
          },
        ],
        expectedOutcome: "Advance to senior roles with better job security and compensation",
        riskReduction: 35,
      })
    }

    // Career pivot for automation-vulnerable roles
    if (prediction.factors.roleVulnerability > 60) {
      recommendations.push({
        id: "career-pivot",
        type: "career_pivot",
        title: "Pivot to Automation-Resistant Roles",
        description: "Transition to roles that require human creativity, strategy, or interpersonal skills",
        priority: 4,
        estimatedTimeline: "8-15 months",
        resources: [
          {
            type: "course",
            title: "Strategic Thinking and Problem Solving",
            provider: "edX",
            cost: "free",
            timeCommitment: "6-8 weeks",
          },
          {
            type: "networking",
            title: "Industry Meetups and Conferences",
            provider: "Meetup.com",
            cost: "free",
            timeCommitment: "4-6 hours/month",
          },
        ],
        expectedOutcome: "Move to roles less susceptible to automation and technological disruption",
        riskReduction: 45,
      })
    }

    return recommendations.sort((a, b) => b.priority - a.priority)
  }

  private static suggestCareerPaths(
    profile: Profile,
    userSkills: UserSkill[],
    skillAnalysis: SkillAnalysisResult,
  ): CareerPath[] {
    const userSkillNames = userSkills.map((skill) => skill.skill!.name.toLowerCase())
    const strengthSkills = skillAnalysis.strengthAreas.map((strength) => strength.skill.name.toLowerCase())

    // Get career paths for current industry
    const currentIndustryPaths = CAREER_PATHS[profile.industry || "Technology"] || []

    // Get career paths for high-growth industries
    const highGrowthIndustries = Object.entries(INDUSTRY_OUTLOOK)
      .filter(([_, outlook]) => outlook.growth > 80)
      .map(([industry]) => industry)

    const allPaths: CareerPath[] = []

    // Add current industry paths
    allPaths.push(...currentIndustryPaths)

    // Add paths from high-growth industries
    highGrowthIndustries.forEach((industry) => {
      if (industry !== profile.industry) {
        const paths = CAREER_PATHS[industry] || []
        allPaths.push(...paths)
      }
    })

    // Score and filter paths based on user's skills
    const scoredPaths = allPaths.map((path) => {
      const matchingSkills = path.requiredSkills.filter((skill) =>
        userSkillNames.some((userSkill) => userSkill.includes(skill.toLowerCase())),
      )

      const strengthMatches = path.requiredSkills.filter((skill) =>
        strengthSkills.some((strengthSkill) => strengthSkill.includes(skill.toLowerCase())),
      )

      const skillMatchScore = (matchingSkills.length / path.requiredSkills.length) * 100
      const strengthBonus = strengthMatches.length * 10

      return {
        ...path,
        matchScore: skillMatchScore + strengthBonus,
      }
    })

    // Return top 5 paths sorted by match score and growth outlook
    return scoredPaths
      .sort((a, b) => {
        const aScore = a.matchScore + (a.growthOutlook === "excellent" ? 20 : 0)
        const bScore = b.matchScore + (b.growthOutlook === "excellent" ? 20 : 0)
        return bScore - aScore
      })
      .slice(0, 5)
      .map(({ matchScore, ...path }) => path)
  }

  private static createActionPlan(
    recommendations: CareerRecommendation[],
    skillAnalysis: SkillAnalysisResult,
  ): ActionPlan {
    const immediate: ActionItem[] = []
    const shortTerm: ActionItem[] = []
    const longTerm: ActionItem[] = []

    // Immediate actions (next 30 days)
    immediate.push(
      {
        task: "Update resume and LinkedIn profile",
        timeline: "1 week",
        priority: "high",
        category: "experience",
      },
      {
        task: "Start networking in target industry/role",
        timeline: "2 weeks",
        priority: "high",
        category: "network",
      },
      {
        task: "Begin learning most critical skill gap",
        timeline: "1 month",
        priority: "high",
        category: "skill",
      },
    )

    // Short-term actions (1-6 months)
    if (skillAnalysis.skillGaps.length > 0) {
      skillAnalysis.skillGaps.slice(0, 2).forEach((gap, index) => {
        shortTerm.push({
          task: `Complete ${gap.skill.name} certification or course`,
          timeline: gap.gapSeverity === "critical" ? "2-3 months" : "3-4 months",
          priority: index === 0 ? "high" : "medium",
          category: "skill",
        })
      })
    }

    shortTerm.push(
      {
        task: "Apply to 5-10 relevant positions",
        timeline: "3 months",
        priority: "medium",
        category: "experience",
      },
      {
        task: "Attend industry conferences or meetups",
        timeline: "4 months",
        priority: "medium",
        category: "network",
      },
    )

    // Long-term actions (6+ months)
    const highPriorityRecommendations = recommendations.filter((rec) => rec.priority >= 4)
    highPriorityRecommendations.forEach((rec) => {
      longTerm.push({
        task: rec.title,
        timeline: rec.estimatedTimeline,
        priority: rec.priority >= 5 ? "high" : "medium",
        category: rec.type === "skill_development" ? "skill" : "experience",
      })
    })

    longTerm.push({
      task: "Evaluate progress and adjust career strategy",
      timeline: "12 months",
      priority: "medium",
      category: "experience",
    })

    return { immediate, shortTerm, longTerm }
  }
}
