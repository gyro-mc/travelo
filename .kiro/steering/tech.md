# Technology Stack

## Framework & Runtime
- **Next.js 15.4.2** with App Router (React 19.1.0)
- **TypeScript 5** for type safety
- **Node.js** runtime environment

## Database & ORM
- **PostgreSQL** database
- **Prisma 6.12.0** ORM with custom output directory (`generated/prisma`)
- Database migrations managed in `prisma/migrations/`

## Authentication & Authorization
- **Clerk** for user authentication and session management
- Role-based access control (admin/user roles)
- Custom JWT session claims with metadata

## UI & Styling
- **Tailwind CSS 4** for styling
- **Radix UI** components for accessible UI primitives
- **Lucide React** and **React Icons** for iconography
- **Recharts** for data visualization and charts

## Key Libraries
- **@google/generative-ai** for AI trip generation
- **React Hook Form** with **Zod** validation
- **React Hot Toast** for notifications
- **AG Grid React** for data tables
- **React Select** with country list support

## Development Tools
- **ESLint** with Next.js configuration
- **Turbopack** for faster development builds
- **PostCSS** for CSS processing

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma migrate   # Run database migrations
```

## Environment Variables
- Requires `.env.local` for local development
- Database connection via `DATABASE_URL`
- Clerk authentication keys
- Google AI API credentials