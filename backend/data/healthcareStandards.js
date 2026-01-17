// Healthcare Standards Data
const healthcareStandards = [
  {
    name: 'HIPAA Privacy Rule',
    category: 'HIPAA Compliance',
    description: 'Establishes national standards to protect individuals\' medical records and other personal health information',
    level: 'Intermediate',
    requirements: [
      {
        title: 'Administrative Safeguards',
        description: 'Policies and procedures to manage the selection, development, implementation, and maintenance of security measures',
      },
      {
        title: 'Physical Safeguards',
        description: 'Physical measures, policies, and procedures to protect electronic information systems and related buildings',
      },
      {
        title: 'Technical Safeguards',
        description: 'Technology and policy to protect electronic protected health information and control access to it',
      },
    ],
    resources: [
      {
        title: 'HIPAA Privacy Rule Summary',
        url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/index.html',
        type: 'Documentation',
      },
      {
        title: 'HIPAA Training Course',
        url: 'https://www.coursera.org/learn/hipaa',
        type: 'Training',
      },
    ],
  },
  {
    name: 'HIPAA Security Rule',
    category: 'HIPAA Compliance',
    description: 'National standards to protect individuals\' electronic personal health information',
    level: 'Advanced',
    requirements: [
      {
        title: 'Access Control',
        description: 'Implement technical policies and procedures to allow only authorized persons to access ePHI',
      },
      {
        title: 'Audit Controls',
        description: 'Implement hardware, software, and procedural mechanisms to record and examine access',
      },
      {
        title: 'Integrity Controls',
        description: 'Implement policies and procedures to ensure ePHI is not improperly altered or destroyed',
      },
    ],
    resources: [
      {
        title: 'HIPAA Security Rule Guide',
        url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html',
        type: 'Documentation',
      },
    ],
  },
  {
    name: 'FDA 510(k) Medical Device Clearance',
    category: 'FDA Regulations',
    description: 'Premarket notification for medical devices that are substantially equivalent to a legally marketed device',
    level: 'Advanced',
    requirements: [
      {
        title: 'Device Classification',
        description: 'Determine if device is Class I, II, or III',
      },
      {
        title: 'Substantial Equivalence',
        description: 'Demonstrate device is substantially equivalent to a predicate device',
      },
      {
        title: 'Quality System Regulation',
        description: 'Comply with FDA Quality System Regulation (QSR)',
      },
    ],
    resources: [
      {
        title: 'FDA 510(k) Guidance',
        url: 'https://www.fda.gov/medical-devices/premarket-submissions/premarket-notification-510k',
        type: 'Documentation',
      },
    ],
  },
  {
    name: 'FDA Clinical Trial Phases',
    category: 'Clinical Trials',
    description: 'Understanding the phases of clinical trials for drug and device development',
    level: 'Intermediate',
    requirements: [
      {
        title: 'Phase I',
        description: 'Safety and dosage testing with small groups',
      },
      {
        title: 'Phase II',
        description: 'Efficacy and side effects testing',
      },
      {
        title: 'Phase III',
        description: 'Large-scale efficacy and monitoring of adverse reactions',
      },
      {
        title: 'Phase IV',
        description: 'Post-marketing surveillance',
      },
    ],
    resources: [
      {
        title: 'Clinical Trials Guide',
        url: 'https://www.fda.gov/patients/clinical-trials-what-patients-need-know',
        type: 'Documentation',
      },
    ],
  },
  {
    name: 'HL7 FHIR Standard',
    category: 'Data Standards',
    description: 'Fast Healthcare Interoperability Resources - standard for exchanging healthcare information electronically',
    level: 'Advanced',
    requirements: [
      {
        title: 'FHIR Resources',
        description: 'Understanding core FHIR resources (Patient, Observation, Medication, etc.)',
      },
      {
        title: 'FHIR API',
        description: 'RESTful API implementation for healthcare data exchange',
      },
      {
        title: 'FHIR Profiles',
        description: 'Creating and using FHIR profiles for specific use cases',
      },
    ],
    resources: [
      {
        title: 'HL7 FHIR Documentation',
        url: 'https://www.hl7.org/fhir/',
        type: 'Documentation',
      },
      {
        title: 'FHIR Training',
        url: 'https://www.coursera.org/learn/fhir',
        type: 'Training',
      },
    ],
  },
  {
    name: 'HL7 v2 Messaging',
    category: 'Data Standards',
    description: 'HL7 version 2 messaging standard for healthcare data exchange',
    level: 'Intermediate',
    requirements: [
      {
        title: 'Message Structure',
        description: 'Understanding segments, fields, and components',
      },
      {
        title: 'Message Types',
        description: 'Common message types (ADT, ORU, ORM, etc.)',
      },
      {
        title: 'Implementation',
        description: 'Implementing HL7 v2 interfaces',
      },
    ],
    resources: [
      {
        title: 'HL7 v2 Documentation',
        url: 'https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185',
        type: 'Documentation',
      },
    ],
  },
  {
    name: 'DICOM Standard',
    category: 'Data Standards',
    description: 'Digital Imaging and Communications in Medicine - standard for medical imaging',
    level: 'Advanced',
    requirements: [
      {
        title: 'DICOM File Format',
        description: 'Understanding DICOM file structure and metadata',
      },
      {
        title: 'DICOM Network',
        description: 'DICOM network protocols and communication',
      },
      {
        title: 'Image Storage',
        description: 'PACS (Picture Archiving and Communication System) integration',
      },
    ],
    resources: [
      {
        title: 'DICOM Standard',
        url: 'https://www.dicomstandard.org/',
        type: 'Documentation',
      },
    ],
  },
  {
    name: 'ISO 13485 Medical Devices Quality',
    category: 'Quality Assurance',
    description: 'Quality management system standard for medical device manufacturers',
    level: 'Expert',
    requirements: [
      {
        title: 'Quality Management System',
        description: 'Establish and maintain a quality management system',
      },
      {
        title: 'Design Controls',
        description: 'Design and development controls for medical devices',
      },
      {
        title: 'Risk Management',
        description: 'ISO 14971 risk management for medical devices',
      },
    ],
    resources: [
      {
        title: 'ISO 13485 Certification',
        url: 'https://www.iso.org/standard/59752.html',
        type: 'Certification',
      },
    ],
  },
];

module.exports = { healthcareStandards };
