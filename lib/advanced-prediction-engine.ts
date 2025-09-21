import type { Profile, UserSkill } from "./types"

export interface AdvancedPredictionFactors {
  industryRisk: number
  companyHealth: number
  roleVulnerability: number
  skillRelevance: number
  experienceLevel: number
  marketDemand: number
  economicIndicators: number
  networkStrength: number
  adaptabilityScore: number
  geographicRisk: number
}

export interface PredictionResult {
  riskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  factors: AdvancedPredictionFactors
  recommendations: string[]
  confidence: number
  trendAnalysis: {
    direction: "improving" | "stable" | "declining"
    velocity: number
    projectedRisk: number
  }
  marketInsights: {
    industryGrowth: number
    roleGrowth: number
    skillDemandTrend: number
  }
}

// Enhanced industry risk mapping with economic indicators
const INDUSTRY_RISK_MATRIX: Record<string, { baseRisk: number; volatility: number; growthRate: number }> = {
  Technology: { baseRisk: 25, volatility: 0.8, growthRate: 1.2 },
  Finance: { baseRisk: 30, volatility: 0.9, growthRate: 0.8 },
  Healthcare: { baseRisk: 15, volatility: 0.3, growthRate: 1.1 },
  Education: { baseRisk: 20, volatility: 0.4, growthRate: 0.6 },
  Retail: { baseRisk: 45, volatility: 1.2, growthRate: 0.4 },
  Manufacturing: { baseRisk: 35, volatility: 0.7, growthRate: 0.7 },
  Media: { baseRisk: 50, volatility: 1.1, growthRate: 0.3 },
  "Real Estate": { baseRisk: 40, volatility: 1.0, growthRate: 0.5 },
  Energy: { baseRisk: 30, volatility: 0.9, growthRate: 0.8 },
  Consulting: { baseRisk: 25, volatility: 0.6, growthRate: 0.9 },
  Government: { baseRisk: 10, volatility: 0.2, growthRate: 0.3 },
  "Non-profit": { baseRisk: 15, volatility: 0.3, growthRate: 0.4 },
}

// Advanced role vulnerability with automation probability
const ROLE_AUTOMATION_RISK: Record<string, { automationRisk: number; aiImpact: number; futureProof: number }> = {
  "Software Engineer": { automationRisk: 20, aiImpact: 0.3, futureProof: 0.8 },
  "Data Scientist": { automationRisk: 15, aiImpact: 0.2, futureProof: 0.9 },
  "Product Manager": { automationRisk: 25, aiImpact: 0.4, futureProof: 0.7 },
  "Marketing Manager": { automationRisk: 35, aiImpact: 0.6, futureProof: 0.6 },
  "Sales Representative": { automationRisk: 40, aiImpact: 0.5, futureProof: 0.5 },
  "Customer Service": { automationRisk: 60, aiImpact: 0.8, futureProof: 0.3 },
  "Administrative Assistant": { automationRisk: 70, aiImpact: 0.9, futureProof: 0.2 },
  Accountant: { automationRisk: 50, aiImpact: 0.7, futureProof: 0.4 },
  "HR Manager": { automationRisk: 30, aiImpact: 0.4, futureProof: 0.6 },
  "Operations Manager": { automationRisk: 35, aiImpact: 0.5, futureProof: 0.6 },
  Designer: { automationRisk: 25, aiImpact: 0.6, futureProof: 0.7 },
  Analyst: { automationRisk: 45, aiImpact: 0.7, futureProof: 0.5 },
}

// Future-proof skills with market demand trends
const SKILL_MARKET_DATA: Record<string, { demandGrowth: number; futureRelevance: number; salaryImpact: number }> = {
  "Machine Learning": { demandGrowth: 1.5, futureRelevance: 0.95, salaryImpact: 1.3 },
  Python: { demandGrowth: 1.3, futureRelevance: 0.9, salaryImpact: 1.2 },
  JavaScript: { demandGrowth: 1.2, futureRelevance: 0.85, salaryImpact: 1.1 },
  React: { demandGrowth: 1.4, futureRelevance: 0.8, salaryImpact: 1.15 },
  AWS: { demandGrowth: 1.6, futureRelevance: 0.9, salaryImpact: 1.25 },
  Docker: { demandGrowth: 1.3, futureRelevance: 0.85, salaryImpact: 1.1 },
  Cybersecurity: { demandGrowth: 1.7, futureRelevance: 0.95, salaryImpact: 1.4 },
  "Data Analysis": { demandGrowth: 1.4, futureRelevance: 0.9, salaryImpact: 1.2 },
  "Project Management": { demandGrowth: 1.1, futureRelevance: 0.8, salaryImpact: 1.05 },
  Leadership: { demandGrowth: 1.0, futureRelevance: 0.9, salaryImpact: 1.3 },
  "AI/ML": { demandGrowth: 1.8, futureRelevance: 0.98, salaryImpact: 1.5 },
  Blockchain: { demandGrowth: 1.2, futureRelevance: 0.7, salaryImpact: 1.2 },
  DevOps: { demandGrowth: 1.4, futureRelevance: 0.85, salaryImpact: 1.2 },
  "UX Design": { demandGrowth: 1.1, futureRelevance: 0.8, salaryImpact: 1.1 },
}

export class AdvancedLayoffPredictionEngine {
  /**
   * Advanced ML-inspired risk calculation with multiple algorithms
   */
  static calculateAdvancedRiskScore(
    profile: Profile,
    userSkills: UserSkill[],
    companyHealthScore?: number,
    marketConditions?: any,
  ): PredictionResult {
    const factors = this.calculateAdvancedFactors(profile, userSkills, companyHealthScore, marketConditions)

    // Ensemble method combining multiple prediction approaches
    const linearScore = this.calculateLinearRiskScore(factors)
    const neuralScore = this.calculateNeuralNetworkScore(factors)
    const treeScore = this.calculateDecisionTreeScore(factors)

    // Weighted ensemble
    const riskScore = Math.round(linearScore * 0.4 + neuralScore * 0.35 + treeScore * 0.25)

    const riskLevel = this.determineRiskLevel(riskScore)
    const recommendations = this.generateAdvancedRecommendations(factors, userSkills, profile)
    const confidence = this.calculateAdvancedConfidence(factors, userSkills)
    const trendAnalysis = this.analyzeTrends(factors, profile, userSkills)
    const marketInsights = this.generateMarketInsights(profile, userSkills)

    return {
      riskScore,
      riskLevel,
      factors,
      recommendations,
      confidence,
      trendAnalysis,
      marketInsights,
    }
  }

  private static calculateAdvancedFactors(
    profile: Profile,
    userSkills: UserSkill[],
    companyHealthScore?: number,
    marketConditions?: any,
  ): AdvancedPredictionFactors {
    return {
      industryRisk: this.calculateAdvancedIndustryRisk(profile.industry, marketConditions),
      companyHealth: this.calculateAdvancedCompanyHealth(companyHealthScore, profile),
      roleVulnerability: this.calculateAdvancedRoleVulnerability(profile.job_title),
      skillRelevance: this.calculateAdvancedSkillRelevance(userSkills),
      experienceLevel: this.calculateAdvancedExperienceRisk(profile.experience_years, profile.job_title),
      marketDemand: this.calculateAdvancedMarketDemand(userSkills, profile.industry),
      economicIndicators: this.calculateEconomicIndicators(profile.industry, marketConditions),
      networkStrength: this.calculateNetworkStrength(profile, userSkills),
      adaptabilityScore: this.calculateAdaptabilityScore(userSkills, profile.experience_years),
      geographicRisk: this.calculateGeographicRisk(profile.location),
    }
  }

  private static calculateLinearRiskScore(factors: AdvancedPredictionFactors): number {
    const weights = {
      industryRisk: 0.18,
      companyHealth: 0.22,
      roleVulnerability: 0.16,
      skillRelevance: 0.14,
      experienceLevel: 0.08,
      marketDemand: 0.1,
      economicIndicators: 0.06,
      networkStrength: 0.03,
      adaptabilityScore: 0.02,
      geographicRisk: 0.01,
    }

    return Object.entries(factors).reduce((score, [key, value]) => {
      return score + value * (weights[key as keyof typeof weights] || 0)
    }, 0)
  }

  private static calculateNeuralNetworkScore(factors: AdvancedPredictionFactors): number {
    // Simplified neural network simulation with non-linear activations
    const layer1 = this.sigmoidActivation([
      factors.industryRisk * 0.3 + factors.companyHealth * 0.4 + factors.economicIndicators * 0.3,
      factors.roleVulnerability * 0.5 + factors.skillRelevance * 0.3 + factors.adaptabilityScore * 0.2,
      factors.experienceLevel * 0.4 + factors.networkStrength * 0.3 + factors.marketDemand * 0.3,
    ])

    const layer2 = this.sigmoidActivation([
      layer1[0] * 0.6 + layer1[1] * 0.2 + layer1[2] * 0.2,
      layer1[0] * 0.3 + layer1[1] * 0.4 + layer1[2] * 0.3,
    ])

    return (layer2[0] * 0.7 + layer2[1] * 0.3) * 100
  }

  private static calculateDecisionTreeScore(factors: AdvancedPredictionFactors): number {
    // Decision tree logic
    if (factors.companyHealth > 70) return 15 + factors.industryRisk * 0.3
    if (factors.roleVulnerability > 60) return 60 + factors.skillRelevance * 0.4
    if (factors.industryRisk > 50) return 45 + factors.marketDemand * 0.3
    if (factors.skillRelevance > 60) return 55 + factors.adaptabilityScore * 0.2

    return 30 + (factors.industryRisk + factors.roleVulnerability) * 0.25
  }

  private static sigmoidActivation(inputs: number[]): number[] {
    return inputs.map((x) => 1 / (1 + Math.exp(-x / 20)))
  }

  private static calculateAdvancedIndustryRisk(industry?: string, marketConditions?: any): number {
    if (!industry) return 50

    const industryData = INDUSTRY_RISK_MATRIX[industry] || { baseRisk: 40, volatility: 0.5, growthRate: 0.5 }
    const economicMultiplier = marketConditions?.recession ? 1.3 : 1.0
    const growthAdjustment = (1 - industryData.growthRate) * 20

    return Math.min(100, industryData.baseRisk * economicMultiplier + growthAdjustment)
  }

  private static calculateAdvancedCompanyHealth(healthScore?: number, profile?: Profile): number {
    if (!healthScore) return 50

    // Adjust based on company size and industry
    let adjustedScore = 100 - healthScore

    // Startups have higher risk
    if (profile?.company && profile.company.toLowerCase().includes("startup")) {
      adjustedScore += 15
    }

    return Math.min(100, adjustedScore)
  }

  private static calculateAdvancedRoleVulnerability(jobTitle?: string): number {
    if (!jobTitle) return 50

    const normalizedTitle = jobTitle.toLowerCase()
    for (const [role, data] of Object.entries(ROLE_AUTOMATION_RISK)) {
      if (normalizedTitle.includes(role.toLowerCase())) {
        // Factor in AI impact and future-proofing
        return data.automationRisk + data.aiImpact * 30 - data.futureProof * 20
      }
    }
    return 40
  }

  private static calculateAdvancedSkillRelevance(userSkills: UserSkill[]): number {
    if (userSkills.length === 0) return 80

    let totalRelevanceScore = 0
    let totalWeight = 0

    userSkills.forEach((skill) => {
      const skillName = skill.skill?.name || ""
      const skillData = SKILL_MARKET_DATA[skillName] || { demandGrowth: 1.0, futureRelevance: 0.5, salaryImpact: 1.0 }

      const relevanceScore =
        skillData.futureRelevance * 40 + (skillData.demandGrowth - 1) * 30 + skill.proficiency_level * 2

      const weight = skill.proficiency_level / 10
      totalRelevanceScore += relevanceScore * weight
      totalWeight += weight
    })

    const avgRelevance = totalWeight > 0 ? totalRelevanceScore / totalWeight : 50
    return Math.max(0, 80 - avgRelevance)
  }

  private static calculateAdvancedMarketDemand(userSkills: UserSkill[], industry?: string): number {
    const demandSkills = userSkills.filter((skill) => {
      const skillName = skill.skill?.name || ""
      return SKILL_MARKET_DATA[skillName]?.demandGrowth > 1.2
    })

    const demandScore = demandSkills.reduce((score, skill) => {
      const skillData = SKILL_MARKET_DATA[skill.skill?.name || ""]
      return score + (skillData?.demandGrowth || 1) * skill.proficiency_level
    }, 0)

    // Industry-specific adjustments
    const industryMultiplier = industry === "Technology" ? 0.8 : 1.0

    return Math.max(0, 60 - demandScore * 2 * industryMultiplier)
  }

  private static calculateEconomicIndicators(industry?: string, marketConditions?: any): number {
    let baseScore = 30 // Neutral economic conditions

    if (marketConditions?.recession) baseScore += 40
    if (marketConditions?.inflation > 5) baseScore += 20
    if (marketConditions?.unemployment > 6) baseScore += 15

    // Industry-specific economic sensitivity
    const industryData = INDUSTRY_RISK_MATRIX[industry || ""]
    if (industryData) {
      baseScore += industryData.volatility * 20
    }

    return Math.min(100, baseScore)
  }

  private static calculateNetworkStrength(profile: Profile, userSkills: UserSkill[]): number {
    // Estimate network strength based on experience and skills
    const experienceBonus = Math.min(30, (profile.experience_years || 0) * 3)
    const skillDiversityBonus = Math.min(20, userSkills.length * 2)
    const leadershipBonus = userSkills.some(
      (s) => s.skill?.name.toLowerCase().includes("leadership") || s.skill?.name.toLowerCase().includes("management"),
    )
      ? 15
      : 0

    const networkScore = experienceBonus + skillDiversityBonus + leadershipBonus
    return Math.max(0, 70 - networkScore) // Convert to risk score
  }

  private static calculateAdaptabilityScore(userSkills: UserSkill[], experienceYears?: number): number {
    const techSkills = userSkills.filter((s) =>
      ["Python", "JavaScript", "React", "AWS", "Docker", "Machine Learning"].some((tech) =>
        s.skill?.name.includes(tech),
      ),
    ).length

    const softSkills = userSkills.filter((s) =>
      ["Leadership", "Communication", "Project Management"].some((soft) => s.skill?.name.includes(soft)),
    ).length

    const diversityScore = Math.min(40, (techSkills + softSkills) * 4)
    const experienceAdaptability = experienceYears && experienceYears > 10 ? -10 : 0

    const adaptabilityScore = diversityScore + experienceAdaptability
    return Math.max(0, 60 - adaptabilityScore)
  }

  private static calculateGeographicRisk(location?: string): number {
    // Simplified geographic risk based on tech hub proximity
    const techHubs = ["San Francisco", "Seattle", "New York", "Austin", "Boston", "Los Angeles"]
    if (!location) return 30

    const isInTechHub = techHubs.some((hub) => location.toLowerCase().includes(hub.toLowerCase()))

    return isInTechHub ? 15 : 35
  }

  private static analyzeTrends(
    factors: AdvancedPredictionFactors,
    profile: Profile,
    userSkills: UserSkill[],
  ): { direction: "improving" | "stable" | "declining"; velocity: number; projectedRisk: number } {
    // Analyze skill trend direction
    const futureSkillsCount = userSkills.filter((s) => {
      const skillData = SKILL_MARKET_DATA[s.skill?.name || ""]
      return skillData?.demandGrowth > 1.3
    }).length

    const industryData = INDUSTRY_RISK_MATRIX[profile.industry || ""]
    const industryTrend = industryData?.growthRate || 0.5

    let direction: "improving" | "stable" | "declining" = "stable"
    let velocity = 0

    if (futureSkillsCount > 2 && industryTrend > 0.8) {
      direction = "improving"
      velocity = futureSkillsCount * 0.3 + (industryTrend - 0.8) * 10
    } else if (futureSkillsCount < 1 || industryTrend < 0.5) {
      direction = "declining"
      velocity = (1 - futureSkillsCount) * 0.5 + (0.5 - industryTrend) * 10
    }

    const currentRisk = this.calculateLinearRiskScore(factors)
    const projectedRisk =
      direction === "improving"
        ? Math.max(0, currentRisk - velocity * 5)
        : direction === "declining"
          ? Math.min(100, currentRisk + velocity * 5)
          : currentRisk

    return { direction, velocity, projectedRisk }
  }

  private static generateMarketInsights(profile: Profile, userSkills: UserSkill[]) {
    const industryData = INDUSTRY_RISK_MATRIX[profile.industry || ""]
    const roleData = ROLE_AUTOMATION_RISK[profile.job_title || ""]

    const skillDemandTrend =
      userSkills.reduce((avg, skill) => {
        const skillData = SKILL_MARKET_DATA[skill.skill?.name || ""]
        return avg + (skillData?.demandGrowth || 1)
      }, 0) / Math.max(1, userSkills.length)

    return {
      industryGrowth: (industryData?.growthRate || 0.5) * 100,
      roleGrowth: roleData ? roleData.futureProof * 100 : 50,
      skillDemandTrend: (skillDemandTrend - 1) * 100,
    }
  }

  private static generateAdvancedRecommendations(
    factors: AdvancedPredictionFactors,
    userSkills: UserSkill[],
    profile: Profile,
  ): string[] {
    const recommendations: string[] = []

    // AI-powered personalized recommendations
    if (factors.skillRelevance > 50) {
      const missingSkills = this.identifyMissingCriticalSkills(userSkills, profile.industry)
      recommendations.push(`Prioritize learning: ${missingSkills.slice(0, 3).join(", ")}`)
    }

    if (factors.roleVulnerability > 60) {
      recommendations.push(
        "Consider transitioning to AI-resistant roles like strategic planning or creative leadership",
      )
    }

    if (factors.adaptabilityScore > 50) {
      recommendations.push("Develop cross-functional skills to increase career flexibility")
    }

    if (factors.networkStrength > 50) {
      recommendations.push("Strengthen professional network through industry events and mentorship")
    }

    if (factors.economicIndicators > 60) {
      recommendations.push("Build recession-proof skills and consider defensive career moves")
    }

    // Industry-specific recommendations
    const industryData = INDUSTRY_RISK_MATRIX[profile.industry || ""]
    if (industryData && industryData.volatility > 0.8) {
      recommendations.push("Consider diversifying into more stable industries as a backup plan")
    }

    return recommendations
  }

  private static identifyMissingCriticalSkills(userSkills: UserSkill[], industry?: string): string[] {
    const userSkillNames = userSkills.map((s) => s.skill?.name || "").map((n) => n.toLowerCase())
    const criticalSkills = Object.keys(SKILL_MARKET_DATA)
      .filter((skill) => SKILL_MARKET_DATA[skill].demandGrowth > 1.3)
      .filter((skill) => !userSkillNames.some((userSkill) => userSkill.includes(skill.toLowerCase())))

    return criticalSkills.slice(0, 5)
  }

  private static calculateAdvancedConfidence(factors: AdvancedPredictionFactors, userSkills: UserSkill[]): number {
    let confidence = 75 // Base confidence

    // Data completeness bonus
    const factorCompleteness = Object.values(factors).filter((v) => v !== 50).length / Object.keys(factors).length
    confidence += factorCompleteness * 20

    // Skills data quality
    if (userSkills.length > 5) confidence += 5
    if (userSkills.some((s) => s.proficiency_level > 8)) confidence += 5

    return Math.min(100, Math.round(confidence))
  }

  private static determineRiskLevel(riskScore: number): "low" | "medium" | "high" | "critical" {
    if (riskScore <= 25) return "low"
    if (riskScore <= 50) return "medium"
    if (riskScore <= 75) return "high"
    return "critical"
  }
}
