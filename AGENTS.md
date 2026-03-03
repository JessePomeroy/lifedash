# AGENTS.md — lifedash

Personal dashboard project for Jesse Pomeroy.

---

## Stack

- **Framework:** SvelteKit (Svelte 5, runes mode)
- **UI:** Skeleton UI v2 (`@skeletonlabs/skeleton-svelte`)
- **Styling:** Tailwind 4

---

## Critical Rules

### Svelte 5 runes — always
- Use `$state`, `$derived`, `$effect`, `$props` — not legacy Options API
- Use `$app/state` for page store — NOT `$app/stores`
- No `export let` for props — use `let { prop } = $props()`

### Skeleton UI
- Import components from `@skeletonlabs/skeleton-svelte`
- Tailwind dark mode is class-based — check `dark` is on `<html>`

### Git
- Remote: `https://github.com/jessepomeroy/lifedash.git`
- Branch: `main`
- Do NOT push to `main` without explicit instruction from Jesse

---

## Commands

```bash
pnpm dev          # Dev server
pnpm build        # Production build
pnpm svelte-check # Type-check Svelte files
```
