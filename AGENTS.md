# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router project. Application source lives in `app/`: `layout.tsx` defines the root layout, `page.tsx` is the home route, `globals.css` contains global styles, and route-specific styles can live beside components as CSS modules such as `page.module.css`. Static files belong in `public/` and are served from the site root. Root configuration files include `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `package.json`. Do not edit or commit generated output such as `.next/` or `node_modules/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js development server, usually at `http://localhost:3000`.
- `npm run build`: create a production build and catch compile-time issues.
- `npm run start`: serve the production build after running `npm run build`.
- `npm run lint`: run ESLint with Next.js Core Web Vitals and TypeScript rules.

Use `npm install` to restore dependencies from `package-lock.json`.

## Coding Style & Naming Conventions

Write TypeScript React components using functional components and named exports where reusable. Keep route files aligned with App Router conventions: `page.tsx`, `layout.tsx`, and colocated component files when routes grow. Use 2-space indentation, double quotes, and semicolons, matching the existing config style. Prefer Chakra UI components and responsive props for layout and styling; keep CSS modules for route-local styles only when Chakra props are not a good fit. Name React components in `PascalCase`, hooks in `useCamelCase`, and utility functions in `camelCase`.

## Testing Guidelines

No test framework is currently configured. Before opening a pull request, run `npm run lint` and `npm run build`. If tests are added, place component tests near the component or under `__tests__/`, use `*.test.ts` or `*.test.tsx`, and document the test command in `package.json`.

## Commit & Pull Request Guidelines

The current history uses Conventional Commit style, for example `feat: initialize Next.js project with TypeScript and ESLint`. Continue using concise messages like `feat: add dashboard shell`, `fix: correct table pagination`, or `chore: update lint config`.

Pull requests should include a short summary, testing notes with command output or failures, linked issues when applicable, and screenshots for visible UI changes. Keep changes focused; avoid bundling unrelated refactors with feature work.

## Agent-Specific Instructions

Respect existing user changes in the worktree. Do not modify generated folders such as `.next/` or `node_modules/`. For UI work, prioritize accessible, mobile-first Chakra UI patterns and responsive table behavior with TanStack Table when tabular data is introduced.
