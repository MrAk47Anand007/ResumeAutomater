export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certificates: Certificate[];
}

export interface LaTeXTemplate {
  id: string;
  name: string;
  description: string;
  clsContent: string; // .cls file content
  texContent: string; // .tex file content
}

export interface Resume {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  data: ResumeData;
  template: LaTeXTemplate;
  customLatex?: string; // For custom LaTeX edits
}

export interface AppState {
  resumes: Resume[];
  currentResumeId: string | null;
}
