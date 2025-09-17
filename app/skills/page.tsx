import { SkillGapAnalyzer } from "@/components/skill-gap-analyzer"
import { Sidebar } from "@/components/sidebar"

export default function SkillsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Skill Gap Analysis</h1>
              <p className="text-muted mt-2">Discover skill gaps and create your personalized learning roadmap</p>
            </div>
          </div>

          <SkillGapAnalyzer />
        </div>
      </main>
    </div>
  )
}
