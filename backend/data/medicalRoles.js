// Medical Roles Data
const medicalRoles = [
  {
    title: 'Clinical Informaticist',
    description: 'Design and implement health information systems to improve patient care and healthcare delivery. Bridge the gap between clinical practice and information technology.',
    category: 'Clinical Informatics',
    salaryRange: {
      min: 75000,
      max: 120000,
      currency: 'USD',
    },
    educationRequirements: [
      {
        level: 'Master',
        field: 'Health Informatics, Healthcare Administration, or related',
        required: true,
      },
    ],
    certifications: [
      {
        name: 'Certified Professional in Healthcare Information and Management Systems (CPHIMS)',
        issuer: 'HIMSS',
        required: false,
      },
    ],
    careerPath: [
      {
        stage: 'Entry Level',
        description: 'Health Information Analyst or Clinical Systems Coordinator',
        typicalDuration: '1-2 years',
      },
      {
        stage: 'Mid Level',
        description: 'Clinical Informaticist or Health IT Specialist',
        typicalDuration: '3-5 years',
      },
      {
        stage: 'Senior Level',
        description: 'Senior Clinical Informaticist or Director of Clinical Informatics',
        typicalDuration: '5+ years',
      },
    ],
  },
  {
    title: 'Healthcare Data Analyst',
    description: 'Analyze healthcare data to identify trends, improve patient outcomes, and support evidence-based decision making in healthcare organizations.',
    category: 'Data Analytics',
    salaryRange: {
      min: 65000,
      max: 100000,
      currency: 'USD',
    },
    educationRequirements: [
      {
        level: 'Bachelor',
        field: 'Data Science, Statistics, Healthcare Administration, or related',
        required: true,
      },
    ],
    certifications: [
      {
        name: 'Certified Health Data Analyst (CHDA)',
        issuer: 'AHIMA',
        required: false,
      },
    ],
    careerPath: [
      {
        stage: 'Entry Level',
        description: 'Junior Data Analyst or Healthcare Data Specialist',
        typicalDuration: '1-2 years',
      },
      {
        stage: 'Mid Level',
        description: 'Healthcare Data Analyst or Senior Data Analyst',
        typicalDuration: '3-5 years',
      },
      {
        stage: 'Senior Level',
        description: 'Lead Healthcare Data Analyst or Analytics Manager',
        typicalDuration: '5+ years',
      },
    ],
  },
  {
    title: 'Medical Device Developer',
    description: 'Design, develop, and test medical devices and software. Ensure compliance with FDA regulations and quality standards.',
    category: 'Medical Devices',
    salaryRange: {
      min: 80000,
      max: 130000,
      currency: 'USD',
    },
    educationRequirements: [
      {
        level: 'Bachelor',
        field: 'Biomedical Engineering, Software Engineering, or related',
        required: true,
      },
    ],
    certifications: [
      {
        name: 'ISO 13485 Lead Auditor',
        issuer: 'Various',
        required: false,
      },
    ],
    careerPath: [
      {
        stage: 'Entry Level',
        description: 'Junior Medical Device Engineer or Software Developer',
        typicalDuration: '1-2 years',
      },
      {
        stage: 'Mid Level',
        description: 'Medical Device Engineer or Senior Developer',
        typicalDuration: '3-5 years',
      },
      {
        stage: 'Senior Level',
        description: 'Lead Medical Device Engineer or Technical Director',
        typicalDuration: '5+ years',
      },
    ],
  },
  {
    title: 'Telemedicine Specialist',
    description: 'Manage and coordinate telemedicine programs, ensuring seamless remote healthcare delivery and patient engagement.',
    category: 'Telemedicine',
    salaryRange: {
      min: 60000,
      max: 95000,
      currency: 'USD',
    },
    educationRequirements: [
      {
        level: 'Bachelor',
        field: 'Healthcare Administration, Health Informatics, or related',
        required: true,
      },
    ],
    certifications: [
      {
        name: 'Telehealth Coordinator Certification',
        issuer: 'ATA',
        required: false,
      },
    ],
    careerPath: [
      {
        stage: 'Entry Level',
        description: 'Telemedicine Coordinator or Support Specialist',
        typicalDuration: '1-2 years',
      },
      {
        stage: 'Mid Level',
        description: 'Telemedicine Specialist or Program Manager',
        typicalDuration: '3-5 years',
      },
      {
        stage: 'Senior Level',
        description: 'Director of Telemedicine or Telehealth Strategy Lead',
        typicalDuration: '5+ years',
      },
    ],
  },
  {
    title: 'Healthcare Cybersecurity Analyst',
    description: 'Protect healthcare systems and patient data from cyber threats. Implement security measures and ensure compliance with healthcare regulations.',
    category: 'Cybersecurity',
    salaryRange: {
      min: 85000,
      max: 140000,
      currency: 'USD',
    },
    educationRequirements: [
      {
        level: 'Bachelor',
        field: 'Cybersecurity, Information Technology, or related',
        required: true,
      },
    ],
    certifications: [
      {
        name: 'Certified Information Systems Security Professional (CISSP)',
        issuer: 'ISC²',
        required: false,
      },
      {
        name: 'Healthcare Information Security and Privacy Practitioner (HCISPP)',
        issuer: 'ISC²',
        required: false,
      },
    ],
    careerPath: [
      {
        stage: 'Entry Level',
        description: 'Junior Security Analyst or IT Security Specialist',
        typicalDuration: '1-2 years',
      },
      {
        stage: 'Mid Level',
        description: 'Healthcare Security Analyst or Security Engineer',
        typicalDuration: '3-5 years',
      },
      {
        stage: 'Senior Level',
        description: 'Senior Security Analyst or Chief Information Security Officer (CISO)',
        typicalDuration: '5+ years',
      },
    ],
  },
];

module.exports = { medicalRoles };
