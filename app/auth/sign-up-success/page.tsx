import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, TrendingUp, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-foreground">CareerGuard</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <Card className="border-border bg-card">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-card-foreground">Check your email</CardTitle>
            <CardDescription className="text-muted-foreground">
              We've sent you a confirmation link to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground text-center">
                Please check your email and click the confirmation link to activate your account. You may need to check
                your spam folder.
              </p>
            </div>
            <div className="text-center">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/login">Return to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          Didn't receive the email? Check your spam folder or contact support
        </div>
      </div>
    </div>
  )
}
