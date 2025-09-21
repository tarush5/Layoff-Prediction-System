import type { Profile, UserSkill, LayoffPrediction } from "./types"
import type { SkillAnalysisResult } from "./skill-analysis"
import type { CareerRecommendationResult } from "./career-recommendations"

export interface ReportData {
  profile: Profile
  userSkills: UserSkill[]
  prediction: LayoffPrediction
  skillAnalysis: SkillAnalysisResult
  careerRecommendations: CareerRecommendationResult
  generatedAt: string
}

export interface ReportSection {
  title: string
  content: string
  charts?: ChartData[]
}

export interface ChartData {
  type: "bar" | "pie" | "line" | "radar"
  title: string
  data: any[]
  labels: string[]
}

export class ReportGenerator {
  /**
   * Generate a comprehensive career risk assessment report
   */
  static generateReport(data: ReportData): ReportSection[] {
    const sections: ReportSection[] = []

    // Executive Summary
    sections.push(this.generateExecutiveSummary(data))

    // Risk Assessment
    sections.push(this.generateRiskAssessment(data))

    // Skill Analysis
    sections.push(this.generateSkillAnalysis(data))

    // Career Recommendations
    sections.push(this.generateCareerRecommendations(data))

    // Action Plan
    sections.push(this.generateActionPlan(data))

    // Appendix
    sections.push(this.generateAppendix(data))

    return sections
  }

  private static generateExecutiveSummary(data: ReportData): ReportSection {
    const { profile, prediction, skillAnalysis } = data
    const riskLevel = prediction.risk_level.charAt(0).toUpperCase() + prediction.risk_level.slice(1)

    const content = `
# Executive Summary

**Professional Profile:** ${profile.full_name}
**Position:** ${profile.job_title} at ${profile.company}
**Industry:** ${profile.industry}
**Experience:** ${profile.experience_years} years

## Key Findings

Your current layoff risk level is **${riskLevel}** with a risk score of **${prediction.risk_score}/100**.

### Risk Factors:
- **Industry Risk:** ${prediction.factors.industryRisk}/100
- **Company Health:** ${prediction.factors.companyHealth}/100
- **Role Vulnerability:** ${prediction.factors.roleVulnerability}/100
- **Skill Relevance:** ${prediction.factors.skillRelevance}/100

### Skill Profile:
- **Total Skills Tracked:** ${data.userSkills.length}
- **Overall Skill Score:** ${skillAnalysis.overallScore}/100
- **Critical Skill Gaps:** ${skillAnalysis.skillGaps.filter((gap) => gap.gapSeverity === "critical").length}
- **Strength Areas:** ${skillAnalysis.strengthAreas.length}

### Immediate Actions Required:
${data.careerRecommendations.actionPlan.immediate
  .slice(0, 3)
  .map((action) => `- ${action.task}`)
  .join("\n")}

This report provides detailed analysis and actionable recommendations to improve your career security and reduce layoff risk.
    `

    return {
      title: "Executive Summary",
      content: content.trim(),
    }
  }

  private static generateRiskAssessment(data: ReportData): ReportSection {
    const { prediction } = data

    const content = `
# Risk Assessment Analysis

## Overall Risk Score: ${prediction.risk_score}/100

Your layoff risk has been assessed as **${prediction.risk_level.toUpperCase()}** based on multiple factors affecting job security in your industry and role.

## Risk Factor Breakdown

### Industry Risk (${prediction.factors.industryRisk}/100)
${this.getRiskFactorDescription("industry", prediction.factors.industryRisk)}

### Company Health (${prediction.factors.companyHealth}/100)
${this.getRiskFactorDescription("company", prediction.factors.companyHealth)}

### Role Vulnerability (${prediction.factors.roleVulnerability}/100)
${this.getRiskFactorDescription("role", prediction.factors.roleVulnerability)}

### Skill Relevance (${prediction.factors.skillRelevance}/100)
${this.getRiskFactorDescription("skill", prediction.factors.skillRelevance)}

### Experience Level (${prediction.factors.experienceLevel}/100)
${this.getRiskFactorDescription("experience", prediction.factors.experienceLevel)}

### Market Demand (${prediction.factors.marketDemand}/100)
${this.getRiskFactorDescription("market", prediction.factors.marketDemand)}

## Risk Mitigation Strategies

${prediction.recommendations.map((rec) => `- ${rec}`).join("\n")}
    `

    const chartData: ChartData = {
      type: "radar",
      title: "Risk Factor Analysis",
      data: [
        prediction.factors.industryRisk,
        prediction.factors.companyHealth,
        prediction.factors.roleVulnerability,
        prediction.factors.skillRelevance,
        prediction.factors.experienceLevel,
        prediction.factors.marketDemand,
      ],
      labels: ["Industry", "Company", "Role", "Skills", "Experience", "Market"],
    }

    return {
      title: "Risk Assessment",
      content: content.trim(),
      charts: [chartData],
    }
  }

  private static generateSkillAnalysis(data: ReportData): ReportSection {
    const { skillAnalysis, userSkills } = data

    const content = `
# Skill Analysis Report

## Overall Skill Score: ${skillAnalysis.overallScore}/100

### Current Skill Portfolio (${userSkills.length} skills)

#### Strength Areas (${skillAnalysis.strengthAreas.length})
${skillAnalysis.strengthAreas
  .map(
    (strength) =>
      `- **${strength.skill.name}**: ${strength.proficiencyLevel}/5 proficiency, ${strength.yearsExperience} years experience (Market Value: ${strength.marketValue}%)`,
  )
  .join("\n")}

#### Critical Skill Gaps (${skillAnalysis.skillGaps.filter((gap) => gap.gapSeverity === "critical").length})
${skillAnalysis.skillGaps
  .filter((gap) => gap.gapSeverity === "critical")
  .map(
    (gap) =>
      `- **${gap.skill.name}**: ${gap.gapSeverity} gap (Importance: ${gap.importanceScore}%, Market Demand: ${gap.marketDemand}%)`,
  )
  .join("\n")}

#### High Priority Skill Gaps
${skillAnalysis.skillGaps
  .filter((gap) => gap.gapSeverity === "high")
  .slice(0, 5)
  .map((gap) => `- **${gap.skill.name}**: ${gap.skill.description} (Importance: ${gap.importanceScore}%)`)
  .join("\n")}

## Skill Development Recommendations

${skillAnalysis.recommendations
  .map(
    (rec) =>
      `### ${rec.skill.name} (Priority: ${rec.priority}/5)
- **Type**: ${rec.type.replace("_", " ").toUpperCase()}
- **Timeline**: ${rec.timeframe}
- **Description**: ${rec.description}`,
  )
  .join("\n\n")}
    `

    const skillDistributionChart: ChartData = {
      type: "pie",
      title: "Skills by Category",
      data: this.getSkillCategoryDistribution(userSkills),
      labels: this.getSkillCategories(userSkills),
    }

    const proficiencyChart: ChartData = {
      type: "bar",
      title: "Skill Proficiency Levels",
      data: [1, 2, 3, 4, 5].map((level) => userSkills.filter((skill) => skill.proficiency_level === level).length),
      labels: ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"],
    }

    return {
      title: "Skill Analysis",
      content: content.trim(),
      charts: [skillDistributionChart, proficiencyChart],
    }
  }

  private static generateCareerRecommendations(data: ReportData): ReportSection {
    const { careerRecommendations } = data

    const content = `
# Career Recommendations

## Personalized Career Guidance

Based on your risk assessment and skill analysis, we've identified ${careerRecommendations.recommendations.length} key recommendations to improve your career security.

### High Priority Recommendations

${careerRecommendations.recommendations
  .filter((rec) => rec.priority >= 4)
  .map(
    (rec) =>
      `#### ${rec.title}
- **Type**: ${rec.type.replace("_", " ").toUpperCase()}
- **Timeline**: ${rec.estimatedTimeline}
- **Risk Reduction**: ${rec.riskReduction}%
- **Description**: ${rec.description}
- **Expected Outcome**: ${rec.expectedOutcome}

**Resources**:
${rec.resources.map((resource) => `- ${resource.title} (${resource.provider}) - ${resource.cost}`).join("\n")}
`,
  )
  .join("\n")}

### Alternative Career Paths

${careerRecommendations.careerPaths
  .slice(0, 3)
  .map(
    (path) =>
      `#### ${path.title}
- **Salary Range**: ${path.averageSalary}
- **Growth Outlook**: ${path.growthOutlook.toUpperCase()}
- **Transition Time**: ${path.timeToTransition}
- **Difficulty**: ${path.difficulty.toUpperCase()}
- **Description**: ${path.description}

**Required Skills**: ${path.requiredSkills.join(", ")}
`,
  )
  .join("\n")}
    `

    return {
      title: "Career Recommendations",
      content: content.trim(),
    }
  }

  private static generateActionPlan(data: ReportData): ReportSection {
    const { careerRecommendations } = data

    const content = `
# Career Action Plan

## Structured Roadmap for Career Security

### Immediate Actions (Next 30 Days)
${careerRecommendations.actionPlan.immediate
  .map(
    (action, index) =>
      `${index + 1}. **${action.task}** (${action.priority.toUpperCase()} priority)
   - Timeline: ${action.timeline}
   - Category: ${action.category.replace("_", " ").toUpperCase()}`,
  )
  .join("\n\n")}

### Short-term Goals (1-6 Months)
${careerRecommendations.actionPlan.shortTerm
  .map(
    (action, index) =>
      `${index + 1}. **${action.task}** (${action.priority.toUpperCase()} priority)
   - Timeline: ${action.timeline}
   - Category: ${action.category.replace("_", " ").toUpperCase()}`,
  )
  .join("\n\n")}

### Long-term Strategy (6+ Months)
${careerRecommendations.actionPlan.longTerm
  .map(
    (action, index) =>
      `${index + 1}. **${action.task}** (${action.priority.toUpperCase()} priority)
   - Timeline: ${action.timeline}
   - Category: ${action.category.replace("_", " ").toUpperCase()}`,
  )
  .join("\n\n")}

## Success Metrics

Track your progress using these key indicators:
- Reduction in overall risk score
- Improvement in skill proficiency levels
- Completion of learning objectives
- Network expansion metrics
- Job market positioning improvements
    `

    return {
      title: "Action Plan",
      content: content.trim(),
    }
  }

  private static generateAppendix(data: ReportData): ReportSection {
    const content = `
# Appendix

## Methodology

This report was generated using CareerGuard's proprietary risk assessment algorithm, which analyzes multiple factors including:

- Industry stability and growth trends
- Company financial health indicators
- Role automation vulnerability
- Skill market demand analysis
- Experience level considerations
- Market positioning factors

## Data Sources

- Industry risk data from labor market statistics
- Skill demand analysis from job market trends
- Company health metrics from financial databases
- Automation risk assessments from technology research

## Disclaimer

This report provides guidance based on current market conditions and statistical analysis. Individual circumstances may vary, and this report should be used as one factor in career decision-making alongside professional career counseling.

## Report Details

- **Generated**: ${data.generatedAt}
- **Report Version**: 1.0
- **Analysis Date**: ${new Date().toLocaleDateString()}
- **Confidence Level**: Based on available data completeness

## Contact Information

For questions about this report or additional career guidance, please contact our career advisory team through the CareerGuard platform.
    `

    return {
      title: "Appendix",
      content: content.trim(),
    }
  }

  private static getRiskFactorDescription(factor: string, score: number): string {
    const level = score <= 25 ? "Low" : score <= 50 ? "Moderate" : score <= 75 ? "High" : "Critical"

    const descriptions = {
      industry: {
        Low: "Your industry shows strong stability with minimal layoff risk.",
        Moderate: "Your industry has moderate stability with some economic sensitivity.",
        High: "Your industry faces significant challenges and higher layoff rates.",
        Critical: "Your industry is experiencing major disruption with elevated layoff risk.",
      },
      company: {
        Low: "Your company appears financially healthy with strong market position.",
        Moderate: "Your company shows mixed financial indicators requiring monitoring.",
        High: "Your company may be facing financial challenges affecting job security.",
        Critical: "Your company shows concerning financial health indicators.",
      },
      role: {
        Low: "Your role has low automation risk and strong job security.",
        Moderate: "Your role has some automation risk but remains relatively secure.",
        High: "Your role faces significant automation threats requiring skill development.",
        Critical: "Your role is highly vulnerable to automation and technological disruption.",
      },
      skill: {
        Low: "Your skills are highly relevant and in-demand in the current market.",
        Moderate: "Your skills are moderately relevant but could benefit from updates.",
        High: "Your skills need significant updating to remain competitive.",
        Critical: "Your skills are becoming obsolete and require immediate attention.",
      },
      experience: {
        Low: "Your experience level provides good job security.",
        Moderate: "Your experience level offers moderate protection.",
        High: "Your experience level may present some challenges in the job market.",
        Critical: "Your experience level requires strategic career positioning.",
      },
      market: {
        Low: "Strong market demand exists for your skill set.",
        Moderate: "Moderate market demand for your skills with room for improvement.",
        High: "Limited market demand for your current skills.",
        Critical: "Very low market demand requiring immediate skill development.",
      },
    }

    return descriptions[factor as keyof typeof descriptions][level as keyof typeof descriptions.industry]
  }

  private static getSkillCategoryDistribution(userSkills: UserSkill[]): number[] {
    const categories = this.getSkillCategories(userSkills)
    return categories.map((category) => userSkills.filter((skill) => skill.skill?.category === category).length)
  }

  private static getSkillCategories(userSkills: UserSkill[]): string[] {
    const categories = new Set(userSkills.map((skill) => skill.skill?.category).filter(Boolean))
    return Array.from(categories) as string[]
  }
}
