@echo off
setlocal
cd /d "%~dp0"

echo Deploying portfolio-frontend to Vercel (production)...
echo Run this script from the frontend repo root, or copy it there first.
echo.

where vercel >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Vercel CLI not found. Install: npm i -g vercel
    pause
    exit /b 1
)

if not exist "package.json" (
    echo [ERROR] package.json not found. Run this from the portfolio-frontend repo root.
    pause
    exit /b 1
)

if not exist "vercel.json" (
    echo [ERROR] vercel.json not found. Copy it from portfolio-deploy-kit first.
    pause
    exit /b 1
)

call npm run build -- --configuration production
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

vercel --prod
pause
