# Prisma + Supabase Postgres + Auth.js Boilerplate

A complete Next.js boilerplate with Google OAuth authentication, PostgreSQL database, and Google APIs integration. Perfect for building  applications that need Gmail, Calendar, and other Google services access.

## 🚀 Features

- ✅ **NextAuth.js v5** - Complete authentication system
- ✅ **Google OAuth** - Gmail, Calendar, and Google APIs access
- ✅ **PostgreSQL + Prisma** - Type-safe database with Supabase
- ✅ **Automatic Token Refresh** - Never lose API access
- ✅ **Shadcn/ui Components** - Beautiful, accessible UI
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern styling
- ✅ **Middleware Protection** - Route-based authentication
- ✅ **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Styling**: Tailwind CSS + Shadcn/ui
- **Language**: TypeScript
- **OAuth Provider**: Google

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Cloud Console account
- Supabase account (for PostgreSQL)

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd gsuite-ai
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Fill in your `.env.local` with actual values:

```bash
# Authentication
AUTH_SECRET="your_nextauth_secret_here"  # Generate with: npx auth secret

# Google OAuth (from Google Cloud Console)
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

# Database (from Supabase)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the following APIs:
   - Google+ API
   - Gmail API
   - Google Calendar API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to `.env.local`

### 4. Supabase Setup

1. Create a new project at [Supabase](https://supabase.com/dashboard)
2. Go to: Project Settings → Database
3. Copy connection strings to `.env.local`
4. Note: This boilerplate only uses Supabase as a PostgreSQL provider

### 5. Database Setup

```bash
# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - you'll be redirected to the auth page!

## 📁 Project Structure

```
├── app/
│   ├── auth/                 # Sign-in page
│   ├── dashboard/            # Protected dashboard
│   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   └── page.tsx         # Main dashboard content
│   ├── api/auth/            # NextAuth.js API routes
│   └── layout.tsx           # Root layout with providers
├── components/
│   ├── app-sidebar.tsx      # Main application sidebar
│   ├── google-auth-button.tsx
│   ├── logout-button.tsx
│   ├── user-profile.tsx     # User profile (normal & compact)
│   └── ui/                  # Shadcn/ui components
├── features/auth/           # Authentication business logic
├── prisma/
│   └── schema.prisma        # Database schema
├── auth.ts                  # NextAuth.js configuration
├── middleware.ts            # Route protection
└── .env.example            # Environment variables template
```

## 🔐 Authentication Flow

```mermaid
graph TD
    A[User visits /] --> B{Authenticated?}
    B -->|No| C[Redirect to /auth]
    B -->|Yes| D[Redirect to /dashboard]
    C --> E[Google OAuth Flow]
    E --> F[Tokens stored in DB]
    F --> D
    D --> G[Check token expiry]
    G -->|Expired| H[Auto-refresh tokens]
    G -->|Valid| I[Access Google APIs]
    H --> I
```

## 🎨 UI Components

The sidebar includes:

- **Header**: App branding and logo
- **Navigation**: Dashboard link (expandable)
- **Footer**: Compact user profile with logout

User profile component supports:

- **Normal mode**: Full profile card with badges
- **Compact mode**: Sidebar-optimized layout

## 🔌 Google APIs Integration

The boilerplate is configured with these scopes:

- `https://www.googleapis.com/auth/gmail.compose`
- `https://www.googleapis.com/auth/gmail.send`
- `https://www.googleapis.com/auth/calendar.events.owned`

### Using Google APIs

```typescript
import { auth } from "@/auth";
import { google } from "googleapis";

export async function sendEmail() {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  const gmail = google.gmail({
    version: "v1",
    auth: session.accessToken,
  });

  // Your Gmail API calls here
}
```

## 📊 Database Schema

Key models:

- **User**: Basic user information
- **Account**: OAuth provider data and tokens
- **Session**: User sessions
- **VerificationToken**: Email verification

The schema automatically handles token refresh and expiry.

## 🚢 Deployment

### Environment Variables for Production

Set these in your hosting platform:

```bash
AUTH_SECRET="production_secret"
AUTH_GOOGLE_ID="production_google_id"
AUTH_GOOGLE_SECRET="production_google_secret"
DATABASE_URL="production_database_url"
DIRECT_URL="production_direct_url"
NODE_ENV="production"
```

### Platform-Specific Guides

- **Vercel**: Works out of the box
- **Railway**: Add environment variables in dashboard
- **Netlify**: Configure environment variables and build command

## 🔧 Customization

### Adding New Routes

1. Create page in `app/` directory
2. Add to sidebar navigation in `components/app-sidebar.tsx`
3. Update middleware if protection needed

### Adding Google API Scopes

1. Update scopes in `auth.ts`
2. Re-authenticate users to grant new permissions
3. Use new APIs with existing `session.accessToken`

### Styling

- Update `app/globals.css` for global styles
- Modify components in `components/ui/` for UI changes
- Use Tailwind classes throughout

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run generate     # Generate Prisma client
npm run migrate      # Run database migrations
```

## 🤝 Contributing

This is a boilerplate template. Feel free to:

- Fork and customize for your needs
- Submit issues for bugs
- Suggest improvements

## 📄 License

MIT License - feel free to use this boilerplate for any project!

---

**Ready to build something amazing? Start coding! 🚀**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
