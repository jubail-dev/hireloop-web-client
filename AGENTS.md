<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

Single Next.js 16 App Router app (not a monorepo). Everything is at the repo root; `@/*` maps to the root (`@/app`, `@/components`, `@/lib`).

## Commands

- `npm run dev` — dev server. It also (re)writes the managed block above; commit it, don't delete it.
- `npm run lint` — plain `eslint` (flat config + `eslint-config-next`). There is no `next lint`.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier over `**/*.{ts,tsx}` only. Config: **no semicolons**, double quotes, LF, plus `prettier-plugin-tailwindcss` which reorders Tailwind classes.
- **No tests and no test runner exist.** `npm run build` is the only integration check.
- No CI and no pre-commit hooks — you must run lint/typecheck/format yourself, in that order (`npm run format && npm run lint && npm run typecheck`).

## Stack facts that change how you write code

- **shadcn/ui uses style `base-nova`, built on Base UI (`@base-ui/react`), not Radix.** Add components with `npx shadcn@latest add <name>` (config in `components.json`, output in `components/ui/`). Consequences:
  - Base UI components have **no `asChild`** — use the `render` prop instead (`<Button render={<Link href="/" />}>`). `components/shared/Navbar.tsx` currently uses `asChild` and is the reason `npm run typecheck` fails today; fix it rather than adding Radix-style APIs.
  - Don't add `@radix-ui/react-*` dependencies; primitives come from `@base-ui/react`.
  - `cn` is the `cn` npm package (re-exported by `lib/utils.ts` and imported directly in some UI files) — not clsx + tailwind-merge.
- **Tailwind v4: there is no `tailwind.config`.** Tokens/theme live in `app/globals.css` (`@theme`, CSS variables); PostCSS is wired in `postcss.config.mjs`. Custom colors/fonts are CSS edits, not config edits.
- **Auth = better-auth + MongoDB.** Server config `lib/auth.ts`, client `lib/auth-client.ts`, catch-all handler `app/api/auth/[...all]/route.ts` exporting `GET`/`POST` via `toNextJsHandler`.
  - `.env` is gitignored; it defines `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`.
  - Known issues: `lib/auth-client.ts` reads `process.env.BETTER_AUTH_URL` from client code, where only `NEXT_PUBLIC_*` vars are inlined (harmless today — better-auth falls back to same-origin). `GOOGLE_CLIENT_ID/SECRET` and `GITHUB_CLIENT_ID/SECRET` are read by `lib/auth.ts` but absent from `.env`, so `next build` warns and social login won't work until they're added.

## Other gotchas

- **Only `public/` is served at `/`** — files in `app/images/` are not routable. `Navbar.tsx` works around this with a static import (`import logo from "@/app/images/logo.png"`); new images must either go in `public/` or be statically imported the same way. Asset sizes: `logo.png` = 154×44 wordmark, `cta-bg.png` = 1440×964 grid dome, `globe.png` = 1440×1882.
- Navbar links to routes that don't exist yet (`/jobs`, `/company`, `/pricing`, `/signin`, `/get-started`); only `/` is implemented.
- Root layout already wraps everything in `components/theme-provider.tsx` (next-themes) — don't add a second provider.
