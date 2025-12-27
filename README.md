# Portfolio Website

A modern, component-driven portfolio website built with Angular 17 (standalone components) and Tailwind CSS v4.

## Features

✨ **Modern Tech Stack**
- Angular 17+ with standalone components
- TypeScript for type safety
- Tailwind CSS v4 for styling
- Component-driven architecture

🎨 **Beautiful UI/UX**
- Dark theme with gradient backgrounds
- Smooth scroll navigation
- Scroll-triggered animations
- Responsive design (mobile, tablet, desktop)
- Floating "Back to Top" rocket button

📱 **Sections**
- **Hero**: Name, role, tagline, profile photo, social links, and CTA buttons
- **About**: Bio, education, skills, and current job
- **Experience**: Timeline-style work history
- **Projects**: Showcase of your work with tech stacks and links
- **Contact**: Contact form and social media links

## Project Structure

```
src/app/portfolio/
├── portfolio-page/
│   └── portfolio-page.component.ts         # Main container
├── components/
│   ├── navbar/
│   │   └── navbar.component.ts             # Sticky navigation
│   ├── hero/
│   │   └── hero.component.ts               # Hero section
│   ├── about/
│   │   └── about.component.ts              # About section
│   ├── experience/
│   │   ├── experience.component.ts         # Experience section
│   │   └── experience-item/
│   │       └── experience-item.component.ts # Timeline item
│   ├── projects/
│   │   ├── projects.component.ts           # Projects section
│   │   └── project-card/
│   │       └── project-card.component.ts   # Project card
│   ├── contact/
│   │   └── contact.component.ts            # Contact form
│   └── ui/
│       ├── button/
│       │   └── button.component.ts         # Reusable button
│       ├── social-icon/
│       │   └── social-icon.component.ts    # Social media icon
│       └── back-to-top/
│           └── back-to-top.component.ts    # Floating back button
├── directives/
│   └── reveal-on-scroll.directive.ts       # Scroll animations
├── services/
│   └── portfolio-data.service.ts           # Data service (mock data)
└── models/
    └── portfolio.models.ts                 # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start development server:**

```bash
npm start
```

or

```bash
ng serve
```

3. **Open your browser:**

Navigate to `http://localhost:4200`

The application will automatically reload if you change any source files.

## Customization

### GitHub Integration

The portfolio automatically fetches data from your GitHub profile:
- **Profile Info**: Name, bio, and avatar from your GitHub profile
- **Projects**: Automatically populated from your public repositories (top 12, excluding forks)
- **Skills**: Extracted from languages used in your repositories

The GitHub username is configured in `src/app/portfolio/services/github-api.service.ts` (currently set to `RagingScout95`).

### Adding LinkedIn Data

Since LinkedIn's API requires special access, you'll need to manually add your LinkedIn data. Edit: `src/app/portfolio/services/portfolio-data.service.ts`

#### 1. Update Your Role and Current Job

In the `getProfile()` method:

```typescript
role: 'Your Actual Job Title', // e.g., 'Full Stack Developer', 'Software Engineer'

currentJob: {
  title: 'Your Current Job Title',
  company: 'Your Company Name',
  since: 'Start Date', // e.g., 'January 2023'
  description: 'Your job description and key responsibilities'
}
```

#### 2. Add Your Education

In the `education` array within `getProfile()`:

```typescript
education: [
  {
    degree: 'Your Degree',
    institute: 'Your University/College',
    year: 'Graduation Year'
  }
]
```

#### 3. Add Your Work Experience

In the `getExperiences()` method:

```typescript
getExperiences(): Observable<Experience[]> {
  return of([
    {
      role: 'Your Job Title',
      company: 'Company Name',
      from: 'Start Date', // e.g., 'Jan 2022'
      to: 'End Date or Present', // e.g., 'Dec 2023' or 'Present'
      description: [
        'Key achievement or responsibility 1',
        'Key achievement or responsibility 2',
        'Key achievement or responsibility 3'
      ]
    }
    // Add more experiences in reverse chronological order (newest first)
  ]);
}
```

**Note**: GitHub data (projects, skills, profile photo, bio) is automatically fetched. Only add your LinkedIn-specific data (experience, education, current job details).

### Replace with Backend API

When ready to connect to your backend:

1. Inject `HttpClient` into `PortfolioDataService`
2. Replace the mock return statements with HTTP calls:

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class PortfolioDataService {
  private apiUrl = 'https://your-api.com/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`);
  }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experiences`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }
}
```

3. Update components to handle Observables with `async` pipe or subscriptions.

### Styling & Theme

The portfolio uses Tailwind CSS v4 with a dark theme:
- Background: `bg-slate-950`, `bg-slate-900`
- Text: `text-slate-100`, `text-slate-300`
- Accent: `text-blue-400`, `bg-blue-600`

To customize colors, modify the Tailwind classes in component templates or extend the theme in `tailwind.config.js`.

### Profile Photo

Update the `photoUrl` in `PortfolioDataService.getProfile()` to point to your photo:
- Use a local path: `/assets/images/profile.jpg`
- Or a remote URL: `https://example.com/your-photo.jpg`

### Social Links

Add/remove social links in `getProfile()`:

```typescript
socialLinks: [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'GH' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'LI' },
  { name: 'X', url: 'https://x.com/yourusername', icon: 'X' },
  { name: 'Email', url: 'mailto:you@example.com', icon: '✉' }
]
```

## Build

Build the project for production:

```bash
npm run build
```

or

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Features Breakdown

### Navigation
- Sticky navbar with smooth scroll to sections
- Active section highlighting
- Responsive mobile menu

### Animations
- Scroll-triggered reveal animations using `RevealOnScrollDirective`
- Intersection Observer API for performance
- Fade-in and slide-up effects

### Back to Top Button
- Floating rocket button appears after scrolling down 200px
- Smooth scroll back to top on click
- Auto-hide when at the top

### Contact Form
- Template-driven form with validation
- Success message after submission
- Currently logs to console (ready for backend integration)

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 17.x | Frontend framework |
| TypeScript | 5.2.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS |
| RxJS | 7.8.x | Reactive programming |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using Angular and Tailwind CSS





