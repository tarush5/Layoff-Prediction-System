import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { ReportGenerator } from "@/lib/report-generator"
import { SkillAnalysisEngine } from "@/lib/skill-analysis"
import { CareerRecommendationEngine } from "@/lib/career-recommendations"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reportType } = await request.json()

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get user skills with skill details
    const { data: userSkills, error: userSkillsError } = await supabase
      .from("user_skills")
      .select(`
        *,
        skill:skills(*)
      `)
      .eq("user_id", user.id)

    if (userSkillsError) {
      return NextResponse.json({ error: "Failed to fetch user skills" }, { status: 500 })
    }

    // Get latest layoff prediction
    const { data: prediction, error: predictionError } = await supabase
      .from("layoff_predictions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (predictionError || !prediction) {
      return NextResponse.json({ error: "No layoff prediction found. Please run prediction first." }, { status: 404 })
    }

    // Get all available skills for skill analysis
    const { data: allSkills, error: allSkillsError } = await supabase.from("skills").select("*")

    if (allSkillsError) {
      return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }

    // Perform skill analysis
    const skillAnalysis = SkillAnalysisEngine.analyzeSkills(
      userSkills || [],
      allSkills || [],
      profile.job_title,
      profile.industry,
    )

    // Generate career recommendations
    const careerRecommendations = CareerRecommendationEngine.generateRecommendations(
      profile,
      userSkills || [],
      prediction,
      skillAnalysis,
    )

    // Generate report
    const reportData = {
      profile,
      userSkills: userSkills || [],
      prediction,
      skillAnalysis,
      careerRecommendations,
      generatedAt: new Date().toISOString(),
    }

    const reportSections = ReportGenerator.generateReport(reportData)

    return NextResponse.json({
      reportType,
      sections: reportSections,
      metadata: {
        generatedAt: reportData.generatedAt,
        profileName: profile.full_name,
        riskLevel: prediction.risk_level,
        riskScore: prediction.risk_score,
      },
    })
  } catch (error) {
    console.error("Report generation API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
