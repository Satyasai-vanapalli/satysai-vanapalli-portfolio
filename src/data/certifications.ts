export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export const certifications: Certification[] = [
  {
    id: "aws-developer-associate",
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services Training and Certification",
    date: "June 2026",
    credentialUrl: "https://www.credly.com/badges/d876b6ea-7c07-45d9-9cb3-356e7eb168e3",
  },
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services Training and Certification",
    date: "June 2026",
    credentialUrl: "https://www.credly.com/badges/ec272095-093f-497c-83c2-20ac4afdb724",
  },
  {
    id: "automation-anywhere-advanced",
    name: "Certified Advanced Automation Professional (Advanced Automation Certification)",
    issuer: "Automation Anywhere",
    date: "June 2026",
    credentialUrl: "https://certificates.automationanywhere.com/51a9ea87-ccf1-4d36-9bfe-30d336e8701d#acc.IWQXRYPz",
  },
  {
    id: "aws-solutions-architect-associate",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services Training and Certification",
    date: "May 2026",
    credentialUrl: "https://www.credly.com/badges/f38edb8a-385b-478e-975e-69df0ec5e815",
  },
  {
    id: "mongodb-associate-developer",
    name: "MongoDB Associate Developer",
    issuer: "MongoDB",
    date: "May 2026",
    credentialUrl: "https://www.credly.com/badges/d0328c62-ed54-4bb3-9a41-6cfc2e93cb05",
  },
];
