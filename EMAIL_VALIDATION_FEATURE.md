# Email Validation Feature

## Overview

This feature prevents duplicate survey submissions by checking if an email address has already been used to submit a survey. When a user attempts to start a survey with an email that has already submitted, they are redirected to an informative page explaining the situation.

## Implementation

### 1. API Endpoint

**Endpoint:** `/api/surveys/check-email`

**Methods:** `POST` and `GET`

**Location:** `app/api/surveys/check-email/route.ts`

#### POST Request
```typescript
POST /api/surveys/check-email
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### GET Request
```typescript
GET /api/surveys/check-email?email=user@example.com
```

#### Response
```typescript
{
  "success": true,
  "hasSubmitted": boolean,
  "survey": {
    "id": string,
    "dossierId": string,
    "createdAt": string,
    "stageReached": string
  } | null
}
```

### 2. Server Action

**Function:** `checkEmailSubmission(email: string)`

**Location:** `app/actions/stage-selection.ts`

This server action is used by the stage selection form to validate emails server-side before allowing users to proceed to the survey.

```typescript
const emailCheck = await checkEmailSubmission(validatedData.email);
if (emailCheck.hasSubmitted) {
  return {
    success: false,
    errors: ["Cette adresse email a déjà soumis une enquête."],
    alreadySubmitted: true,
  };
}
```

### 3. Stage Selection Form Update

**Location:** `app/stage-selection/_components/stage-selection-form.tsx`

The form now checks for the `alreadySubmitted` flag and redirects users accordingly:

```typescript
useEffect(() => {
  if (state.success && state.data) {
    // Store in sessionStorage and navigate to survey page
    sessionStorage.setItem("stageReached", state.data.stageReached);
    sessionStorage.setItem("userEmail", state.data.email);
    startTransition(() => {
      router.push("/survey");
    });
  } else if (!state.success && state.alreadySubmitted) {
    // Redirect to already submitted page
    startTransition(() => {
      router.push("/stage-selection/already-submitted");
    });
  } else if (!state.success && state.errors && state.errors.length > 0) {
    // Show error dialog
    setValidationErrors(state.errors);
    setShowErrorDialog(true);
  }
}, [state, router]);
```

### 4. Already Submitted Page

**Location:** `app/stage-selection/already-submitted/page.tsx`

A dedicated page that informs users their email has already been used to submit a survey. It includes:

- Clear messaging about why they cannot proceed
- WhatsApp support contact information
- Option to return to the home page
- Visually distinctive design with orange accents

### 5. API Client Integration

**Location:** `lib/api-client.ts`

Added `checkEmail` method to the `surveysApi` client:

```typescript
import { surveysApi } from "@/lib/api-client";

const emailCheck = await surveysApi.checkEmail("user@example.com");
if (emailCheck.data?.hasSubmitted) {
  // Handle already submitted case
}
```

## Flow Diagram

```
User enters email on stage selection page
           ↓
    validateStageSelection (server action)
           ↓
    checkEmailSubmission (database query)
           ↓
    ┌──────────────────┐
    │  Email exists?   │
    └──────────────────┘
         ↙        ↘
       Yes         No
        ↓           ↓
  Redirect to    Continue to
  "Already       survey page
  Submitted"
  page
```

## Features

### Email Checking
- **Case-insensitive:** Checks are performed in a case-insensitive manner
- **Database query:** Uses Prisma to find the most recent survey with the given email
- **Efficient:** Returns only necessary fields (id, dossierId, createdAt, stageReached)

### Security
- **Server-side validation:** All checks happen server-side to prevent bypassing
- **No sensitive data exposure:** Only returns basic survey information
- **Email validation:** Uses Zod schema to validate email format

### User Experience
- **Clear messaging:** Users are informed why they cannot proceed
- **Support contact:** WhatsApp numbers are provided for assistance
- **Graceful handling:** No harsh errors, just informative redirects

## Database Query

The feature uses this Prisma query to check for existing submissions:

```typescript
const survey = await prisma.survey.findFirst({
  where: {
    email: {
      equals: validatedData.email,
      mode: "insensitive",
    },
  },
  orderBy: {
    createdAt: "desc",
  },
  select: {
    id: true,
    dossierId: true,
    createdAt: true,
    stageReached: true,
  },
});
```

## Error Handling

### API Endpoint Errors
- **400 Bad Request:** Invalid email format
- **500 Internal Server Error:** Database or system errors

### Server Action Errors
- Returns error state with `alreadySubmitted: true` flag
- Form handles this by redirecting to the appropriate page

## Testing

### Using cURL

**POST method:**
```bash
curl -X POST http://localhost:3000/api/surveys/check-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**GET method:**
```bash
curl "http://localhost:3000/api/surveys/check-email?email=test@example.com"
```

### Using TypeScript Client
```typescript
import { surveysApi } from "@/lib/api-client";

const result = await surveysApi.checkEmail("test@example.com");
console.log(result.data?.hasSubmitted); // true or false
console.log(result.data?.survey); // survey object or null
```

### Manual Testing Flow
1. Navigate to `/stage-selection`
2. Select "Yes" for having filed at ANUTTC
3. Enter an email that has already submitted a survey
4. Select a stage and click "Continue"
5. Verify redirection to `/stage-selection/already-submitted`

## Future Enhancements

Possible improvements for this feature:

1. **Time-based restrictions:** Allow resubmission after a certain period (e.g., 1 year)
2. **Email verification:** Send a verification code to confirm email ownership
3. **Update functionality:** Allow users to update their existing submission
4. **Analytics:** Track how many users attempt to resubmit
5. **Admin override:** Allow admins to manually reset email submission status

## Related Files

- `app/api/surveys/check-email/route.ts` - API endpoint
- `app/actions/stage-selection.ts` - Server action
- `app/stage-selection/_components/stage-selection-form.tsx` - Form component
- `app/stage-selection/already-submitted/page.tsx` - Already submitted page
- `app/stage-selection/already-submitted/loading.tsx` - Loading state
- `lib/api-client.ts` - API client library
- `API_QUICK_REFERENCE.md` - API documentation
- `prisma/schema.prisma` - Database schema

## Contact & Support

For questions about this feature:
- WhatsApp: +241 76 00 00 00
- WhatsApp: +241 66 00 00 00
- Email: support@okanisurvey.com

## Version History

- **v1.0.0** (2025-10-07): Initial implementation
  - Email validation on stage selection
  - API endpoint for external checking
  - Already submitted page
  - Server action integration
  - API client support

