import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: userSkills, error: skillsError } = await supabase
      .from("user_skills")
      .select(`
        *,
        skill:skills(*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (skillsError) {
      return NextResponse.json({ error: "Failed to fetch user skills" }, { status: 500 })
    }

    return NextResponse.json(userSkills)
  } catch (error) {
    console.error("User skills API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { skill_id, proficiency_level, years_experience } = body

    const { data: userSkill, error: insertError } = await supabase
      .from("user_skills")
      .insert({
        user_id: user.id,
        skill_id,
        proficiency_level,
        years_experience,
      })
      .select(`
        *,
        skill:skills(*)
      `)
      .single()

    if (insertError) {
      return NextResponse.json({ error: "Failed to add skill" }, { status: 500 })
    }

    return NextResponse.json(userSkill)
  } catch (error) {
    console.error("Add user skill API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, proficiency_level, years_experience } = body

    const { data: userSkill, error: updateError } = await supabase
      .from("user_skills")
      .update({
        proficiency_level,
        years_experience,
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select(`
        *,
        skill:skills(*)
      `)
      .single()

    if (updateError) {
      return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
    }

    return NextResponse.json(userSkill)
  } catch (error) {
    console.error("Update user skill API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const skillId = searchParams.get("id")

    if (!skillId) {
      return NextResponse.json({ error: "Skill ID required" }, { status: 400 })
    }

    const { error: deleteError } = await supabase.from("user_skills").delete().eq("id", skillId).eq("user_id", user.id)

    if (deleteError) {
      return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete user skill API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
