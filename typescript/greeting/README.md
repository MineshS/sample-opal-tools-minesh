# Sample TypeScript Tools Service

This is a sample tools service for Opal using the TypeScript SDK. It provides eight powerful tools:

1. **Greeting Tool**: Greets a person in a random language (English, Spanish, or French)
2. **Today's Date Tool**: Returns today's date in the specified format
3. **Random Generator Tool**: Generates random numbers, UUIDs, or passwords
4. **String Utility Tool**: Performs various string operations (uppercase, lowercase, reverse, slug, etc.)
5. **Math Calculator Tool**: Performs mathematical operations (add, subtract, multiply, divide, etc.)
6. **Unit Converter Tool**: Converts between units (temperature, distance, weight)
7. **Text Analyzer Tool**: Analyzes text and provides statistics
8. **Sales Figures Generator**: Generates realistic fake sales data with industries, clients, and deal amounts

## Running the Service

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Or build and run
npm run build
npm start
```

### Docker

```bash
# Build the Docker image
docker build -t opal-sample-tools-typescript .

# Run the container
docker run -p 3000:3000 opal-sample-tools-typescript
```

## Testing the Service

Once the service is running, you can access:

- Discovery endpoint: http://localhost:3000/discovery
- Tools endpoints:
  - Greeting tool: http://localhost:3000/tools/minesh-greeting
  - Today's date tool: http://localhost:3000/tools/minesh-todays-date
  - Random generator: http://localhost:3000/tools/minesh-random-generator
  - String utility: http://localhost:3000/tools/minesh-string-utility
  - Math calculator: http://localhost:3000/tools/minesh-math-calculator
  - Unit converter: http://localhost:3000/tools/minesh-unit-converter
  - Text analyzer: http://localhost:3000/tools/minesh-text-analyzer
  - Sales figures: http://localhost:3000/tools/minesh-sales-figures

## Example Requests

### Greeting Tool

```bash
curl -X POST http://localhost:3000/tools/minesh-greeting \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
```

Response:
```json
{
  "greeting": "Hello, John! How are you?",
  "language": "english"
}
```

### Today's Date Tool

```bash
curl -X POST http://localhost:3000/tools/minesh-todays-date \
  -H "Content-Type: application/json" \
  -d '{"format":"%B %d, %Y"}'
```

Response:
```json
{
  "date": "March 18, 2023",
  "format": "%B %d, %Y",
  "timestamp": 1679145600.0
}
```

### Random Generator Tool

```bash
# Generate a random number
curl -X POST http://localhost:3000/tools/minesh-random-generator \
  -H "Content-Type: application/json" \
  -d '{"type":"number","min":1,"max":100}'

# Generate a UUID
curl -X POST http://localhost:3000/tools/minesh-random-generator \
  -H "Content-Type: application/json" \
  -d '{"type":"uuid"}'

# Generate a password
curl -X POST http://localhost:3000/tools/minesh-random-generator \
  -H "Content-Type: application/json" \
  -d '{"type":"password","length":16}'
```

### String Utility Tool

```bash
# Convert to slug
curl -X POST http://localhost:3000/tools/minesh-string-utility \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World! This is a Test","operation":"slug"}'

# Convert to uppercase
curl -X POST http://localhost:3000/tools/minesh-string-utility \
  -H "Content-Type: application/json" \
  -d '{"text":"hello world","operation":"uppercase"}'
```

Response:
```json
{
  "original": "Hello World! This is a Test",
  "operation": "slug",
  "result": "hello-world-this-is-a-test"
}
```

### Math Calculator Tool

```bash
# Add two numbers
curl -X POST http://localhost:3000/tools/minesh-math-calculator \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","a":15,"b":27}'

# Calculate square root
curl -X POST http://localhost:3000/tools/minesh-math-calculator \
  -H "Content-Type: application/json" \
  -d '{"operation":"sqrt","a":144}'

# Calculate percentage
curl -X POST http://localhost:3000/tools/minesh-math-calculator \
  -H "Content-Type: application/json" \
  -d '{"operation":"percentage","a":20,"b":150}'
```

Response:
```json
{
  "operation": "add",
  "input": { "a": 15, "b": 27 },
  "result": 42
}
```

### Unit Converter Tool

```bash
# Convert temperature
curl -X POST http://localhost:3000/tools/minesh-unit-converter \
  -H "Content-Type: application/json" \
  -d '{"value":100,"from":"celsius","to":"fahrenheit","category":"temperature"}'

# Convert distance
curl -X POST http://localhost:3000/tools/minesh-unit-converter \
  -H "Content-Type: application/json" \
  -d '{"value":5,"from":"kilometer","to":"mile","category":"distance"}'

# Convert weight
curl -X POST http://localhost:3000/tools/minesh-unit-converter \
  -H "Content-Type: application/json" \
  -d '{"value":150,"from":"pound","to":"kilogram","category":"weight"}'
```

Response:
```json
{
  "value": 100,
  "from": "celsius",
  "to": "fahrenheit",
  "category": "temperature",
  "result": 212
}
```

### Text Analyzer Tool

```bash
curl -X POST http://localhost:3000/tools/minesh-text-analyzer \
  -H "Content-Type: application/json" \
  -d '{"text":"The quick brown fox jumps over the lazy dog. This is a test sentence."}'
```

Response:
```json
{
  "characters": 71,
  "charactersNoSpaces": 59,
  "words": 14,
  "sentences": 2,
  "paragraphs": 1,
  "averageWordLength": 4.21,
  "averageSentenceLength": 7,
  "mostCommonWords": [
    { "word": "the", "count": 2 },
    { "word": "quick", "count": 1 }
  ],
  "readingTimeMinutes": 1
}
```

### Sales Figures Generator Tool

```bash
# Generate sales data for Technology industry
curl -X POST http://localhost:3000/tools/minesh-sales-figures \
  -H "Content-Type: application/json" \
  -d '{"industry":"Technology","count":5,"year":2025}'

# Generate random industry sales data
curl -X POST http://localhost:3000/tools/minesh-sales-figures \
  -H "Content-Type: application/json" \
  -d '{"count":15}'

# Generate Healthcare sales data
curl -X POST http://localhost:3000/tools/minesh-sales-figures \
  -H "Content-Type: application/json" \
  -d '{"industry":"Healthcare","count":8}'
```

Response:
```json
{
  "industry": "Technology",
  "year": 2025,
  "recordCount": 5,
  "salesRecords": [
    {
      "clientName": "TechCorp",
      "industry": "Technology",
      "contactPerson": "Sarah Johnson",
      "salesAmount": 185000,
      "formattedAmount": "$185,000",
      "quarter": "Q3 2025",
      "status": "Closed Won",
      "dealProbability": 100
    },
    {
      "clientName": "DataSystems",
      "industry": "Technology",
      "contactPerson": "Michael Brown",
      "salesAmount": 142000,
      "formattedAmount": "$142,000",
      "quarter": "Q2 2025",
      "status": "In Progress",
      "dealProbability": 75
    }
  ],
  "summary": {
    "totalSales": 725000,
    "formattedTotal": "$725,000",
    "averageSale": 145000,
    "formattedAverage": "$145,000",
    "closedDeals": 3,
    "closedDealsTotal": 450000,
    "formattedClosedTotal": "$450,000",
    "winRate": "60%"
  }
}
```

**Available Industries:**
- Technology
- Healthcare
- Finance
- Retail
- Manufacturing
- Education
- Real Estate
- Energy
