import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
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

    // Get all available skills
    const { data: allSkills, error: allSkillsError } = await supabase.from("skills").select("*")

    if (allSkillsError) {
      return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }

    // Perform skill analysis
    const analysis = SkillAnalysisEngine.analyzeSkills(
      userSkills || [],
      allSkills || [],
      profile.job_title,
      profile.industry,
    )

    // Save skill gaps to database
    if (analysis.skillGaps.length > 0) {
      const skillGapsToInsert = analysis.skillGaps.map((gap) => ({
        user_id: user.id,
        missing_skill_id: gap.skill.id,
        importance_score: gap.importanceScore,
        market_demand: gap.marketDemand,
        learning_resources: gap.learningResources,
      }))

      // Delete existing skill gaps for this user
      await supabase.from("skill_gaps").delete().eq("user_id", user.id)

      // Insert new skill gaps
      const { error: insertError } = await supabase.from("skill_gaps").insert(skillGapsToInsert)

      if (insertError) {
        console.error("Failed to save skill gaps:", insertError)
        // Continue anyway, return the analysis
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Skill analysis API error:", error)
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

    // Get saved skill gaps
    const { data: skillGaps, error: skillGapsError } = await supabase
      .from("skill_gaps")
      .select(`
        *,
        skill:skills(*)
      `)
      .eq("user_id", user.id)
      .order("importance_score", { ascending: false })

    if (skillGapsError) {
      return NextResponse.json({ error: "Failed to fetch skill gaps" }, { status: 500 })
    }

    return NextResponse.json(skillGaps)
  } catch (error) {
    console.error("Get skill analysis API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
