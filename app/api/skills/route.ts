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

    // Get all available skills
    const { data: skills, error: skillsError } = await supabase.from("skills").select("*").order("name")

    if (skillsError) {
      return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }

    return NextResponse.json(skills)
  } catch (error) {
    console.error("Skills API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
