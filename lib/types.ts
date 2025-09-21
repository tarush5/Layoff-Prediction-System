export interface Profile {
  id: string
  email: string
  full_name?: string
  job_title?: string
  company?: string
  industry?: string
  experience_years?: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  description?: string
  created_at: string
}

export interface UserSkill {
  id: string
  user_id: string
  skill_id: string
  proficiency_level: number
  years_experience: number
  created_at: string
  skill?: Skill
}

export interface Company {
  id: string
  name: string
  industry?: string
  size_category?: "startup" | "small" | "medium" | "large" | "enterprise"
  layoff_history: any[]
  financial_health_score?: number
  created_at: string
}

export interface LayoffPrediction {
  id: string
  user_id: string
  risk_score: number
  risk_level: "low" | "medium" | "high" | "critical"
  factors: Record<string, any>
  recommendations: any[]
  created_at: string
}

export interface SkillGap {
  id: string
  user_id: string
  missing_skill_id: string
  importance_score: number
  market_demand: number
  learning_resources: any[]
  created_at: string
  skill?: Skill
}

export interface CareerRecommendation {
  id: string
  user_id: string
  recommendation_type: "skill_development" | "career_pivot" | "industry_switch" | "role_upgrade"
  title: string
  description: string
  priority: number
  estimated_timeline?: string
  resources: any[]
  created_at: string
}
