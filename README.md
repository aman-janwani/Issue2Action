# Issues2Action – Turn GitHub Issues into Clear Action Plans with AI

## Table of Contents

1.  [Overview](#1-overview)
2.  [Key Features](#2-key-features)
3.  [Technologies Used](#3-technologies-used)
4.  [Getting Started](#4-getting-started)
    *   [4.1. Prerequisites](#41-prerequisites)
    *   [4.2. Installation](#42-installation)
    *   [4.3. Environment Variables](#43-environment-variables)
    *   [4.4. Running the Development Server](#44-running-the-development-server)
    *   [4.5. Connecting GitHub App](#45-connecting-github-app)
5.  [Deployment](#5-deployment)
6.  [Contributing](#6-contributing)
7.  [License](#7-license)
8.  [Further Documentation](#8-further-documentation)

---

## 1. Overview

Issues2Action is an innovative tool designed to streamline the project planning process for developers and teams. It addresses the common challenge of transforming unstructured and often overwhelming GitHub issues into clear, actionable sprint plans. By leveraging the power of Artificial Intelligence, Issues2Action provides intelligent insights, suggests optimal Pull Request (PR) structures, breaks down complex problems into manageable tasks, and offers realistic timeline estimations. This allows teams to ship features efficiently and with greater clarity, reducing the cognitive load associated with backlog management.

## 2. Key Features

*   **Smart Issue Analysis**: AI-driven analysis of GitHub issue descriptions to identify core requirements and dependencies.
*   **PR Planning**: Automatically generates suggested Pull Request titles and descriptions, structuring work into logical, deployable units.
*   **Task Breakdown**: Breaks down high-level features into granular, actionable development tasks.
*   **Timeline Estimation**: Provides realistic time estimates for tasks and overall project plans, accounting for various factors.

## 3. Technologies Used

Issues2Action is built using a modern and robust technology stack:

*   **Framework**: [Next.js](https://nextjs.org) (React framework for building web applications)
*   **Authentication**: [Clerk](https://clerk.com) (User authentication and management)
*   **Database**: [Supabase](https://supabase.io) (Open-source Firebase alternative for database and authentication services)
*   **GitHub API Interaction**: [Octokit](https://octokit.github.io) (Official GitHub API client)
*   **Background Processing & AI Orchestration**: [Inngest](https://www.inngest.com) (Event-driven serverless platform for reliable background jobs)
*   **AI Model**: [Google Gemini](https://ai.google.dev/models/gemini) (Generative AI model for intelligent analysis and planning)
*   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (Reusable components)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 4. Getting Started

Follow these instructions to set up and run Issues2Action locally for development.

### 4.1. Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 18.18.0 or higher (as specified in `pnpm-lock.yaml`).
*   **pnpm**: Recommended package manager, but `npm` or `yarn` can also be used.
*   **Git**: For cloning the repository.
*   **GitHub Account**: Required for connecting repositories and issues.

### 4.2. Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/issues2action.git
    cd issues2action
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

### 4.3. Environment Variables

Issues2Action relies on several environment variables for configuration. Create a `.env.local` file in the root of your project and populate it with the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY

# Supabase Database
SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# GitHub App Integration
GITHUB_APP_ID=YOUR_GITHUB_APP_ID
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END RSA PRIVATE KEY-----\n"

# Inngest (for background processing)
INNGEST_SIGNING_KEY=sign_YOUR_INNGEST_SIGNING_KEY
INNGEST_EVENT_KEY=event_YOUR_INNGEST_EVENT_KEY
```

**Explanation of Environment Variables:**

*   **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`**, **`CLERK_SECRET_KEY`**: Obtain these from your [Clerk dashboard](https://clerk.com/dashboard).
*   **`SUPABASE_URL`**, **`SUPABASE_SERVICE_ROLE_KEY`**: Find these in your [Supabase project settings](https://supabase.com/dashboard/projects/_/settings/api). `SUPABASE_SERVICE_ROLE_KEY` is crucial for server-side database access.
*   **`GITHUB_APP_ID`**, **`GITHUB_APP_PRIVATE_KEY`**: These are generated when you set up a GitHub App.
    *   `GITHUB_APP_ID`: A numeric ID assigned to your GitHub App.
    *   `GITHUB_APP_PRIVATE_KEY`: The content of the `.pem` file downloaded from your GitHub App settings. **Ensure you replace actual newline characters with `\n` if pasting it as a single-line string into your `.env.local` file, or follow the instructions in `docs/github-app-setup.md` for secure handling.**
*   **`INNGEST_SIGNING_KEY`**, **`INNGEST_EVENT_KEY`**: These are used by Inngest for local development and event processing. Refer to the Inngest documentation for how to obtain these, or use dummy values for initial local setup if not connecting to a remote Inngest environment.

### 4.4. Running the Development Server

Once the environment variables are set, you can start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will auto-update as you edit the files.

### 4.5. Connecting GitHub App

After signing in with your Clerk account, the application will attempt to redirect you to install the GitHub App. This is a critical step for Issues2Action to access your GitHub repositories and issues.

**For detailed instructions on how to create and configure your own GitHub App for development, please refer to the dedicated documentation:**

*   [`docs/github-app-setup.md`](./docs/github-app-setup.md)

## 5. Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details on deploying to Vercel or other platforms.

## 6. Contributing

We welcome contributions to Issues2Action! Whether it's bug fixes, new features, or improvements to documentation, your help is appreciated.

For detailed guidelines on how to contribute, set up your development environment, and follow coding standards, please refer to:

*   [`docs/development.md`](./docs/development.md)

## 7. License

This project does not currently specify a license. Please contact the repository owner for licensing information.

## 8. Further Documentation

For a deeper dive into the project's architecture, API, and specific integrations, please explore the following documentation files:

*   [**Architecture Overview**](./docs/architecture.md)
*   [**Development Guide**](./docs/development.md)
*   [**API Reference**](./docs/api-reference.md)
*   [**GitHub App Setup**](./docs/github-app-setup.md)
*   [**Inngest Integration**](./docs/inngest-integration.md)
*   [**Privacy Policy**](./PRIVACY.md)
*   [**Terms of Service**](./TERMS.md)
