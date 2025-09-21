import type { Profile, UserSkill } from "./types"

export interface PredictionFactors {
  industryRisk: number
  companyHealth: number
  roleVulnerability: number
  skillRelevance: number
  experienceLevel: number
  marketDemand: number
}

export interface PredictionResult {
  riskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  factors: PredictionFactors
  recommendations: string[]
  confidence: number
}

// Industry risk mapping based on current market trends
const INDUSTRY_RISK_SCORES: Record<string, number> = {
  Technology: 25,
  Finance: 30,
  Healthcare: 15,
  Education: 20,
  Retail: 45,
  Manufacturing: 35,
  Media: 50,
  "Real Estate": 40,
  Energy: 30,
  Consulting: 25,
  Government: 10,
  "Non-profit": 15,
}

// Role vulnerability based on automation risk
const ROLE_VULNERABILITY_SCORES: Record<string, number> = {
  "Software Engineer": 20,
  "Data Scientist": 15,
  "Product Manager": 25,
  "Marketing Manager": 35,
  "Sales Representative": 40,
  "Customer Service": 60,
  "Administrative Assistant": 70,
  Accountant: 50,
  "HR Manager": 30,
  "Operations Manager": 35,
  Designer: 25,
  Analyst: 45,
}

// High-demand skills that provide job security
const HIGH_DEMAND_SKILLS = [
  "Machine Learning",
  "Python",
  "JavaScript",
  "React",
  "AWS",
  "Docker",
  "Cybersecurity",
  "Data Analysis",
  "Project Management",
  "Leadership",
]

export class LayoffPredictionEngine {
  /**
   * Calculate layoff risk score based on multiple factors
   */
  static calculateRiskScore(profile: Profile, userSkills: UserSkill[], companyHealthScore?: number): PredictionResult {
    const factors: PredictionFactors = {
      industryRisk: this.calculateIndustryRisk(profile.industry),
      companyHealth: this.calculateCompanyHealthRisk(companyHealthScore),
      roleVulnerability: this.calculateRoleVulnerability(profile.job_title),
      skillRelevance: this.calculateSkillRelevance(userSkills),
      experienceLevel: this.calculateExperienceRisk(profile.experience_years),
      marketDemand: this.calculateMarketDemand(userSkills),
    }

    // Weighted calculation of overall risk score
    const weights = {
      industryRisk: 0.2,
      companyHealth: 0.25,
      roleVulnerability: 0.2,
      skillRelevance: 0.15,
      experienceLevel: 0.1,
      marketDemand: 0.1,
    }

    const riskScore = Math.round(
      factors.industryRisk * weights.industryRisk +
        factors.companyHealth * weights.companyHealth +
        factors.roleVulnerability * weights.roleVulnerability +
        factors.skillRelevance * weights.skillRelevance +
        factors.experienceLevel * weights.experienceLevel +
        factors.marketDemand * weights.marketDemand,
    )

    const riskLevel = this.determineRiskLevel(riskScore)
    const recommendations = this.generateRecommendations(factors, userSkills)
    const confidence = this.calculateConfidence(factors)

    return {
      riskScore,
      riskLevel,
      factors,
      recommendations,
      confidence,
    }
  }

  private static calculateIndustryRisk(industry?: string): number {
    if (!industry) return 50 // Default medium risk
    return INDUSTRY_RISK_SCORES[industry] || 40
  }

  private static calculateCompanyHealthRisk(healthScore?: number): number {
    if (!healthScore) return 50 // Default medium risk
    // Convert health score (1-100) to risk score (higher health = lower risk)
    return Math.max(0, 100 - healthScore)
  }

  private static calculateRoleVulnerability(jobTitle?: string): number {
    if (!jobTitle) return 50 // Default medium risk

    // Find closest match in role vulnerability scores
    const normalizedTitle = jobTitle.toLowerCase()
    for (const [role, score] of Object.entries(ROLE_VULNERABILITY_SCORES)) {
      if (normalizedTitle.includes(role.toLowerCase())) {
        return score
      }
    }
    return 40 // Default if no match found
  }

  private static calculateSkillRelevance(userSkills: UserSkill[]): number {
    if (userSkills.length === 0) return 80 // High risk if no skills

    const relevantSkills = userSkills.filter((skill) =>
      HIGH_DEMAND_SKILLS.some((demandSkill) => skill.skill?.name.toLowerCase().includes(demandSkill.toLowerCase())),
    )

    const relevanceRatio = relevantSkills.length / userSkills.length
    const avgProficiency = userSkills.reduce((sum, skill) => sum + skill.proficiency_level, 0) / userSkills.length

    // Lower risk for more relevant skills and higher proficiency
    return Math.max(0, 70 - relevanceRatio * 30 - avgProficiency * 5)
  }

  private static calculateExperienceRisk(experienceYears?: number): number {
    if (!experienceYears) return 60 // Higher risk for unknown experience

    if (experienceYears < 2) return 70 // High risk for junior
    if (experienceYears < 5) return 40 // Medium risk for mid-level
    if (experienceYears < 10) return 25 // Lower risk for senior
    return 30 // Slightly higher risk for very senior (age discrimination)
  }

  private static calculateMarketDemand(userSkills: UserSkill[]): number {
    const demandSkillsCount = userSkills.filter((skill) =>
      HIGH_DEMAND_SKILLS.some((demandSkill) => skill.skill?.name.toLowerCase().includes(demandSkill.toLowerCase())),
    ).length

    // Lower risk for more in-demand skills
    return Math.max(0, 60 - demandSkillsCount * 8)
  }

  private static determineRiskLevel(riskScore: number): "low" | "medium" | "high" | "critical" {
    if (riskScore <= 25) return "low"
    if (riskScore <= 50) return "medium"
    if (riskScore <= 75) return "high"
    return "critical"
  }

  private static generateRecommendations(factors: PredictionFactors, userSkills: UserSkill[]): string[] {
    const recommendations: string[] = []

    if (factors.skillRelevance > 50) {
      recommendations.push("Develop in-demand technical skills like Python, JavaScript, or cloud technologies")
    }

    if (factors.roleVulnerability > 60) {
      recommendations.push("Consider transitioning to roles less susceptible to automation")
    }

    if (factors.industryRisk > 40) {
      recommendations.push("Explore opportunities in more stable industries like healthcare or government")
    }

    if (factors.companyHealth > 60) {
      recommendations.push("Research your company's financial health and consider job alternatives")
    }

    if (factors.experienceLevel > 50) {
      recommendations.push("Build a strong professional network and consider mentorship opportunities")
    }

    if (factors.marketDemand > 50) {
      recommendations.push("Focus on developing skills that are in high market demand")
    }

    // Always include general recommendations
    recommendations.push("Maintain an updated resume and LinkedIn profile")
    recommendations.push("Build an emergency fund covering 6-12 months of expenses")

    return recommendations
  }

  private static calculateConfidence(factors: PredictionFactors): number {
    // Confidence based on how much data we have
    let confidence = 70 // Base confidence

    // Adjust based on data completeness
    const factorValues = Object.values(factors)
    const nonDefaultFactors = factorValues.filter((value) => value !== 50).length
    confidence += (nonDefaultFactors / factorValues.length) * 30

    return Math.min(100, Math.round(confidence))
  }
}
