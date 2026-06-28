# Portfolio Monorepo — Agent Instructions

## Workspace layout

| Folder | Repo | Purpose |
|--------|------|---------|
| `portfolio-frontend/` | [RagingScout97/portfolio](https://github.com/RagingScout97/portfolio) | Public portfolio site (Angular 19) |
| `portfolio-admin/` | [RagingScout97/Portfolio-admin-dashboard](https://github.com/RagingScout97/Portfolio-admin-dashboard) | Admin CMS (Angular) |
| `portfolio-backend/` | [RagingScout97/Portfolio-backend](https://github.com/RagingScout97/Portfolio-backend) | Spring Boot API + PostgreSQL |
| `portfolio-deploy-kit/` | Local only (private) | Deploy configs, recovered secrets |

## Live URLs

| Service | URL |
|---------|-----|
| Portfolio | https://ragingscout97.in |
| Admin | https://admin.ragingscout97.in |
| API | https://portfolio-api.ragingscout97.in/api |
| Public data | `{apiUrl}/public/portfolio` |
| Health | `{apiUrl}/public/health` |

## Local dev ports

| App | Port | Command |
|-----|------|---------|
| Frontend | 4200 | `cd portfolio-frontend && npm start` |
| Admin | 4201 | `cd portfolio-admin && ng serve --port 4201` |
| Backend (dev) | 8080 | `cd portfolio-backend && mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=dev` |

Run all three: `.\scripts\dev-all.ps1`

## Non-negotiables

1. Keep `PortfolioDataService` and `/api/public/portfolio` contract — content is admin-managed.
2. Use Angular 19 **standalone** components; Tailwind CSS for styling.
3. Never commit `.env`, `recovered/`, or properties files with real secrets.
4. One portfolio **section per agent session**; run `ng build` after each section.
5. Respect `prefers-reduced-motion: reduce` for all animations.

## Design direction (default)

**Premium dark portfolio:** slate-950 base, glassmorphism cards, indigo/violet accents, smooth scroll reveals, subtle gradient mesh backgrounds. Typography: Inter + optional display font for headings.

## Section rebuild prompt template

```text
Rebuild the [SECTION] for my portfolio.
Design: premium dark, glassmorphism, smooth animations
Animations: scroll reveal, hover lift, staggered children
Keep: PortfolioDataService API, responsive mobile-first, admin-editable fields
Do not: change backend, change production apiUrl, remove existing sections
```

## Frontend file map

```
portfolio-frontend/src/app/portfolio/
├── portfolio-page/          # Main layout shell
├── components/              # hero, about, skills, experience, projects, contact, navbar, ui/
├── services/portfolio-data.service.ts
├── models/portfolio.models.ts
├── directives/reveal-on-scroll.directive.ts
└── constants/theme.constants.ts
```

## Backend (only when API changes)

- Controllers: `/api/public/*` (read), `/api/admin/*` (JWT), `/api/auth/*`
- Entities: Profile, Project, Experience, Skill, Education, SocialLink, CurrentJob
- Deploy: `portfolio-backend/deploy.bat` → Oracle Cloud via SSH `ubuntu-server`

## Deploy

- **Frontend/Admin:** push to GitHub → Vercel auto-deploys (`vercel.json`)
- **Backend:** `deploy.bat` only when Java code changes

Invoke `@portfolio-deploy` skill for step-by-step deploy checklist.
