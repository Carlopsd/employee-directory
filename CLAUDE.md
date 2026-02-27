# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server (localhost:5173)
npm run mock       # JSON Server mock API on port 3001
npm run build      # TypeScript type-check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build
```

Run `npm run dev` and `npm run mock` simultaneously for full local development.

## Architecture

**Stack:** React 19 + TypeScript, Vite 7, Redux Toolkit (with RTK Query), React Hook Form + Zod, TanStack Table, Tailwind CSS v4

**Source layout (`src/`):**

- `main.tsx` — Entry point; wraps `<App>` in Redux `<Provider>`
- `store/store.ts` — Redux store with exported `RootState` and `AppDispatch` types
- `features/` — Feature modules (employees, departments, etc.)
- `shared/components/` — Reusable UI components

**Mock API (`db.json`):** JSON Server serves `/employees` and `/departments` on port 3001. Employee fields: `id`, `firstName`, `lastName`, `email`, `position`, `department`, `startDate`, `status`.

## Key Conventions

- **Tailwind CSS v4** — uses `@import "tailwindcss"` in `index.css` with the Vite plugin (no tailwind.config file)
- **TypeScript strict mode** — `noUnusedLocals`, `noUnusedParameters`, and `verbatimModuleSyntax` are enabled
- **ESM only** — `"type": "module"` in package.json; use `import type` for type-only imports (required by `verbatimModuleSyntax`)
- **Comments** — Use comments sparingly; only comment complex code

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch); always add proper TypeScript types for request and response on every endpoint
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Documentation Lookup

- Always use context7 to check up-to-date docs when implementing or modifying code that uses RTK Query, React Hook Form, Zod, TanStack Table, or any third-party library

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development