# Doctor Tracker

Enterprise-level scalable project architecture for Doctor Tracker.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- MongoDB & Mongoose
- MVC Architecture
- REST API
- TanStack Query
- Axios
- React Hook Form & Zod
- Shadcn UI & Lucide React
- Framer Motion

## Architecture

This project follows an enterprise-level MVC (Model-View-Controller) architecture, utilizing a feature-based organization.

### Project Structure

```
doctor-tracker/
├── app/                  # Next.js App Router (Layouts & Pages)
│   ├── (auth)/           # Authentication route group
│   ├── (dashboard)/      # Dashboard route group
│   └── api/              # REST API endpoints
├── components/           # Reusable React components
│   ├── common/           # Common shared components
│   ├── ui/               # Shadcn UI base components
│   └── ...               # Feature specific components
├── config/               # Application configuration (Env, Routes, Constants)
├── hooks/                # Custom React Hooks
├── lib/                  # Shared utilities (MongoDB, Axios, etc)
├── models/               # Mongoose schemas & models
├── modules/              # Feature modules (doctor, patient, auth, etc.)
│   └── [feature]/        # Contains controller, service, repository, routes, validator for the feature
├── providers/            # React Context providers (TanStack Query, Theme, etc)
├── store/                # Global state management
├── types/                # TypeScript type definitions
└── ...                   # Developer Experience tools config
```

### MVC Pattern Implementation
The backend features are encapsulated within the `modules/` directory to strictly adhere to SOLID and Clean Architecture principles:
- **Routes**: Define the API endpoints and map them to Controllers.
- **Controllers**: Handle HTTP requests, parsing parameters, and returning responses.
- **Services**: Contain business logic and orchestrate operations.
- **Repositories**: Handle direct database interactions and abstract data access.
- **Validators**: Schema validation using Zod.
- **Models**: Mongoose schema definitions.

## Installation

1. Clone the repository and navigate into the folder:
   ```bash
   cd doctor-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the values for `MONGODB_URI`, `JWT_SECRET`, and `NEXT_PUBLIC_API_URL`.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

- **Code Quality**: ESLint, Prettier, Husky, and lint-staged are configured.
- **Committing**: Pre-commit hooks will automatically run `lint-staged` to format and lint your code.
- **Adding UI Components**: Use Shadcn UI CLI to add new components: `npx shadcn@latest add [component]`
