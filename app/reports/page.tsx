import { ReportGenerator } from "@/components/report-generator"
import { Sidebar } from "@/components/sidebar"

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted mt-2">Generate comprehensive reports and export insights</p>
            </div>
          </div>

          <ReportGenerator />
        </div>
      </main>
    </div>
  )
}
