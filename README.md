# Okani Survey - Enquête de Satisfaction ANUTTC

A comprehensive survey application for collecting user feedback on land regularization procedures managed by ANUTTC (Gabon)

## Features

- 📋 **Multi-Step Survey Form** - Dynamic form that adapts based on the user's process stage
- 🗄️ **Complete CRUD API** - RESTful API for managing surveys and descriptors
- 📊 **Data Management** - PostgreSQL database with Prisma ORM
- 🔔 **Toast Notifications** - User feedback with Sonner
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **React Transitions** - Smooth navigation between form steps

## Tech Stack

- **Framework**: Next.js 15.5 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ 
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd okani-survey
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/okani_survey"
```

4. Generate Prisma Client and run migrations:
```bash
pnpm run postinstall
pnpm run db:push
```

5. Seed the database with initial descriptors:
```bash
pnpm run db:seed
```

6. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
okani-survey/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── descriptors/          # Descriptors CRUD endpoints
│   │   └── surveys/              # Surveys CRUD endpoints
│   ├── stage-selection/          # Initial stage selection page
│   ├── survey/                   # Multi-step survey form
│   └── layout.tsx                # Root layout with Toaster
├── components/                   # React components
│   ├── steps/                    # Survey step components
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utilities and configurations
│   ├── api-client.ts             # API client library
│   ├── descriptors.ts            # Descriptor constants
│   ├── schema.ts                 # Zod validation schemas
│   ├── prisma.ts                 # Prisma client instance
│   └── generated/                # Generated Prisma Client
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Prisma schema
│   ├── seed.ts                   # Database seeding script
│   └── migrations/               # Database migrations
└── API_DOCUMENTATION.md          # Complete API documentation
```

## API Endpoints

The application provides comprehensive REST API endpoints for managing surveys and descriptors.

### Descriptors API

- `GET /api/descriptors` - Get all descriptors or filter by type
- `GET /api/descriptors/[id]` - Get a single descriptor
- `POST /api/descriptors` - Create a new descriptor
- `PATCH /api/descriptors/[id]` - Update a descriptor
- `DELETE /api/descriptors/[id]` - Delete a descriptor
- `GET /api/descriptors/types` - Get all unique descriptor types
- `POST /api/descriptors/bulk` - Create multiple descriptors
- `DELETE /api/descriptors/bulk` - Delete descriptors by type

### Surveys API

- `GET /api/surveys` - Get all surveys (with pagination & filtering)
- `GET /api/surveys/[id]` - Get a single survey
- `POST /api/surveys` - Create a new survey
- `PATCH /api/surveys/[id]` - Update a survey
- `DELETE /api/surveys/[id]` - Delete a survey
- `GET /api/surveys/stats` - Get survey statistics
- `GET /api/surveys/export` - Export surveys (JSON or CSV)

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Using the API Client

A TypeScript client library is available for easy API integration:

```typescript
import { descriptorsApi, surveysApi } from "@/lib/api-client";

// Fetch all descriptors of a specific type
const paymentModes = await descriptorsApi.getAll("payment_mode");

// Create a new survey
const survey = await surveysApi.create({
  email: "user@example.com",
  stageReached: "depot",
  // ... other survey fields
});

// Get survey statistics
const stats = await surveysApi.getStats();

// Export surveys as CSV
const csvData = await surveysApi.export({ format: "csv" });
```

## Database Management

### Available Scripts

```bash
# Generate Prisma Client
pnpm run postinstall

# Push schema changes to database
pnpm run db:push

# Seed database with initial data
pnpm run db:seed

# Reset database (warning: deletes all data)
pnpm run db:reset

# Open Prisma Studio (database GUI)
pnpm run db:studio
```

### Database Schema

The application uses two main models:

1. **Survey** - Stores all survey responses with comprehensive fields for each process
2. **Descriptor** - Manages dropdown options and form field values

See `prisma/schema.prisma` for the complete schema.

## Development

### Running in Development Mode

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Linting and Formatting

```bash
# Run linter
pnpm run lint

# Format code
pnpm run format
```

### Building for Production

```bash
pnpm run build
pnpm start
```

## User Flow

1. **Home Page** - Introduction and start survey button
2. **Stage Selection** - User confirms they have a file, provides email, and selects their current stage
3. **Survey Form** - Multi-step form with dynamic steps based on selected stage:
   - User Profile
   - Process stages (Depot, Enquête, État des lieux, etc.)
   - Governance & Probity
   - Disputes (if applicable)
   - Global Evaluation
4. **Submission** - Survey is submitted via API with toast notification
5. **Confirmation** - User is redirected to home page with success message

## Form Validation

The application uses Zod for robust validation:

- Required fields are enforced
- Email format validation
- Conditional validation based on user selections
- Custom validation rules for complex scenarios

See `lib/schema.ts` for validation schemas.

## Notifications

The application uses Sonner for toast notifications:

- Loading states during API calls
- Success messages on completion
- Error messages with details
- Validation error feedback

## Environment Variables

```env
# Required
DATABASE_URL="postgresql://..."

# Optional (for production)
NODE_ENV="production"
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linter and ensure tests pass
4. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For technical support, contact:
- WhatsApp: +241 65 16 40 85

# update
