export interface SocialLink {
  id?: number;
  name: string;
  url: string;
  icon?: string;
  displayOrder?: number;
}

export interface Education {
  id?: number;
  degree: string;
  institute: string;
  year: string;
  displayOrder?: number;
}

export interface Skill {
  id?: number;
  name: string;
  displayOrder?: number;
}

export interface CurrentJob {
  id?: number;
  title: string;
  company: string;
  since: string;
  description: string;
}

export interface Experience {
  id?: number;
  role: string;
  company: string;
  from: string;
  to: string;
  description: string[];
  displayOrder?: number;
}

export interface Project {
  id?: number;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  displayOrder?: number;
}

export interface Profile {
  id?: number;
  name: string;
  role: string;
  tagline: string;
  photoUrl: string;
  faviconUrl?: string;
  about: string;
  education: Education[];
  skills: Skill[];
  currentJob: CurrentJob;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  profile: Profile | null;
  educations: Education[];
  skills: Skill[];
  currentJob: CurrentJob | null;
  socialLinks: SocialLink[];
  experiences: Experience[];
  projects: Project[];
}
