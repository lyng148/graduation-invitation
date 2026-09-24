# Next.js Boilerplate

A clean, modern, and minimal boilerplate built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

## Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [Bun](https://bun.sh/) or [npm](https://www.npmjs.com/)

## Getting Started

Install dependencies:

```bash
bun install
# or
npm install
```

Start the development server:

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run typecheck` - Run TypeScript type checking

## Project Structure

```
├── app/
│   ├── globals.css    # Tailwind CSS and global styles
│   ├── layout.tsx     # Root layout & metadata
│   └── page.tsx       # Home page
├── public/            # Static assets
├── next.config.ts     # Next.js configuration
├── postcss.config.mjs # PostCSS / Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies & scripts
```
