export interface SocialLink {
  name: string;   // e.g. "GitHub", "LinkedIn", "X"
  url: string;
  icon?: string;  // optional icon descriptor
}

export interface Education {
  degree: string;
  institute: string;
  year: string;
}

export interface Skill {
  name: string;
}

export interface CurrentJob {
  title: string;
  company: string;
  since: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  from: string;
  to: string;
  description: string[];  // bullet points
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  photoUrl: string;
  about: string;
  education: Education[];
  skills: Skill[];
  currentJob: CurrentJob;
  socialLinks: SocialLink[];
}





