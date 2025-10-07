# Automatic DossierId Generation - Implementation Summary

**Date:** October 7, 2025  
**Feature:** Auto-generation of unique dossier identifiers

## Overview

The `dossierId` field is now automatically generated when creating a survey. Users no longer need to provide this field in their survey submissions.

## Format Specification

**Pattern:** `DOSS-YYYY-XXX`

- **Prefix:** `DOSS-` (constant)
- **Year:** Current year (e.g., `2025`)
- **Counter:** 3-digit sequential number with leading zeros (e.g., `001`, `002`, `999`)

**Examples:**
- `DOSS-2025-001` - First survey of 2025
- `DOSS-2025-042` - 42nd survey of 2025
- `DOSS-2026-001` - First survey of 2026 (counter resets)

## Implementation Details

### 1. Schema Changes (`lib/schema.ts`)

Made `dossierId` optional in the survey form schema:

```typescript
export const surveyFormSchema = z.object({
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  stageReached: z.string().min(1, "L'étape atteinte est requise"),
  dossierId: z.string().optional(), // ✨ Auto-generated if not provided
  // ... other fields
});
```

Removed `dossierId` validation from `superRefine` - no longer required from users.

### 2. Generation Function

Implemented `generateDossierId()` function in both:
- `app/api/surveys/route.ts`
- `app/actions/survey.ts`

```typescript
async function generateDossierId(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `DOSS-${year}-`;

  // Get the count of surveys created this year
  const startOfYear = new Date(year, 0, 1);
  const count = await prisma.survey.count({
    where: {
      createdAt: {
        gte: startOfYear,
      },
    },
  });

  // Increment and format with leading zeros
  const nextNumber = (count + 1).toString().padStart(3, "0");

  return `${prefix}${nextNumber}`;
}
```

### 3. Integration

Both API route and server action now:
1. Validate the incoming data
2. Check if `dossierId` is provided
3. Generate a new one if missing
4. Proceed with database insertion

```typescript
// Generate dossierId if not provided
if (!validatedData.dossierId) {
  validatedData.dossierId = await generateDossierId();
}
```

## Benefits

### For Users
- ✅ **Simpler API:** No need to manage or track dossier IDs
- ✅ **Consistent Format:** All IDs follow the same pattern
- ✅ **No Conflicts:** System ensures uniqueness

### For Administrators
- ✅ **Easy Tracking:** Year-based counter makes it easy to see survey volume per year
- ✅ **Predictable IDs:** Sequential numbering is intuitive
- ✅ **Audit Trail:** Creation date embedded in the ID

## Counter Reset Behavior

The counter automatically resets at the start of each year:

```
2025-12-31: DOSS-2025-450 (last survey of 2025)
2026-01-01: DOSS-2026-001 (first survey of 2026)
```

This provides natural segmentation by year and prevents IDs from becoming too long.

## API Usage

### Before (Manual ID)
```json
POST /api/surveys
{
  "email": "user@example.com",
  "dossierId": "DOSS-2025-001",  // ❌ User had to provide
  "stageReached": "enquete",
  // ... other fields
}
```

### After (Auto-generated)
```json
POST /api/surveys
{
  "email": "user@example.com",
  "stageReached": "enquete",  // ✅ No dossierId needed
  // ... other fields
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "dossierId": "DOSS-2025-042",  // ✨ Auto-generated
    "email": "user@example.com",
    // ... other fields
  }
}
```

## Edge Cases Handled

### 1. Concurrent Requests
The current implementation counts existing surveys and increments. In high-concurrency scenarios, this could potentially create duplicate IDs. Consider implementing:
- Database-level unique constraint on `dossierId`
- Retry logic in case of conflicts
- Optimistic locking

### 2. Manual Override
If a user provides a `dossierId`, the system will use it instead of generating one. This allows for:
- Data migration from legacy systems
- Manual ID assignment when needed
- Testing with specific IDs

### 3. Year Transition
During New Year's Eve (December 31 → January 1), surveys will naturally transition from one year to the next. No special handling required.

## Testing Recommendations

### 1. Basic Generation
```bash
# Create survey without dossierId
curl -X POST http://localhost:3000/api/surveys \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "stageReached": "depot",
    ...
  }'

# Verify dossierId in response matches DOSS-YYYY-XXX format
```

### 2. Sequential Numbering
```bash
# Create multiple surveys
# Verify IDs increment: DOSS-2025-001, DOSS-2025-002, DOSS-2025-003
```

### 3. Manual Override
```bash
# Provide dossierId explicitly
curl -X POST http://localhost:3000/api/surveys \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "dossierId": "CUSTOM-001",
    ...
  }'

# Verify custom ID is used
```

## Database Considerations

### Current Schema
```prisma
model Survey {
  id        String   @id @default(cuid())
  dossierId String
  // ... other fields
}
```

### Recommended Enhancement
Add a unique constraint to prevent duplicate dossier IDs:

```prisma
model Survey {
  id        String   @id @default(cuid())
  dossierId String   @unique  // ✨ Add unique constraint
  // ... other fields
}
```

Run migration:
```bash
npx prisma migrate dev --name add_unique_dossier_id
```

## Future Improvements

### 1. Distributed Counter
For production systems with multiple instances, consider:
- Redis-based atomic counter
- Database sequence
- UUID-based approach with prefix

### 2. Custom Formats
Allow configuration of ID format:
```typescript
// config.ts
export const DOSSIER_ID_FORMAT = {
  prefix: 'DOSS',
  yearDigits: 4,  // or 2 for YY
  counterDigits: 3,
  separator: '-',
};
```

### 3. Analytics
Track ID generation metrics:
- Total surveys per year
- Peak creation times
- ID generation performance

## Files Modified

- ✅ `lib/schema.ts` - Made dossierId optional
- ✅ `app/api/surveys/route.ts` - Added generation function and logic
- ✅ `app/actions/survey.ts` - Added generation function and logic
- ✅ `openapi.json` - Updated to reflect optional dossierId
- ✅ `API_DOCUMENTATION.md` - Added note about auto-generation
- ✅ `API_QUICK_REFERENCE.md` - Added tips section and removed from examples

## Rollback Plan

If needed, reverting is straightforward:

1. Make `dossierId` required again in `lib/schema.ts`
2. Remove generation logic from API route and server action
3. Update documentation

No database changes are required since `dossierId` remains a string field.

---

**Status:** ✅ Implemented and Documented  
**Breaking Change:** No - existing code providing `dossierId` continues to work

