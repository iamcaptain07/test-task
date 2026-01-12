# Library Information System

## Time Expectation
2–4 hours maximum

Please do not exceed this time. If you run out of time, document what you would do next and why.

## Overview

A minimal full-stack Next.js application for browsing a book catalog and managing user profiles. Built with Next.js App Router, MongoDB, and Tailwind CSS.

## How to Run Locally

### Prerequisites

- Node.js 18+ installed
- MongoDB instance running (local or cloud)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
   For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/library`

3. (Optional) Seed books data into MongoDB:
   ```bash
   npm run seed:books
   ```
   Note: Books will be automatically seeded on first API call if the collection is empty.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Setup (Alternative)

1. Build and run with Docker:
   ```bash
   docker-compose up --build
   ```
   Or for development:
   ```bash
   docker build -f Dockerfile.dev -t library-system:dev .
   docker run -p 3000:3000 library-system:dev
   ```

   Note: Environment variables from `.env` file are baked into the Docker image.

## Architecture and Tech Choices

### Technology Stack

- **Next.js 14** (App Router): Modern React framework with built-in API routes and server-side rendering
- **MongoDB**: NoSQL database for user profile persistence
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React 18**: UI library with modern hooks and features

### Project Structure

```
/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints
│   │   ├── books/         # Book catalog API
│   │   └── profile/       # User profile API
│   ├── books/             # Book listing and detail pages
│   ├── profile/           # User profile page
│   └── layout.js          # Root layout with navigation
├── components/            # Reusable React components
├── data/                  # Static book data (JSON)
└── lib/                   # Utility functions and database connection
```

### Data Flow

1. **Books**: Stored in MongoDB collection (`books`). Seeded from JSON file on first run. Accessed through API.
2. **Profile**: Stored in MongoDB collection (`profiles`). Single-user system (id: 1). Accessed through API.

### API Routes

- `GET /api/books?search=...` - Search books by title, author, description, or tags
- `GET /api/books/[id]` - Get book details by ID
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile with validation

### Validation

- **Server-side**: Validates name (required) and email (required, valid format) in API route
- **Client-side**: Mirrors server validation for better UX, prevents invalid submissions

## Trade-offs

1. **MongoDB vs SQLite**: 
   - Chose MongoDB for scalability and flexibility
   - Requires MongoDB instance (local or cloud)
   - More setup complexity compared to file-based SQLite

2. **Books in MongoDB**:
   - Books stored in MongoDB for consistency with profile data
   - All data accessed through API routes
   - Seeded from JSON file on first run

3. **Single User System**:
   - No authentication required
   - Simple profile management
   - Not suitable for multi-user scenarios

4. **Minimal Styling**:
   - Uses Tailwind CSS for clean, functional UI
   - Focus on functionality over extensive design
   - Responsive but basic layout

5. **No Error Boundaries**:
   - Basic error handling
   - No global error boundary
   - Errors shown inline

6. **No Loading States**:
   - Basic loading indicators
   - Could be improved with skeletons/spinners

7. **Client-side Search**:
   - Search happens client-side after fetching all books
   - Simple but not scalable for large catalogs
   - Could be improved with server-side pagination

## What I Would Do Next

1. **Authentication & Multi-user Support**:
   - Add authentication (NextAuth.js or similar)
   - Support multiple user profiles
   - Session management

2. **Enhanced Error Handling**:
   - Add error boundaries
   - Better error messages
   - Retry mechanisms

3. **Testing**:
   - Unit tests for API routes
   - Component tests
   - Integration tests
   - E2E tests with Playwright/Cypress

4. **Database Improvements**:
   - Add indexes for search performance
   - Add pagination for book listings
   - Implement database migrations

5. **UI/UX Enhancements**:
   - Loading skeletons
   - Better animations/transitions
   - Improved responsive design
   - Accessibility improvements (ARIA labels, keyboard navigation)

6. **Performance**:
   - Implement caching (React Query or SWR)
   - Optimize images (if added)
   - Code splitting
   - Server-side rendering optimizations

7. **Features**:
   - Book favorites/wishlist
   - Reading history
   - Book reviews and ratings
   - Advanced search filters
   - Book recommendations

8. **DevOps**:
   - Docker setup for easier deployment
   - CI/CD pipeline
   - Environment configuration
   - Database migration scripts

9. **Documentation**:
   - API documentation (Swagger/OpenAPI)
   - Component documentation
   - Deployment guide

10. **Security**:
    - Input sanitization
    - Rate limiting
    - CORS configuration
    - Environment variable validation

