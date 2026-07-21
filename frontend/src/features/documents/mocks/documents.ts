import { ProcessingStatus } from '../types/ProcessingStatus'
import type { Document } from '../types/Document'

const uploaders = [
  'Sarah Chen', 'James Park', 'Emily Rodriguez', 'Admin',
  'DevOps Team', 'Legal Team', 'HR Team', 'Product Team',
]

const docNames: Array<[string, string, string, string]> = [
  ['Leave Policy 2026', 'PDF', 'HR Policies', 'Comprehensive leave policy covering annual, sick, and parental leave.'],
  ['Employee Handbook v4', 'PDF', 'Employee Handbook', 'Complete employee handbook with company policies and culture guidelines.'],
  ['Q1 Budget Report', 'XLSX', 'Finance', 'Quarterly budget report with revenue projections and expense breakdown.'],
  ['GDPR Compliance Guide', 'PDF', 'Legal', 'Data protection regulation compliance guide for all departments.'],
  ['Incident Response Plan', 'PDF', 'Security', 'Step-by-step incident response procedures for security breaches.'],
  ['Product User Manual', 'PDF', 'Product Manuals', 'Complete user manual for the IntelliDocs AI platform.'],
  ['Remote Work Policy', 'DOCX', 'HR Policies', 'Guidelines for remote and hybrid work arrangements.'],
  ['API Reference v3', 'MD', 'API Documentation', 'RESTful API reference documentation for v3 endpoints.'],
  ['Onboarding Checklist', 'PDF', 'Employee Handbook', 'New hire onboarding checklist and first-week guide.'],
  ['Expense Reimbursement', 'PDF', 'Finance', 'Expense reimbursement policy and submission procedures.'],
  ['Data Retention Policy', 'PDF', 'Legal', 'Data retention and disposal policy for compliance.'],
  ['Access Control Matrix', 'XLSX', 'Security', 'Role-based access control matrix for all systems.'],
  ['Release Notes v2.5', 'MD', 'Technical Documents', 'Release notes for platform version 2.5 with new features.'],
  ['Sales Playbook Q2', 'PDF', 'HR Policies', 'Sales methodology and playbook for Q2 2026.'],
  ['Architecture Overview', 'PDF', 'Technical Documents', 'System architecture overview and design decisions.'],
  ['Brand Guidelines', 'PDF', 'Product Manuals', 'Company brand guidelines including logo, colors, and typography.'],
  ['Performance Review Template', 'DOCX', 'HR Policies', 'Annual performance review template and scoring rubric.'],
  ['Wire Transfer Instructions', 'PDF', 'Finance', 'Bank wire transfer instructions and approval workflow.'],
  ['NDA Template', 'DOCX', 'Legal', 'Standard non-disclosure agreement template for partners.'],
  ['Password Policy', 'PDF', 'Security', 'Password complexity requirements and rotation policy.'],
  ['Deployment Runbook', 'MD', 'Technical Documents', 'Step-by-step deployment procedures for production.'],
  ['Meeting Notes - Board', 'PDF', 'HR Policies', 'Board meeting minutes from Q1 2026 review.'],
  ['Tax Filing Guide', 'PDF', 'Finance', 'Annual tax filing guide for corporate accounts.'],
  ['Privacy Policy', 'PDF', 'Legal', 'Customer-facing privacy policy and data handling practices.'],
  ['Vulnerability Assessment', 'PDF', 'Security', 'Quarterly vulnerability assessment report and remediation steps.'],
  ['SDK Integration Guide', 'MD', 'API Documentation', 'SDK integration guide for Python, Java, and Node.js.'],
  ['Compensation Benchmarks', 'PDF', 'HR Policies', 'Industry compensation benchmarks for tech roles.'],
  ['Cash Flow Forecast', 'XLSX', 'Finance', '12-month cash flow forecast and projections.'],
  ['Terms of Service', 'PDF', 'Legal', 'Platform terms of service and acceptable use policy.'],
  ['SOC 2 Compliance Report', 'PDF', 'Security', 'SOC 2 Type II compliance audit report.'],
  ['Microservices Guide', 'MD', 'Technical Documents', 'Microservices architecture patterns and best practices.'],
  ['Training Schedule', 'PDF', 'Employee Handbook', 'Q2 employee training schedule and enrollment details.'],
  ['Payroll Processing Manual', 'PDF', 'Finance', 'Payroll processing procedures and deadline calendar.'],
  ['Contract Review Process', 'PDF', 'Legal', 'Legal contract review and approval workflow.'],
  ['Encryption Standards', 'PDF', 'Security', 'Data encryption standards at rest and in transit.'],
  ['Database Schema Docs', 'MD', 'Technical Documents', 'Database schema documentation and ER diagrams.'],
  ['Benefits Overview', 'PDF', 'Employee Handbook', 'Employee benefits package overview and enrollment guide.'],
  ['Invoice Processing Guide', 'PDF', 'Finance', 'Accounts payable invoice processing and approval workflow.'],
  ['IP Assignment Agreement', 'DOCX', 'Legal', 'Intellectual property assignment agreement for employees.'],
  ['Disaster Recovery Plan', 'PDF', 'Security', 'Disaster recovery and business continuity procedures.'],
  ['CI/CD Pipeline Guide', 'MD', 'Technical Documents', 'Continuous integration and deployment pipeline documentation.'],
  ['Code of Conduct', 'PDF', 'Employee Handbook', 'Company code of conduct and ethical guidelines.'],
  ['Investment Policy', 'PDF', 'Finance', 'Corporate investment policy and risk management framework.'],
  ['Compliance Training', 'PDF', 'Legal', 'Annual compliance training requirements and schedule.'],
  ['Network Security Policy', 'PDF', 'Security', 'Network security architecture and firewall rules.'],
  ['Kubernetes Deployment', 'MD', 'Technical Documents', 'Kubernetes cluster management and deployment guide.'],
  ['Workplace Safety', 'PDF', 'Employee Handbook', 'Workplace safety procedures and emergency protocols.'],
  ['Audit Trail Guidelines', 'PDF', 'Finance', 'Internal audit trail requirements and documentation standards.'],
  ['Regulatory Updates', 'PDF', 'Legal', 'Summary of regulatory changes affecting the organization.'],
  ['Penetration Testing Report', 'PDF', 'Security', 'Annual penetration testing results and recommendations.'],
  ['GraphQL Schema Reference', 'MD', 'API Documentation', 'GraphQL schema definitions and query examples.'],
  ['Time-Off Request Form', 'PDF', 'HR Policies', 'Digital time-off request form and approval process.'],
]

function randomDate(start: string, end: string): string {
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  return new Date(s + Math.random() * (e - s)).toISOString().slice(0, 10)
}

function randomSize(): number {
  return Math.floor(Math.random() * 15000000) + 50000
}

function randomStatus(): ProcessingStatus {
  const statuses = Object.values(ProcessingStatus)
  return statuses[Math.floor(Math.random() * statuses.length)]
}

export const mockDocuments: Document[] = docNames.map(([name, fileType, category, description], i) => {
  const status = randomStatus()
  return {
    id: i + 1,
    name,
    category,
    description,
    fileType,
    fileSize: randomSize(),
    uploadedBy: uploaders[i % uploaders.length],
    uploadedAt: randomDate('2025-10-01', '2026-07-15'),
    processingStatus: status,
    aiReady: status === ProcessingStatus.READY,
    favorite: i % 7 === 0,
    tags: [category.split(' ')[0].toLowerCase(), fileType.toLowerCase()],
    progress: status === ProcessingStatus.READY ? 100 : status === ProcessingStatus.UPLOADING ? Math.floor(Math.random() * 80) : status === ProcessingStatus.FAILED ? Math.floor(Math.random() * 60) : 100,
    version: `1.${Math.floor(Math.random() * 5)}`,
  }
})
