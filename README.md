# Healthcare Skill Intelligence Platform

A digital platform that continuously captures, organizes, and analyzes academic performance, project experience, practical skills, and learning activities with special emphasis on healthcare informatics. The system generates meaningful insights that help users understand their progression, identify gaps, and plan future learning paths specifically for careers in healthcare technology.

## 🎯 Problem Statement

Students and early-career professionals navigate complex academic pathways while attempting to align their skills with evolving industry expectations in critical sectors like healthcare technology. Current tools focus on isolated aspects such as grades, certifications, or resumes, failing to provide a unified understanding of an individual's learning journey and skill readiness for these priority domains.

This platform functions as a **living system** that evolves with the user and supports long-term academic and professional growth.

## ✅ Core Features (MVP Requirements)

### 1. **User Profile System**
- Enter and manage skills, courses, projects, and achievements
- Track academic performance (GPA, grades, courses, semesters)
- Record project experience with healthcare relevance
- Log learning activities continuously
- Manage healthcare certifications and specializations

### 2. **Skill Assessment and Gap Analysis Algorithms**
- Comprehensive skill gap analysis comparing current skills vs. healthcare role requirements
- Proficiency level comparison (beginner → expert)
- Gap severity calculation (critical/high/medium/low)
- Priority scoring based on importance and gap size
- Category-based grouping (Clinical, Technical, Regulatory, etc.)
- Time estimation for skill development

### 3. **Recommendation Engine**
- Personalized course recommendations based on skill gaps
- Project recommendations aligned with career goals
- Multi-factor scoring (coverage, time efficiency, cost, relevance)
- Healthcare-specific course and project matching
- External API integration (GitHub for project discovery)

### 4. **Dashboard Visualizations**
- Skill progression tracking with visual analytics
- Career pathway visualization (hospital floor plan metaphor)
- Academic performance metrics (GPA trends, course completion)
- Learning activity timeline
- Project portfolio showcase
- Readiness scores and gap indicators

### 5. **External API Integration**
- **GitHub API** - Discover healthcare-related projects and repositories
- Project recommendations based on skill gaps
- Real-time project data and repository information

### 6. **Healthcare Skill Frameworks**
- Focus on healthcare informatics, medical devices, telemedicine, clinical data, and healthcare cybersecurity
- Healthcare-specific skill categories and contexts
- Regulatory compliance tracking (HIPAA, FDA)
- Clinical relevance indicators

## 🏗️ Project Structure

```
skill-intelligence-platform/
├── backend/
│   ├── controllers/          # Route controllers
│   │   ├── authController.js
│   │   ├── skillController.js
│   │   ├── userController.js
│   │   ├── courseController.js
│   │   ├── careerPathController.js
│   │   ├── recommendationController.js
│   │   ├── progressController.js
│   │   ├── academicController.js      # Academic performance management
│   │   ├── projectController.js        # Project experience management
│   │   └── learningActivityController.js # Learning activity tracking
│   ├── data/                 # Sample data
│   │   ├── sampleSkills.js
│   │   ├── sampleCourses.js
│   │   └── sampleCareerPaths.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   ├── models/               # MongoDB models
│   │   ├── User.js
│   │   ├── Skill.js
│   │   ├── UserSkill.js
│   │   ├── Course.js
│   │   ├── CareerPath.js
│   │   ├── AcademicPerformance.js  # Academic records (GPA, grades, courses)
│   │   ├── Project.js              # Project experience tracking
│   │   └── LearningActivity.js     # Continuous learning activity tracking
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── skills.js
│   │   ├── userSkills.js
│   │   ├── courses.js
│   │   ├── careerPaths.js
│   │   ├── recommendations.js
│   │   └── progress.js
│   ├── utils/                # Utility functions & algorithms
│   │   ├── skillGapAnalyzer.js      # Comprehensive gap analysis engine
│   │   ├── courseRecommender.js     # Multi-factor course recommendation
│   │   ├── learningPathGenerator.js # Structured learning path creation
│   │   ├── githubAPI.js              # GitHub API integration
│   │   ├── recommendationEngine.js
│   │   └── progressCalculator.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── skills.js
│   │   ├── userSkills.js
│   │   ├── courses.js
│   │   ├── careerPaths.js
│   │   ├── recommendations.js
│   │   ├── progress.js
│   │   ├── analysis.js              # Gap analysis & recommendations
│   │   ├── github.js                 # GitHub API routes
│   │   ├── academic.js               # Academic performance routes
│   │   ├── projects.js               # Project routes
│   │   └── learningActivities.js     # Learning activity routes
│   ├── seed.js               # Database seeding script
│   ├── server.js             # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/       # Reusable components
│       │   ├── Navbar.js
│       │   ├── ProtectedRoute.js
│       │   ├── HealthcareSidebar.jsx
│       │   ├── HealthcareTopBar.jsx
│       │   ├── GlassCard.jsx
│       │   ├── ECGAnimation.jsx
│       │   ├── HeartbeatAnimation.jsx
│       │   ├── ClinicalReadinessCard.jsx
│       │   ├── SkillVitalSignsCard.jsx
│       │   ├── TreatmentPlanCard.jsx
│       │   ├── PatientCaseCard.jsx
│       │   ├── LabResultsCard.jsx
│       │   ├── MedicalProficiencySelector.jsx
│       │   ├── MedicalEvidenceUpload.jsx
│       │   ├── DiagnosisReport.jsx
│       │   ├── HospitalMonitorProgress.jsx
│       │   ├── HospitalFloorPlan.jsx
│       │   ├── CareerFlipCard.jsx
│       │   ├── MedicalTrainingTimeline.jsx
│       │   ├── SurgicalPrecisionSkills.jsx
│       │   ├── PageTransition.jsx
│       │   ├── SkeletonLoader.jsx
│       │   └── ... (30+ premium healthcare components)
│       ├── context/          # React context
│       │   └── AuthContext.js
│       ├── pages/            # Page components
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── Dashboard.jsx          # Premium healthcare dashboard
│       │   ├── Profile.jsx
│       │   ├── SkillsAssessment.jsx    # Clinical skill assessment
│       │   ├── CareerPaths.jsx          # Hospital floor plan visualization
│       │   ├── Recommendations.jsx
│       │   ├── GapAnalysis.jsx          # Comprehensive gap analysis
│       │   └── CourseRecommendations.jsx # Personalized course recommendations
│       ├── services/         # API services
│       │   └── api.js
│       ├── theme.js          # Material-UI theme
│       ├── utils/            # Utility functions
│       │   ├── index.js
│       │   └── userHelpers.js
│       ├── App.js
│       ├── index.js
│       └── setupProxy.js
│
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **Axios** - HTTP client for external API integration

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Material-UI (MUI)** - Component library
- **Framer Motion** - Premium animations and transitions
- **Axios** - HTTP client
- **Chart.js & React-ChartJS-2** - Data visualization (Radar charts, progress bars)
- **React Dropzone** - File upload for evidence
- **React Confetti** - Celebration animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
```bash
git clone <repository-url>
cd ingenium_hackathon
```

2. **Backend Setup**

```bash
cd backend
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the `backend` directory:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/skill-intelligence
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. **Seed the Database**

Populate the database with sample data and demo users:
```bash
node seed.js
```

This will create:
- 50+ healthcare-specific skills (Clinical, Technical, Regulatory, Analytical, Soft Skills)
- 30+ healthcare courses from real platforms
- 20+ healthcare career paths with realistic salary ranges
- 3 demo user accounts with pre-rated skills

5. **Start Backend Server**

```bash
npm run dev
```

The backend will run on `http://localhost:5001`

6. **Frontend Setup**

Open a new terminal:
```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## 👥 Demo Users

The seed script creates three demo accounts with healthcare specializations:

| Email | Password | Specialization | Pre-rated Skills |
|-------|----------|---------------|------------------|
| `health@demo.com` | `demo123` | Health Informatics | HIPAA Compliance (Resident), Clinical Data Analysis (Intern), EHR Systems (Resident) |
| `clinical@demo.com` | `demo123` | Clinical Data | Medical Data Analysis (Specialist), Healthcare Analytics (Resident), FHIR (Intern) |
| `cyber@demo.com` | `demo123` | Healthcare Cybersecurity | Healthcare Security (Resident), HIPAA Compliance (Specialist), Risk Assessment (Intern) |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `GET /api/users/:id/progress` - Get user progress

### Skills
- `GET /api/skills` - Get all skills (with filters)
- `GET /api/skills/:id` - Get skill by ID
- `GET /api/skills/sector/:sector` - Get skills by sector
- `GET /api/skills/user/:userId` - Get user's skills
- `POST /api/skills/rate` - Rate a skill
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### User Skills
- `GET /api/user-skills` - Get all user skills
- `GET /api/user-skills/:id` - Get user skill by ID
- `POST /api/user-skills` - Create user skill
- `PUT /api/user-skills/:id` - Update user skill
- `DELETE /api/user-skills/:id` - Delete user skill

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Career Paths
- `GET /api/career-paths` - Get all career paths
- `GET /api/career-paths/:id` - Get career path by ID
- `POST /api/career-paths` - Create career path
- `PUT /api/career-paths/:id` - Update career path
- `DELETE /api/career-paths/:id` - Delete career path

### Recommendations
- `GET /api/recommendations/:userId` - Get user recommendations
- `GET /api/recommendations/specialty/:specialty` - Get specialty recommendations

### Progress
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress/update` - Update user progress

### Analysis (NEW)
- `POST /api/analysis/gap` - Analyze skill gaps for target role
- `POST /api/analysis/recommendations` - Get personalized course recommendations based on gaps
- `POST /api/analysis/learning-path` - Generate structured learning path with timeline

### GitHub API Integration (NEW)
- `GET /api/github/projects` - Search GitHub for healthcare repositories
- `POST /api/github/recommendations` - Get personalized project recommendations based on skill gaps

## 🎨 Features Overview

### Landing Page
- Hero section with call-to-action
- Healthcare technology showcase
- Premium animations and transitions
- Responsive design

### Dashboard (Premium Healthcare UI)
- Clinical Readiness Card with ECG-style progress line
- Skill Vital Signs monitor with animated gauges
- Treatment Plan (Learning Path) card with medical prescription design
- Patient Case (Active Project) card with medical chart design
- Lab Results (Analytics) card with medical lab report styling
- Animated heartbeat pulsing welcome
- Hospital monitor-style progress indicators

### Skills Assessment (Clinical Skill Assessment)
- Medical examination metaphor with "system checks"
- Proficiency levels: Medical Student → Intern → Resident → Specialist → Chief of Staff
- Hospital monitor progress bar with heart rate line
- Medical evidence upload with drag-and-drop (styled like medical chart)
- Animated "verified" stamp for certificates
- Diagnosis Report for skill gap analysis
- Stethoscope animation on completion

### Gap Analysis (NEW)
- Comprehensive skill gap analysis dashboard
- Readiness score visualization (circular progress)
- Critical gaps alert with severity indicators
- Skill radar chart by category
- Gap breakdown by category with color-coded severity
- Estimated learning time calculation
- Quick wins identification
- Focus areas recommendations

### Course Recommendations (NEW)
- Personalized course recommendations based on skill gaps
- Multi-factor match scoring (coverage, time, cost, relevance)
- Filter by gap severity (Critical, High, Medium, Low)
- Learning path per skill with phases
- Course details with enrollment links
- "Why recommended" explanations
- Cost breakdown and free course highlights

### Career Paths (Hospital Floor Plan)
- Interactive hospital floor plan visualization
- Career paths as hospital departments (ER, Wards, Surgical Suites, Leadership)
- 3D flip cards with career details
- Medical training timeline (Intern → Resident → Fellow → Attending)
- Surgical Precision skill requirements visualization
- Salary ranges and readiness scores
- Hover effects with depth and shadows

### Profile
- User information display
- Healthcare specialization selector
- Healthcare career goal input
- Healthcare certifications (add/remove entries)
- Education history (add/remove entries)
- Work experience (add/remove entries)

### Recommendations
- Personalized skill recommendations
- Skills to improve
- Recommended courses with match scores
- Recommended career paths
- GitHub project recommendations (external API)

## 📝 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon (auto-reload)
- `npm run seed` - Seed database with healthcare sample data
- `npm run cleanup` - Clean and migrate database to healthcare-only

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/skill-intelligence
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

## 🎨 Theme Configuration

The application uses a premium healthcare design system:

### Colors
- **Primary**: `#0d47a1` (Deep Blue)
- **Secondary**: `#00897b` (Medical Teal)
- **Accent**: `#d32f2f` (Alert Red)
- **Background**: `#fafafa` (Hospital White)
- **Card Gradient**: Soft blue gradient for glassmorphism

### Typography
- **Headers**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Medical/Code**: Roboto Mono (Google Fonts)

### Design Features
- Glassmorphism cards with blur effects
- Framer Motion animations (page transitions, hover effects, staggered lists)
- Medical-themed components (ECG animations, heartbeat monitors, lab results)
- Premium UI/UX with depth and shadows

Theme configuration is in `frontend/src/theme.js`

## 🔧 Development Tips

1. **MongoDB Connection**: Ensure MongoDB is running before starting the backend
2. **Port Configuration**: Backend runs on port 5000/5001, frontend on port 3000
3. **Proxy Setup**: Frontend automatically proxies API requests to backend via `setupProxy.js`
4. **Hot Reload**: Backend uses nodemon for auto-reload, frontend uses React's hot reload
5. **Database Seeding**: Run `npm run seed` after initial setup to populate healthcare sample data
6. **Database Cleanup**: Run `npm run cleanup` to migrate multi-sector data to healthcare-only
7. **GitHub API**: No authentication required for basic searches (60 requests/hour limit)
8. **Animations**: Framer Motion animations are optimized for performance
9. **Theme**: Customize healthcare colors in `frontend/src/theme.js`
10. **User ID Handling**: User IDs are automatically normalized via `userHelpers.js`

## 📊 Data Models

### User
- Email (unique, required)
- Password (hashed)
- First Name, Last Name
- Role (student, professional, educator, admin)
- Healthcare Specialization (Health Informatics, Medical Devices, Telemedicine, etc.)
- Healthcare Career Goal
- Healthcare Certifications (array)
- Education History (array)
- Work Experience (array)
- Timestamps

### Skill
- Name (unique, required)
- Description
- Category (Clinical, Technical, Regulatory, Analytical, Soft Skills)
- Healthcare Context:
  - Specialty
  - Importance (1-10)
  - Clinical Relevance (Low, Medium, High, Critical)
  - Patient Impact (Indirect, Moderate, Direct, Life-Critical)
  - Regulatory Importance (1-10)
  - Evidence Examples (array)
- Proficiency Levels (array with descriptions)

### UserSkill
- User reference
- Skill reference
- Proficiency (level: Medical Student → Chief of Staff, score: 0-100)
- Evidence array (type, itemId, date)
- Goal (targetLevel, targetDate)

### Course
- Title, Description
- Provider, URL
- Healthcare Specialty
- Skills Covered (array)
- Duration, Difficulty, Cost
- Healthcare Context (specialties, accreditation, real-world application)

### CareerPath
- Title, Description
- Healthcare Specialty
- Required Skills (with requiredLevel and importance)
- Salary Range (min, max)
- Career Progression (array of levels with requirements)

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check if MongoDB is running and connection string is correct
- **Port Already in Use**: Change PORT in `.env` or kill the process using the port
- **JWT Errors**: Ensure JWT_SECRET is set in `.env`

### Frontend Issues
- **API Calls Failing**: Verify backend is running on port 5000/5001
- **Proxy Errors**: Check `setupProxy.js` configuration
- **User ID Errors**: User ID normalization is handled automatically via `userHelpers.js`
- **Chart.js Errors**: Ensure Chart.js and react-chartjs-2 are installed
- **Framer Motion**: Check for animation performance issues in console

### GitHub API Issues
- **Rate Limit Exceeded**: GitHub API has 60 requests/hour limit for unauthenticated requests
- **No Results**: Check internet connection and GitHub API status
- **Fallback Recommendations**: System provides fallback if API fails

## 📄 License

ISC

## 👨‍💻 Development

Built for hackathon purposes with:
- Clean code architecture
- RESTful API design
- Premium healthcare-themed UI/UX
- Framer Motion animations
- Glassmorphism design
- Advanced algorithms (gap analysis, recommendations, learning paths)
- External API integration (GitHub)
- Error handling and loading states
- Form validation
- Responsive design
- Medical-themed components and metaphors

## ✅ Hackathon Requirements Fulfilled

1. ✅ **User Profile System** - Complete with skills, courses, projects, achievements
2. ✅ **Skill Assessment & Gap Analysis** - Comprehensive algorithms with severity indicators
3. ✅ **Recommendation Engine** - Multi-factor scoring for courses/projects based on career goals
4. ✅ **Dashboard Visualizations** - Skill progression and career pathways with premium UI
5. ✅ **External API Integration** - GitHub API for healthcare project recommendations

## 🧠 Advanced Algorithms

### Skill Gap Analyzer
- Compares user's current proficiency levels with role requirements
- Calculates gap severity (Critical, High, Medium, Low)
- Estimates learning time based on gap severity
- Groups gaps by category for focused learning
- Generates readiness score (0-100%)
- Identifies quick wins and focus areas

### Course Recommender
- Multi-factor scoring algorithm:
  - Gap Coverage (40%)
  - Learning Style Match (20%)
  - Time Efficiency (15%)
  - Cost Effectiveness (15%)
  - Additional Skills Coverage (10%)
- Generates "why recommended" explanations
- Creates learning paths per skill with phases

### Learning Path Generator
- Organizes learning into phases (Foundation → Core → Advanced)
- Generates weekly breakdown with deliverables
- Creates milestones with completion criteria
- Estimates completion dates
- Adapts timeline (fast, balanced, comprehensive)

### GitHub API Integration
- Searches healthcare repositories based on skill gaps
- Maps skills to GitHub search terms
- Calculates match scores and healthcare relevance
- Provides fallback recommendations
- Handles rate limiting gracefully

## 🚀 Future Enhancements

- Real-time notifications
- Advanced analytics and charts
- Social features (sharing, collaboration)
- Mobile app
- AI-powered recommendations (enhanced)
- Certificate generation
- Integration with more learning platforms (Coursera, edX, Udemy)
- Progress tracking for learning paths
- Milestone celebrations with confetti
- Export learning paths as PDF
- Integration with LinkedIn for skill verification
# Ingenium_Hackathon
# Ingenium_Hackathon
