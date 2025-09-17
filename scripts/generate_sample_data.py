import json
import random
from datetime import datetime, timedelta

# Generate sample layoff dataset
def generate_layoff_data():
    companies = ['TechCorp', 'DataSoft', 'CloudInc', 'AIStartup', 'WebSolutions', 'MobileFirst', 'DevTools', 'CyberSec']
    industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Education']
    departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Product']
    roles = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Designer', 'Marketing Manager', 'Sales Rep', 'HR Specialist']
    
    layoff_data = []
    
    for i in range(1000):
        # Generate employee data
        employee = {
            'employee_id': f'EMP_{i:04d}',
            'company': random.choice(companies),
            'industry': random.choice(industries),
            'department': random.choice(departments),
            'role': random.choice(roles),
            'experience_years': random.randint(0, 20),
            'performance_rating': random.choice(['Excellent', 'Good', 'Average', 'Below Average']),
            'skills': random.sample(['Python', 'JavaScript', 'React', 'AWS', 'Docker', 'SQL', 'Machine Learning', 'Project Management', 'Leadership', 'Communication'], k=random.randint(3, 7)),
            'salary': random.randint(50000, 200000),
            'location': random.choice(['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston', 'Remote']),
            'hire_date': (datetime.now() - timedelta(days=random.randint(30, 2000))).strftime('%Y-%m-%d'),
            'laid_off': random.choice([True, False]) if random.random() < 0.15 else False,  # 15% layoff rate
            'layoff_date': (datetime.now() - timedelta(days=random.randint(1, 365))).strftime('%Y-%m-%d') if random.random() < 0.15 else None,
            'layoff_reason': random.choice(['Budget Cuts', 'Restructuring', 'Performance', 'Company Closure', 'Automation']) if random.random() < 0.15 else None
        }
        
        # Calculate risk factors
        risk_score = 0
        
        # Industry risk
        if employee['industry'] in ['Technology', 'Retail']:
            risk_score += 20
        elif employee['industry'] in ['Finance', 'Manufacturing']:
            risk_score += 10
            
        # Experience risk
        if employee['experience_years'] < 2:
            risk_score += 25
        elif employee['experience_years'] > 15:
            risk_score += 15
            
        # Performance risk
        if employee['performance_rating'] == 'Below Average':
            risk_score += 30
        elif employee['performance_rating'] == 'Average':
            risk_score += 15
            
        # Skills risk
        high_demand_skills = ['Python', 'AWS', 'Machine Learning', 'React', 'Docker']
        skill_match = len(set(employee['skills']) & set(high_demand_skills))
        if skill_match == 0:
            risk_score += 25
        elif skill_match < 2:
            risk_score += 15
            
        employee['risk_score'] = min(risk_score, 100)
        employee['risk_level'] = 'High' if risk_score > 60 else 'Medium' if risk_score > 30 else 'Low'
        
        layoff_data.append(employee)
    
    return layoff_data

# Generate skill demand data
def generate_skill_demand_data():
    skills_data = [
        {'skill': 'Cloud Computing (AWS)', 'demand_score': 92, 'growth_rate': 15, 'avg_salary_increase': 25000},
        {'skill': 'Machine Learning', 'demand_score': 87, 'growth_rate': 22, 'avg_salary_increase': 30000},
        {'skill': 'Data Analysis', 'demand_score': 85, 'growth_rate': 18, 'avg_salary_increase': 20000},
        {'skill': 'React/Frontend', 'demand_score': 82, 'growth_rate': 12, 'avg_salary_increase': 15000},
        {'skill': 'Python', 'demand_score': 80, 'growth_rate': 10, 'avg_salary_increase': 18000},
        {'skill': 'Project Management', 'demand_score': 78, 'growth_rate': 8, 'avg_salary_increase': 22000},
        {'skill': 'Cybersecurity', 'demand_score': 74, 'growth_rate': 18, 'avg_salary_increase': 28000},
        {'skill': 'DevOps', 'demand_score': 72, 'growth_rate': 14, 'avg_salary_increase': 25000},
        {'skill': 'Full-Stack Development', 'demand_score': 69, 'growth_rate': 12, 'avg_salary_increase': 20000},
        {'skill': 'Leadership', 'demand_score': 65, 'growth_rate': 5, 'avg_salary_increase': 35000}
    ]
    
    return skills_data

# Generate company insights data
def generate_company_insights():
    insights = {
        'total_employees': 228,
        'at_risk_employees': 47,
        'safe_employees': 156,
        'medium_risk_employees': 25,
        'departments_at_risk': [
            {'department': 'Marketing', 'risk_percentage': 35, 'employee_count': 15},
            {'department': 'Sales', 'risk_percentage': 28, 'employee_count': 22},
            {'department': 'Operations', 'risk_percentage': 22, 'employee_count': 18}
        ],
        'trending_skills': [
            'Cloud Computing', 'Data Analysis', 'AI/ML', 'Cybersecurity', 'Project Management'
        ],
        'layoff_trends': {
            'last_quarter': 12,
            'this_quarter': 8,
            'predicted_next_quarter': 5
        }
    }
    
    return insights

# Main execution
if __name__ == "__main__":
    print("Generating sample data for LayoffGuard system...")
    
    # Generate datasets
    layoff_data = generate_layoff_data()
    skill_data = generate_skill_demand_data()
    company_insights = generate_company_insights()
    
    # Save to JSON files
    with open('layoff_data.json', 'w') as f:
        json.dump(layoff_data, f, indent=2)
    
    with open('skill_demand_data.json', 'w') as f:
        json.dump(skill_data, f, indent=2)
    
    with open('company_insights.json', 'w') as f:
        json.dump(company_insights, f, indent=2)
    
    print(f"Generated {len(layoff_data)} employee records")
    print(f"Generated {len(skill_data)} skill demand records")
    print("Generated company insights data")
    print("\nSample employee record:")
    print(json.dumps(layoff_data[0], indent=2))
    
    print("\nData generation complete!")
