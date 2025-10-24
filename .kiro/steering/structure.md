# Project Structure

## Directory Organization

### `/app` - Next.js App Router
- **`/app/page.tsx`** - Landing page
- **`/app/layout.tsx`** - Root layout with Clerk provider
- **`/app/globals.css`** - Global styles
- **`/app/sign-in/[[...rest]]/`** - Authentication pages
- **`/app/admin/`** - Admin-only pages (protected by middleware)
  - **`/dashboard/`** - Admin dashboard with analytics
  - **`/roles-managing/`** - User role management
- **`/app/api/`** - API routes
  - **`/admin/`** - Admin-only API endpoints
  - **`/webhooks/clerk/`** - Clerk webhook handlers

### `/components` - Reusable UI Components
- **`/ui/`** - Base UI components (buttons, badges, etc.)
- Dashboard components (StatsCard, TripCard, UserGrowth, etc.)
- **`LandingPage.tsx`** - Main landing page component
- **`sideBar.tsx`** - Navigation sidebar

### `/lib` - Utility Libraries
- **`prisma.ts`** - Prisma client configuration
- **`utils.ts`** - General utility functions

### `/utils` - Business Logic
- **`roles.ts`** - Role-based access control utilities
- **`schema.ts`** - Validation schemas

### `/types` - TypeScript Definitions
- **`globals.d.ts`** - Global type definitions and role types

### `/prisma` - Database
- **`schema.prisma`** - Database schema
- **`/migrations/`** - Database migration files

### `/generated` - Auto-generated Files
- **`/prisma/`** - Generated Prisma client (custom output location)

### `/public` - Static Assets
- **`/assets/icons/`** - SVG icons
- **`/assets/images/`** - Image assets

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (e.g., `LandingPage.tsx`, `StatsCard.tsx`)
- **Pages**: lowercase with hyphens (e.g., `create-trip/`, `all-users/`)
- **API routes**: lowercase (e.g., `route.ts`)
- **Utilities**: camelCase (e.g., `roles.ts`, `schema.ts`)

### Code Conventions
- **React Components**: PascalCase with default exports
- **Interfaces**: PascalCase with descriptive names
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## Architecture Patterns

### Authentication Flow
- Clerk middleware protects admin routes (`/admin/*`)
- Role-based access via custom JWT claims
- Server-side role checking with `checkRole()` utility

### Data Flow
- API routes use Prisma client from `/lib/prisma.ts`
- Client components fetch data via API routes with auth tokens
- Form validation using React Hook Form + Zod schemas

### Component Structure
- UI components in `/components/ui/` for reusability
- Business logic components in `/components/` root
- Page-specific components co-located with pages when appropriate

## Import Patterns
- Use `@/` alias for absolute imports from project root
- Import Prisma client from `../generated/prisma` (custom location)
- Prefer named imports for utilities, default for components