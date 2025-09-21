-- Insert common skills
INSERT INTO public.skills (name, category, description) VALUES
-- Technical Skills
('JavaScript', 'Programming', 'Popular programming language for web development'),
('Python', 'Programming', 'Versatile programming language for data science and web development'),
('React', 'Frontend', 'Popular JavaScript library for building user interfaces'),
('Node.js', 'Backend', 'JavaScript runtime for server-side development'),
('SQL', 'Database', 'Language for managing and querying databases'),
('AWS', 'Cloud', 'Amazon Web Services cloud platform'),
('Docker', 'DevOps', 'Containerization platform'),
('Git', 'Version Control', 'Distributed version control system'),
('Machine Learning', 'AI/ML', 'Artificial intelligence and machine learning techniques'),
('Data Analysis', 'Analytics', 'Analyzing and interpreting data'),

-- Soft Skills
('Project Management', 'Management', 'Planning and executing projects'),
('Leadership', 'Management', 'Leading and motivating teams'),
('Communication', 'Soft Skills', 'Effective verbal and written communication'),
('Problem Solving', 'Soft Skills', 'Analytical thinking and solution finding'),
('Teamwork', 'Soft Skills', 'Collaborating effectively with others'),

-- Industry-Specific Skills
('Digital Marketing', 'Marketing', 'Online marketing strategies and tools'),
('Financial Analysis', 'Finance', 'Analyzing financial data and trends'),
('UX/UI Design', 'Design', 'User experience and interface design'),
('Cybersecurity', 'Security', 'Information security and protection'),
('Agile Methodology', 'Process', 'Agile project management approach')

ON CONFLICT (name) DO NOTHING;

-- Insert sample companies
INSERT INTO public.companies (name, industry, size_category, financial_health_score) VALUES
('TechCorp', 'Technology', 'large', 85),
('StartupXYZ', 'Technology', 'startup', 65),
('FinanceGiant', 'Finance', 'enterprise', 90),
('RetailChain', 'Retail', 'large', 70),
('HealthcarePlus', 'Healthcare', 'medium', 80),
('ManufacturingCo', 'Manufacturing', 'large', 75),
('ConsultingFirm', 'Consulting', 'medium', 85),
('MediaGroup', 'Media', 'medium', 60),
('EnergyCompany', 'Energy', 'enterprise', 78),
('EducationTech', 'Education', 'small', 72)

ON CONFLICT (name) DO NOTHING;
