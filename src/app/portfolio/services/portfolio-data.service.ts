import { Injectable } from '@angular/core';
import { Profile, Experience, Project, SocialLink } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {

  getProfile(): Profile {
    return {
      name: 'John Doe',
      role: 'Senior Full Stack Developer',
      tagline: 'Building scalable web applications with modern technologies',
      photoUrl: 'https://via.placeholder.com/400x400',
      about: 'Passionate software engineer with 8+ years of experience in building enterprise-level applications. I specialize in Angular, Node.js, and cloud technologies. I love solving complex problems and creating intuitive user experiences.',
      education: [
        {
          degree: 'Master of Science in Computer Science',
          institute: 'Stanford University',
          year: '2015'
        },
        {
          degree: 'Bachelor of Technology in Software Engineering',
          institute: 'MIT',
          year: '2013'
        }
      ],
      skills: [
        { name: 'Angular' },
        { name: 'TypeScript' },
        { name: 'Node.js' },
        { name: 'React' },
        { name: 'Vue.js' },
        { name: 'Express' },
        { name: 'MongoDB' },
        { name: 'PostgreSQL' },
        { name: 'AWS' },
        { name: 'Docker' },
        { name: 'Kubernetes' },
        { name: 'GraphQL' },
        { name: 'REST APIs' },
        { name: 'Tailwind CSS' },
        { name: 'Git' },
        { name: 'CI/CD' }
      ],
      currentJob: {
        title: 'Lead Frontend Engineer',
        company: 'Tech Innovations Inc.',
        since: 'January 2022',
        description: 'Leading a team of 8 engineers to build next-generation web applications. Architecting scalable frontend solutions using Angular and React. Mentoring junior developers and driving best practices.'
      },
      socialLinks: [
        {
          name: 'GitHub',
          url: 'https://github.com/johndoe',
          icon: 'GH'
        },
        {
          name: 'LinkedIn',
          url: 'https://linkedin.com/in/johndoe',
          icon: 'LI'
        },
        {
          name: 'X',
          url: 'https://x.com/johndoe',
          icon: 'X'
        },
        {
          name: 'Email',
          url: 'mailto:john.doe@example.com',
          icon: '✉'
        }
      ]
    };
  }

  getExperiences(): Experience[] {
    return [
      {
        role: 'Lead Frontend Engineer',
        company: 'Tech Innovations Inc.',
        from: 'Jan 2022',
        to: 'Present',
        description: [
          'Led frontend architecture for enterprise SaaS platform serving 100K+ users',
          'Reduced page load time by 60% through optimization and lazy loading strategies',
          'Mentored team of 8 engineers and established code review best practices',
          'Implemented micro-frontend architecture using Angular Module Federation'
        ]
      },
      {
        role: 'Senior Full Stack Developer',
        company: 'Digital Solutions Corp',
        from: 'Mar 2019',
        to: 'Dec 2021',
        description: [
          'Built and maintained multiple client-facing web applications',
          'Designed RESTful APIs using Node.js and Express',
          'Integrated third-party services including Stripe, Auth0, and AWS',
          'Improved application performance by 45% through database optimization'
        ]
      },
      {
        role: 'Full Stack Developer',
        company: 'StartUp Ventures',
        from: 'Jun 2016',
        to: 'Feb 2019',
        description: [
          'Developed real-time collaboration features using WebSockets',
          'Created responsive UI components with Angular and Material Design',
          'Implemented CI/CD pipelines using Jenkins and Docker',
          'Collaborated with UX team to improve user engagement by 35%'
        ]
      },
      {
        role: 'Junior Software Engineer',
        company: 'Software Labs',
        from: 'Aug 2015',
        to: 'May 2016',
        description: [
          'Contributed to development of internal tools and dashboards',
          'Fixed bugs and implemented new features across the stack',
          'Participated in agile ceremonies and pair programming sessions',
          'Learned best practices in software development and testing'
        ]
      }
    ];
  }

  getProjects(): Project[] {
    return [
      {
        name: 'E-Commerce Platform',
        description: 'Full-featured e-commerce solution with real-time inventory management, payment integration, and admin dashboard.',
        techStack: ['Angular', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
        liveUrl: 'https://example-ecommerce.com',
        githubUrl: 'https://github.com/johndoe/ecommerce-platform'
      },
      {
        name: 'Project Management Tool',
        description: 'Collaborative project management application with Kanban boards, real-time updates, and team chat.',
        techStack: ['Angular', 'Firebase', 'RxJS', 'Tailwind CSS'],
        liveUrl: 'https://example-pm-tool.com',
        githubUrl: 'https://github.com/johndoe/project-manager'
      },
      {
        name: 'Social Media Dashboard',
        description: 'Analytics dashboard for tracking social media metrics across multiple platforms with beautiful data visualizations.',
        techStack: ['React', 'TypeScript', 'Chart.js', 'Express', 'PostgreSQL'],
        liveUrl: 'https://example-dashboard.com',
        githubUrl: 'https://github.com/johndoe/social-dashboard'
      },
      {
        name: 'Weather Forecast App',
        description: 'Modern weather application with 7-day forecasts, location search, and beautiful weather animations.',
        techStack: ['Angular', 'OpenWeather API', 'Tailwind CSS', 'PWA'],
        liveUrl: 'https://example-weather.com',
        githubUrl: 'https://github.com/johndoe/weather-app'
      },
      {
        name: 'Blog CMS',
        description: 'Headless CMS for managing blog content with markdown support, media library, and SEO optimization.',
        techStack: ['Node.js', 'GraphQL', 'MongoDB', 'Apollo', 'Next.js'],
        githubUrl: 'https://github.com/johndoe/blog-cms'
      },
      {
        name: 'Fitness Tracker',
        description: 'Mobile-responsive fitness tracking app with workout plans, progress charts, and goal setting.',
        techStack: ['Angular', 'Ionic', 'Firebase', 'Chart.js'],
        liveUrl: 'https://example-fitness.com'
      }
    ];
  }

  getSocialLinks(): SocialLink[] {
    return this.getProfile().socialLinks;
  }
}





