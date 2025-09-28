-- Insert comprehensive skills data
INSERT INTO public.skills (name, category, description) VALUES
-- Programming Languages
('JavaScript', 'Programming', 'Popular programming language for web development'),
('Python', 'Programming', 'Versatile programming language for data science and web development'),
('TypeScript', 'Programming', 'Typed superset of JavaScript'),
('Java', 'Programming', 'Enterprise-grade object-oriented programming language'),
('C#', 'Programming', 'Microsoft .NET programming language'),
('Go', 'Programming', 'Google''s systems programming language'),
('Rust', 'Programming', 'Systems programming language focused on safety'),
('PHP', 'Programming', 'Server-side scripting language'),
('Swift', 'Programming', 'Apple''s programming language for iOS development'),
('Kotlin', 'Programming', 'Modern programming language for Android development'),

-- Frontend Technologies
('React', 'Frontend', 'Popular JavaScript library for building user interfaces'),
('Vue.js', 'Frontend', 'Progressive JavaScript framework'),
('Angular', 'Frontend', 'TypeScript-based web application framework'),
('Next.js', 'Frontend', 'React framework for production'),
('HTML', 'Frontend', 'Markup language for web pages'),
('CSS', 'Frontend', 'Styling language for web pages'),
('Sass/SCSS', 'Frontend', 'CSS preprocessor'),
('Tailwind CSS', 'Frontend', 'Utility-first CSS framework'),

-- Backend Technologies
('Node.js', 'Backend', 'JavaScript runtime for server-side development'),
('Express', 'Backend', 'Web framework for Node.js'),
('Django', 'Backend', 'Python web framework'),
('Spring Boot', 'Backend', 'Java framework for building applications'),
('FastAPI', 'Backend', 'Modern Python web framework'),
('Ruby on Rails', 'Backend', 'Ruby web framework'),
('ASP.NET', 'Backend', 'Microsoft web framework'),

-- Databases
('SQL', 'Database', 'Language for managing and querying databases'),
('PostgreSQL', 'Database', 'Advanced open-source relational database'),
('MongoDB', 'Database', 'NoSQL document database'),
('Redis', 'Database', 'In-memory data structure store'),
('MySQL', 'Database', 'Popular open-source relational database'),
('SQLite', 'Database', 'Lightweight embedded database'),
('Elasticsearch', 'Database', 'Search and analytics engine'),

-- Cloud & DevOps
('AWS', 'Cloud', 'Amazon Web Services cloud platform'),
('Docker', 'DevOps', 'Containerization platform'),
('Kubernetes', 'DevOps', 'Container orchestration platform'),
('Azure', 'Cloud', 'Microsoft cloud platform'),
('Google Cloud', 'Cloud', 'Google''s cloud platform'),
('Terraform', 'DevOps', 'Infrastructure as code tool'),
('Jenkins', 'DevOps', 'Continuous integration tool'),
('GitLab CI/CD', 'DevOps', 'Continuous integration and deployment'),
('Ansible', 'DevOps', 'Configuration management tool'),

-- Data & AI
('Machine Learning', 'AI/ML', 'Artificial intelligence and machine learning techniques'),
('Data Analysis', 'Analytics', 'Analyzing and interpreting data'),
('Data Science', 'Analytics', 'Extracting insights from data'),
('Artificial Intelligence', 'AI/ML', 'AI systems and algorithms'),
('TensorFlow', 'AI/ML', 'Machine learning framework'),
('PyTorch', 'AI/ML', 'Deep learning framework'),
('Pandas', 'Analytics', 'Python data manipulation library'),
('NumPy', 'Analytics', 'Python numerical computing library'),
('R', 'Analytics', 'Statistical computing language'),
('Tableau', 'Analytics', 'Data visualization tool'),
('Power BI', 'Analytics', 'Microsoft business intelligence tool'),

-- Soft Skills
('Project Management', 'Management', 'Planning and executing projects'),
('Leadership', 'Management', 'Leading and motivating teams'),
('Communication', 'Soft Skills', 'Effective verbal and written communication'),
('Problem Solving', 'Soft Skills', 'Analytical thinking and solution finding'),
('Teamwork', 'Soft Skills', 'Collaborating effectively with others'),
('Critical Thinking', 'Soft Skills', 'Objective analysis and evaluation'),
('Time Management', 'Soft Skills', 'Efficiently managing time and priorities'),
('Adaptability', 'Soft Skills', 'Adjusting to change and new situations'),

-- Design
('UX/UI Design', 'Design', 'User experience and interface design'),
('Figma', 'Design', 'Collaborative design tool'),
('Adobe Creative Suite', 'Design', 'Professional design software suite'),
('Sketch', 'Design', 'Digital design toolkit'),
('Prototyping', 'Design', 'Creating interactive mockups'),

-- Security
('Cybersecurity', 'Security', 'Information security and protection'),
('Information Security', 'Security', 'Protecting information assets'),
('Network Security', 'Security', 'Securing network infrastructure'),
('Penetration Testing', 'Security', 'Ethical hacking and security testing'),

-- Business & Marketing
('Digital Marketing', 'Marketing', 'Online marketing strategies and tools'),
('Financial Analysis', 'Finance', 'Analyzing financial data and trends'),
('Business Analysis', 'Business', 'Analyzing business processes and requirements'),
('Product Management', 'Management', 'Managing product development lifecycle'),
('Agile Methodology', 'Process', 'Agile project management approach'),
('Scrum', 'Process', 'Agile framework for project management'),
('SEO', 'Marketing', 'Search engine optimization'),
('Content Marketing', 'Marketing', 'Creating and distributing valuable content'),

-- Mobile Development
('iOS Development', 'Mobile', 'Developing applications for iOS'),
('Android Development', 'Mobile', 'Developing applications for Android'),
('React Native', 'Mobile', 'Cross-platform mobile development framework'),
('Flutter', 'Mobile', 'Google''s UI toolkit for mobile development')

ON CONFLICT (name) DO NOTHING;

-- Insert comprehensive company data
INSERT INTO public.companies (name, industry, size_category, financial_health_score) VALUES
-- Technology Companies
('Google', 'Technology', 'enterprise', 95),
('Microsoft', 'Technology', 'enterprise', 92),
('Apple', 'Technology', 'enterprise', 98),
('Amazon', 'Technology', 'enterprise', 88),
('Meta', 'Technology', 'enterprise', 85),
('Netflix', 'Technology', 'large', 82),
('Spotify', 'Technology', 'large', 78),
('Uber', 'Technology', 'large', 75),
('Airbnb', 'Technology', 'large', 80),
('TechStartup Inc', 'Technology', 'startup', 65),
('InnovateNow', 'Technology', 'startup', 70),
('CodeCraft Solutions', 'Technology', 'small', 72),

-- Finance Companies
('JPMorgan Chase', 'Finance', 'enterprise', 90),
('Goldman Sachs', 'Finance', 'large', 88),
('Morgan Stanley', 'Finance', 'large', 85),
('Wells Fargo', 'Finance', 'enterprise', 82),
('Bank of America', 'Finance', 'enterprise', 84),
('Citigroup', 'Finance', 'enterprise', 80),
('FinTech Innovations', 'Finance', 'medium', 75),
('CryptoVentures', 'Finance', 'startup', 68),

-- Healthcare Companies
('Johnson & Johnson', 'Healthcare', 'enterprise', 92),
('Pfizer', 'Healthcare', 'enterprise', 90),
('UnitedHealth Group', 'Healthcare', 'enterprise', 88),
('Moderna', 'Healthcare', 'large', 85),
('HealthTech Solutions', 'Healthcare', 'medium', 78),
('MedDevice Corp', 'Healthcare', 'medium', 80),

-- Retail Companies
('Walmart', 'Retail', 'enterprise', 85),
('Amazon Retail', 'Retail', 'enterprise', 88),
('Target', 'Retail', 'large', 82),
('Costco', 'Retail', 'large', 87),
('Home Depot', 'Retail', 'large', 84),
('RetailChain Plus', 'Retail', 'medium', 70),
('LocalRetail Co', 'Retail', 'small', 65),

-- Manufacturing Companies
('General Electric', 'Manufacturing', 'enterprise', 78),
('Boeing', 'Manufacturing', 'enterprise', 75),
('Ford Motor Company', 'Manufacturing', 'enterprise', 80),
('General Motors', 'Manufacturing', 'enterprise', 82),
('Tesla', 'Manufacturing', 'large', 85),
('ManufacturingCorp', 'Manufacturing', 'large', 75),

-- Consulting Companies
('McKinsey & Company', 'Consulting', 'large', 90),
('Boston Consulting Group', 'Consulting', 'large', 88),
('Bain & Company', 'Consulting', 'large', 87),
('Deloitte', 'Consulting', 'enterprise', 85),
('PwC', 'Consulting', 'enterprise', 84),
('KPMG', 'Consulting', 'enterprise', 83),
('ConsultingFirm LLC', 'Consulting', 'medium', 78),

-- Media Companies
('Disney', 'Media', 'enterprise', 82),
('Warner Bros', 'Media', 'large', 78),
('NBCUniversal', 'Media', 'large', 80),
('ViacomCBS', 'Media', 'large', 75),
('MediaGroup Inc', 'Media', 'medium', 70),
('StreamingCorp', 'Media', 'startup', 68),

-- Energy Companies
('ExxonMobil', 'Energy', 'enterprise', 78),
('Chevron', 'Energy', 'enterprise', 80),
('BP', 'Energy', 'enterprise', 75),
('Shell', 'Energy', 'enterprise', 77),
('NextEra Energy', 'Energy', 'large', 85),
('GreenEnergy Solutions', 'Energy', 'medium', 82),

-- Education Companies
('Pearson', 'Education', 'large', 75),
('McGraw-Hill', 'Education', 'large', 78),
('Coursera', 'Education', 'medium', 80),
('Udemy', 'Education', 'medium', 82),
('EdTech Innovations', 'Education', 'startup', 70),
('LearningSoft', 'Education', 'small', 72)

ON CONFLICT (name) DO NOTHING;
