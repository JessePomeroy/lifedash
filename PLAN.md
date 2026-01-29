# LifeDash — Build Plan

**Stack:** SvelteKit 2 (Svelte 5) · Tailwind CSS · Neo Svelte (primary component library) · Jazz (local-first sync) · PWA

> **UI note:** Neo Svelte (`@dvcol/neo-svelte`) is the component library for this project — neumorphism + glassmorphism design. Use it for cards, inputs, buttons, modals, progress bars, sliders, and all interactive components. Docs: <https://github.com/dvcol/neo-svelte> · Live demo: <https://dvcol.github.io/neo-svelte>
>
> **Color theme: Glacial Blue** — icy, cool, frosted. Think frozen glass, aurora borealis, deep glacier caves.
> - Background: deep navy/near-black (`#0a0f1a`, `#0d1321`)
> - Surface/cards: frosted blue-gray (`rgba(100, 160, 220, 0.08)` with `backdrop-blur`)
> - Primary accent: glacial blue (`#60a5fa`, `#38bdf8`)
> - Secondary accent: aurora teal (`#22d3ee`, `#06b6d4`)
> - Muted text: frosty gray (`#94a3b8`, `#64748b`)
> - Success (habits complete): icy green (`#34d399`)
> - Borders: frosted edge (`rgba(148, 197, 248, 0.12)`)
> - Heatmap gradient: deep blue → glacial blue → bright cyan (⬛🟦🔵💎)
>
> The whole app should feel like looking through frosted ice — cool, calm, and crisp.
>
> **Approach:** Teacher mode. Each phase explains *why* before *how*. Build understanding, not just features. Every phase should result in something visible and testable. Responsiveness is a priority at every stage — test mobile and desktop as you go.

---

## Phase 1: Get Running + Layout

**Goal:** App runs, sidebar nav works, dark theme looks right on all screen sizes.

**Tasks:**
- [ ] `npm run dev` — verify it builds
- [ ] Understand the layout structure: sidebar on desktop, top bar on mobile
- [ ] Style tweaks — make it feel like *your* app
- [ ] Add mobile menu toggle (hamburger → slide-out nav)
- [ ] Set up Neo Svelte — wrap app in `NeoThemeProvider`, verify components render
- [ ] Replace Skeleton components with Neo Svelte equivalents (buttons, cards, inputs)

**Learn:**
- [SvelteKit Routing](https://svelte.dev/docs/kit/routing)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Neo Svelte](https://github.com/dvcol/neo-svelte) · [Live Demo](https://dvcol.github.io/neo-svelte)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)

---

## Phase 2: Jazz Setup

**Goal:** Understand local-first data. Wire up JazzProvider. Create and read a simple CoValue.

**Tasks:**
- [ ] Read Jazz docs — understand CoMap, CoList, co.ref
- [ ] Set up JazzProvider in +layout.svelte
- [ ] Create a test CoValue and display it
- [ ] Understand how data persists locally and syncs

**Learn:**
- [Jazz Documentation](https://jazz.tools/docs)
- [jazz-svelte](https://github.com/garden-co/jazz/tree/main/packages/jazz-svelte)
- [CoValues Explained](https://jazz.tools/docs/using-covalues/comap)

---

## Phase 3: Habits

**Goal:** Full habit tracker — create, view, check off daily, see streaks.

**Tasks:**
- [ ] Create habit form (name, frequency, color)
- [ ] List habits with daily check-in toggles
- [ ] Persist HabitEntry for each day
- [ ] Calculate and display streaks
- [ ] Responsive: card grid on desktop, stacked on mobile

**Learn:**
- [Svelte 5 Reactivity](https://svelte.dev/docs/svelte/$state)
- Date handling in JS (consider `date-fns` if needed)

---

## Phase 4: Tasks

**Goal:** Todo list with priorities, due dates, and completion.

**Tasks:**
- [ ] Task creation form (title, description, priority, due date)
- [ ] Task list with sorting (priority, due date, created)
- [ ] Mark complete / delete
- [ ] Filter: all, active, completed
- [ ] Responsive list layout

**Learn:**
- Svelte 5 `$derived` for computed lists
- Sorting and filtering patterns

---

## Phase 5: Schedule

**Goal:** Calendar view with event creation and daily/weekly views.

**Tasks:**
- [ ] Daily view — time slots with events
- [ ] Weekly view — 7-day overview
- [ ] Event creation (title, time, category, recurring)
- [ ] Color-code by category
- [ ] Responsive: scroll horizontally on mobile for weekly

**Learn:**
- CSS Grid for calendar layouts
- Time manipulation and formatting

---

## Phase 6: Journal

**Goal:** Mood logging with rich text entries and tag filtering.

**Tasks:**
- [ ] Journal entry form (mood 1-5 with emoji scale, content, tags)
- [ ] Entry list with date grouping
- [ ] Filter by mood, tag, date range
- [ ] Mood visualization (simple chart over time)
- [ ] Responsive entry cards

**Learn:**
- Textarea handling in Svelte
- Simple SVG or canvas charts

---

## Phase 7: Goals

**Goal:** Goal setting with milestones and progress tracking.

**Tasks:**
- [ ] Goal creation (title, description, target date)
- [ ] Add milestones to goals
- [ ] Progress bar (auto-calculated from milestones or manual)
- [ ] Goal detail view
- [ ] Responsive cards with progress indicators

**Learn:**
- Nested CoValues (Goal → MilestoneList)
- Progress visualization with CSS/SVG

---

## Phase 8: Dashboard

**Goal:** Aggregate stats from all features into a daily overview.

**Tasks:**
- [ ] Today's habit completion rate
- [ ] Open tasks count and overdue count
- [ ] Latest mood entry
- [ ] Upcoming events (next 24h)
- [ ] Goal progress summaries
- [ ] Responsive stat cards grid

**Learn:**
- Cross-feature data aggregation
- Dashboard design patterns

---

## Phase 9: PWA

**Goal:** Installable app with offline support.

**Tasks:**
- [ ] Verify service worker caches assets
- [ ] Test offline functionality (Jazz handles data offline)
- [ ] Add install prompt UI
- [ ] App icons (192px, 512px)
- [ ] Test on mobile — add to home screen
- [ ] Consider push notifications for habit reminders

**Learn:**
- [SvelteKit Service Workers](https://svelte.dev/docs/kit/service-workers)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

---

## Phase 10: Polish

**Goal:** Make it feel professional and delightful.

**Tasks:**
- [ ] Page transitions (Svelte transitions or View Transitions API)
- [ ] Micro-animations (check-off, streak flames, mood emoji)
- [ ] Dark/light mode toggle (extend beyond cerberus)
- [ ] Loading states and placeholder screens
- [ ] **Habit heatmap** — GitHub-style contribution graph for each habit (grid of colored squares showing daily completion over weeks/months). Build as a reusable `<HeatmapGrid>` component. Color intensity = streak strength or completion rate. Show on the Dashboard and individual Habit detail pages
- [ ] Error boundaries
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility pass (keyboard nav, screen readers)

**Learn:**
- [Svelte Transitions](https://svelte.dev/docs/svelte/transition)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- Lighthouse and Core Web Vitals

---

## Key Docs

| Topic | Link |
|-------|------|
| SvelteKit | https://svelte.dev/docs/kit |
| Svelte 5 | https://svelte.dev/docs/svelte |
| Tailwind CSS 4 | https://tailwindcss.com/docs |
| Neo Svelte | https://github.com/dvcol/neo-svelte |
| Jazz | https://jazz.tools/docs |
| MDN PWA | https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps |
