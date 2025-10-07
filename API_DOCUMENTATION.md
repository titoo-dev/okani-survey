# API Documentation

This document describes the REST API endpoints for the Okani Survey application.

## OpenAPI Specification

A comprehensive OpenAPI 3.0 specification is available at [`openapi.json`](./openapi.json). You can:
- Import it into **Postman**, **Insomnia**, or other API clients
- Use it with **Swagger UI** for interactive documentation
- Generate client SDKs in various languages using **OpenAPI Generator**

## Base URL

All API endpoints are relative to: `/api`

## Response Format

All endpoints return JSON responses with the following structure:

```json
{
  "success": boolean,
  "data": any,        // Response data (when success is true)
  "error": string,    // Error message (when success is false)
  "message": string,  // Optional message
  "issues": array     // Validation issues (for validation errors)
}
```

## Descriptors API

Descriptors are used to manage dropdown options and form field values.

### GET /api/descriptors

Get all descriptors or filter by type. Descriptors are sorted by type, order, and label.

**Query Parameters:**
- `type` (optional): Filter descriptors by type (e.g., "payment_mode", "user_type")

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567",
      "type": "payment_mode",
      "value": "especes",
      "label": "Espèces",
      "order": 0,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### GET /api/descriptors/[id]

Get a single descriptor by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx1234567",
    "type": "payment_mode",
    "value": "especes",
    "label": "Espèces",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### POST /api/descriptors

Create a new descriptor.

**Request Body:**
```json
{
  "type": "payment_mode",
  "value": "especes",
  "label": "Espèces",
  "order": 0
}
```

**Note:** The `order` field is optional and defaults to `0`. Lower values appear first in the UI.

**Response:**
```json
{
  "success": true,
  "data": { /* descriptor object */ },
  "message": "Descriptor created successfully"
}
```

**Error Codes:**
- `400`: Validation error
- `409`: Descriptor with same type and value already exists

### PATCH /api/descriptors/[id]

Update a descriptor.

**Request Body:**
```json
{
  "label": "Espèces (mis à jour)"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated descriptor object */ },
  "message": "Descriptor updated successfully"
}
```

**Error Codes:**
- `400`: Validation error
- `404`: Descriptor not found
- `409`: Conflict with another descriptor

### DELETE /api/descriptors/[id]

Delete a descriptor.

**Response:**
```json
{
  "success": true,
  "message": "Descriptor deleted successfully"
}
```

**Error Codes:**
- `404`: Descriptor not found

### GET /api/descriptors/types

Get all unique descriptor types.

**Response:**
```json
{
  "success": true,
  "data": ["payment_mode", "user_type", "legal_entity"],
  "count": 3
}
```

### POST /api/descriptors/bulk

Create multiple descriptors at once.

**Request Body:**
```json
{
  "descriptors": [
    {
      "type": "payment_mode",
      "value": "especes",
      "label": "Espèces"
    },
    {
      "type": "payment_mode",
      "value": "cheque",
      "label": "Chèque"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "2 descriptors created successfully",
  "count": 2
}
```

**Error Codes:**
- `400`: Validation error or duplicates in request
- `409`: Some descriptors already exist

### DELETE /api/descriptors/bulk

Delete all descriptors of a specific type.

**Query Parameters:**
- `type` (required): The type of descriptors to delete

**Response:**
```json
{
  "success": true,
  "message": "5 descriptors deleted successfully",
  "count": 5
}
```

## Surveys API

### GET /api/surveys

Get all surveys with optional filtering and pagination.

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page
- `email` (optional): Filter by email (case-insensitive partial match)
- `stageReached` (optional): Filter by stage reached
- `dossierId` (optional): Filter by dossier ID (case-insensitive partial match)
- `userType` (optional): Filter by user type

**Response:**
```json
{
  "success": true,
  "data": [ /* array of survey objects */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### GET /api/surveys/[id]

Get a single survey by ID.

**Response:**
```json
{
  "success": true,
  "data": { /* survey object with all fields */ }
}
```

**Error Codes:**
- `404`: Survey not found

### POST /api/surveys

Create a new survey.

**Request Body:**
Full survey data object following the `surveyFormSchema` validation.

**Response:**
```json
{
  "success": true,
  "data": { /* created survey object */ },
  "message": "Survey created successfully"
}
```

**Error Codes:**
- `400`: Validation error (includes detailed issues)

### PATCH /api/surveys/[id]

Update a survey.

**Request Body:**
Partial survey data object.

**Response:**
```json
{
  "success": true,
  "data": { /* updated survey object */ },
  "message": "Survey updated successfully"
}
```

**Error Codes:**
- `400`: Validation error
- `404`: Survey not found

### DELETE /api/surveys/[id]

Delete a survey.

**Response:**
```json
{
  "success": true,
  "message": "Survey deleted successfully"
}
```

**Error Codes:**
- `404`: Survey not found

### GET /api/surveys/stats

Get survey statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "recent30Days": 45,
    "byStage": [
      { "stage": "depot", "count": 30 },
      { "stage": "enquete", "count": 25 }
    ],
    "byUserType": [
      { "userType": "usager", "count": 100 },
      { "userType": "partenaire", "count": 50 }
    ],
    "byLegalEntity": [
      { "legalEntity": "physique", "count": 120 },
      { "legalEntity": "morale", "count": 30 }
    ],
    "governanceMetrics": {
      "withOppositions": 15,
      "withUnofficialPayments": 8,
      "withFavoritism": 5
    }
  }
}
```

### GET /api/surveys/export

Export surveys as JSON or CSV.

**Query Parameters:**
- `format` (optional, default: "json"): Export format ("json" or "csv")
- `stageReached` (optional): Filter by stage reached
- `userType` (optional): Filter by user type

**Response (JSON format):**
```json
{
  "success": true,
  "data": [ /* array of all surveys */ ],
  "count": 150,
  "exportedAt": "2025-01-01T00:00:00.000Z"
}
```

**Response (CSV format):**
Returns CSV file with headers and data rows.

**Error Codes:**
- `404`: No data to export (CSV format only)

## Error Handling

All endpoints follow consistent error response formats:

### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation error",
  "issues": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "path": ["type"],
      "message": "Type is required"
    }
  ]
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### Conflict Error (409)
```json
{
  "success": false,
  "error": "Resource already exists",
  "message": "Detailed conflict message"
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

## Client Library

A TypeScript client library is available at `lib/api-client.ts` for easy integration:

```typescript
import { descriptorsApi, surveysApi } from "@/lib/api-client";

// Get all descriptors
const result = await descriptorsApi.getAll();

// Create a survey
const survey = await surveysApi.create(formData);

// Get survey statistics
const stats = await surveysApi.getStats();
```

## Data Types

### Survey Object

Surveys contain comprehensive data about the user's experience. Key fields include:

- `id`: Unique identifier
- `email`: User email
- `stageReached`: Current stage in the process
- `dossierId`: Dossier ID
- Profile fields: `depositCity`, `regularizationCity`, `residenceCity`, `userType`, `legalEntity`, `nationality`
- Stage-specific fields for each process stage (depot, enquete, etat-lieux, affichage, bornage, evaluation, decision)
- Governance metrics: `hasUnofficialPayment`, `hasFavoritism`, `trustTransparency`
- Dispute information (if applicable)
- Global evaluation: `totalCost`, `globalSatisfaction`, `generalSuggestions`

**Note:** Array fields (satisfaction ratings, trust transparency) are stored as JSON strings in the database and automatically parsed when retrieved via API.

## Authentication

Currently, the API does not require authentication. In production, you should implement proper authentication and authorization.

