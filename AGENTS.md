<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Halden – notes for AI coding agents

Halden is a static Next.js marketing site template (AI front desk for clinics). Read this before changing code.

## Stack

- Next.js 16 App Router, `cacheComponents: true`: every route must prerender as static (○). No `cookies()`, `headers()`, `searchParams`, `Date.now()`/`new Date()` or `Math.random()` while rendering Server Components. File-system reads go in `"use cache"` functions (`src/lib/blog.ts`).
- React 19 Server Components by default; `"use client"` only for small interactive leaves.
- Tailwind CSS 4 (tokens in `src/app/globals.css`), TypeScript strict, ESLint (`eslint-config-next`).
- MDX via `@next/mdx` (frontmatter → `export const frontmatter`, heading ids via `rehype-slug`).
- Fonts: Geist + Geist Mono via `next/font` (`src/app/fonts.ts`). Images: `next/image` with static imports.
- Motion: CSS + `src/components/motion/*` (no animation library). Smooth wheel scrolling with Lenis.

## Commands

```bash
npm run dev        # http://localhost:3000
npm run lint       # must report 0 problems
npm run typecheck  # must report 0 errors
npm run build      # every route static, no warnings
```

## Where things live

| What | Where |
| --- | --- |
| Site name, nav, footer, socials, CTA | `src/config/site.ts` |
| Page text and data | `src/config/pages/*.ts` |
| Tokens (colours, type scale, radii, shadows) | `src/app/globals.css` |
| Metadata helper | `src/lib/seo.ts` → `pageMetadata()` in every `page.tsx` |
| Blog / legal content | `src/content/blog/*.mdx`, `src/content/legal/*.mdx` |

## Rules

- No hard-coded copy in components – put it in `src/config/pages/<page>.ts`.
- Follow the Vercel Web Interface Guidelines: Title Case for buttons and nav, visible focus, real `button`/`a`, labels on inputs, reduced-motion safe animations, no layout shift.
- Scroll reveals: `data-reveal`, `data-stagger`, `data-count` (see `Motion.tsx`); never on above-the-fold content (use `hero-reveal` or `<SplitText trigger="load">`).
