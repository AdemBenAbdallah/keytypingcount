# Project Instructions

This project uses Convex as its backend.

When editing Convex code, always read `convex/_generated/ai/guidelines.md` first if it exists. If generated AI guidelines have not been installed yet, run:

```bash
npx convex ai-files install
```

Use the local patterns in this template for auth, billing, schema indexes, and Cloudflare deployment.

## Stack

- TanStack Start with TanStack Router file routes
- React
- Tailwind CSS v4
- Convex
- Zod
- Dodo Payments
- Cloudflare Workers and Wrangler
- TypeScript
- Biome

## Quality Bar

After meaningful changes, run:

```bash
bunx biome check "<changed files>"
bun run typecheck
bun run build
```
