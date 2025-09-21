import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { AdvancedLayoffPredictionEngine } from "@/lib/advanced-prediction-engine"

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
    const { data: userSkills, error: skillsError } = await supabase
      .from("user_skills")
      .select(`
        *,
        skill:skills(*)
      `)
      .eq("user_id", user.id)

    if (skillsError) {
      return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }

    // Get company health score if available
    let companyHealthScore: number | undefined
    if (profile.company) {
      const { data: company } = await supabase
        .from("companies")
        .select("financial_health_score")
        .eq("name", profile.company)
        .single()

      companyHealthScore = company?.financial_health_score
    }

    const marketConditions = {
      recession: false, // Could be fetched from external API
      inflation: 3.2,
      unemployment: 4.1,
    }

    const prediction = AdvancedLayoffPredictionEngine.calculateAdvancedRiskScore(
      profile,
      userSkills || [],
      companyHealthScore,
      marketConditions,
    )

    const { data: savedPrediction, error: saveError } = await supabase
      .from("layoff_predictions")
      .insert({
        user_id: user.id,
        risk_score: prediction.riskScore,
        risk_level: prediction.riskLevel,
        factors: prediction.factors,
        recommendations: prediction.recommendations,
        confidence: prediction.confidence,
        trend_analysis: prediction.trendAnalysis,
        market_insights: prediction.marketInsights,
      })
      .select()
      .single()

    if (saveError) {
      console.error("Failed to save prediction:", saveError)
      // Continue anyway, return the calculated prediction
    }

    return NextResponse.json({
      ...prediction,
      id: savedPrediction?.id,
      created_at: savedPrediction?.created_at,
    })
  } catch (error) {
    console.error("Prediction API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
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

    // Get latest prediction
    const { data: prediction, error: predictionError } = await supabase
      .from("layoff_predictions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (predictionError) {
      return NextResponse.json({ error: "No predictions found" }, { status: 404 })
    }

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Get prediction API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
