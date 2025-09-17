import { Sidebar } from "@/components/sidebar"
import { ProjectSummary } from "@/components/project-summary"

export default function SummaryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <ProjectSummary />
        </div>
      </main>
    </div>
  )
}
