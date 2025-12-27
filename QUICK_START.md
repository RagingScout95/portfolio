# 🚀 Quick Start Guide

Get your portfolio running in 3 simple steps!

## Step 1: Install Dependencies

```bash
npm install
```

This will install Angular 17, Tailwind CSS v4, and all required dependencies.

## Step 2: Start the Development Server

```bash
npm start
```

The portfolio will open at `http://localhost:4200`

## Step 3: Customize Your Data

Open `src/app/portfolio/services/portfolio-data.service.ts` and update:

### Your Profile

```typescript
getProfile(): Profile {
  return {
    name: 'Your Name',              // ← Change this
    role: 'Your Job Title',          // ← Change this
    tagline: 'Your tagline',         // ← Change this
    photoUrl: 'your-photo-url',      // ← Add your photo
    about: 'Your bio...',            // ← Write about yourself
    // ... update education, skills, currentJob, socialLinks
  };
}
```

### Your Experience

```typescript
getExperiences(): Experience[] {
  return [
    {
      role: 'Your Role',
      company: 'Company Name',
      from: 'Jan 2020',
      to: 'Present',
      description: ['Bullet 1', 'Bullet 2', '...']
    },
    // Add more experiences...
  ];
}
```

### Your Projects

```typescript
getProjects(): Project[] {
  return [
    {
      name: 'Project Name',
      description: 'What it does',
      techStack: ['Angular', 'Node.js', '...'],
      liveUrl: 'https://...',
      githubUrl: 'https://github.com/...'
    },
    // Add more projects...
  ];
}
```

## What You Get

✅ **Modern Portfolio Website** with:
- Smooth scrolling navigation
- Animated sections
- Responsive design
- Contact form
- Back-to-top rocket button 🚀

## Next Steps

1. **Replace placeholder photo**: Add your photo to `src/assets/images/` and update the `photoUrl`
2. **Customize colors**: Edit Tailwind classes in component templates
3. **Add your content**: Update all mock data with your real information
4. **Connect to backend**: When ready, replace mock data with HTTP calls

## Project Structure

```
src/app/portfolio/
├── portfolio-page/          ← Main container
├── components/              ← All UI components
│   ├── navbar/
│   ├── hero/
│   ├── about/
│   ├── experience/
│   ├── projects/
│   ├── contact/
│   └── ui/                  ← Reusable components
├── directives/              ← Scroll animations
├── services/                ← Data service ← EDIT THIS!
└── models/                  ← TypeScript types
```

## Need Help?

Check the full [README.md](README.md) for detailed documentation.

---

**That's it! You're ready to build your portfolio! 🎉**





