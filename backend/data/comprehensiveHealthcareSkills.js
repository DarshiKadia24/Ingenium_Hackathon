// Comprehensive Healthcare Technology Skills (50+ skills with enhanced healthcare context)
const comprehensiveHealthcareSkills = [
  // Clinical Skills (15 skills)
  {
    name: 'HIPAA Compliance',
    description: 'Understanding and implementing Health Insurance Portability and Accountability Act regulations',
    category: 'Regulatory',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 10,
      clinicalRelevance: 'Critical',
      patientImpact: 'Life-Critical',
      regulatoryImportance: 10,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'HIPAA Compliance Certification',
          description: 'Certified HIPAA Privacy Security Expert (CHPSE)',
          url: 'https://www.hipaacertification.com/',
        },
        {
          type: 'Case Study',
          title: 'HIPAA Violation Case Study',
          description: 'Analysis of real-world HIPAA violations and prevention strategies',
        },
      ],
    },
  },
  {
    name: 'Clinical Documentation',
    description: 'Accurate and comprehensive medical record keeping using standardized formats',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 9,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'EHR Documentation Improvement Project',
          description: 'Led initiative to improve clinical documentation quality',
        },
        {
          type: 'Case Study',
          title: 'Clinical Documentation Impact Study',
          description: 'Demonstrated impact of quality documentation on patient outcomes',
        },
      ],
    },
  },
  {
    name: 'Medical Terminology',
    description: 'Understanding medical language, abbreviations, and terminology used in healthcare',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'General',
      importance: 8,
      clinicalRelevance: 'High',
      patientImpact: 'Moderate',
      regulatoryImportance: 5,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'Medical Terminology Certificate',
          description: 'Completed medical terminology course',
        },
      ],
    },
  },
  {
    name: 'Patient Assessment',
    description: 'Conducting comprehensive patient evaluations and clinical assessments',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'Telemedicine',
      importance: 9,
      clinicalRelevance: 'Critical',
      patientImpact: 'Life-Critical',
      regulatoryImportance: 7,
      evidenceExamples: [
        {
          type: 'Clinical Trial',
          title: 'Telemedicine Assessment Study',
          description: 'Participated in research on remote patient assessment accuracy',
        },
      ],
    },
  },
  {
    name: 'Clinical Decision Support Systems',
    description: 'Using technology to aid clinical decision-making and improve patient care',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 8,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'CDSS Implementation',
          description: 'Implemented clinical decision support system in hospital setting',
        },
      ],
    },
  },
  {
    name: 'Precision Medicine',
    description: 'Personalized medical treatment based on individual patient characteristics',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 7,
      evidenceExamples: [
        {
          type: 'Research Paper',
          title: 'Precision Medicine Applications',
          description: 'Published research on precision medicine in oncology',
        },
      ],
    },
  },
  {
    name: 'Clinical Data Analysis',
    description: 'Analyzing clinical data to identify patterns, trends, and improve patient outcomes',
    category: 'Analytical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 10,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 8,
      evidenceExamples: [
        {
          type: 'Patient Data Project',
          title: 'Clinical Outcomes Analysis',
          description: 'Analyzed patient outcomes data to improve care protocols',
        },
        {
          type: 'Case Study',
          title: 'Clinical Data Analytics Case Study',
          description: 'Case study on using analytics to reduce readmission rates',
        },
      ],
    },
  },
  {
    name: 'Evidence-Based Practice',
    description: 'Applying research evidence to clinical decision-making',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'General',
      importance: 8,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 6,
      evidenceExamples: [
        {
          type: 'Research Paper',
          title: 'Evidence-Based Practice Review',
          description: 'Systematic review of evidence-based interventions',
        },
      ],
    },
  },
  {
    name: 'Patient Safety Protocols',
    description: 'Implementing and following patient safety protocols and guidelines',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'General',
      importance: 10,
      clinicalRelevance: 'Critical',
      patientImpact: 'Life-Critical',
      regulatoryImportance: 9,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'Patient Safety Certification',
          description: 'Certified in patient safety protocols',
        },
      ],
    },
  },
  {
    name: 'Clinical Workflow Optimization',
    description: 'Optimizing clinical workflows to improve efficiency and patient care',
    category: 'Clinical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 8,
      clinicalRelevance: 'High',
      patientImpact: 'Moderate',
      regulatoryImportance: 6,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Workflow Redesign Project',
          description: 'Led clinical workflow optimization initiative',
        },
      ],
    },
  },
  
  // Technical Skills (15 skills)
  {
    name: 'EHR Systems',
    description: 'Electronic Health Records management, implementation, and optimization',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 10,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 9,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'EHR Implementation',
          description: 'Led EHR system implementation in healthcare facility',
        },
        {
          type: 'Certification',
          title: 'Epic or Cerner Certification',
          description: 'Certified in major EHR system',
        },
      ],
    },
  },
  {
    name: 'Healthcare Data Security',
    description: 'Protecting sensitive health information from breaches and cyber threats',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Healthcare Cybersecurity',
      importance: 10,
      clinicalRelevance: 'Critical',
      patientImpact: 'Life-Critical',
      regulatoryImportance: 10,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'HCISPP Certification',
          description: 'Healthcare Information Security and Privacy Practitioner',
        },
        {
          type: 'Project',
          title: 'Security Audit Project',
          description: 'Conducted comprehensive healthcare data security audit',
        },
      ],
    },
  },
  {
    name: 'Telemedicine Platforms',
    description: 'Remote healthcare delivery and telemedicine platform management',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Telemedicine',
      importance: 10,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 8,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Telemedicine Platform Deployment',
          description: 'Deployed and managed telemedicine platform',
        },
        {
          type: 'Case Study',
          title: 'Telemedicine Implementation Case Study',
          description: 'Case study on telemedicine platform adoption',
        },
      ],
    },
  },
  {
    name: 'Medical Device Integration',
    description: 'Integrating medical devices with health information systems',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Medical Devices',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 9,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Medical Device Integration Project',
          description: 'Integrated medical devices with EHR system',
        },
      ],
    },
  },
  {
    name: 'HL7/FHIR Standards',
    description: 'Healthcare data exchange standards and protocols (HL7, FHIR)',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Moderate',
      regulatoryImportance: 8,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'FHIR API Implementation',
          description: 'Implemented FHIR API for healthcare data exchange',
        },
        {
          type: 'Certification',
          title: 'HL7 Certification',
          description: 'Certified in HL7 standards',
        },
      ],
    },
  },
  {
    name: 'Health Information Systems',
    description: 'Managing health information technology infrastructure',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Moderate',
      regulatoryImportance: 7,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'HIS Implementation',
          description: 'Implemented health information system',
        },
      ],
    },
  },
  {
    name: 'Healthcare Cloud Computing',
    description: 'Cloud-based solutions for healthcare data storage and processing',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 8,
      clinicalRelevance: 'Medium',
      patientImpact: 'Moderate',
      regulatoryImportance: 8,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Cloud Migration Project',
          description: 'Migrated healthcare systems to cloud infrastructure',
        },
      ],
    },
  },
  {
    name: 'Healthcare API Development',
    description: 'Developing APIs for healthcare data exchange and integration',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 8,
      clinicalRelevance: 'Medium',
      patientImpact: 'Moderate',
      regulatoryImportance: 7,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Healthcare API Development',
          description: 'Developed RESTful APIs for healthcare applications',
        },
      ],
    },
  },
  {
    name: 'Healthcare Database Management',
    description: 'Managing healthcare databases and ensuring data integrity',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 8,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Database Optimization Project',
          description: 'Optimized healthcare database performance',
        },
      ],
    },
  },
  {
    name: 'Healthcare Mobile Applications',
    description: 'Developing mobile applications for healthcare delivery',
    category: 'Technical',
    healthcareContext: {
      specialty: 'Telemedicine',
      importance: 8,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 7,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Healthcare Mobile App',
          description: 'Developed mobile application for patient engagement',
        },
      ],
    },
  },
  
  // Regulatory Skills (10 skills)
  {
    name: 'Regulatory Compliance',
    description: 'Adhering to healthcare regulations and standards (FDA, CMS, etc.)',
    category: 'Regulatory',
    healthcareContext: {
      specialty: 'Medical Devices',
      importance: 10,
      clinicalRelevance: 'Critical',
      patientImpact: 'Life-Critical',
      regulatoryImportance: 10,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'Regulatory Affairs Certification',
          description: 'Certified in healthcare regulatory affairs',
        },
        {
          type: 'Case Study',
          title: 'FDA Submission Case Study',
          description: 'Case study on successful FDA device submission',
        },
      ],
    },
  },
  {
    name: 'Medical Coding',
    description: 'ICD-10, CPT, and HCPCS coding systems',
    category: 'Regulatory',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 8,
      clinicalRelevance: 'High',
      patientImpact: 'Moderate',
      regulatoryImportance: 9,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'Medical Coding Certification',
          description: 'Certified Professional Coder (CPC) or similar',
        },
      ],
    },
  },
  {
    name: 'Quality Assurance in Healthcare',
    description: 'Ensuring quality standards in healthcare delivery',
    category: 'Regulatory',
    healthcareContext: {
      specialty: 'General',
      importance: 8,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 8,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Quality Improvement Initiative',
          description: 'Led quality assurance improvement project',
        },
      ],
    },
  },
  {
    name: 'FDA Medical Device Regulations',
    description: 'Understanding and complying with FDA regulations for medical devices',
    category: 'Regulatory',
    healthcareContext: {
      specialty: 'Medical Devices',
      importance: 10,
      clinicalRelevance: 'Critical',
      patientImpact: 'Life-Critical',
      regulatoryImportance: 10,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'FDA Regulations Training',
          description: 'Completed FDA medical device regulations training',
        },
      ],
    },
  },
  {
    name: 'Clinical Trial Management',
    description: 'Managing clinical trials and ensuring regulatory compliance',
    category: 'Regulatory',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 9,
      evidenceExamples: [
        {
          type: 'Clinical Trial',
          title: 'Clinical Trial Participation',
          description: 'Managed or participated in clinical trial',
        },
      ],
    },
  },
  {
    name: 'Healthcare Audit and Compliance',
    description: 'Conducting audits and ensuring healthcare compliance',
    category: 'Regulatory',
    healthcareContext: {
      specialty: 'General',
      importance: 8,
      clinicalRelevance: 'High',
      patientImpact: 'Moderate',
      regulatoryImportance: 9,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Compliance Audit',
          description: 'Conducted healthcare compliance audit',
        },
      ],
    },
  },
  
  // Analytical Skills (10 skills)
  {
    name: 'Healthcare Analytics',
    description: 'Data-driven insights for healthcare improvement',
    category: 'Analytical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 7,
      evidenceExamples: [
        {
          type: 'Patient Data Project',
          title: 'Healthcare Analytics Dashboard',
          description: 'Developed analytics dashboard for healthcare metrics',
        },
      ],
    },
  },
  {
    name: 'Population Health Management',
    description: 'Managing health outcomes for groups of patients',
    category: 'Analytical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 7,
      evidenceExamples: [
        {
          type: 'Patient Data Project',
          title: 'Population Health Initiative',
          description: 'Led population health management program',
        },
      ],
    },
  },
  {
    name: 'Predictive Analytics in Healthcare',
    description: 'Using predictive models for healthcare outcomes',
    category: 'Analytical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 6,
      evidenceExamples: [
        {
          type: 'Research Paper',
          title: 'Predictive Analytics Research',
          description: 'Published research on predictive analytics in healthcare',
        },
      ],
    },
  },
  {
    name: 'Healthcare Data Visualization',
    description: 'Creating visual representations of healthcare data',
    category: 'Analytical',
    healthcareContext: {
      specialty: 'Clinical Data',
      importance: 7,
      clinicalRelevance: 'Medium',
      patientImpact: 'Moderate',
      regulatoryImportance: 5,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Healthcare Dashboard',
          description: 'Created interactive healthcare data visualizations',
        },
      ],
    },
  },
  {
    name: 'Healthcare Business Intelligence',
    description: 'Using BI tools for healthcare decision-making',
    category: 'Analytical',
    healthcareContext: {
      specialty: 'Health Informatics',
      importance: 8,
      clinicalRelevance: 'Medium',
      patientImpact: 'Moderate',
      regulatoryImportance: 6,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'BI Implementation',
          description: 'Implemented business intelligence solution for healthcare',
        },
      ],
    },
  },
  
  // Soft Skills (10 skills)
  {
    name: 'Patient Privacy',
    description: 'Protecting patient information and maintaining confidentiality',
    category: 'Soft Skills',
    healthcareContext: {
      specialty: 'General',
      importance: 10,
      clinicalRelevance: 'Critical',
      patientImpact: 'Life-Critical',
      regulatoryImportance: 10,
      evidenceExamples: [
        {
          type: 'Certification',
          title: 'Privacy Training',
          description: 'Completed patient privacy training',
        },
      ],
    },
  },
  {
    name: 'Healthcare Project Management',
    description: 'Managing healthcare initiatives and implementations',
    category: 'Soft Skills',
    healthcareContext: {
      specialty: 'General',
      importance: 8,
      clinicalRelevance: 'Medium',
      patientImpact: 'Moderate',
      regulatoryImportance: 6,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Healthcare Project Management',
          description: 'Managed major healthcare technology project',
        },
        {
          type: 'Certification',
          title: 'PMP Certification',
          description: 'Project Management Professional certification',
        },
      ],
    },
  },
  {
    name: 'Interdisciplinary Collaboration',
    description: 'Working effectively with diverse healthcare teams',
    category: 'Soft Skills',
    healthcareContext: {
      specialty: 'General',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 5,
      evidenceExamples: [
        {
          type: 'Case Study',
          title: 'Team Collaboration Case Study',
          description: 'Demonstrated effective interdisciplinary collaboration',
        },
      ],
    },
  },
  {
    name: 'Healthcare Communication',
    description: 'Effective communication in healthcare settings',
    category: 'Soft Skills',
    healthcareContext: {
      specialty: 'Telemedicine',
      importance: 9,
      clinicalRelevance: 'High',
      patientImpact: 'Direct',
      regulatoryImportance: 6,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Communication Training',
          description: 'Completed healthcare communication training',
        },
      ],
    },
  },
  {
    name: 'Healthcare Leadership',
    description: 'Leading healthcare teams and initiatives',
    category: 'Soft Skills',
    healthcareContext: {
      specialty: 'General',
      importance: 8,
      clinicalRelevance: 'Medium',
      patientImpact: 'Moderate',
      regulatoryImportance: 5,
      evidenceExamples: [
        {
          type: 'Project',
          title: 'Leadership Initiative',
          description: 'Led healthcare technology initiative',
        },
      ],
    },
  },
];

module.exports = { comprehensiveHealthcareSkills };
