---
name: portfolio-api-contract
description: Sync TypeScript models and PortfolioDataService with Spring Boot API response shape. Use when changing models, services, or backend entities.
---

# Portfolio API Contract

## Public endpoint

`GET {apiUrl}/public/portfolio`

Response shape:

```json
{
  "profile": { "id", "name", "role", "tagline", "photoUrl", "faviconUrl", "about" },
  "educations": [{ "id", "degree", "institute", "year", "displayOrder" }],
  "skills": [{ "id", "name", "displayOrder" }],
  "currentJob": { "id", "title", "company", "since", "description" },
  "socialLinks": [{ "id", "name", "url", "icon", "displayOrder" }],
  "experiences": [{ "id", "role", "company", "fromDate", "toDate", "descriptions", "displayOrder" }],
  "projects": [{ "id", "name", "description", "techStack", "liveUrl", "githubUrl", "demoUrl", "imageUrl", "displayOrder" }]
}
```

## Field mapping (API → frontend)

| API field | Frontend field |
|-----------|----------------|
| `fromDate` | `from` |
| `toDate` | `to` |
| `descriptions` | `description` (string array) |
| `educations` (top-level) | `profile.education` (mapped in service) |

## Files to update together

1. `portfolio-backend/src/main/java/.../entity/*.java`
2. `portfolio-frontend/src/app/portfolio/models/portfolio.models.ts`
3. `portfolio-frontend/src/app/portfolio/services/portfolio-data.service.ts`

## Verify

```powershell
.\scripts\verify-api.ps1
```

Live: https://portfolio-api.ragingscout97.in/api/public/portfolio
