// Healthcare Technology Career Paths
const healthcareCareerPaths = [
  {
    title: 'Health Informatics Specialist',
    description: 'Design and implement health information systems to improve patient care and healthcare delivery. Work with EHR systems, analyze medical data, and ensure HIPAA compliance.',
    healthcareSpecialty: 'Health Informatics',
    requiredSkills: [
      { skillName: 'EHR Systems', requiredLevel: 'intermediate' },
      { skillName: 'HIPAA Compliance', requiredLevel: 'intermediate' },
      { skillName: 'Medical Data Analysis', requiredLevel: 'intermediate' },
      { skillName: 'Healthcare Analytics', requiredLevel: 'intermediate' },
      { skillName: 'Health Information Systems', requiredLevel: 'intermediate' },
    ],
    salaryRange: { min: 65000, max: 95000 },
  },
  {
    title: 'Healthcare Data Analyst',
    description: 'Analyze healthcare data to identify trends, improve patient outcomes, and support evidence-based decision making in healthcare organizations.',
    healthcareSpecialty: 'Clinical Data',
    requiredSkills: [
      { skillName: 'Medical Data Analysis', requiredLevel: 'advanced' },
      { skillName: 'Healthcare Analytics', requiredLevel: 'advanced' },
      { skillName: 'Predictive Analytics in Healthcare', requiredLevel: 'intermediate' },
      { skillName: 'Healthcare Data Visualization', requiredLevel: 'intermediate' },
    ],
    salaryRange: { min: 60000, max: 90000 },
  },
  {
    title: 'Telemedicine Coordinator',
    description: 'Manage and coordinate telemedicine programs, ensuring seamless remote healthcare delivery and patient engagement.',
    healthcareSpecialty: 'Telemedicine',
    requiredSkills: [
      { skillName: 'Telemedicine Platforms', requiredLevel: 'advanced' },
      { skillName: 'Patient Assessment', requiredLevel: 'intermediate' },
      { skillName: 'Healthcare Communication', requiredLevel: 'intermediate' },
      { skillName: 'Patient Privacy', requiredLevel: 'intermediate' },
    ],
    salaryRange: { min: 55000, max: 80000 },
  },
  {
    title: 'Healthcare Cybersecurity Specialist',
    description: 'Protect healthcare systems and patient data from cyber threats. Implement security measures and ensure compliance with healthcare regulations.',
    healthcareSpecialty: 'Healthcare Cybersecurity',
    requiredSkills: [
      { skillName: 'Healthcare Data Security', requiredLevel: 'advanced' },
      { skillName: 'HIPAA Compliance', requiredLevel: 'advanced' },
      { skillName: 'Regulatory Compliance', requiredLevel: 'intermediate' },
      { skillName: 'Patient Privacy', requiredLevel: 'advanced' },
    ],
    salaryRange: { min: 80000, max: 120000 },
  },
  {
    title: 'Medical Device Integration Engineer',
    description: 'Design and implement integration solutions for medical devices with health information systems. Ensure interoperability and compliance.',
    healthcareSpecialty: 'Medical Devices',
    requiredSkills: [
      { skillName: 'Medical Device Integration', requiredLevel: 'advanced' },
      { skillName: 'HL7/FHIR Standards', requiredLevel: 'advanced' },
      { skillName: 'Regulatory Compliance', requiredLevel: 'intermediate' },
      { skillName: 'Health Information Systems', requiredLevel: 'intermediate' },
    ],
    salaryRange: { min: 75000, max: 110000 },
  },
  {
    title: 'Clinical Data Manager',
    description: 'Manage clinical data collection, storage, and analysis. Ensure data quality and regulatory compliance in clinical research settings.',
    healthcareSpecialty: 'Clinical Data',
    requiredSkills: [
      { skillName: 'Clinical Documentation', requiredLevel: 'advanced' },
      { skillName: 'Medical Data Analysis', requiredLevel: 'intermediate' },
      { skillName: 'Regulatory Compliance', requiredLevel: 'intermediate' },
      { skillName: 'Medical Coding', requiredLevel: 'intermediate' },
    ],
    salaryRange: { min: 65000, max: 95000 },
  },
];

module.exports = {
  healthcareCareerPaths,
  allCareerPaths: healthcareCareerPaths,
};
