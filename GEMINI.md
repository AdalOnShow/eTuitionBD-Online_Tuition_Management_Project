# GEMINI.md

## Project Overview

**eTuitionBD** is a modern web application designed to connect students and tutors across Bangladesh. The platform facilitates the posting of tuition requirements by students/guardians and allows qualified tutors to discover and apply for these opportunities.

### Core Technologies
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/)
- **Database & ORM:** [Prisma](https://www.prisma.io/) with PostgreSQL (optimized for [Neon](https://neon.tech/))
- **Authentication:** [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Validation:** [Zod](https://zod.dev/)
- **Payments:** [Stripe](https://stripe.com/) (Integrated)

---

## Architecture & Directory Structure

The project follows a clean, service-oriented architecture within the Next.js ecosystem:

- `src/app/`: Contains the application routes (App Router).
  - `(auth)/`: Authentication-related routes (Login, Register).
  - `(dashboard)/`: Protected dashboard routes for students and tutors.
  - `(public)/`: Publicly accessible pages (Landing, Tuitions, About).
  - `api/auth/`: NextAuth.js configuration and route handlers.
- `src/components/`: Reusable React components.
  - `ui/`: Base UI primitives (buttons, cards, inputs) managed via Shadcn UI.
  - `auth/`: Components specific to the authentication flow.
- `src/server/`: Server-side logic.
  - `actions/`: Next.js Server Actions for handling mutations and form submissions.
  - `services/`: Business logic layer that interacts directly with the Prisma client.
  - `validations/`: Zod schemas for request validation and type safety.
- `src/lib/`: Shared utilities, Prisma client initialization, and Auth options.
- `prisma/`: Database schema definitions and migrations.

---

## Building and Running

### Prerequisites
- Node.js & [pnpm](https://pnpm.io/)
- PostgreSQL database (Neon recommended)

### Setup
1. **Install Dependencies:**
   ```bash
   pnpm install
   ```
2. **Environment Variables:**
   Create a `.env` file in the root and add:
   ```env
   DATABASE_URL="your_postgresql_url"
   AUTH_SECRET="your_nextauth_secret"
   # Add other provider-specific keys (Google, GitHub, Stripe)
   ```
3. **Database Initialization:**
   ```bash
   pnpm exec prisma generate
   pnpm exec prisma db push
   ```

### Development
```bash
pnpm dev
```

### Production
```bash
pnpm build
pnpm start
```

---

## Development Conventions

### Coding Style
- **TypeScript:** Strict typing is required across the entire codebase.
- **Server Actions:** All data mutations (POST, PUT, DELETE) must be handled via Server Actions in `src/server/actions`.
- **Services:** Keep business logic in `src/server/services` to ensure it is reusable and testable outside of UI components.
- **Validation:** Always validate input data using Zod schemas defined in `src/server/validations`.

### Naming Conventions
- **Files:** Use kebab-case for filenames (e.g., `login-form.tsx`, `user.service.ts`).
- **Components:** Use PascalCase for component names.
- **Actions:** Use camelCase with an `.actions.ts` suffix.

### Testing & Linting
- Run `pnpm lint` before pushing changes to ensure code quality and consistency with the project's ESLint configuration.
