# Hirely

A modern job board platform built with Next.js that connects job seekers with companies. Hirely enables companies to post job listings with flexible pricing tiers and helps job seekers discover opportunities through advanced filtering and search capabilities.

## Features

- 🔐 **Authentication**: Secure OAuth login with GitHub and Google
- 👥 **Dual User Types**: Support for both companies and job seekers
- 📝 **Job Postings**: Create, edit, and manage job listings with rich text descriptions
- 💰 **Payment Integration**: Stripe-powered payment system for job listing durations
- 🔍 **Advanced Filtering**: Filter jobs by type, location, salary range, and more
- ⭐ **Saved Jobs**: Job seekers can save favorite job postings
- 📄 **File Uploads**: Upload company logos and resumes via UploadThing
- 📧 **Email Notifications**: Automated email notifications via Resend and Inngest
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and shadcn/ui
- 🌓 **Dark Mode**: System-aware theme switching
- 🛡️ **Security**: Arcjet integration for rate limiting and security

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Payments**: [Stripe](https://stripe.com/)
- **File Storage**: [UploadThing](https://uploadthing.com/)
- **Background Jobs**: [Inngest](https://www.inngest.com/)
- **Email**: [Resend](https://resend.com/)
- **Security**: [Arcjet](https://arcjet.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Rich Text Editor**: [TipTap](https://tiptap.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- PostgreSQL database
- Accounts for:
  - GitHub OAuth App
  - Google OAuth App
  - Stripe
  - UploadThing
  - Resend
  - Arcjet
  - Inngest (optional, for background jobs)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alisamirali/hirely.git
cd hirely
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hirely?schema=public"

# NextAuth
AUTH_SECRET="your-auth-secret-here" # Generate with: openssl rand -base64 32
AUTH_URL="http://localhost:3000" # Your app URL

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# UploadThing
UPLOADTHING_SECRET="sk_..."
NEXT_PUBLIC_UPLOADTHING_KEY="pk_..."

# Resend
RESEND_API_KEY="re_..."

# Arcjet
ARCJET_KEY="ajkey_..."

# Inngest (optional)
INNGEST_SIGNING_KEY="signkey-..."
INNGEST_EVENT_KEY="eventkey-..."

# App URL
NEXT_PUBLIC_URL="http://localhost:3000"
```

### 4. Set up the database

```bash
# Generate Prisma Client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# (Optional) Seed the database
# pnpm prisma db seed
```

### 5. Run the development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
hirely/
├── app/                   # Next.js App Router pages and routes
│   ├── (mainLayout)/      # Main application layout
│   │   ├── company/       # Company profile pages
│   │   ├── favorites/     # Saved jobs page
│   │   ├── job/           # Job detail pages
│   │   ├── my-jobs/       # Job management pages
│   │   └── post-job/      # Create job page
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth routes
│   │   ├── inngest/       # Inngest webhook
│   │   ├── uploadthing/   # File upload routes
│   │   └── webhook/       # Stripe webhooks
│   ├── login/             # Login page
│   ├── onboarding/        # User onboarding flow
│   ├── payment/           # Payment success/cancel pages
│   └── utils/             # Utility functions and configurations
├── components/            # React components
│   ├── forms/            # Form components
│   ├── general/          # General UI components
│   ├── richTextEditor/   # TipTap editor components
│   └── ui/               # shadcn/ui components
├── prisma/               # Prisma schema and migrations
└── public/               # Static assets
```

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm prisma generate` - Generate Prisma Client
- `pnpm prisma migrate dev` - Create and apply database migrations
- `pnpm prisma studio` - Open Prisma Studio (database GUI)

## Key Features Explained

### User Types

- **Company**: Can create company profiles, post job listings, and manage applications
- **Job Seeker**: Can browse jobs, save favorites, and upload resumes

### Job Listings

Companies can create job postings with:

- Job title and description (rich text)
- Employment type (full-time, part-time, contract, etc.)
- Location
- Salary range
- Benefits selection
- Listing duration (30, 60, or 90 days) with corresponding pricing

### Payment Flow

1. Company selects listing duration
2. Redirected to Stripe Checkout
3. Payment processed
4. Job listing activated for selected duration
5. Webhook updates job status

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy!

Make sure to:

- Set up a PostgreSQL database
- Configure all environment variables
- Run `prisma migrate deploy` for production migrations
- Set up Inngest endpoint (if using background jobs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
