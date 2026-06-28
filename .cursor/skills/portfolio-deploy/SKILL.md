---
name: portfolio-deploy
description: Deploy portfolio frontend to Vercel and optionally backend to Oracle Cloud. Use when user asks to deploy or push to production.
---

# Portfolio Deploy

## Frontend (Vercel)

```powershell
cd portfolio-frontend
npm run build -- --configuration production
git add -A
git commit -m "your message"
git push origin main
```

Vercel auto-builds from GitHub. Verify: https://ragingscout97.in

## Admin (Vercel)

```powershell
cd portfolio-admin
npm run build
git push origin main
```

Verify: https://admin.ragingscout97.in

## Backend (Oracle Cloud) — only if Java changed

```powershell
cd portfolio-backend
mvn clean package -DskipTests
.\deploy.bat
```

Requires SSH `ubuntu-server` configured. Verify: https://portfolio-api.ragingscout97.in/api/public/health

## Pre-deploy checklist

- [ ] `ng build --configuration production` succeeds
- [ ] No `.env` or secrets in git diff
- [ ] `environment.prod.ts` apiUrl is `https://portfolio-api.ragingscout97.in/api`
