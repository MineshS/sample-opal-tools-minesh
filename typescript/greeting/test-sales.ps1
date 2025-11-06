# Test the Sales Figures Generator Tool

Write-Host "Testing Sales Figures Generator Tool" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Test 1: Technology Industry
Write-Host "Test 1: Technology Industry (5 records)" -ForegroundColor Cyan
$body1 = @{
    industry = "Technology"
    count = 5
} | ConvertTo-Json

try {
    $response1 = Invoke-RestMethod -Uri "http://localhost:3000/tools/minesh-sales-figures" -Method POST -ContentType "application/json" -Body $body1
    Write-Host "Industry: $($response1.industry)" -ForegroundColor Yellow
    Write-Host "Year: $($response1.year)" -ForegroundColor Yellow
    Write-Host "Total Sales: $($response1.summary.formattedTotal)" -ForegroundColor Green
    Write-Host "Average Sale: $($response1.summary.formattedAverage)" -ForegroundColor Green
    Write-Host "Win Rate: $($response1.summary.winRate)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Sample Sales Records:" -ForegroundColor Yellow
    $response1.salesRecords | ForEach-Object {
        Write-Host "  - $($_.clientName): $($_.formattedAmount) ($($_.status)) - Contact: $($_.contactPerson)"
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Test 2: Healthcare Industry
Write-Host "Test 2: Healthcare Industry (3 records)" -ForegroundColor Cyan
$body2 = @{
    industry = "Healthcare"
    count = 3
} | ConvertTo-Json

try {
    $response2 = Invoke-RestMethod -Uri "http://localhost:3000/tools/minesh-sales-figures" -Method POST -ContentType "application/json" -Body $body2
    Write-Host "Industry: $($response2.industry)" -ForegroundColor Yellow
    Write-Host "Total Sales: $($response2.summary.formattedTotal)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Sales Records:" -ForegroundColor Yellow
    $response2.salesRecords | ForEach-Object {
        Write-Host "  - $($_.clientName): $($_.formattedAmount) - $($_.quarter) ($($_.status))"
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Test 3: Random Industry
Write-Host "Test 3: Random Industry (10 records)" -ForegroundColor Cyan
$body3 = @{
    count = 10
} | ConvertTo-Json

try {
    $response3 = Invoke-RestMethod -Uri "http://localhost:3000/tools/minesh-sales-figures" -Method POST -ContentType "application/json" -Body $body3
    Write-Host "Industry: $($response3.industry)" -ForegroundColor Yellow
    Write-Host "Year: $($response3.year)" -ForegroundColor Yellow
    Write-Host "Record Count: $($response3.recordCount)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Summary:" -ForegroundColor Yellow
    Write-Host "  Total Sales: $($response3.summary.formattedTotal)" -ForegroundColor Green
    Write-Host "  Average Sale: $($response3.summary.formattedAverage)" -ForegroundColor Green
    Write-Host "  Closed Deals: $($response3.summary.closedDeals)" -ForegroundColor Green
    Write-Host "  Closed Deals Total: $($response3.summary.formattedClosedTotal)" -ForegroundColor Green
    Write-Host "  Win Rate: $($response3.summary.winRate)" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Tests completed!" -ForegroundColor Green
