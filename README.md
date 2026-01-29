# LifeDash

Your life, organized. A local-first personal dashboard for habits, tasks, schedule, journal, and goals.

## Stack

- **SvelteKit 2** + **Svelte 5** — framework
- **TypeScript** — type safety
- **Tailwind CSS 4** — utility-first styling
- **Skeleton UI** (cerberus theme) — component library
- **Jazz** (jazz-tools + jazz-svelte) — local-first sync and storage via CoValues
- **PWA** — installable, offline-capable

## Structure

```
src/
├── lib/
│   ├── components/    Nav, Footer, shared UI
│   ├── schema.ts      Jazz CoValue definitions
│   └── styles/        global.css (Tailwind + Skeleton)
├── routes/
│   ├── +layout.svelte Sidebar layout
│   ├── +page.svelte   Dashboard
│   ├── habits/        Habit tracker
│   ├── schedule/      Calendar / daily view
│   ├── tasks/         Todo list
│   ├── journal/       Mood & reflections
│   ├── goals/         Goal tracking
│   └── settings/      Preferences
└── service-worker.ts  PWA offline support
```

## Setup

```bash
cp .env.example .env
# Add your Jazz peer URL key
npm install
npm run dev
```

## Learning Roadmap

See `PLAN.md` for the phased build plan.
