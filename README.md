# Layoff Prediction System - Employee Risk & Skill Analytics

A comprehensive machine learning system that predicts layoff probability and provides personalized skill development recommendations for employees and strategic insights for HR teams.

## Features

### 🎯 Core Capabilities
- **AI Layoff Risk Prediction**: Advanced ML models analyze employee data to predict layoff probability
- **Skill Gap Analysis**: Identifies skill deficiencies and provides personalized learning recommendations
- **Career Path Guidance**: AI-powered career progression suggestions based on industry trends
- **Company Analytics**: Department-level insights and organizational risk assessment
- **Automated Reporting**: Customizable PDF reports for employees and HR teams

### 📊 Dashboard Components
- **Overview Dashboard**: Key metrics, risk distribution, and trend analysis
- **Employee Profiles**: Individual risk assessment and personalized action plans
- **Skills Analysis**: Comprehensive skill gap identification and learning resources
- **Company Insights**: Organizational analytics and strategic recommendations
- **Report Generator**: Automated PDF generation with customizable templates

## Technology Stack

### Frontend
- **Next.js 14** with App Router
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend & ML
- **Python** for machine learning models
- **Scikit-learn** for ML algorithms
- **Pandas & NumPy** for data processing
- **Next.js API Routes** for backend services

### Key ML Models
- **Random Forest Classifier** for layoff prediction
- **Gradient Boosting** for enhanced accuracy
- **Feature Engineering** for skill gap analysis
- **Predictive Analytics** for trend forecasting

## Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Required Python packages: pandas, numpy, scikit-learn, joblib

### Installation

1. **Clone and Install**
   \`\`\`bash
   npm install
   pip install pandas numpy scikit-learn joblib
   \`\`\`

2. **Generate Sample Data**
   \`\`\`bash
   # Run the data generation script
   python scripts/generate_sample_data.py
   \`\`\`

3. **Train ML Models**
   \`\`\`bash
   # Train the layoff prediction models
   python scripts/train_layoff_model.py
   \`\`\`

4. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Navigate through different sections using the sidebar

## Usage Guide

### For Employees
1. **Risk Assessment**: Use the analyzer to input your profile data
2. **View Results**: Get personalized risk score and recommendations
3. **Skill Development**: Access learning resources and career guidance
4. **Track Progress**: Monitor your skill development over time
5. **Generate Reports**: Create personal development reports

### For HR Teams
1. **Company Overview**: Monitor organizational risk metrics
2. **Department Analysis**: Identify high-risk departments and teams
3. **Strategic Planning**: Use predictive insights for workforce planning
4. **Employee Support**: Generate targeted intervention recommendations
5. **Reporting**: Create comprehensive organizational reports

## Key Features Explained

### AI Risk Prediction
- Analyzes 15+ employee factors including performance, tenure, skills
- Uses ensemble methods combining Random Forest and Gradient Boosting
- Provides confidence intervals and feature importance rankings
- Updates predictions based on real-time data changes

### Skill Gap Analysis
- Compares current skills against industry benchmarks
- Identifies critical skill gaps with priority scoring
- Suggests specific learning resources and certification paths
- Tracks skill development progress over time

### Company Insights
- Department-level risk heat maps
- Retention trend analysis and forecasting
- Skill distribution across teams
- Strategic recommendations with impact metrics

## Data Privacy & Security

- All employee data is processed securely
- ML models use anonymized datasets for training
- Personal information is encrypted and access-controlled
- Compliance with data protection regulations

## Contributing

This system is designed for enterprise HR departments and can be customized for specific organizational needs. Contact your development team for feature requests or customizations.

## License

Enterprise Software - Contact your organization's IT department for licensing information.
\`\`\`

```tsx file="" isHidden
