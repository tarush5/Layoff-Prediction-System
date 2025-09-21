"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, X, Star, Search } from "lucide-react"
import type { Profile, Skill, UserSkill } from "@/lib/types"

interface SkillManagementProps {
  profile: Profile | null
}

export function SkillManagement({ profile }: SkillManagementProps) {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([])
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")
  const [proficiencyLevel, setProficiencyLevel] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchUserSkills()
    fetchAvailableSkills()
  }, [])

  const fetchUserSkills = async () => {
    try {
      const response = await fetch("/api/user-skills")
      if (response.ok) {
        const skills = await response.json()
        setUserSkills(skills)
      }
    } catch (error) {
      console.error("Failed to fetch user skills:", error)
    }
  }

  const fetchAvailableSkills = async () => {
    try {
      const response = await fetch("/api/skills")
      if (response.ok) {
        const skills = await response.json()
        setAvailableSkills(skills)
      }
    } catch (error) {
      console.error("Failed to fetch available skills:", error)
    }
  }

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSkill || !proficiencyLevel || !yearsExperience) return

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/user-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skill_id: selectedSkill,
          proficiency_level: Number.parseInt(proficiencyLevel),
          years_experience: Number.parseInt(yearsExperience),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add skill")
      }

      const newSkill = await response.json()
      setUserSkills((prev) => [newSkill, ...prev])
      setSelectedSkill("")
      setProficiencyLevel("")
      setYearsExperience("")
      setMessage({ type: "success", text: "Skill added successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add skill. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveSkill = async (skillId: string) => {
    try {
      const response = await fetch(`/api/user-skills?id=${skillId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove skill")
      }

      setUserSkills((prev) => prev.filter((skill) => skill.id !== skillId))
      setMessage({ type: "success", text: "Skill removed successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to remove skill. Please try again." })
    }
  }

  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 5:
        return "Expert"
      case 4:
        return "Advanced"
      case 3:
        return "Intermediate"
      case 2:
        return "Beginner"
      default:
        return "Novice"
    }
  }

  const filteredSkills = availableSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !userSkills.some((userSkill) => userSkill.skill_id === skill.id),
  )

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Manage Your Skills</h2>
        <p className="text-muted-foreground">Add and track your professional skills to get better recommendations</p>
      </div>

      {/* Add New Skill */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Plus className="w-5 h-5" />
            Add New Skill
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Add skills to your profile to improve risk assessment accuracy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skill-search" className="text-card-foreground">
                Search Skills
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="skill-search"
                  type="text"
                  placeholder="Search for skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill-select" className="text-card-foreground">
                Select Skill
              </Label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Choose a skill" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSkills.slice(0, 10).map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{skill.name}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="proficiency" className="text-card-foreground">
                  Proficiency Level
                </Label>
                <Select value={proficiencyLevel} onValueChange={setProficiencyLevel}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Novice</SelectItem>
                    <SelectItem value="2">2 - Beginner</SelectItem>
                    <SelectItem value="3">3 - Intermediate</SelectItem>
                    <SelectItem value="4">4 - Advanced</SelectItem>
                    <SelectItem value="5">5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="years" className="text-card-foreground">
                  Years of Experience
                </Label>
                <Input
                  id="years"
                  type="number"
                  placeholder="2"
                  min="0"
                  max="50"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>

            {message && (
              <Alert
                className={
                  message.type === "success"
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                }
              >
                <AlertDescription
                  className={
                    message.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                  }
                >
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading || !selectedSkill || !proficiencyLevel || !yearsExperience}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Adding..." : "Add Skill"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Current Skills */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Your Skills ({userSkills.length})</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your current skill profile used for risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userSkills.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No skills added yet. Add your first skill above.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userSkills.map((userSkill) => (
                <div
                  key={userSkill.id}
                  className="p-4 bg-muted/50 rounded-lg border border-border flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-card-foreground">{userSkill.skill?.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {userSkill.skill?.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < userSkill.proficiency_level ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{userSkill.years_experience} years</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSkill(userSkill.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
