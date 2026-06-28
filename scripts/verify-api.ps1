param(
    [string]$ApiUrl = "https://portfolio-api.ragingscout97.in/api"
)

Write-Host "Checking health..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "$ApiUrl/public/health" -Method Get
    Write-Host "  Status: $($health.status) v$($health.version)" -ForegroundColor Green
} catch {
    Write-Host "  Health check FAILED: $_" -ForegroundColor Red
    exit 1
}

Write-Host "Checking portfolio data..." -ForegroundColor Cyan
try {
    $data = Invoke-RestMethod -Uri "$ApiUrl/public/portfolio" -Method Get
    Write-Host "  Profile: $($data.profile.name)" -ForegroundColor Green
    Write-Host "  Projects: $($data.projects.Count)" -ForegroundColor Green
    Write-Host "  Skills: $($data.skills.Count)" -ForegroundColor Green
    Write-Host "  Experiences: $($data.experiences.Count)" -ForegroundColor Green
    Write-Host "  Social links: $($data.socialLinks.Count)" -ForegroundColor Green
} catch {
    Write-Host "  Portfolio check FAILED: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`nAPI OK" -ForegroundColor Green
