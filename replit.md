# replit.md

## Overview

This is a modern, responsive 1-page portfolio website for web design services, successfully deployed at modernwebsitedesigns.netlify.app. Built with React, Express.js, and TypeScript, it features a professional landing page with navigation (About, Services, Portfolio, Contact), smooth scrolling, and a fully functional contact form that emails submissions to thewebstudio.live@gmail.com using SendGrid. The site uses a warm nude and brown color scheme with Poppins typography for an inviting, modern aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Warm nude and brown color scheme for modern, inviting aesthetic.
Typography: Poppins font with normal weight for softer, more approachable headings.
Content approach: Clean, streamlined design focused on core services without unnecessary elements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Extensive use of Radix UI primitives through shadcn/ui
- **Animations**: Framer Motion for smooth animations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution in development

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend application
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized in `shared/schema.ts` for type safety
- **Migrations**: Managed through drizzle-kit
- **Storage Interface**: Abstracted storage layer with in-memory fallback

### Authentication & Authorization
- **User Model**: Basic user schema with username/password
- **Session Management**: PostgreSQL-backed sessions
- **Type Safety**: Zod schemas for validation

### UI System
- **Design System**: shadcn/ui components built on Radix UI
- **Theme**: New York style with neutral base colors
- **Responsive**: Mobile-first design with Tailwind CSS
- **Dark Mode**: CSS variable-based theming support

### Development Tools
- **Type Checking**: Strict TypeScript configuration
- **Code Quality**: ESLint and Prettier (inferred from shadcn/ui setup)
- **Hot Reload**: Vite HMR for frontend, tsx for backend
- **Path Aliases**: Configured for clean imports

## Data Flow

### Request Flow
1. Client requests hit Vite dev server in development
2. API requests are proxied to Express server on `/api` routes
3. Express middleware handles logging, parsing, and error handling
4. Routes use storage interface for data persistence
5. Responses are JSON with proper error handling

### State Management
- **Server State**: React Query for caching and synchronization
- **Client State**: React hooks and context where needed
- **Form State**: React Hook Form with controlled components

### Database Operations
- **Abstraction**: Storage interface allows switching between implementations
- **Current**: In-memory storage for development
- **Production**: PostgreSQL through Drizzle ORM

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production
- **@replit/vite-plugin-***: Replit-specific development plugins

### UI Dependencies
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **class-variance-authority**: Utility for component variants
- **clsx & tailwind-merge**: CSS class management

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with auto-restart
- **Database**: In-memory storage for quick iteration
- **Scripts**: `npm run dev` starts both frontend and backend

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Database**: PostgreSQL with Drizzle migrations
- **Deployment**: Single Node.js process serving static files and API

### Environment Configuration
- **DATABASE_URL**: Required for PostgreSQL connection
- **NODE_ENV**: Controls development vs production behavior
- **Session Configuration**: PostgreSQL-backed sessions in production

### Database Setup
- **Migrations**: `npm run db:push` applies schema changes
- **Schema**: Shared between client and server for type safety
- **Connection**: Serverless-compatible PostgreSQL driver

## Recent Changes (July 24, 2025)

### Contact Form Implementation
- ✅ Integrated SendGrid email service for contact form submissions
- ✅ Created dual-environment setup: Express API for development, Netlify serverless function for production
- ✅ Configured automatic endpoint detection (localhost vs production)
- ✅ Implemented proper error handling and success messaging
- ✅ Successfully deployed with "Test" environment variable for SendGrid API key

### Typography & Design Fixes
- ✅ Resolved recurring 'g' cutoff issue in "The Web Studio" heading with leading-[1.3] and padding adjustments
- ✅ Optimized photo sizing for responsive breakpoints
- ✅ Maintained warm nude/brown color scheme with Poppins font

### Production Deployment
- ✅ Successfully deployed to modernwebsitedesigns.netlify.app
- ✅ Contact form fully functional on live site
- ✅ All emails routing to thewebstudio.live@gmail.com

The application is designed for easy deployment on platforms like Replit and Netlify, with automatic database provisioning and a single-command build process. The architecture supports both development flexibility and production scalability.