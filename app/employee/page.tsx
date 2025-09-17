import { EmployeeDashboard } from "@/components/employee-dashboard"
import { Sidebar } from "@/components/sidebar"

export default function EmployeePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employee Dashboard</h1>
              <p className="text-muted mt-2">Personal career security insights and recommendations</p>
            </div>
          </div>

          <EmployeeDashboard />
        </div>
      </main>
    </div>
  )
}
