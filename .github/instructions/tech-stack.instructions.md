---
applyTo: "**"
---

# Tech Stack & Dependencies

## Core Framework

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript 5
- **Package Manager**: pnpm (specified in packageManager field)
- **Runtime**: Node.js 22 with React 19

## Content Platform

- **CMS**: Sanity v4 (`sanity` + Studio under `/src/app/studio`)
- **Sanity Integration**: `next-sanity` v11 for GROQ queries and live previews
- **Asset Pipeline**: `@sanity/image-url` v1 for responsive image builders

## Styling & UI

- **Styling**: Tailwind CSS v4 across the public-facing app
- **PostCSS**: `@tailwindcss/postcss` for processing
- **UI Library**: React 19 with built-in components
- **Component Styling**: `styled-components` v6 scoped to the embedded Sanity Studio under `/studio`

## Utilities

- **Date Handling**: `dayjs` v1 for lightweight formatting and parsing
- **Data Validation**: `zod` v4 for schema validation and type inference
- **Code Syntax Highlighting**: `highlight.js` v11 for syntax highlighting in code blocks

## Error Tracking & Monitoring

- **Sentry**: `@sentry/nextjs` v10 for error tracking, performance monitoring, and session replay
  - Includes `import-in-the-middle` and `require-in-the-middle` for automatic instrumentation

## Analytics & Performance

- **Analytics**: `@vercel/analytics` v1 for privacy-friendly metrics
- **Performance Insights**: `@vercel/speed-insights` v1 for runtime telemetry

## Development Tools

### Linting & Formatting

- **ESLint**: v9 with Next.js config and Prettier integration
  - `@next/eslint-plugin-next`: v15.5+ for Next.js specific rules
  - `eslint-config-next`: v15.5+ for Next.js ESLint configuration
  - `eslint-config-prettier`: v10.1+ for Prettier integration
  - `eslint-plugin-react-hooks`: v5.2+ for React Hooks rules
  - `@eslint/eslintrc`: v3.3+ for legacy config support
- **Prettier**: v3.6+ with Tailwind plugin and import sorting
- **Import Sorting**: `@trivago/prettier-plugin-sort-imports` v5.2+

### TypeScript & Development

- **TypeScript**: v5.9+ with strict type checking
- **Type Definitions**:
  - `@types/node`: v24.3+ for Node.js types
  - `@types/react`: v19.1+ for React types
  - `@types/react-dom`: v19.1+ for React DOM types

### Testing

- **E2E Testing**: `@playwright/test` v1.55+ for end-to-end browser testing
