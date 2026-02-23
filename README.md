# Paletti

Paletti is a small React + Tailwind CSS styleguide app for designing and previewing color palettes.
It helps you explore primary/secondary scales and semantic UI colors in both light and dark mode.

## What It Is Used For

- Building and tuning a design system color palette
- Previewing semantic colors (background, foreground, accent, etc.) in real UI blocks
- Iterating quickly on palette values with instant visual feedback

## Tech Stack

- React 19 + TypeScript (strict)
- Tailwind CSS v4
- Vite 7
- Bun (recommended runtime + package manager)

## Setup

### 1) Install Bun

Follow the official Bun install guide: `https://bun.sh`

### 2) Install dependencies

```bash
bun install
```

### 3) Start local development server

```bash
bun run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Available Scripts

- `bun run dev` — start Vite dev server
- `bun run build` — type-check and build production assets
- `bun run preview` — preview the production build locally
- `bun run lint` — run ESLint with auto-fixes
- `bun run format` — format code with Prettier
- `bun run format:check` — check formatting without writing changes

## Recommended Workflow

For local development, Bun is the recommended runtime and package manager for this repo:

1. `bun install`
2. `bun run dev`
3. before committing: `bun run format` and `bun run lint`
