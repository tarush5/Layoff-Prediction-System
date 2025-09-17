import { type NextRequest, NextResponse } from "next/server"

// Mock skill analysis function
function analyzeSkillGap(employeeData: any) {
  const currentSkills =
    employeeData.skills
      ?.toLowerCase()
      .split(",")
      .map((s: string) => s.trim()) || []

  // Industry-specific skill demands
  const industrySkillDemands = {
    technology: [
      { skill: "Cloud Computing (AWS/Azure)", demand: 95, growth: 22, avgSalaryIncrease: 28000 },
      { skill: "Machine Learning & AI", demand: 92, growth: 35, avgSalaryIncrease: 35000 },
      { skill: "React/Frontend Frameworks", demand: 88, growth: 15, avgSalaryIncrease: 22000 },
      { skill: "Python Programming", demand: 85, growth: 18, avgSalaryIncrease: 25000 },
      { skill: "DevOps & CI/CD", demand: 82, growth: 20, avgSalaryIncrease: 30000 },
    ],
    finance: [
      { skill: "Data Analysis & Visualization", demand: 90, growth: 25, avgSalaryIncrease: 32000 },
      { skill: "Risk Management", demand: 85, growth: 12, avgSalaryIncrease: 28000 },
      { skill: "Regulatory Compliance", demand: 78, growth: 8, avgSalaryIncrease: 25000 },
      { skill: "Financial Modeling", demand: 82, growth: 15, avgSalaryIncrease: 30000 },
      { skill: "Blockchain & Crypto", demand: 70, growth: 45, avgSalaryIncrease: 40000 },
    ],
    healthcare: [
      { skill: "Healthcare Analytics", demand: 88, growth: 28, avgSalaryIncrease: 35000 },
      { skill: "HIPAA Compliance", demand: 85, growth: 10, avgSalaryIncrease: 20000 },
      { skill: "Electronic Health Records", demand: 80, growth: 15, avgSalaryIncrease: 25000 },
      { skill: "Telemedicine Platforms", demand: 75, growth: 40, avgSalaryIncrease: 30000 },
      { skill: "Medical Device Integration", demand: 72, growth: 18, avgSalaryIncrease: 28000 },
    ],
  }

  const industry = employeeData.industry?.toLowerCase() || "technology"
  const relevantSkills = industrySkillDemands[industry] || industrySkillDemands.technology

  // Analyze skill gaps
  const skillGaps = relevantSkills.map((skillData) => {
    const hasSkill = currentSkills.some(
      (current) =>
        current.includes(skillData.skill.toLowerCase().split(" ")[0]) ||
        skillData.skill.toLowerCase().includes(current),
    )

    return {
      ...skillData,
      hasSkill,
      priority: skillData.demand > 85 ? "High" : skillData.demand > 75 ? "Medium" : "Low",
      timeToLearn: skillData.demand > 85 ? "2-4 months" : "3-6 months",
      riskReduction: Math.round(skillData.demand * 0.3) + "%",
    }
  })

  // Calculate overall skill score
  const skillsWithDemand = skillGaps.filter((s) => s.hasSkill)
  const totalDemandScore = skillsWithDemand.reduce((sum, skill) => sum + skill.demand, 0)
  const skillScore = skillsWithDemand.length > 0 ? Math.round(totalDemandScore / skillsWithDemand.length) : 0

  // Generate recommendations (skills not currently possessed)
  const recommendations = skillGaps
    .filter((skill) => !skill.hasSkill)
    .sort((a, b) => b.demand - a.demand)
    .slice(0, 5)

  // Career path suggestions
  const careerPaths = [
    {
      title: "Senior " + employeeData.role,
      requiredSkills: recommendations.slice(0, 2).map((r) => r.skill),
      timeframe: "12-18 months",
      salaryIncrease: "$15,000 - $25,000",
    },
    {
      title: "Technical Lead",
      requiredSkills: ["Leadership", "Project Management", ...recommendations.slice(0, 1).map((r) => r.skill)],
      timeframe: "18-24 months",
      salaryIncrease: "$20,000 - $35,000",
    },
  ]

  return {
    skillScore,
    skillLevel:
      skillScore > 80 ? "Expert" : skillScore > 60 ? "Proficient" : skillScore > 40 ? "Developing" : "Beginner",
    currentSkills: skillsWithDemand,
    skillGaps: recommendations,
    careerPaths,
    industryTrends: {
      growingSkills: relevantSkills.filter((s) => s.growth > 20).map((s) => s.skill),
      decliningSkills: ["Legacy Systems", "Manual Processes", "Outdated Frameworks"],
      emergingSkills: relevantSkills.filter((s) => s.growth > 30).map((s) => s.skill),
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const employeeData = await request.json()

    // Validate required fields
    if (!employeeData.role || !employeeData.industry) {
      return NextResponse.json({ error: "Missing required fields: role, industry" }, { status: 400 })
    }

    // Analyze skill gaps
    const analysis = analyzeSkillGap(employeeData)

    console.log(`Skill analysis generated for ${employeeData.role} in ${employeeData.industry}`)

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in skill analysis:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
