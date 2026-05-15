# TanStack Start Convex SaaS Template

A private starter template for building SaaS-style web apps with TanStack Start, React, Convex, Tailwind CSS v4, Zod, Dodo Payments, Cloudflare Workers, and Wrangler.

## Stack

- TanStack Start and TanStack Router
- React 19
- Convex database, functions, HTTP routes, and Convex Auth
- Tailwind CSS v4 with shadcn-style primitives
- Resend email delivery through Convex actions and email templates
- Zod for form and environment validation
- Dodo Payments checkout, portal, subscriptions, and webhook handling
- Cloudflare Workers deployment through Wrangler
- Bun, TypeScript, and Biome

## Start a New App

```bash
gh repo create my-new-app --private --template AdemBenAbdallah/tanstack-start-convex-saas-template --clone
cd my-new-app
bun install
cp .env.example .env.local
bunx convex dev
bun run dev
```

## Required Setup

1. Create a Convex deployment and set `VITE_CONVEX_URL`.
2. Configure Convex Auth secrets and optional Google OAuth credentials.
3. Create Dodo products for each plan and set the product IDs.
4. Add the Dodo webhook URL in Dodo: `https://<your-convex-site>/api/webhooks/dodo-payments`.
5. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` for email delivery if your app sends mail.
6. For production, fill `.env.production` and run `bun run deploy`.

## Useful Commands

```bash
bun run dev
bun run convex:dev
bun run typecheck
bun run check
bun run build
bun run deploy
```

## What to Customize First

- `src/lib/app-config.ts` for app name and navigation.
- `src/lib/billing.ts` for plan names, pricing, limits, and product env names.
- `convex/schema.ts` for your product tables.
- `convex/sendEmails.ts` and `convex/emails/` for generic Resend templates.
- `src/routes/dashboard.tsx` for your first authenticated app surface.
