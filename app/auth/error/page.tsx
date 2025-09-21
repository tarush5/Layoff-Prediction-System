import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, TrendingUp, AlertTriangle } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

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

        {/* Error Message */}
        <Card className="border-border bg-card">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mx-auto">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-card-foreground">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              {params?.error ? (
                <p className="text-sm text-destructive-foreground text-center">Error: {params.error}</p>
              ) : (
                <p className="text-sm text-destructive-foreground text-center">
                  An authentication error occurred. Please try again.
                </p>
              )}
            </div>
            <div className="text-center space-y-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/login">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/sign-up">Create New Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
