<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

Next.js 16 App Router client for HireLoop. Not a monorepo; everything sits at the repo root and `@/*` maps to it (`@/app`, `@/components`, `@/lib`). `CLAUDE.md` is just `@AGENTS.md`.

## Commands

- `npm run dev` — dev server. It rewrites the managed block above; commit it, don't delete it.
- `npm run lint` — plain `eslint` (flat config + `eslint-config-next`), not `next lint`. **It exits 1 today** because of a pre-existing `react-hooks/set-state-in-effect` error in `hooks/use-mobile.ts` (shadcn-generated), plus ~12 unused-import warnings. Make sure your own files are clean; don't clean up unrelated warnings inside another task.
- `npm run typecheck` — `tsc --noEmit`; currently passes.
- `npm run build` — the only integration check. `next build` (Turbopack) currently succeeds and prints expected Better Auth warnings about missing Google/GitHub credentials.
- `npm run format` — Prettier over **all** `**/*.{ts,tsx}` (not `.js`/`.mjs`/`.css`). Much of `lib/` and several components are currently not Prettier-formatted, so a repo-wide run creates a huge unrelated diff. Format only touched files: `npx prettier --write <paths>`.
- No tests, no test runner, no CI, no pre-commit hooks. Local order is `npm run format && npm run lint && npm run typecheck`, with `npm run build` as the real gate.

## Backend dependency

The app has no jobs database of its own — it calls a separate Express API in the sibling repo `../hireloop-server` (`index.js`, port 5000, MongoDB). Endpoints used: `GET /jobs` (query string carries filters), `POST /jobs`, `DELETE /jobs/:id`. Base URL is `process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"` in `lib/api/jobs.ts` and `lib/actions/jobs.ts`. Job pages fail at runtime if that server isn't running.

`lib/actions/jobs.ts` is misleadingly named: it contains plain `fetch` helpers, not Next.js server actions (no `"use server"`).

## Auth (better-auth + MongoDB)

- Server config `lib/auth.ts`, client `lib/auth-client.ts`, catch-all handler `app/api/auth/[...all]/route.ts` (`toNextJsHandler`). The Mongo database name is hardcoded to `hire-loop`.
- `user.role` is an additional field (`seeker | recruiter | admin`, default `seeker`, `input: true`), re-exposed to the client through `inferAdditionalFields<typeof auth>()`. `Navbar` and `DashboardSidebar` route on `session.user.role` and fall back to `seeker` when signed out.
- Signup lets anyone self-select `admin`. Treat it as a known product bug, not a pattern to copy.
- `.env` (gitignored) currently defines only `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `NEXT_PUBLIC_BASE_URL`. `lib/auth.ts` reads `GOOGLE_CLIENT_ID/SECRET` and `GITHUB_CLIENT_ID/SECRET`, and `lib/auth-client.ts` reads `NEXT_PUBLIC_BETTER_AUTH_URL`; all of those are unset, so social login buttons are non-functional placeholders and `next build` warns.

## UI / styling

- shadcn/ui uses style `base-nova`, built on **Base UI** (`@base-ui/react`), not Radix. Add components with `npx shadcn@latest add <name>` (config `components.json`, output `components/ui/`). There is no `asChild`: use `render` (`<AlertDialogTrigger render={<Button />} />`). Don't add `@radix-ui/react-*`.
- Tailwind v4: there is no `tailwind.config`. Tokens/theme live in `app/globals.css` (`@theme` / CSS variables); PostCSS is wired in `postcss.config.mjs`. Custom colors/fonts are CSS edits.
- `.prettierrc`: no semicolons, double quotes, LF, 80 cols, `prettier-plugin-tailwindcss` sorting classes against `app/globals.css` (with `cn` and `cva` as class functions). Some existing files still use single quotes/semicolons; follow the config for new code.
- `cn` is the `cn` npm package (re-exported by `lib/utils.ts`), not clsx + tailwind-merge.

## Layout & routing gotchas

- Root layout renders `Navbar`, `ThemeProvider` (next-themes) and sonner `<Toaster position="top-right" />`; `app/dashboard/layout.tsx` adds the sidebar but still inherits that global Navbar. Don't add a second theme provider or toaster.
- Next 16: `params` and `searchParams` are Promises — await them (see `app/browse-jobs/page.tsx`).
- Implemented routes: `/`, `/browse-jobs`, `/signin`, `/signup`, `/dashboard/{seeker,recruiter,admin}`, `/dashboard/recruiter/{add-jobs,manage-jobs}`. `/company`, `/pricing`, `/profile` and `/forgot-password` are linked but do not exist, and most `DashboardSidebar` URLs are wrong (`/dashboard/seeker/dashboard`, `/dashboard/seeker/dashboard/seeker/jobs`, `/dashboard/dashboard/admin/jobs`, …). The sidebar is not a reliable map of the app.
- Only `public/` is served at `/`. Assets in `app/images/` must be statically imported (`import logo from "@/app/images/logo.png"`), as `Navbar.tsx` does.
- Job type is duplicated: `app/types/jobdata.types.ts`, plus a second, richer `JobDataType` declared and exported from `app/dashboard/recruiter/manage-jobs/page.tsx`, which `DeleteJobDialog` imports its type from. Reuse one of these instead of adding a third.
