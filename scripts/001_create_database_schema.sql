-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  job_title TEXT,
  company TEXT,
  industry TEXT,
  experience_years INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_skills table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  years_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  industry TEXT,
  size_category TEXT CHECK (size_category IN ('startup', 'small', 'medium', 'large', 'enterprise')),
  layoff_history JSONB DEFAULT '[]',
  financial_health_score INTEGER CHECK (financial_health_score >= 1 AND financial_health_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create layoff_predictions table
CREATE TABLE IF NOT EXISTS public.layoff_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  risk_score INTEGER CHECK (risk_score >= 1 AND risk_score <= 100),
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  factors JSONB NOT NULL DEFAULT '{}',
  recommendations JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skill_gaps table
CREATE TABLE IF NOT EXISTS public.skill_gaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  missing_skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  importance_score INTEGER CHECK (importance_score >= 1 AND importance_score <= 100),
  market_demand INTEGER CHECK (market_demand >= 1 AND market_demand <= 100),
  learning_resources JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create career_recommendations table
CREATE TABLE IF NOT EXISTS public.career_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recommendation_type TEXT CHECK (recommendation_type IN ('skill_development', 'career_pivot', 'industry_switch', 'role_upgrade')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority INTEGER CHECK (priority >= 1 AND priority <= 5),
  estimated_timeline TEXT,
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.layoff_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create RLS policies for user_skills
CREATE POLICY "user_skills_select_own" ON public.user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_skills_insert_own" ON public.user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_skills_update_own" ON public.user_skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_skills_delete_own" ON public.user_skills FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for layoff_predictions
CREATE POLICY "layoff_predictions_select_own" ON public.layoff_predictions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "layoff_predictions_insert_own" ON public.layoff_predictions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "layoff_predictions_update_own" ON public.layoff_predictions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "layoff_predictions_delete_own" ON public.layoff_predictions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for skill_gaps
CREATE POLICY "skill_gaps_select_own" ON public.skill_gaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "skill_gaps_insert_own" ON public.skill_gaps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "skill_gaps_update_own" ON public.skill_gaps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "skill_gaps_delete_own" ON public.skill_gaps FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for career_recommendations
CREATE POLICY "career_recommendations_select_own" ON public.career_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "career_recommendations_insert_own" ON public.career_recommendations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "career_recommendations_update_own" ON public.career_recommendations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "career_recommendations_delete_own" ON public.career_recommendations FOR DELETE USING (auth.uid() = user_id);

-- Allow public read access to skills and companies tables
CREATE POLICY "skills_select_all" ON public.skills FOR SELECT TO authenticated USING (true);
CREATE POLICY "companies_select_all" ON public.companies FOR SELECT TO authenticated USING (true);
