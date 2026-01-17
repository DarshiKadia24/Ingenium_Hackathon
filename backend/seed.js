require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Skill = require('./models/Skill');
const Course = require('./models/Course');
const CareerPath = require('./models/CareerPath');
const UserSkill = require('./models/UserSkill');
const HealthcareStandard = require('./models/HealthcareStandard');
const MedicalRole = require('./models/MedicalRole');

// Use comprehensive healthcare data
const { comprehensiveHealthcareSkills } = require('./data/comprehensiveHealthcareSkills');
const { comprehensiveHealthcareCourses } = require('./data/comprehensiveHealthcareCourses');
const { comprehensiveCareerPaths } = require('./data/comprehensiveCareerPaths');
const { healthcareStandards } = require('./data/healthcareStandards');
const { medicalRoles } = require('./data/medicalRoles');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skill-intelligence';

// Demo users data - Healthcare only
const demoUsers = [
  {
    email: 'health@demo.com',
    password: 'demo123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'professional',
    healthcareSpecialization: 'Health Informatics',
    healthcareCareerGoal: 'Health Informatics Specialist',
    healthcareCertifications: [],
  },
  {
    email: 'clinical@demo.com',
    password: 'demo123',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'professional',
    healthcareSpecialization: 'Clinical Data',
    healthcareCareerGoal: 'Clinical Data Manager',
    healthcareCertifications: [],
  },
  {
    email: 'telemed@demo.com',
    password: 'demo123',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    role: 'professional',
    healthcareSpecialization: 'Telemedicine',
    healthcareCareerGoal: 'Telemedicine Coordinator',
    healthcareCertifications: [],
  },
];

// Pre-rated skills for demo users
const userSkillsData = {
  'health@demo.com': [
    { skillName: 'HIPAA Compliance', rating: 3 },
    { skillName: 'EHR Systems', rating: 4 },
    { skillName: 'Medical Data Analysis', rating: 2 },
  ],
  'clinical@demo.com': [
    { skillName: 'Clinical Documentation', rating: 4 },
    { skillName: 'Healthcare Analytics', rating: 3 },
    { skillName: 'Clinical Data Analysis', rating: 4 },
  ],
  'telemed@demo.com': [
    { skillName: 'Telemedicine Platforms', rating: 3 },
    { skillName: 'Patient Assessment', rating: 3 },
    { skillName: 'Healthcare Communication', rating: 4 },
  ],
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Course.deleteMany({});
    await CareerPath.deleteMany({});
    await UserSkill.deleteMany({});
    await HealthcareStandard.deleteMany({});
    await MedicalRole.deleteMany({});
    console.log('Existing data cleared');

    // Insert Comprehensive Healthcare Skills
    console.log('Inserting comprehensive healthcare skills...');
    const insertedSkills = await Skill.insertMany(comprehensiveHealthcareSkills);
    console.log(`Inserted ${insertedSkills.length} healthcare skills`);

    // Create skill name to ID mapping
    const skillMap = {};
    insertedSkills.forEach((skill) => {
      skillMap[skill.name] = skill._id;
    });

    // Insert Healthcare Standards
    console.log('Inserting healthcare standards...');
    // Map related skills for standards
    const standardsWithSkills = healthcareStandards.map((standard) => {
      const relatedSkills = standard.relatedSkills || [];
      return {
        ...standard,
        relatedSkills: relatedSkills.map((skillName) => skillMap[skillName]).filter(Boolean),
      };
    });
    const insertedStandards = await HealthcareStandard.insertMany(standardsWithSkills);
    console.log(`Inserted ${insertedStandards.length} healthcare standards`);

    // Insert Medical Roles
    console.log('Inserting medical roles...');
    // Map required skills for roles
    const rolesWithSkills = medicalRoles.map((role) => {
      const requiredSkills = role.requiredSkills || [];
      return {
        ...role,
        requiredSkills: requiredSkills.map((reqSkill) => {
          const skillId = skillMap[reqSkill.skillName];
          if (!skillId) return null;
          return {
            skillId,
            proficiencyLevel: reqSkill.proficiencyLevel || 'Intermediate',
            isCore: reqSkill.isCore || false,
          };
        }).filter(Boolean),
      };
    });
    const insertedRoles = await MedicalRole.insertMany(rolesWithSkills);
    console.log(`Inserted ${insertedRoles.length} medical roles`);

    // Insert Comprehensive Courses
    console.log('Inserting comprehensive healthcare courses...');
    const insertedCourses = await Course.insertMany(comprehensiveHealthcareCourses);
    console.log(`Inserted ${insertedCourses.length} healthcare courses`);

    // Insert Comprehensive Career Paths
    console.log('Inserting comprehensive career paths...');
    const careerPathsWithSkillIds = comprehensiveCareerPaths.map((path) => {
      const requiredSkills = path.requiredSkills.map((reqSkill) => {
        const skillId = skillMap[reqSkill.skillName];
        if (!skillId) {
          console.warn(`Skill not found: ${reqSkill.skillName}`);
          return null;
        }
        return {
          skillId,
          requiredLevel: reqSkill.requiredLevel,
        };
      }).filter(Boolean);

      return {
        ...path,
        requiredSkills,
      };
    });

    const insertedCareerPaths = await CareerPath.insertMany(careerPathsWithSkillIds);
    console.log(`Inserted ${insertedCareerPaths.length} career paths`);

    // Create demo users
    console.log('Creating demo users...');
    const createdUsers = [];

    for (const userData of demoUsers) {
      // Create user - password will be hashed by pre-save hook
      const user = new User({
        ...userData,
        password: userData.password, // Let the model's pre-save hook hash it
      });

      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`Created user: ${savedUser.email}`);

      // Add pre-rated skills for this user
      const userSkills = userSkillsData[userData.email] || [];
      for (const userSkillData of userSkills) {
        const skillId = skillMap[userSkillData.skillName];
        if (skillId) {
          const proficiencyLevels = ['beginner', 'intermediate', 'advanced', 'expert', 'master'];
          const level = proficiencyLevels[userSkillData.rating - 1] || 'beginner';
          const score = (userSkillData.rating / 5) * 100;

          const userSkill = new UserSkill({
            userId: savedUser._id,
            skillId,
            proficiency: {
              level,
              score,
            },
            evidence: [],
            goal: {},
          });

          await userSkill.save();
          console.log(`  Added skill: ${userSkillData.skillName} (${userSkillData.rating}/5)`);
        } else {
          console.warn(`  Skill not found: ${userSkillData.skillName}`);
        }
      }
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\nSummary:');
    console.log(`  - ${insertedSkills.length} healthcare skills`);
    console.log(`  - ${insertedStandards.length} healthcare standards`);
    console.log(`  - ${insertedRoles.length} medical roles`);
    console.log(`  - ${insertedCourses.length} healthcare courses`);
    console.log(`  - ${insertedCareerPaths.length} career paths`);
    console.log(`  - ${createdUsers.length} demo users`);
    console.log('\nDemo users created:');
    demoUsers.forEach((user) => {
      console.log(`  - ${user.email} / ${user.password}`);
    });
    console.log('\nYou can now login with any of these demo accounts.');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();
