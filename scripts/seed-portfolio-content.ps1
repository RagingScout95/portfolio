# Seed skills, social links, and experience via admin API
# Usage: $env:ADMIN_PASSWORD = "your-password"; .\scripts\seed-portfolio-content.ps1

param(
    [string]$ApiUrl = "https://portfolio-api.ragingscout97.in/api",
    [string]$Username = "admin",
    [string]$Password = $env:ADMIN_PASSWORD
)

if (-not $Password) {
    Write-Host "Set ADMIN_PASSWORD environment variable first." -ForegroundColor Red
    Write-Host '  $env:ADMIN_PASSWORD = "your-admin-password"; .\scripts\seed-portfolio-content.ps1'
    exit 1
}

$loginBody = @{ username = $Username; password = $Password } | ConvertTo-Json
try {
    $login = Invoke-RestMethod -Uri "$ApiUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $login.token
    Write-Host "Logged in as $Username" -ForegroundColor Green
} catch {
    Write-Host "Login failed. Check ADMIN_PASSWORD." -ForegroundColor Red
    exit 1
}

$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

function Post-Admin($path, $body) {
    $json = $body | ConvertTo-Json -Depth 5
    Invoke-RestMethod -Uri "$ApiUrl/admin/$path" -Method Post -Headers $headers -Body $json
}

function Put-Admin($path, $body) {
    $json = $body | ConvertTo-Json -Depth 5
    Invoke-RestMethod -Uri "$ApiUrl/admin/$path" -Method Put -Headers $headers -Body $json
}

# Update current job
Write-Host "Updating current job..." -ForegroundColor Cyan
Put-Admin "current-job" @{
    title = "Software Developer"
    company = "Amdocs"
    since = "2023"
    description = "Building scalable backend systems and production-ready software in enterprise environments."
} | Out-Null

# Skills
$skills = @(
    "Java", "TypeScript", "Angular", "Spring Boot", "PostgreSQL",
    "Python", "Kotlin", "AI/GenAI", "REST APIs", "Docker"
)
Write-Host "Creating skills..." -ForegroundColor Cyan
$i = 0
foreach ($name in $skills) {
    try {
        Post-Admin "skills" @{ name = $name; displayOrder = $i } | Out-Null
        Write-Host "  + $name"
    } catch {
        Write-Host "  skip $name (may exist)" -ForegroundColor Yellow
    }
    $i++
}

# Social links (from portfolio structured data)
$socials = @(
    @{ name = "GitHub"; url = "https://github.com/RagingScout97"; icon = "GitHub"; displayOrder = 0 },
    @{ name = "LinkedIn"; url = "https://www.linkedin.com/in/prakhar-singh-rajput-7684b887/"; icon = "LinkedIn"; displayOrder = 1 },
    @{ name = "LeetCode"; url = "https://leetcode.com/u/RagingScout97/"; icon = "LeetCode"; displayOrder = 2 },
    @{ name = "CodeChef"; url = "https://www.codechef.com/users/ragingscout95"; icon = "CodeChef"; displayOrder = 3 },
    @{ name = "YouTube"; url = "https://www.youtube.com/@ragingscout97"; icon = "YouTube"; displayOrder = 4 },
    @{ name = "Instagram"; url = "https://www.instagram.com/prakhar_singh_rajput_rs97/"; icon = "Instagram"; displayOrder = 5 }
)
Write-Host "Creating social links..." -ForegroundColor Cyan
foreach ($s in $socials) {
    try {
        Post-Admin "social-links" $s | Out-Null
        Write-Host "  + $($s.name)"
    } catch {
        Write-Host "  skip $($s.name)" -ForegroundColor Yellow
    }
}

# Experience
Write-Host "Creating experience..." -ForegroundColor Cyan
try {
    Post-Admin "experiences" @{
        role = "Software Developer"
        company = "Amdocs"
        fromDate = "2023"
        toDate = "Present"
        descriptions = @(
            "Develop reliable backend systems for production enterprise software.",
            "Deliver high-quality solutions with focus on performance and scalability.",
            "Work with Java, full-stack technologies, and AI/GenAI integrations."
        )
        displayOrder = 0
    } | Out-Null
    Write-Host "  + Amdocs experience"
} catch {
    Write-Host "  skip experience (may exist)" -ForegroundColor Yellow
}

Write-Host "`nSeed complete. Verify:" -ForegroundColor Green
Write-Host "  .\scripts\verify-api.ps1"
