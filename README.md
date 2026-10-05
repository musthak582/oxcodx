# OxCodx

**Modern software solutions for businesses that want to build, improve,
and scale.**

[![Website](https://img.shields.io/badge/Website-oxcodx.com-2563EB?style=flat-square)](https://oxcodx.com)

OxCodx is a software development company focused on building modern,
reliable, and scalable digital products for businesses and
organizations.

We combine software engineering, modern web technologies, and practical
business thinking to create solutions that are fast, maintainable, and
built around real-world needs.

## About OxCodx

OxCodx works across the software development lifecycle --- from planning
and interface development to backend systems, databases, APIs,
deployment, and ongoing maintenance.

Our focus is not simply on writing code. We aim to build software that
is:

-   **Useful** --- designed around real business requirements
-   **Reliable** --- structured for stability and predictable behavior
-   **Scalable** --- prepared to grow with the product
-   **Maintainable** --- clean, organized, and easier to extend
-   **Secure** --- built with appropriate security practices
-   **Modern** --- using current and proven technologies

## What We Do

### Web Development

We build modern web applications and business websites using
technologies such as:

-   React
-   Next.js
-   TypeScript
-   Tailwind CSS
-   REST APIs
-   Node.js
-   Express.js

### Backend & API Development

We design backend services and APIs that connect applications, business
logic, databases, and third-party services.

Typical work includes:

-   REST API development
-   Authentication and authorization
-   Business logic
-   Database integration
-   File and document handling
-   Third-party API integrations

### Database & Data Systems

We work with modern relational and NoSQL database technologies,
depending on project requirements.

Our experience includes:

-   PostgreSQL
-   MongoDB
-   SQLite
-   Prisma ORM
-   Data modeling
-   CRUD systems
-   Data validation and management

### Business & Internal Systems

We build software that helps organizations manage day-to-day operations,
including:

-   Administrative systems
-   Customer management
-   Record management
-   Workflow systems
-   Dashboards
-   Internal tools
-   Data-driven applications

### Website Maintenance & Technical Support

Software does not end at deployment.

OxCodx can support existing websites and applications through:

-   Bug fixing
-   Performance improvements
-   Content and system updates
-   Feature enhancements
-   Technical troubleshooting
-   Dependency and security updates
-   Ongoing maintenance

## Technology

Our technology choices depend on the project rather than forcing every
product into the same stack.

### Frontend

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   HTML5
-   CSS3

### Backend

-   Node.js
-   Express.js
-   REST APIs

### Databases

-   PostgreSQL
-   MongoDB
-   SQLite
-   Prisma

### Authentication & Security

-   JWT
-   bcrypt
-   Secure API design
-   Input validation
-   Environment-based secret management

### Development & Deployment

-   Git
-   GitHub
-   Vercel
-   Railway
-   Figma
-   API testing and development tools

### Integrations

Depending on project requirements, we integrate services such as:

-   Email delivery
-   Payment providers
-   File storage
-   Authentication services
-   External APIs
-   Blockchain and Web3 services

## Engineering Principles

### Build for the real requirement

We start with the problem, users, and business requirements before
choosing the implementation.

### Keep software maintainable

Readable code, clear project structure, reusable components, and
sensible abstractions make future development easier.

### Prefer proven technology

We use modern technologies where they provide real value, while avoiding
unnecessary complexity.

### Security by design

Secrets, authentication, authorization, validation, data handling, and
external integrations are treated as core parts of development rather
than afterthoughts.

### Performance matters

We aim for fast-loading interfaces, efficient APIs, optimized assets,
and practical performance across devices.

### Ship, measure, improve

A product should evolve. We prefer an iterative approach where features
can be improved based on actual usage and requirements.

## Our Development Workflow

A typical project follows a process such as:

``` text
Requirements
     ↓
Planning
     ↓
UI / UX Design
     ↓
Frontend Development
     ↓
Backend & API Development
     ↓
Database Integration
     ↓
Testing & Review
     ↓
Deployment
     ↓
Maintenance & Improvements
```

The exact process is adapted to the size and requirements of each
project.

## Projects

OxCodx develops and experiments with products across areas including:

-   Business web applications
-   SaaS platforms
-   Administrative systems
-   Customer-facing websites
-   Data and workflow systems
-   Web3 applications
-   Internal business tools
-   Custom software solutions

For selected projects and case studies, visit the official website.

## Careers

We are interested in connecting with developers, designers, technical
professionals, and other people who enjoy building useful software.

For current opportunities, visit the careers section of our website.

## Contact

**Website:** https://oxcodx.com

For business inquiries, project discussions, partnerships, or technical
services, use the contact form on the website.

## Repository

This repository contains the source code for the OxCodx website and/or
related company software.

> **Note:** This repository may contain proprietary source code and
> internal implementation details. Please review the repository's
> license and access permissions before copying, modifying, or
> redistributing any part of the codebase.

## Environment Variables

For local development, create a `.env.local` file and configure the
required environment variables.

Example:

``` env
RESEND_API_KEY=
```

Never commit real API keys, passwords, tokens, or other secrets to Git.

Use environment variables in deployment platforms such as Vercel for
production secrets.

## Local Development

### Prerequisites

-   Node.js 18.18+ or a compatible current LTS version
-   npm
-   Git

### Installation

Clone the repository:

``` bash
git clone <repository-url>
cd <project-directory>
```

Install dependencies:

``` bash
npm install
```

Create your local environment file:

``` bash
cp .env.example .env.local
```

Add the required environment values to `.env.local`.

### Run the development server

``` bash
npm run dev
```

Then open:

``` text
http://localhost:3000
```

### Production build

Before deployment, verify the production build locally:

``` bash
npm run build
```

To run the production build locally:

``` bash
npm run start
```

## Deployment

The website is designed to be deployable on modern hosting platforms
such as Vercel.

A typical production flow is:

``` text
GitHub
   ↓
Vercel
   ↓
Production Build
   ↓
oxcodx.com
```

Production environment variables should be configured through the
deployment platform rather than committed to the repository.

## Security

If you discover a security issue, please do not publish sensitive
details in a public issue.

Contact the OxCodx team privately so the issue can be reviewed and
addressed responsibly.

## License

Unless otherwise stated, the source code and assets in this repository
are proprietary to OxCodx.

No permission is granted to copy, redistribute, modify, or use the code
or assets for commercial purposes without prior written permission.

Third-party libraries remain subject to their respective licenses.

------------------------------------------------------------------------

**OxCodx**\
*Build. Improve. Scale.*

https://oxcodx.com
