# API Quick Reference Guide

Quick reference for the Okani Survey API endpoints.

## 🔗 Base URL

- **Development:** `http://localhost:3000/api`
- **Production:** `https://okani-survey.vercel.app/api`

## 📚 Full Documentation

- **OpenAPI Spec:** [`openapi.json`](./openapi.json) - Import into Postman/Insomnia
- **Detailed Docs:** [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md)

---

## 🏷️ Descriptors API

### Get All Descriptors
```http
GET /api/descriptors?type=payment_mode
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123...",
      "type": "payment_mode",
      "value": "especes",
      "label": "Espèces",
      "order": 0
    }
  ],
  "count": 1
}
```

### Create Descriptor
```http
POST /api/descriptors
Content-Type: application/json

{
  "type": "payment_mode",
  "value": "especes",
  "label": "Espèces",
  "order": 0
}
```

### Get Descriptor Types
```http
GET /api/descriptors/types
```

**Response:**
```json
{
  "success": true,
  "data": ["payment_mode", "user_type", "legal_entity"],
  "count": 3
}
```

---

## 📋 Surveys API

### Get Surveys (with pagination)
```http
GET /api/surveys?page=1&limit=10&stageReached=enquete
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `email` - Filter by email
- `stageReached` - Filter by stage: `depot`, `enquete`, `etat-lieux`, `affichage`, `bornage`, `evaluation`, `decision`
- `dossierId` - Filter by dossier ID
- `userType` - Filter by user type

**Response:**
```json
{
  "success": true,
  "data": [ /* array of surveys */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### Check if Email Already Submitted
```http
POST /api/surveys/check-email
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Alternative GET method:**
```http
GET /api/surveys/check-email?email=user@example.com
```

**Response:**
```json
{
  "success": true,
  "hasSubmitted": true,
  "survey": {
    "id": "clx123...",
    "dossierId": "DOSS-2025-001",
    "createdAt": "2025-10-07T10:30:00.000Z",
    "stageReached": "enquete"
  }
}
```

**If email hasn't submitted:**
```json
{
  "success": true,
  "hasSubmitted": false,
  "survey": null
}
```

### Create Survey
```http
POST /api/surveys
Content-Type: application/json

{
  "email": "user@example.com",
  "stageReached": "enquete",
  "depositCity": "Libreville",
  "regularizationCity": "Libreville",
  "residenceCity": "Libreville",
  "userType": "usager",
  "legalEntity": "physique",
  "nationality": "Gabonaise",
  "totalCost": "500000",
  "globalSatisfaction": [4, 5, 4],
  "hasUnofficialPayment": false,
  "hasFavoritism": false,
  "trustTransparency": [4, 4, 5],
  "hadOpposition": false
}
```

---

## 🔑 Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation error",
  "issues": [
    {
      "code": "too_small",
      "path": ["email"],
      "message": "Email invalide"
    }
  ]
}
```

### Conflict Error (409)
```json
{
  "success": false,
  "error": "Descriptor already exists",
  "message": "A descriptor with type \"payment_mode\" and value \"especes\" already exists"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

---

## 📊 Survey Stages

Valid values for `stageReached`:

1. `depot` - Dépôt de dossier
2. `enquete` - Enquête foncière
3. `etat-lieux` - État des lieux
4. `affichage` - Avis d'affichage
5. `bornage` - PV et plan de bornage
6. `evaluation` - Rapport d'évaluation
7. `decision` - Décision finale

---

## 💡 Tips

### Automatic DossierId Generation
The `dossierId` is automatically generated when creating a survey:
- **Format:** `DOSS-YYYY-XXX` (e.g., `DOSS-2025-001`, `DOSS-2025-002`)
- **Year-based:** Counter resets each year
- **Sequential:** Increments for each survey created in that year
- **Optional in POST:** Don't include it in your request body; the system will generate it

### Array Fields in Surveys
Array fields like `globalSatisfaction`, `trustTransparency`, and satisfaction ratings are:
- **Sent as arrays** in POST requests: `[4, 5, 4]`
- **Stored as JSON strings** in the database
- **Returned as arrays** in GET responses (automatically parsed)

### Descriptor Ordering
- Descriptors are sorted by: `type` (asc) → `order` (asc) → `label` (asc)
- Lower `order` values appear first in UI
- `order` defaults to `0` if not specified

### Pagination
- Default: 10 items per page
- Maximum: 100 items per page
- Use `page` and `limit` query parameters

---

## 🛠️ TypeScript Client

Use the built-in client library:

```typescript
import { descriptorsApi, surveysApi } from "@/lib/api-client";

// Get descriptors
const descriptors = await descriptorsApi.getAll();
const paymentModes = await descriptorsApi.getByType("payment_mode");

// Check if email already submitted
const emailCheck = await surveysApi.checkEmail("user@example.com");
if (emailCheck.hasSubmitted) {
  // Redirect to already submitted page
}

// Create survey
const result = await surveysApi.create(formData);

// Get surveys with filters
const surveys = await surveysApi.getAll({
  page: 1,
  limit: 20,
  stageReached: "enquete"
});
```

---

## 🧪 Testing with cURL

```bash
# Get descriptors
curl http://localhost:3000/api/descriptors?type=payment_mode

# Create descriptor
curl -X POST http://localhost:3000/api/descriptors \
  -H "Content-Type: application/json" \
  -d '{"type":"payment_mode","value":"especes","label":"Espèces","order":0}'

# Check if email already submitted (POST)
curl -X POST http://localhost:3000/api/surveys/check-email \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# Check if email already submitted (GET)
curl "http://localhost:3000/api/surveys/check-email?email=user@example.com"

# Get surveys with pagination
curl "http://localhost:3000/api/surveys?page=1&limit=10"

# Create survey (simplified example)
curl -X POST http://localhost:3000/api/surveys \
  -H "Content-Type: application/json" \
  -d @survey-data.json
```

---

## 📞 Support

For questions or issues, contact: support@okanisurvey.com

