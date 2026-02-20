# Paletti — Agent Rules

## Self-Maintenance

This file is **agent-managed**. Agents should proactively update it when:

- A conversation or implementation reveals a pattern, gotcha, or convention worth preserving.
- An existing learning turns out to be wrong or outdated and needs correcting.
- The user explicitly asks to "remember this" for future sessions.

When updating, add or edit entries in the [Learnings](#learnings) section at the bottom of this file. Keep entries concise (one to two lines). Prefix each with a date. Remove entries that are superseded.

## Stack

- React 19, TypeScript (strict), Tailwind CSS v4, Vite 7
- Runtime & package manager: Bun
- No routing, no SSR — single-page app

## Code Style

- **Prettier is the formatter.** Always run `bun run format` before committing.
- Config lives in `.prettierrc` — do not override inline.
- Single quotes, semicolons, trailing commas, 120-char print width.
- Tailwind class order is enforced by `prettier-plugin-tailwindcss`.

## Linting

- ESLint flat config (`eslint.config.js`) with `typescript-eslint` and `eslint-plugin-react-hooks`.
- `eslint-config-prettier` disables formatting rules — Prettier owns formatting, ESLint owns correctness.
- `bun run lint` always runs with `--fix`. Zero warnings policy.

## TypeScript

- Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`.
- No `any` — use `unknown` and narrow.
- Prefer explicit return types on exported functions.
- Always use type imports (`import type` or inline `type` keyword). Enforced by `@typescript-eslint/consistent-type-imports`.

## React

- Functional components only, named exports preferred for components.
- Default export only for `App.tsx`.
- Colocate component files in `src/components/`.
- Use Tailwind utility classes directly — no CSS modules, no styled-components.

## File Conventions

- All source code in `src/`.
- One component per file, filename matches the component name (PascalCase).
- Use `.tsx` for files with JSX, `.ts` otherwise.

## Commits

- Run `bun run format` and `bun run lint` before every commit.
- Keep commits small and focused.

---

## Learnings

<!-- Agent-managed section. Do not remove this heading. -->

- **2026-02-20**: Sandbox restrictions block `git init` — use `required_permissions: ["all"]` for git operations.
- **2026-02-20**: `bun install` with major version bumps can stall under network sandbox — rerun with full permissions when it hangs.
