import { Brain, Github, Mail, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-bold text-sidebar-foreground">LayoffGuard</span>
            </div>
            <p className="text-sm text-sidebar-foreground/70">
              AI-powered career security insights and skill development recommendations for the modern workforce.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>Risk Prediction</li>
              <li>Skill Analysis</li>
              <li>Career Guidance</li>
              <li>Company Insights</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Learning Center</li>
              <li>Best Practices</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-sidebar-foreground/70">
                <Mail className="w-4 h-4" />
                <span>support@layoffguard.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-sidebar-foreground/70">
                <Shield className="w-4 h-4" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-sidebar-foreground/70">
                <Github className="w-4 h-4" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-6 flex items-center justify-between">
          <p className="text-sm text-sidebar-foreground/70">© 2024 LayoffGuard. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-sm text-sidebar-foreground/70">
            <a href="#privacy" className="hover:text-sidebar-foreground">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-sidebar-foreground">
              Terms of Service
            </a>
            <a href="#security" className="hover:text-sidebar-foreground">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
