// Healthcare Technology Skills - All categories updated to healthcare-specific
const healthcareSkills = [
  // Clinical Skills
  { 
    name: 'HIPAA Compliance', 
    description: 'Understanding and implementing Health Insurance Portability and Accountability Act regulations', 
    category: 'Regulatory',
    healthcareContext: { specialty: 'Health Informatics', importance: 10 }
  },
  { 
    name: 'Clinical Documentation', 
    description: 'Accurate and comprehensive medical record keeping', 
    category: 'Clinical',
    healthcareContext: { specialty: 'Clinical Data', importance: 9 }
  },
  { 
    name: 'Medical Terminology', 
    description: 'Understanding medical language and terminology', 
    category: 'Clinical',
    healthcareContext: { specialty: 'General', importance: 8 }
  },
  { 
    name: 'Patient Assessment', 
    description: 'Conducting comprehensive patient evaluations', 
    category: 'Clinical',
    healthcareContext: { specialty: 'Telemedicine', importance: 9 }
  },
  { 
    name: 'Clinical Decision Support Systems', 
    description: 'Using technology to aid clinical decision-making', 
    category: 'Clinical',
    healthcareContext: { specialty: 'Health Informatics', importance: 9 }
  },
  
  // Technical Skills
  { 
    name: 'EHR Systems', 
    description: 'Electronic Health Records management and implementation', 
    category: 'Technical',
    healthcareContext: { specialty: 'Health Informatics', importance: 10 }
  },
  { 
    name: 'Medical Data Analysis', 
    description: 'Analyzing patient data, medical records, and health statistics', 
    category: 'Analytical',
    healthcareContext: { specialty: 'Clinical Data', importance: 10 }
  },
  { 
    name: 'Healthcare Analytics', 
    description: 'Data-driven insights for healthcare improvement', 
    category: 'Analytical',
    healthcareContext: { specialty: 'Clinical Data', importance: 9 }
  },
  { 
    name: 'Health Information Systems', 
    description: 'Managing health information technology infrastructure', 
    category: 'Technical',
    healthcareContext: { specialty: 'Health Informatics', importance: 9 }
  },
  { 
    name: 'Healthcare Data Security', 
    description: 'Protecting sensitive health information from breaches', 
    category: 'Technical',
    healthcareContext: { specialty: 'Healthcare Cybersecurity', importance: 10 }
  },
  { 
    name: 'Telemedicine Platforms', 
    description: 'Remote healthcare delivery and telemedicine platform management', 
    category: 'Technical',
    healthcareContext: { specialty: 'Telemedicine', importance: 10 }
  },
  { 
    name: 'Medical Device Integration', 
    description: 'Integrating medical devices with health information systems', 
    category: 'Technical',
    healthcareContext: { specialty: 'Medical Devices', importance: 10 }
  },
  { 
    name: 'HL7/FHIR Standards', 
    description: 'Healthcare data exchange standards and protocols', 
    category: 'Technical',
    healthcareContext: { specialty: 'Health Informatics', importance: 9 }
  },
  
  // Regulatory Skills
  { 
    name: 'Regulatory Compliance', 
    description: 'Adhering to healthcare regulations and standards (FDA, CMS, etc.)', 
    category: 'Regulatory',
    healthcareContext: { specialty: 'Medical Devices', importance: 10 }
  },
  { 
    name: 'Medical Coding', 
    description: 'ICD-10, CPT, and HCPCS coding systems', 
    category: 'Regulatory',
    healthcareContext: { specialty: 'Clinical Data', importance: 8 }
  },
  { 
    name: 'Quality Assurance in Healthcare', 
    description: 'Ensuring quality standards in healthcare delivery', 
    category: 'Regulatory',
    healthcareContext: { specialty: 'General', importance: 8 }
  },
  
  // Analytical Skills
  { 
    name: 'Population Health Management', 
    description: 'Managing health outcomes for groups of patients', 
    category: 'Analytical',
    healthcareContext: { specialty: 'Clinical Data', importance: 9 }
  },
  { 
    name: 'Predictive Analytics in Healthcare', 
    description: 'Using predictive models for healthcare outcomes', 
    category: 'Analytical',
    healthcareContext: { specialty: 'Clinical Data', importance: 9 }
  },
  { 
    name: 'Healthcare Data Visualization', 
    description: 'Creating visual representations of healthcare data', 
    category: 'Analytical',
    healthcareContext: { specialty: 'Clinical Data', importance: 7 }
  },
  
  // Soft Skills
  { 
    name: 'Patient Privacy', 
    description: 'Protecting patient information and maintaining confidentiality', 
    category: 'Soft Skills',
    healthcareContext: { specialty: 'General', importance: 10 }
  },
  { 
    name: 'Healthcare Project Management', 
    description: 'Managing healthcare initiatives and implementations', 
    category: 'Soft Skills',
    healthcareContext: { specialty: 'General', importance: 8 }
  },
  { 
    name: 'Interdisciplinary Collaboration', 
    description: 'Working effectively with diverse healthcare teams', 
    category: 'Soft Skills',
    healthcareContext: { specialty: 'General', importance: 9 }
  },
  { 
    name: 'Healthcare Communication', 
    description: 'Effective communication in healthcare settings', 
    category: 'Soft Skills',
    healthcareContext: { specialty: 'Telemedicine', importance: 9 }
  },
];

module.exports = {
  healthcareSkills,
  allSkills: healthcareSkills,
};
