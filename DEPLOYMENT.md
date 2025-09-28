# Layoff Prediction System - Complete Deployment Guide

## Overview

This is a comprehensive guide to deploy the Advanced Layoff Prediction System, a Next.js application with Supabase backend that provides AI-powered career risk assessment, skill analysis, and personalized recommendations.

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- Git installed
- A Supabase account
- A Vercel account (recommended) or another hosting platform
- Basic knowledge of SQL and environment variables

## Architecture Overview

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   Database      │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│   (Supabase)    │
│                 │    │                 │    │                 │
│ - Dashboard     │    │ - Predictions   │    │ - User Profiles │
│ - Risk Analysis │    │ - Skills        │    │ - Skills Data   │
│ - Recommendations│    │ - Analysis      │    │ - Predictions   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

## Step 1: Database Setup (Supabase)

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `layoff-prediction-system`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 1.2 Configure Database Schema

Once your project is ready:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following scripts **in order**:

#### Script 1: Create Database Schema
\`\`\`sql
-- Copy and paste the entire content from scripts/001_create_database_schema.sql
-- This creates all tables, RLS policies, and security settings
\`\`\`

#### Script 2: Seed Initial Data
\`\`\`sql
-- Copy and paste the entire content from scripts/002_seed_initial_data.sql
-- This populates skills and companies with comprehensive data
\`\`\`

#### Script 3: Create Profile Trigger
\`\`\`sql
-- Copy and paste the entire content from scripts/003_create_profile_trigger.sql
-- This automatically creates user profiles when users sign up
\`\`\`

### 1.3 Configure Authentication

1. Go to **Authentication** > **Settings**
2. Configure **Site URL**: `http://localhost:3000` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.vercel.app/auth/callback` (for production)
4. Enable **Email Auth** (default)
5. Optionally configure **OAuth providers** (Google, GitHub, etc.)

### 1.4 Get Database Credentials

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL**
   - **anon/public key**
   - **service_role key** (keep this secret!)

## Step 2: Local Development Setup

### 2.1 Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd layoff-prediction-system

# Install dependencies
npm install
\`\`\`

### 2.2 Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Development Redirect URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 2.3 Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see your application running.

### 2.4 Test Core Features

1. **Sign Up**: Create a new account
2. **Profile Setup**: Complete your profile information
3. **Add Skills**: Add your technical and soft skills
4. **Risk Assessment**: Run a layoff risk prediction
5. **Skill Analysis**: Analyze your skill gaps
6. **Recommendations**: Get career recommendations

## Step 3: Production Deployment

### 3.1 Deploy to Vercel (Recommended)

#### Option A: Deploy from v0
1. Click the **"Publish"** button in v0
2. This automatically deploys to Vercel with all configurations

#### Option B: Deploy from GitHub
1. Push your code to GitHub:
\`\`\`bash
git add .
git commit -m "Initial deployment"
git push origin main
\`\`\`

2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Configure environment variables (see section 3.2)
6. Click **"Deploy"**

### 3.2 Production Environment Variables

In your Vercel dashboard, add these environment variables:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

### 3.3 Update Supabase Settings

1. Go to your Supabase project
2. **Authentication** > **Settings**
3. Update **Site URL**: `https://your-app.vercel.app`
4. Add **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

## Step 4: Alternative Deployment Options

### 4.1 Deploy to Netlify

\`\`\`bash
# Build the application
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=.next
\`\`\`

Environment variables in Netlify:
- Go to **Site settings** > **Environment variables**
- Add the same variables as Vercel

### 4.2 Deploy to Railway

\`\`\`bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
\`\`\`

### 4.3 Self-Hosted with Docker

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Build and run
docker build -t layoff-prediction-system .
docker run -p 3000:3000 --env-file .env.local layoff-prediction-system
\`\`\`

## Step 5: Post-Deployment Configuration

### 5.1 Database Monitoring

1. **Supabase Dashboard** > **Database**
2. Monitor table sizes and query performance
3. Set up **Database Webhooks** for real-time updates (optional)

### 5.2 Performance Optimization

1. **Enable Vercel Analytics**:
\`\`\`bash
npm install @vercel/analytics
\`\`\`

2. **Configure Caching**:
   - API routes are cached for 5 minutes
   - Static assets cached for 1 year
   - Database queries use Supabase's built-in caching

### 5.3 Security Checklist

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Service role key kept secret
- ✅ HTTPS enforced in production
- ✅ Authentication required for all sensitive operations
- ✅ Input validation on all API endpoints

## Step 6: Monitoring and Maintenance

### 6.1 Application Monitoring

**Vercel Monitoring**:
- Function logs: Vercel Dashboard > Functions
- Performance metrics: Vercel Analytics
- Error tracking: Built-in error boundaries

**Supabase Monitoring**:
- Database performance: Supabase Dashboard > Database
- API usage: Supabase Dashboard > API
- Authentication metrics: Supabase Dashboard > Auth

### 6.2 Regular Maintenance Tasks

**Weekly**:
- Review error logs
- Monitor database performance
- Check API response times

**Monthly**:
- Update dependencies: `npm update`
- Review and update skill market data
- Analyze user feedback and usage patterns

**Quarterly**:
- Update prediction algorithms with new market data
- Review and improve recommendation engine
- Security audit and dependency updates

## Step 7: Troubleshooting

### 7.1 Common Issues

**Database Connection Issues**:
\`\`\`bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Test database connection
curl -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
     "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/profiles"
\`\`\`

**Authentication Issues**:
- Verify redirect URLs in Supabase settings
- Check that RLS policies are correctly configured
- Ensure service role key is set for server-side operations

**Prediction Engine Issues**:
- Verify user has completed profile setup
- Check that skills data is properly seeded
- Review API logs for specific error messages

### 7.2 Debug Mode

Enable debug logging in development:

\`\`\`env
# Add to .env.local
DEBUG=true
NEXT_PUBLIC_DEBUG=true
\`\`\`

### 7.3 Database Debugging

\`\`\`sql
-- Check table contents
SELECT COUNT(*) FROM profiles;
SELECT COUNT(*) FROM skills;
SELECT COUNT(*) FROM user_skills;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Monitor active connections
SELECT * FROM pg_stat_activity;
\`\`\`

## Step 8: Scaling Considerations

### 8.1 Database Scaling

**Supabase Pro Features**:
- Connection pooling for high traffic
- Read replicas for better performance
- Point-in-time recovery for data safety

**Query Optimization**:
- Add indexes for frequently queried columns
- Use database functions for complex calculations
- Implement caching for expensive operations

### 8.2 Application Scaling

**Vercel Pro Features**:
- Edge functions for global performance
- Increased function timeout limits
- Advanced analytics and monitoring

**Performance Optimization**:
- Implement React.memo for expensive components
- Use Next.js Image optimization
- Enable compression and minification

## Step 9: Backup and Recovery

### 9.1 Database Backups

**Automatic Backups** (Supabase Pro):
- Daily automated backups
- Point-in-time recovery
- Cross-region backup replication

**Manual Backups**:
\`\`\`bash
# Export database schema
pg_dump --schema-only $DATABASE_URL > schema.sql

# Export data
pg_dump --data-only $DATABASE_URL > data.sql
\`\`\`

### 9.2 Application Backups

**Code Repository**:
- Keep code in version control (Git)
- Tag releases for easy rollback
- Maintain deployment documentation

**Environment Configuration**:
- Document all environment variables
- Keep secure backup of API keys
- Maintain deployment scripts

## Support and Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

### Community Support
- [Next.js Discord](https://discord.gg/nextjs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/your-repo/issues)

### Professional Support
- Vercel Pro Support
- Supabase Pro Support
- Custom development services

---

## Quick Start Checklist

- [ ] Create Supabase project
- [ ] Run database schema scripts
- [ ] Configure authentication settings
- [ ] Set up local development environment
- [ ] Test core application features
- [ ] Deploy to production platform
- [ ] Configure production environment variables
- [ ] Update Supabase production settings
- [ ] Test production deployment
- [ ] Set up monitoring and alerts
- [ ] Document custom configurations
- [ ] Plan maintenance schedule

**Estimated Setup Time**: 30-60 minutes for experienced developers, 1-2 hours for beginners.

**Production Ready**: This system is designed for production use with proper security, scalability, and monitoring features built-in.
