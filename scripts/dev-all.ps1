# Start portfolio dev stack (backend + frontend + admin)
$root = Split-Path -Parent $PSScriptRoot

Write-Host "Starting backend on :8080..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\portfolio-backend'; mvn spring-boot:run '-Dspring-boot.run.arguments=--spring.profiles.active=dev'"

Start-Sleep -Seconds 3

Write-Host "Starting frontend on :4200..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\portfolio-frontend'; npm start"

Write-Host "Starting admin on :4201..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\portfolio-admin'; npx ng serve --port 4201"

Write-Host "`nDev URLs:" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:4200"
Write-Host "  Admin:    http://localhost:4201"
Write-Host "  API:      http://localhost:8080/api"
