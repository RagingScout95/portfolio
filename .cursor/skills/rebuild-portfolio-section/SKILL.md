---
name: rebuild-portfolio-section
description: Step-by-step checklist to rebuild one portfolio section (hero, about, skills, etc.) with API contract preserved. Use when user asks to rebuild or redesign a portfolio section.
---

# Rebuild Portfolio Section

## Before coding

1. Read `portfolio-frontend/src/app/portfolio/models/portfolio.models.ts`
2. Read `portfolio-frontend/src/app/portfolio/services/portfolio-data.service.ts`
3. Read `portfolio-frontend/src/app/portfolio/constants/theme.constants.ts`
4. Identify target component in `portfolio-frontend/src/app/portfolio/components/`

## Section checklist

### Hero (`components/hero/`)
- [ ] Animated gradient mesh background (CSS, no canvas)
- [ ] Name, role, tagline from `@Input()`
- [ ] Profile photo with glow ring
- [ ] CTA buttons scroll to `#projects` and `#contact`
- [ ] Social icons from `@Input() socialLinks`

### About (`components/about/`)
- [ ] Bio text from `profile.about`
- [ ] Timeline: education + current job
- [ ] Glass card styling

### Skills (`components/skills/`)
- [ ] Skill chips with stagger animation
- [ ] Empty state when `skills.length === 0`

### Experience (`components/experience/`)
- [ ] Vertical timeline from `getExperiences()` data
- [ ] Empty state when no experiences

### Projects (`components/projects/`, `project-card/`)
- [ ] Grid responsive 1/2/3 columns
- [ ] Tech badges, GitHub/live links
- [ ] Sort by `displayOrder` if present

### Contact (`components/contact/`)
- [ ] Social links prominent
- [ ] Form is client-side only (no backend endpoint)

### Shell (`portfolio-page/`, `navbar/`)
- [ ] Loading spinner while API loads
- [ ] Section IDs match navbar anchors
- [ ] `appRevealOnScroll` on sections below hero

## After coding

```powershell
cd portfolio-frontend
npm run build
```

Verify at http://localhost:4200 — data loads from API.

## Prompt template

```text
@rebuild-portfolio-section
Rebuild [SECTION]: [design notes]
Keep PortfolioDataService. Premium dark glassmorphism.
```
