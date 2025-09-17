import { type NextRequest, NextResponse } from "next/server"

// Mock ML prediction function (in production, this would call Python ML service)
function predictLayoffRisk(employeeData: any) {
  // Simulate ML model prediction based on input features
  let riskScore = 0

  // Industry risk factors
  const industryRisk = {
    technology: 25,
    finance: 15,
    healthcare: 10,
    retail: 30,
    manufacturing: 20,
    education: 5,
  }

  riskScore += industryRisk[employeeData.industry?.toLowerCase()] || 15

  // Experience risk
  const experience = Number.parseInt(employeeData.experience?.split("-")[0]) || 0
  if (experience < 2) riskScore += 25
  else if (experience > 15) riskScore += 15
  else if (experience >= 6) riskScore -= 10

  // Performance risk
  const performanceRisk = {
    excellent: -15,
    good: -5,
    average: 10,
    "below-average": 30,
  }
  riskScore += performanceRisk[employeeData.performance?.toLowerCase().replace(" ", "-")] || 0

  // Department risk
  const departmentRisk = {
    marketing: 20,
    sales: 15,
    hr: 25,
    engineering: -5,
    finance: 5,
    operations: 10,
  }
  riskScore += departmentRisk[employeeData.department?.toLowerCase()] || 0

  // Skills analysis
  const skills =
    employeeData.skills
      ?.toLowerCase()
      .split(",")
      .map((s: string) => s.trim()) || []
  const highDemandSkills = ["python", "aws", "react", "machine learning", "docker", "kubernetes", "data analysis"]
  const skillMatches = skills.filter((skill) => highDemandSkills.some((demand) => skill.includes(demand))).length

  if (skillMatches === 0) riskScore += 25
  else if (skillMatches < 2) riskScore += 15
  else if (skillMatches >= 3) riskScore -= 10

  // Normalize score
  riskScore = Math.max(0, Math.min(100, riskScore + Math.random() * 20 - 10))

  // Determine risk level
  let riskLevel: "Low" | "Medium" | "High"
  if (riskScore < 30) riskLevel = "Low"
  else if (riskScore < 60) riskLevel = "Medium"
  else riskLevel = "High"

  // Generate risk factors
  const factors = [
    {
      factor: "Industry Stability",
      impact: Math.min(100, riskScore + Math.random() * 20 - 10),
      description: `${employeeData.industry} sector showing ${riskScore > 50 ? "volatility" : "stability"}`,
    },
    {
      factor: "Role Demand",
      impact: Math.min(100, Math.max(0, 80 - riskScore + Math.random() * 20 - 10)),
      description: `${employeeData.role} position in ${riskScore > 50 ? "declining" : "growing"} demand`,
    },
    {
      factor: "Skill Relevance",
      impact: Math.min(100, Math.max(0, 90 - skillMatches * 15 + Math.random() * 10 - 5)),
      description: `${skillMatches} high-demand skills identified`,
    },
    {
      factor: "Performance Rating",
      impact: Math.min(
        100,
        Math.max(0, 95 - (performanceRisk[employeeData.performance?.toLowerCase().replace(" ", "-")] || 0)),
      ),
      description: `${employeeData.performance} performance history`,
    },
  ]

  // Generate skill recommendations
  const allSkills = [
    { skill: "Cloud Computing (AWS)", priority: "High", timeToLearn: "3-6 months", impact: "Reduces risk by 25%" },
    { skill: "Data Analysis & ML", priority: "High", timeToLearn: "2-4 months", impact: "Reduces risk by 20%" },
    { skill: "Project Management", priority: "Medium", timeToLearn: "1-3 months", impact: "Reduces risk by 15%" },
    { skill: "Cybersecurity", priority: "High", timeToLearn: "4-8 months", impact: "Reduces risk by 22%" },
    { skill: "Leadership Skills", priority: "Medium", timeToLearn: "6-12 months", impact: "Reduces risk by 18%" },
    { skill: "Full-Stack Development", priority: "Medium", timeToLearn: "4-8 months", impact: "Reduces risk by 16%" },
  ]

  // Filter recommendations based on current skills
  const recommendations = allSkills
    .filter((rec) => !skills.some((skill) => skill.includes(rec.skill.toLowerCase().split(" ")[0])))
    .slice(0, 4)

  return {
    riskScore: Math.round(riskScore),
    riskLevel,
    factors,
    recommendations,
    confidence: Math.round(85 + Math.random() * 10),
    modelVersion: "1.0",
  }
}

export async function POST(request: NextRequest) {
  try {
    const employeeData = await request.json()

    // Validate required fields
    if (!employeeData.role || !employeeData.experience || !employeeData.department) {
      return NextResponse.json({ error: "Missing required fields: role, experience, department" }, { status: 400 })
    }

    // Get prediction from ML model
    const prediction = predictLayoffRisk(employeeData)

    // Log prediction for monitoring (in production, send to analytics)
    console.log(`Layoff prediction generated for ${employeeData.role} with ${prediction.riskScore}% risk`)

    return NextResponse.json({
      success: true,
      prediction,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in layoff prediction:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
