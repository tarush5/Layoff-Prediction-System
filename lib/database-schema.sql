-- Enhanced database schema for advanced prediction system

-- Add new columns to layoff_predictions table
ALTER TABLE layoff_predictions 
ADD COLUMN IF NOT EXISTS confidence INTEGER DEFAULT 75,
ADD COLUMN IF NOT EXISTS trend_analysis JSONB,
ADD COLUMN IF NOT EXISTS market_insights JSONB;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_layoff_predictions_user_created 
ON layoff_predictions(user_id, created_at DESC);

-- Create companies table for company health data
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  industry TEXT,
  financial_health_score INTEGER CHECK (financial_health_score >= 0 AND financial_health_score <= 100),
  employee_count INTEGER,
  founded_year INTEGER,
  stock_symbol TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market_conditions table for economic indicators
CREATE TABLE IF NOT EXISTS market_conditions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  recession_indicator BOOLEAN DEFAULT FALSE,
  inflation_rate DECIMAL(5,2),
  unemployment_rate DECIMAL(5,2),
  gdp_growth_rate DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample market conditions
INSERT INTO market_conditions (date, recession_indicator, inflation_rate, unemployment_rate, gdp_growth_rate)
VALUES 
  (CURRENT_DATE, FALSE, 3.2, 4.1, 2.8),
  (CURRENT_DATE - INTERVAL '1 month', FALSE, 3.4, 4.0, 2.9),
  (CURRENT_DATE - INTERVAL '2 months', FALSE, 3.6, 3.9, 3.1)
ON CONFLICT (date) DO NOTHING;

-- Create skill_market_data table for skill demand trends
CREATE TABLE IF NOT EXISTS skill_market_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_name TEXT NOT NULL,
  demand_growth_rate DECIMAL(5,2) DEFAULT 1.0,
  future_relevance_score DECIMAL(3,2) CHECK (future_relevance_score >= 0 AND future_relevance_score <= 1),
  salary_impact_multiplier DECIMAL(3,2) DEFAULT 1.0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(skill_name)
);

-- Insert sample skill market data
INSERT INTO skill_market_data (skill_name, demand_growth_rate, future_relevance_score, salary_impact_multiplier)
VALUES 
  ('Machine Learning', 1.5, 0.95, 1.3),
  ('Python', 1.3, 0.9, 1.2),
  ('JavaScript', 1.2, 0.85, 1.1),
  ('React', 1.4, 0.8, 1.15),
  ('AWS', 1.6, 0.9, 1.25),
  ('Docker', 1.3, 0.85, 1.1),
  ('Cybersecurity', 1.7, 0.95, 1.4),
  ('Data Analysis', 1.4, 0.9, 1.2),
  ('Project Management', 1.1, 0.8, 1.05),
  ('Leadership', 1.0, 0.9, 1.3),
  ('AI/ML', 1.8, 0.98, 1.5),
  ('Blockchain', 1.2, 0.7, 1.2),
  ('DevOps', 1.4, 0.85, 1.2),
  ('UX Design', 1.1, 0.8, 1.1)
ON CONFLICT (skill_name) DO NOTHING;

-- Add RLS policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_market_data ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to companies" ON companies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access to market_conditions" ON market_conditions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access to skill_market_data" ON skill_market_data FOR SELECT TO authenticated USING (true);
