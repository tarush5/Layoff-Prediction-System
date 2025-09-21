import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { CareerRecommendationEngine } from "@/lib/career-recommendations"
import { SkillAnalysisEngine } from "@/lib/skill-analysis"

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

    // Save recommendations to database
    if (careerRecommendations.recommendations.length > 0) {
      const recommendationsToInsert = careerRecommendations.recommendations.map((rec) => ({
        user_id: user.id,
        recommendation_type: rec.type,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
        estimated_timeline: rec.estimatedTimeline,
        resources: rec.resources,
      }))

      // Delete existing recommendations for this user
      await supabase.from("career_recommendations").delete().eq("user_id", user.id)

      // Insert new recommendations
      const { error: insertError } = await supabase.from("career_recommendations").insert(recommendationsToInsert)

      if (insertError) {
        console.error("Failed to save career recommendations:", insertError)
        // Continue anyway, return the recommendations
      }
    }

    return NextResponse.json(careerRecommendations)
  } catch (error) {
    console.error("Career recommendations API error:", error)
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

    // Get saved career recommendations
    const { data: recommendations, error: recommendationsError } = await supabase
      .from("career_recommendations")
      .select("*")
      .eq("user_id", user.id)
      .order("priority", { ascending: false })

    if (recommendationsError) {
      return NextResponse.json({ error: "Failed to fetch career recommendations" }, { status: 500 })
    }

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Get career recommendations API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
