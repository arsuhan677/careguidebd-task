# Doctor Tracker

## 1. Project Description
Doctor Tracker is a comprehensive health management portal designed for medical administrators and healthcare facilities to efficiently manage doctors and their associated patients. It solves the problem of decentralized and paper-based tracking by providing a centralized digital dashboard with powerful data visualization. The main capabilities include securely authenticating staff, performing full CRUD operations with advanced filtering and pagination for doctors and patients, assigning patients to specific doctors, and visualizing clinic metrics (like gender distribution and patients-per-doctor statistics) on an intuitive dashboard.

## 2. Setup Guide

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Cluster/Instance

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your actual values (e.g., MONGODB_URI).
4. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env.local` and configure your API URL.
4. Run the development server:
   ```bash
   npm run dev
   ```

## 3. Environment Variables

**Backend (`backend/.env.example`)**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_super_secret_jwt_key_here
```

**Frontend (`frontend/.env.example`)**:
```env
# Frontend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Database Configuration (if using Next.js API routes)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Authentication (if using Next.js API routes)
JWT_SECRET=your_super_secret_jwt_key_here
```

## 4. System Architecture
This project uses a decoupled Client-Server architecture. The frontend is a Next.js application that provides the UI and manages state using React Query. The backend is an Express Node.js application that handles business logic, authentication (JWT), and interacts with the MongoDB database using Mongoose.

**High-level Data Flow**:
```
User
  ↓
Next.js Frontend (React Query, UI components)
  ↓
REST API (JSON over HTTP)
  ↓
Node.js + Express Backend (Controllers, Services, Repositories)
  ↓
MongoDB (Data Persistence)
```

## 5. Technical Decisions

### 1. TanStack React Query for Server State Management
- **What was chosen**: TanStack React Query is used in the frontend (e.g., `useGetPatients`, `useCreatePatient`) to manage data fetching, caching, and state synchronization.
- **Why it was chosen**: It abstracts away complex `useEffect` data fetching loops and automatically handles loading and error states.
- **What benefit it provides**: It drastically improves frontend performance through smart caching, allows immediate UI updates (via `invalidateQueries`), and keeps the client in sync with the backend seamlessly.

### 2. Layered Backend Architecture (Controller-Service-Repository Pattern)
- **What was chosen**: The Node.js backend is structured into distinct layers (e.g., `doctor.controller.ts`, `doctor.service.ts`, `doctor.repository.ts`).
- **Why it was chosen**: To separate concerns. Controllers handle HTTP requests, services handle business logic, and repositories handle database operations.
- **What benefit it provides**: This makes the codebase highly maintainable, testable, and scalable. If the database provider changes, only the repository layer needs to be updated.

## 6. Features

### Authentication
- Registration
- Login
- Protected routes
- Logout

### Dashboard
- Total doctors
- Total patients
- Gender statistics
- Patient statistics
- Doctor specialization statistics
- Patients per doctor
- Charts (Gender Chart, Patients by Doctor)

### Doctor Management
- Create
- View
- Edit
- Delete
- Search
- Filtering
- Sorting
- Pagination
- View corresponding patients

### Doctor Patients
- View patients belonging to a doctor
- Add patient from the doctor's patient dialog
- Delete patient from the doctor's patient dialog

### Patient Management
- Create
- View
- Edit
- Delete
- Search
- Filtering (by gender, condition, dates)
- Sorting
- Pagination

### Settings
- Profile/account related settings (Read-only administrative layout)

## 7. Project Structure

**Frontend:**
- `/app`: Next.js App Router layout, pages (auth, dashboard, doctors, patients, settings), and loading UI.
- `/components`: Reusable Shadcn UI components and feature-specific components (dashboard, doctors, patients).
- `/config`: Environment configurations.
- `/hooks`: Custom React Query hooks (`useAuth`, `useDoctors`, `usePatients`).
- `/lib`: Utility functions and Axios configuration.
- `/providers`: Context providers (e.g., QueryClientProvider).
- `/types`: TypeScript interfaces.

**Backend:**
- `/src/config`: Database configuration and environment setup.
- `/src/models`: Mongoose database schemas (`Doctor`, `Patient`, `User`).
- `/src/modules`: Feature modules grouped by domain (`auth`, `dashboard`, `doctor`, `patient`), each containing routes, controllers, services, repositories, validators, and types.

## 8. API Overview
REST API endpoints managed by the Express backend:

**Authentication (`/api/auth`)**:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

**Dashboard (`/api/dashboard`)**:
- `GET /api/dashboard` (Returns aggregated statistics for charts and summary cards)

**Doctors (`/api/doctors`)**:
- `GET /api/doctors`
- `GET /api/doctors/:id`
- `POST /api/doctors`
- `PATCH /api/doctors/:id`
- `DELETE /api/doctors/:id`

**Patients (`/api/patients`)**:
- `GET /api/patients`
- `GET /api/patients/:id`
- `POST /api/patients`
- `PATCH /api/patients/:id`
- `DELETE /api/patients/:id`

## 9. Performance & Optimization
- **React Query Caching**: Eliminates redundant API calls by caching responses in the frontend.
- **Debounced Search**: Search inputs use a 500ms debounce to prevent spamming the backend API.
- **MongoDB Aggregation**: The dashboard utilizes efficient aggregation pipelines to group and count patients by doctor and gender on the database side rather than the server side.
- **MongoDB Indexes**: Database schemas employ indexes on heavily queried fields (e.g., `specialization`, `hospital`, `condition`, `gender`, `doctor`, `createdAt`) to speed up database lookups.
- **Reusable Components**: Clean, modular UI components utilizing Tailwind and Shadcn for minimal bundle sizes.

## 10. Validation & Error Handling
- **Frontend Validation**: Forms utilize `react-hook-form` integrated with `zod` schema resolvers for robust client-side validation before requests are made.
- **Backend Validation**: Incoming API requests are validated against Zod schemas in middleware.
- **Error Handling**: The backend standardizes API responses and catches async errors using custom middleware. Frontend components display elegant error states and toasts based on Axios interceptor outputs.

## 11. Responsive Design
The UI is fully responsive utilizing Tailwind CSS breakpoints.
- **Desktop**: Full sidebar navigation, multi-column data tables, and side-by-side charts.
- **Tablet**: Adjusts grid layouts and typography appropriately.
- **Mobile**: Features a collapsible hamburger menu for navigation, stacked card layouts, and horizontally scrollable tables to prevent layout breakage on small screens.

## 12. Screenshots

### Login — Desktop
> Screenshot will be added after final deployment.

### Dashboard — Desktop
> Screenshot will be added after final deployment.

### Doctors — Desktop
> Screenshot will be added after final deployment.

### Patients — Desktop
> Screenshot will be added after final deployment.

### Doctor Patients Dialog — Desktop
> Screenshot will be added after final deployment.

### Dashboard — Mobile
> Screenshot will be added after final deployment.

### Doctors — Mobile
> Screenshot will be added after final deployment.

### Patients — Mobile
> Screenshot will be added after final deployment.

## 13. Testing
Available commands defined in `package.json`:

**Frontend**:
- Lint: `npm run lint` (runs eslint)
- Build: `npm run build`
*(Note: TypeScript checks can be run manually via `npx tsc --noEmit`)*

**Backend**:
- Build: `npm run build` (runs tsc)
*(Note: A dedicated lint script is currently not configured in the backend package.json)*

## 14. Deployment
The application consists of a decoupled frontend and backend. In a production environment, the Express Node.js backend should be deployed to a provider such as Render or Heroku, connected to a MongoDB Atlas cluster. The Next.js frontend should be deployed to a provider like Vercel or Netlify, with the `NEXT_PUBLIC_API_URL` environment variable pointed to the live backend domain. Both applications must configure appropriate CORS rules to allow cross-origin requests.

## 15. Author
AR Suhan (CareGuide BD)
