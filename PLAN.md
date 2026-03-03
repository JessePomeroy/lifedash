# LifeDash — Complete Bootcamp Guide

**Stack:** SvelteKit 2 (Svelte 5) · Tailwind CSS · Neo Svelte · Jazz (local-first sync) · PWA

> **Approach:** Teacher mode. Each phase explains *why* before *how*. Build understanding, not just features. Every phase results in something visible and testable.

---

# Table of Contents

1. [Tailwind CSS Primer](#tailwind-css-primer)
2. [Architecture & Why Jazz](#architecture--why-jazz)
3. [Phase 1: Get Running + Layout](#phase-1-get-running--layout)
4. [Phase 2: Jazz Setup](#phase-2-jazz-setup)
5. [Phase 3: Habits](#phase-3-habits)
6. [Phase 4: Tasks](#phase-4-tasks)
7. [Phase 5: Schedule](#phase-5-schedule)
8. [Phase 6: Journal](#phase-6-journal)
9. [Phase 7: Goals](#phase-7-goals)
10. [Phase 8: Dashboard](#phase-8-dashboard)
11. [Phase 9: PWA](#phase-9-pwa)
12. [Phase 10: Polish](#phase-10-polish)
13. [Alternative: Using Convex](#alternative-using-convex)
14. [Glossary](#glossary)
15. [Cheat Sheets](#cheat-sheets)

---

# Design System

> **Color theme: Glacial Blue** — icy, cool, frosted. Think frozen glass, aurora borealis, deep glacier caves.

```
Background:     #0a0f1a, #0d1321 (deep navy/near-black)
Surface/Cards:  rgba(100, 160, 220, 0.08) + backdrop-blur (frosted blue-gray)
Primary:        #60a5fa, #38bdf8 (glacial blue)
Secondary:      #22d3ee, #06b6d4 (aurora teal)
Muted Text:     #94a3b8, #64748b (frosty gray)
Success:        #34d399 (icy green)
Error:          #f87171 (soft red)
Borders:        rgba(148, 197, 248, 0.12) (frosted edge)
```

**Tailwind Custom Config:**
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        glacial: {
          bg: '#0a0f1a',
          surface: '#0d1321',
          primary: '#60a5fa',
          secondary: '#22d3ee',
          muted: '#94a3b8',
          success: '#34d399',
          error: '#f87171',
        }
      }
    }
  }
}
```

---

# Tailwind CSS Primer

## Why Tailwind?

Traditional CSS:
```html
<div class="card">Hello</div>

<style>
.card {
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>
```

Tailwind CSS:
```html
<div class="p-4 bg-white rounded-lg shadow">Hello</div>
```

**Benefits:**
- No context switching between HTML and CSS files
- No naming things (`.card-wrapper-inner-content`??)
- Consistent spacing/colors from design system
- Dead code elimination (unused styles removed automatically)
- Responsive design built-in

## Core Concepts

### Spacing Scale

Tailwind uses a consistent spacing scale:

| Class | Value | Pixels |
|-------|-------|--------|
| `p-0` | 0 | 0px |
| `p-1` | 0.25rem | 4px |
| `p-2` | 0.5rem | 8px |
| `p-3` | 0.75rem | 12px |
| `p-4` | 1rem | 16px |
| `p-6` | 1.5rem | 24px |
| `p-8` | 2rem | 32px |
| `p-12` | 3rem | 48px |
| `p-16` | 4rem | 64px |

**Directions:**
- `p-4` = padding all sides
- `px-4` = padding left + right
- `py-4` = padding top + bottom
- `pt-4` = padding top only
- `pl-4` = padding left only

Same pattern for margin (`m-`), width (`w-`), height (`h-`), gap (`gap-`).

### Colors

```html
<!-- Background -->
<div class="bg-blue-500">Blue background</div>
<div class="bg-glacial-primary">Custom glacial blue</div>

<!-- Text -->
<p class="text-gray-700">Dark gray text</p>
<p class="text-glacial-muted">Muted text</p>

<!-- Border -->
<div class="border border-gray-200">Light border</div>

<!-- Opacity variants -->
<div class="bg-blue-500/50">50% opacity blue</div>
```

### Typography

```html
<h1 class="text-4xl font-bold">Large heading</h1>
<h2 class="text-2xl font-semibold">Medium heading</h2>
<p class="text-base text-gray-600">Body text</p>
<small class="text-sm text-gray-500">Small text</small>
<span class="text-xs uppercase tracking-wide">Label</span>
```

### Flexbox

```html
<!-- Horizontal layout -->
<div class="flex items-center gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Space between -->
<div class="flex justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Centered -->
<div class="flex items-center justify-center h-screen">
  <span>Perfectly centered</span>
</div>

<!-- Column layout -->
<div class="flex flex-col gap-2">
  <div>Top</div>
  <div>Bottom</div>
</div>

<!-- Wrap -->
<div class="flex flex-wrap gap-2">
  <!-- Items wrap to next line -->
</div>
```

### Grid

```html
<!-- Equal columns -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 1 col mobile, 2 col tablet, 3 col desktop -->
</div>

<!-- Auto-fit -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
  <!-- As many 200px+ columns as fit -->
</div>
```

### Responsive Design

Tailwind is mobile-first. Unprefixed = mobile, prefixes = larger screens.

| Prefix | Min Width | Device |
|--------|-----------|--------|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

```html
<!-- Stack on mobile, side-by-side on tablet+ -->
<div class="flex flex-col md:flex-row gap-4">
  <aside class="w-full md:w-64">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>

<!-- Hidden on mobile, visible on desktop -->
<nav class="hidden lg:block">Desktop nav</nav>

<!-- Different padding per breakpoint -->
<div class="p-4 md:p-6 lg:p-8">Responsive padding</div>
```

### States

```html
<!-- Hover -->
<button class="bg-blue-500 hover:bg-blue-600">Hover me</button>

<!-- Focus -->
<input class="border focus:border-blue-500 focus:ring-2 focus:ring-blue-200">

<!-- Active -->
<button class="bg-blue-500 active:bg-blue-700">Click me</button>

<!-- Disabled -->
<button class="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
  Disabled
</button>

<!-- Group hover (parent hover affects child) -->
<div class="group">
  <span class="group-hover:text-blue-500">Hover parent to change me</span>
</div>
```

### Common Patterns

**Card:**
```html
<div class="bg-glacial-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
  <h3 class="text-lg font-semibold text-white">Card Title</h3>
  <p class="text-glacial-muted mt-2">Card content goes here.</p>
</div>
```

**Button:**
```html
<button class="px-4 py-2 bg-glacial-primary text-white rounded-lg 
               hover:bg-glacial-primary/80 transition-colors
               focus:outline-none focus:ring-2 focus:ring-glacial-primary/50">
  Click me
</button>
```

**Input:**
```html
<input 
  type="text"
  class="w-full px-4 py-2 bg-glacial-surface border border-white/10 rounded-lg
         text-white placeholder:text-glacial-muted
         focus:border-glacial-primary focus:ring-1 focus:ring-glacial-primary
         transition-colors"
  placeholder="Enter text..."
>
```

**Badge:**
```html
<span class="px-2 py-1 text-xs font-medium bg-glacial-success/20 text-glacial-success rounded-full">
  Completed
</span>
```

### Animations

```html
<!-- Transition -->
<div class="transition-all duration-200 hover:scale-105">
  Smooth hover
</div>

<!-- Specific transitions -->
<div class="transition-colors duration-150">Color only</div>
<div class="transition-transform duration-300">Transform only</div>
<div class="transition-opacity duration-500">Opacity only</div>

<!-- Built-in animations -->
<div class="animate-spin">🔄</div>
<div class="animate-pulse">Loading...</div>
<div class="animate-bounce">👇</div>
```

### Exercise: Build a Card

Before moving on, try building this card using only Tailwind:

```
┌─────────────────────────────────────┐
│  [Icon]  Habit Name           ✓    │
│          Current streak: 7 days     │
│  ████████████░░░░  75%             │
└─────────────────────────────────────┘
```

<details>
<summary>Solution</summary>

```html
<div class="bg-glacial-surface/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-glacial-primary/20 flex items-center justify-center">
        🏃
      </div>
      <div>
        <h3 class="font-semibold text-white">Habit Name</h3>
        <p class="text-sm text-glacial-muted">Current streak: 7 days</p>
      </div>
    </div>
    <button class="w-8 h-8 rounded-full bg-glacial-success flex items-center justify-center">
      ✓
    </button>
  </div>
  <div class="mt-4">
    <div class="h-2 bg-white/10 rounded-full overflow-hidden">
      <div class="h-full w-3/4 bg-glacial-primary rounded-full"></div>
    </div>
    <p class="text-right text-xs text-glacial-muted mt-1">75%</p>
  </div>
</div>
```

</details>

### Quiz: Test Your Understanding

1. What's the difference between `p-4` and `px-4`?
2. How do you make something visible only on desktop?
3. What does `md:flex-row` mean?
4. How do you add a hover state?

<details>
<summary>Answers</summary>

1. `p-4` = padding all sides, `px-4` = padding left + right only
2. `hidden lg:block` (hidden by default, block on lg screens)
3. "On medium screens and up, use flex-row" (mobile-first)
4. Prefix with `hover:`, e.g., `hover:bg-blue-600`

</details>

---

# Architecture & Why Jazz

## Data Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │  SvelteKit  │───▶│    Jazz     │───▶│   IndexedDB     │  │
│  │   (UI)      │◀───│  (Runtime)  │◀───│   (Storage)     │  │
│  └─────────────┘    └──────┬──────┘    └─────────────────┘  │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │ WebSocket (when online)
                             ▼
                    ┌─────────────────┐
                    │   Jazz Cloud    │
                    │   (Optional)    │
                    └─────────────────┘
```

## Why Jazz over Convex?

Both Jazz and Convex are modern data solutions, but they have different philosophies:

### Jazz: Local-First

```
User Action → Update Local DB → Render Immediately → Sync to Cloud (background)
```

**Pros:**
- ✅ **Instant UI updates** — No loading spinners for writes
- ✅ **Offline by default** — Works without internet
- ✅ **Privacy-focused** — Data lives on device first
- ✅ **Real-time sync** — When online, changes sync automatically
- ✅ **No server code** — Everything runs client-side
- ✅ **Free tier generous** — Sync is optional

**Cons:**
- ❌ Newer ecosystem (less documentation)
- ❌ Complex queries need client-side logic
- ❌ Storage limited by device

**Best for:** Personal apps, offline-capable apps, privacy-sensitive data

### Convex: Cloud-First

```
User Action → Send to Server → Server Updates DB → Push to Client → Render
```

**Pros:**
- ✅ **Powerful queries** — Server-side functions for complex logic
- ✅ **Real-time built-in** — Subscriptions are first-class
- ✅ **TypeScript end-to-end** — Full type safety
- ✅ **Mature tooling** — Better debugging, dashboard
- ✅ **Scalable** — Handles large datasets easily

**Cons:**
- ❌ Requires internet for writes
- ❌ Loading states needed
- ❌ Server costs at scale
- ❌ Data lives on their servers

**Best for:** Collaborative apps, complex queries, large datasets

### Why We're Using Jazz for LifeDash

LifeDash is a **personal productivity app**:
- You're the only user of your data
- Should work offline (subway, airplane)
- No complex queries (just your habits/tasks)
- Privacy matters (it's your journal)

Jazz is perfect for this. Convex would work, but we'd be fighting its cloud-first nature.

### Decision Matrix

| Factor | Jazz | Convex | Winner for LifeDash |
|--------|------|--------|---------------------|
| Offline support | ✅ Built-in | ❌ Requires work | Jazz |
| Loading states | ❌ Not needed | ✅ Required | Jazz |
| Complex queries | ❌ Client-side | ✅ Server-side | Tie |
| Multi-user collab | ✅ Built-in | ✅ Built-in | Tie |
| Setup complexity | ✅ Minimal | ✅ Minimal | Tie |
| Privacy | ✅ Local-first | ❌ Cloud-first | Jazz |
| Ecosystem maturity | ❌ Newer | ✅ More mature | Convex |

---

# Phase 1: Get Running + Layout

## Why This Phase Matters

Before building features, you need a solid foundation. The layout is your app's skeleton — every feature will live inside it. Getting this right means:
- Consistent navigation everywhere
- Responsive design from day one (not bolted on later)
- A design system you can build on

## Key Concepts

### SvelteKit File-Based Routing

```
src/routes/
├── +layout.svelte      ← Wraps ALL pages
├── +page.svelte        ← Home page (/)
├── habits/
│   ├── +page.svelte    ← /habits
│   └── [id]/
│       └── +page.svelte ← /habits/123 (dynamic)
├── tasks/
│   └── +page.svelte    ← /tasks
```

**Key insight:** `+layout.svelte` wraps all pages in its folder and subfolders. Use it for persistent UI (nav, footer).

### Svelte 5 Runes

Svelte 5 introduced "runes" — new reactive primitives:

```svelte
<script>
  // OLD Svelte 4
  let count = 0;
  $: doubled = count * 2;
  
  // NEW Svelte 5
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

| Rune | Purpose | Example |
|------|---------|---------|
| `$state()` | Reactive variable | `let x = $state(0)` |
| `$derived()` | Computed value | `let double = $derived(x * 2)` |
| `$effect()` | Side effects | `$effect(() => console.log(x))` |
| `$props()` | Component props | `let { name } = $props()` |

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      +layout.svelte                          │
│  ┌─────────────────┐  ┌───────────────────────────────────┐ │
│  │     Sidebar     │  │           Main Content            │ │
│  │                 │  │  ┌─────────────────────────────┐  │ │
│  │  🏠 Dashboard   │  │  │        <slot />             │  │ │
│  │  ✓ Habits      │  │  │    (page content here)      │  │ │
│  │  📝 Tasks      │  │  │                             │  │ │
│  │  📅 Schedule   │  │  │                             │  │ │
│  │  📓 Journal    │  │  │                             │  │ │
│  │  🎯 Goals      │  │  │                             │  │ │
│  │                 │  │  └─────────────────────────────┘  │ │
│  │  ⚙️ Settings   │  │                                   │ │
│  └─────────────────┘  └───────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Mobile: Sidebar hidden, hamburger menu toggles slide-out nav
```

## Tasks

### 1. Verify Dev Server

```bash
cd lifedash
npm install
npm run dev
```

Visit `localhost:5173`. You should see the app.

### 2. Create Layout Structure

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  
  let menuOpen = $state(false);
  
  const navItems = [
    { href: '/', label: 'Dashboard', icon: '🏠' },
    { href: '/habits', label: 'Habits', icon: '✓' },
    { href: '/tasks', label: 'Tasks', icon: '📝' },
    { href: '/schedule', label: 'Schedule', icon: '📅' },
    { href: '/journal', label: 'Journal', icon: '📓' },
    { href: '/goals', label: 'Goals', icon: '🎯' },
  ];
</script>

<div class="min-h-screen bg-glacial-bg text-white">
  <!-- Mobile Header -->
  <header class="md:hidden fixed top-0 left-0 right-0 h-14 bg-glacial-surface/80 backdrop-blur-sm border-b border-white/10 flex items-center px-4 z-50">
    <button 
      onclick={() => menuOpen = !menuOpen}
      class="p-2 hover:bg-white/10 rounded-lg transition-colors"
    >
      <span class="text-xl">{menuOpen ? '✕' : '☰'}</span>
    </button>
    <span class="ml-4 font-semibold">LifeDash</span>
  </header>

  <!-- Sidebar -->
  <aside class={`
    fixed top-0 left-0 h-full w-64 bg-glacial-surface border-r border-white/10
    transform transition-transform duration-200 z-40
    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
  `}>
    <div class="p-6">
      <h1 class="text-xl font-bold text-glacial-primary">LifeDash</h1>
    </div>
    
    <nav class="px-3">
      {#each navItems as item}
        <a 
          href={item.href}
          onclick={() => menuOpen = false}
          class={`
            flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors
            ${$page.url.pathname === item.href 
              ? 'bg-glacial-primary/20 text-glacial-primary' 
              : 'text-glacial-muted hover:bg-white/5 hover:text-white'}
          `}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>
  </aside>

  <!-- Overlay (mobile) -->
  {#if menuOpen}
    <div 
      class="fixed inset-0 bg-black/50 z-30 md:hidden"
      onclick={() => menuOpen = false}
    ></div>
  {/if}

  <!-- Main Content -->
  <main class="md:ml-64 pt-14 md:pt-0 min-h-screen">
    <div class="p-6">
      <slot />
    </div>
  </main>
</div>
```

### 3. Create Placeholder Pages

```svelte
<!-- src/routes/+page.svelte -->
<h1 class="text-2xl font-bold mb-4">Dashboard</h1>
<p class="text-glacial-muted">Welcome to LifeDash!</p>
```

```svelte
<!-- src/routes/habits/+page.svelte -->
<h1 class="text-2xl font-bold mb-4">Habits</h1>
<p class="text-glacial-muted">Your habits will appear here.</p>
```

(Create similar files for `/tasks`, `/schedule`, `/journal`, `/goals`)

### 4. Set Up Neo Svelte

```bash
npm install @dvcol/neo-svelte
```

```svelte
<!-- Update +layout.svelte -->
<script lang="ts">
  import { NeoThemeProvider } from '@dvcol/neo-svelte';
  // ... rest of imports
</script>

<NeoThemeProvider theme="dark">
  <div class="min-h-screen bg-glacial-bg text-white">
    <!-- ... rest of layout -->
  </div>
</NeoThemeProvider>
```

## Common Mistakes & Troubleshooting

### ❌ Sidebar doesn't hide on mobile
**Cause:** Missing the `transform -translate-x-full` class or `md:translate-x-0`
**Fix:** Ensure both classes are present and the mobile class comes first

### ❌ Navigation links don't highlight
**Cause:** Comparing `$page.url.pathname` incorrectly
**Fix:** Use exact match for home (`/`), startsWith for nested routes

### ❌ Content goes under sidebar
**Cause:** Missing `md:ml-64` on main content
**Fix:** Add left margin equal to sidebar width on desktop

### ❌ Mobile menu doesn't close when clicking nav
**Cause:** Missing `onclick={() => menuOpen = false}` on nav links
**Fix:** Add click handler to close menu

## Testing Checklist

- [ ] `npm run dev` works
- [ ] Desktop: Sidebar visible, content has left margin
- [ ] Mobile (resize to < 768px): Sidebar hidden, hamburger visible
- [ ] Hamburger toggles sidebar
- [ ] Clicking nav link navigates AND closes mobile menu
- [ ] Current page is highlighted in nav
- [ ] Clicking overlay closes mobile menu

## Self-Check Quiz

1. What does `+layout.svelte` do?
2. What's the difference between `$state()` and `let x = 0`?
3. Why do we use `md:translate-x-0` instead of just showing/hiding?
4. What does `backdrop-blur-sm` do?

<details>
<summary>Answers</summary>

1. Wraps all pages in its folder and subfolders — used for persistent UI
2. `$state()` is reactive (UI updates when it changes), plain `let` is not in Svelte 5
3. `translate-x` enables smooth CSS transitions; show/hide would be instant
4. Applies a blur filter to content behind the element (glassmorphism effect)

</details>

## Learn More

| Topic | Resource |
|-------|----------|
| SvelteKit Routing | https://svelte.dev/docs/kit/routing |
| SvelteKit Layouts | https://svelte.dev/docs/kit/routing#layout |
| Svelte 5 Runes | https://svelte.dev/docs/svelte/what-are-runes |
| Tailwind Responsive | https://tailwindcss.com/docs/responsive-design |
| Neo Svelte | https://github.com/dvcol/neo-svelte |

---

# Phase 2: Jazz Setup

## Why This Phase Matters

Jazz is a "local-first" framework. This is fundamentally different from traditional "fetch from server" patterns:

**Traditional (Convex, Firebase, Supabase):**
```
User clicks → Send to server → Wait... → Server responds → Update UI
```

**Local-first (Jazz):**
```
User clicks → Update local DB → Update UI immediately → Sync to cloud (background)
```

The result: **Zero loading spinners for your own data.** The app works offline. It feels instant.

## Key Concepts

### CoValues (Collaborative Values)

Jazz's core primitive. Like objects/arrays, but they:
- Persist automatically (IndexedDB)
- Sync automatically (when online)
- Support real-time collaboration

```typescript
import { CoMap, co } from 'jazz-tools';

// Define a schema
class Habit extends CoMap {
  name = co.string;
  color = co.string;
  createdAt = co.Date;
}

// Create an instance
const habit = Habit.create(
  { name: "Exercise", color: "#60a5fa", createdAt: new Date() },
  { owner: me }
);

// Read values
console.log(habit.name); // "Exercise"

// Update values (auto-persists & syncs!)
habit.name = "Morning Exercise";
```

### CoMap vs CoList

| Type | Like | Use For |
|------|------|---------|
| `CoMap` | Object | Single items (habit, task, user) |
| `CoList` | Array | Collections (list of habits) |

```typescript
class HabitList extends CoList.Of(co.ref(Habit)) {}

const habits = HabitList.create([], { owner: me });
habits.push(habit);
```

### Ownership & Groups

Every CoValue has an owner:
- **Account** — Individual user
- **Group** — Shared between users

```typescript
// Owned by current user
const myHabit = Habit.create({ ... }, { owner: me });

// Owned by a group (shareable)
const sharedHabit = Habit.create({ ... }, { owner: myGroup });
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Svelte Component                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  const habits = useCoState(HabitList, habitListId);     ││
│  │                                                          ││
│  │  // habits is reactive!                                  ││
│  │  // - Reads from IndexedDB                               ││
│  │  // - Updates trigger re-render                          ││
│  │  // - Changes sync to cloud                              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Jazz Runtime                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   CoMaps    │  │   CoLists   │  │   Sync Engine       │  │
│  │   CoLists   │◀▶│   CoMaps    │◀▶│   (WebSocket)       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
        ┌─────────────┐         ┌─────────────┐
        │ IndexedDB   │         │ Jazz Cloud  │
        │ (Local)     │         │ (Remote)    │
        └─────────────┘         └─────────────┘
```

## Tasks

### 1. Install Jazz

```bash
npm install jazz-tools jazz-svelte
```

### 2. Create Schema

```typescript
// src/lib/schema.ts
import { CoMap, CoList, Account, co } from 'jazz-tools';

// Individual habit entry (one per day)
export class HabitEntry extends CoMap {
  date = co.Date;
  completed = co.boolean;
}

// A habit with its entries
export class Habit extends CoMap {
  name = co.string;
  color = co.string;
  frequency = co.literal("daily", "weekly");
  entries = co.ref(HabitEntryList);
  createdAt = co.Date;
}

// List of habit entries
export class HabitEntryList extends CoList.Of(co.ref(HabitEntry)) {}

// List of habits
export class HabitList extends CoList.Of(co.ref(Habit)) {}

// User's account with their data
export class LifeDashAccount extends Account {
  habits = co.ref(HabitList);
  
  // Called when account is first created
  migrate() {
    if (!this.habits) {
      this.habits = HabitList.create([], { owner: this });
    }
  }
}
```

### 3. Set Up JazzProvider

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { JazzProvider } from 'jazz-svelte';
  import { LifeDashAccount } from '$lib/schema';
  // ... other imports
</script>

<JazzProvider accountSchema={LifeDashAccount}>
  <NeoThemeProvider theme="dark">
    <!-- ... rest of layout -->
  </NeoThemeProvider>
</JazzProvider>
```

### 4. Test It Works

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { useAccount } from 'jazz-svelte';
  import { LifeDashAccount } from '$lib/schema';
  
  const account = useAccount<LifeDashAccount>();
</script>

<h1 class="text-2xl font-bold mb-4">Dashboard</h1>

{#if $account}
  <p class="text-glacial-muted">
    Logged in! You have {$account.habits?.length ?? 0} habits.
  </p>
{:else}
  <p class="text-glacial-muted">Loading...</p>
{/if}
```

### 5. Create a Test Habit

```svelte
<!-- src/routes/habits/+page.svelte -->
<script lang="ts">
  import { useAccount } from 'jazz-svelte';
  import { LifeDashAccount, Habit, HabitEntryList } from '$lib/schema';
  
  const account = useAccount<LifeDashAccount>();
  
  let newHabitName = $state('');
  
  function createHabit() {
    if (!$account || !newHabitName.trim()) return;
    
    const habit = Habit.create({
      name: newHabitName,
      color: '#60a5fa',
      frequency: 'daily',
      entries: HabitEntryList.create([], { owner: $account }),
      createdAt: new Date()
    }, { owner: $account });
    
    $account.habits?.push(habit);
    newHabitName = '';
  }
</script>

<h1 class="text-2xl font-bold mb-4">Habits</h1>

<div class="flex gap-2 mb-6">
  <input 
    type="text"
    bind:value={newHabitName}
    placeholder="New habit name..."
    class="flex-1 px-4 py-2 bg-glacial-surface border border-white/10 rounded-lg
           text-white placeholder:text-glacial-muted
           focus:border-glacial-primary focus:outline-none"
  >
  <button 
    onclick={createHabit}
    class="px-4 py-2 bg-glacial-primary text-white rounded-lg
           hover:bg-glacial-primary/80 transition-colors"
  >
    Add
  </button>
</div>

<div class="space-y-2">
  {#each $account?.habits ?? [] as habit}
    <div class="p-4 bg-glacial-surface/50 rounded-lg border border-white/10">
      <span class="text-white">{habit.name}</span>
    </div>
  {:else}
    <p class="text-glacial-muted">No habits yet. Create one above!</p>
  {/each}
</div>
```

## Common Mistakes & Troubleshooting

### ❌ "Cannot read property 'habits' of undefined"
**Cause:** Account not loaded yet
**Fix:** Always check `if ($account)` before accessing properties

### ❌ Data doesn't persist after refresh
**Cause:** Not using the account's ownership correctly
**Fix:** Use `{ owner: $account }` when creating CoValues

### ❌ "CoValue not found" error
**Cause:** Trying to access a CoValue before it's synced
**Fix:** Jazz handles this — the value will be `undefined` until loaded

### ❌ TypeScript errors with CoValues
**Cause:** Schema not matching usage
**Fix:** Ensure schema types match what you're storing

## Testing Checklist

- [ ] App loads without errors
- [ ] Can create a habit
- [ ] Habit appears in list
- [ ] Refresh page — habit is still there!
- [ ] Check DevTools → Application → IndexedDB → jazz data exists

## Self-Check Quiz

1. What's the difference between CoMap and CoList?
2. Why do we pass `{ owner: $account }` when creating CoValues?
3. What happens if you create data while offline?
4. What does `migrate()` do in the Account class?

<details>
<summary>Answers</summary>

1. CoMap is like an object (named properties), CoList is like an array (ordered items)
2. It determines who owns/can edit the data and where it syncs
3. It saves locally and syncs when you're back online
4. Sets up initial data structure when account is first created

</details>

## Learn More

| Topic | Resource |
|-------|----------|
| Jazz Documentation | https://jazz.tools/docs |
| CoValues Explained | https://jazz.tools/docs/using-covalues/comap |
| jazz-svelte | https://github.com/garden-co/jazz/tree/main/packages/jazz-svelte |
| Local-First Philosophy | https://localfirstweb.dev/ |

---

# Phase 3: Habits

## Why This Phase Matters

Habits are the core feature. This phase teaches:
- Full CRUD with Jazz
- Date handling (daily entries)
- Computed state (streaks)
- Form handling in Svelte 5

## Data Model

```
Habit
├── name: string
├── color: string
├── frequency: "daily" | "weekly"
├── entries: CoList<HabitEntry>
└── createdAt: Date

HabitEntry
├── date: Date
└── completed: boolean
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Habit Card                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  [Color] Habit Name                        [Toggle ✓]  ││
│  │          Streak: 🔥 7 days                             ││
│  │          Weekly: ███████░░░ 5/7                        ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Key Code: Streak Calculation

```typescript
function calculateStreak(entries: HabitEntry[]): number {
  const completed = entries
    .filter(e => e.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 0;
  let checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);
  
  for (const entry of completed) {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    
    if (entryDate.getTime() === checkDate.getTime()) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}
```

## Key Code: Toggle Today

```svelte
<script lang="ts">
  function toggleToday(habit: Habit) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingEntry = habit.entries?.find(e => {
      const entryDate = new Date(e.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });
    
    if (existingEntry) {
      existingEntry.completed = !existingEntry.completed;
    } else {
      const entry = HabitEntry.create({
        date: today,
        completed: true
      }, { owner: $account });
      habit.entries?.push(entry);
    }
  }
  
  function isCompletedToday(habit: Habit): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return habit.entries?.some(e => {
      const entryDate = new Date(e.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime() && e.completed;
    }) ?? false;
  }
</script>
```

## Tailwind Card Example

```svelte
<div class="p-4 bg-glacial-surface/50 backdrop-blur-sm rounded-xl border border-white/10">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div 
        class="w-3 h-3 rounded-full"
        style="background-color: {habit.color}"
      ></div>
      <span class="font-medium text-white">{habit.name}</span>
    </div>
    
    <button
      onclick={() => toggleToday(habit)}
      class={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
        ${isCompletedToday(habit) 
          ? 'bg-glacial-success text-white' 
          : 'bg-white/10 text-glacial-muted hover:bg-white/20'}`}
    >
      ✓
    </button>
  </div>
  
  <div class="mt-3 flex items-center gap-2 text-sm text-glacial-muted">
    <span>🔥 {calculateStreak(habit.entries ?? [])} day streak</span>
  </div>
</div>
```

## Common Mistakes

### ❌ Streak breaks unexpectedly
**Cause:** Time zone issues with Date comparison
**Fix:** Always `setHours(0, 0, 0, 0)` before comparing dates

### ❌ Entry created multiple times
**Cause:** Not checking if entry exists before creating
**Fix:** Use `find()` to check first, then create or toggle

## Testing Checklist

- [ ] Can create habits with name and color
- [ ] Toggle creates entry for today
- [ ] Toggle again marks incomplete
- [ ] Streak increments on consecutive days
- [ ] Streak resets when day is missed
- [ ] Data persists after refresh

## Self-Check Quiz

1. Why do we use `setHours(0, 0, 0, 0)` when comparing dates?
2. What's the difference between `$state` and `$derived`?
3. How would you add a weekly habit that only needs 3 completions per week?

---

# Phase 4: Tasks

## Why This Phase Matters

Tasks add complexity: sorting, filtering, due dates. This teaches:
- Dynamic list manipulation
- Multiple filter states
- Priority visualization

## Data Model

```typescript
class Task extends CoMap {
  title = co.string;
  description = co.string;
  priority = co.literal("low", "medium", "high");
  dueDate = co.Date;
  completed = co.boolean;
  createdAt = co.Date;
}
```

## Key Code: Sorting & Filtering

```svelte
<script lang="ts">
  let tasks = $state<Task[]>([]);
  let sortBy = $state<"priority" | "dueDate" | "created">("dueDate");
  let filter = $state<"all" | "active" | "completed">("all");
  
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  
  let filteredTasks = $derived(() => {
    let result = [...tasks];
    
    // Filter
    if (filter === "active") result = result.filter(t => !t.completed);
    if (filter === "completed") result = result.filter(t => t.completed);
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === "priority") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    return result;
  });
</script>
```

## Tailwind Priority Badge

```svelte
<span class={`px-2 py-0.5 text-xs font-medium rounded-full
  ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
    'bg-gray-500/20 text-gray-400'}`}>
  {task.priority}
</span>
```

## Testing Checklist

- [ ] Can create tasks with all fields
- [ ] Sorting works correctly
- [ ] Filter tabs work
- [ ] Overdue tasks highlighted
- [ ] Complete/delete works

---

# Phase 5: Schedule

## Why This Phase Matters

Calendars are complex. This teaches:
- CSS Grid for time-based layouts
- View switching
- Time manipulation

## Architecture

```
┌────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  Time  │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │ Sun │
├────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  8:00  │█████│     │     │     │     │     │     │
│  9:00  │█████│     │░░░░░│     │     │     │     │
│ 10:00  │     │     │░░░░░│     │     │     │     │
│ ...    │     │     │     │     │     │     │     │
└────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

## Key Code: CSS Grid Calendar

```svelte
<div class="grid grid-cols-8 gap-px bg-white/5">
  <!-- Header row -->
  <div class="p-2 text-center text-glacial-muted">Time</div>
  {#each days as day}
    <div class="p-2 text-center font-medium text-white">{day}</div>
  {/each}
  
  <!-- Time slots -->
  {#each hours as hour}
    <div class="p-2 text-right text-glacial-muted text-sm">{hour}:00</div>
    {#each days as day, dayIndex}
      <div 
        class="min-h-[60px] bg-glacial-surface/30 hover:bg-glacial-surface/50 
               transition-colors cursor-pointer relative"
        onclick={() => createEvent(dayIndex, hour)}
      >
        {#each getEventsForSlot(dayIndex, hour) as event}
          <div 
            class="absolute inset-x-1 rounded p-1 text-xs"
            style="background-color: {event.color}; top: 2px;"
          >
            {event.title}
          </div>
        {/each}
      </div>
    {/each}
  {/each}
</div>
```

---

# Phase 6: Journal

## Key Features

- Mood scale (1-5 with emoji)
- Rich text entries
- Tag filtering
- Mood visualization over time

## Tailwind Mood Selector

```svelte
<div class="flex gap-2">
  {#each [
    { value: 1, emoji: '😢', label: 'Terrible' },
    { value: 2, emoji: '😕', label: 'Bad' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😄', label: 'Great' }
  ] as option}
    <button
      onclick={() => mood = option.value}
      class={`p-3 rounded-xl transition-all text-2xl
        ${mood === option.value 
          ? 'bg-glacial-primary scale-110' 
          : 'bg-glacial-surface/50 hover:bg-glacial-surface'}`}
      title={option.label}
    >
      {option.emoji}
    </button>
  {/each}
</div>
```

---

# Phase 7: Goals

## Key Code: Progress Calculation

```typescript
function calculateProgress(goal: Goal): number {
  if (!goal.milestones || goal.milestones.length === 0) {
    return goal.manualProgress ?? 0;
  }
  const completed = goal.milestones.filter(m => m.completed).length;
  return Math.round((completed / goal.milestones.length) * 100);
}
```

## Tailwind Progress Bar

```svelte
<div class="space-y-1">
  <div class="flex justify-between text-sm">
    <span class="text-white">{goal.title}</span>
    <span class="text-glacial-muted">{progress}%</span>
  </div>
  <div class="h-2 bg-white/10 rounded-full overflow-hidden">
    <div 
      class="h-full bg-gradient-to-r from-glacial-primary to-glacial-secondary 
             rounded-full transition-all duration-500"
      style="width: {progress}%"
    ></div>
  </div>
</div>
```

---

# Phase 8: Dashboard

## Widget Layout

```svelte
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Habits Widget -->
  <div class="bg-glacial-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
    <h3 class="text-lg font-semibold text-white mb-4">Today's Habits</h3>
    <div class="flex items-center gap-4">
      <div class="text-4xl font-bold text-glacial-primary">
        {completedToday}/{totalHabits}
      </div>
      <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          class="h-full bg-glacial-success rounded-full"
          style="width: {(completedToday/totalHabits)*100}%"
        ></div>
      </div>
    </div>
  </div>
  
  <!-- Tasks Widget -->
  <div class="bg-glacial-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
    <h3 class="text-lg font-semibold text-white mb-4">Tasks</h3>
    <div class="space-y-2 text-glacial-muted">
      <p><span class="text-white font-medium">{tasksDueToday}</span> due today</p>
      <p class="text-glacial-error"><span class="font-medium">{tasksOverdue}</span> overdue</p>
    </div>
  </div>
  
  <!-- Mood Widget -->
  <div class="bg-glacial-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
    <h3 class="text-lg font-semibold text-white mb-4">Mood</h3>
    <div class="text-4xl text-center">{todayMoodEmoji}</div>
    <p class="text-center text-glacial-muted mt-2">Weekly avg: {avgMood.toFixed(1)}</p>
  </div>
</div>
```

---

# Phase 9: PWA

## Service Worker

```typescript
// src/service-worker.ts
import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
```

## Manifest

```json
{
  "name": "LifeDash",
  "short_name": "LifeDash",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0f1a",
  "theme_color": "#60a5fa",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

## Install Prompt

```svelte
<script lang="ts">
  let installPrompt = $state<any>(null);
  
  $effect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      installPrompt = e;
    });
  });
  
  async function install() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    installPrompt = null;
  }
</script>

{#if installPrompt}
  <button 
    onclick={install}
    class="fixed bottom-4 right-4 px-4 py-2 bg-glacial-primary text-white rounded-lg shadow-lg"
  >
    Install App
  </button>
{/if}
```

---

# Phase 10: Polish

## Habit Heatmap Component

```svelte
<!-- src/lib/components/HeatmapGrid.svelte -->
<script lang="ts">
  type Props = {
    data: { date: Date; completed: boolean }[];
    weeks?: number;
  };
  
  let { data, weeks = 12 }: Props = $props();
  
  function getColor(completed: boolean): string {
    return completed ? '#34d399' : 'rgba(255,255,255,0.1)';
  }
  
  function getCells() {
    const cells = [];
    const today = new Date();
    
    for (let i = weeks * 7 - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const entry = data.find(d => {
        const entryDate = new Date(d.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === date.getTime();
      });
      
      cells.push({
        date,
        completed: entry?.completed ?? false
      });
    }
    
    return cells;
  }
  
  let cells = $derived(getCells());
</script>

<div class="grid gap-1" style="grid-template-columns: repeat({weeks}, 1fr);">
  {#each cells as cell}
    <div 
      class="w-3 h-3 rounded-sm transition-colors"
      style="background-color: {getColor(cell.completed)}"
      title={cell.date.toLocaleDateString()}
    ></div>
  {/each}
</div>
```

## Page Transitions

```svelte
<!-- In +layout.svelte -->
<script lang="ts">
  import { onNavigate } from '$app/navigation';
  
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  :global(::view-transition-new(root)) {
    animation: fade-in 0.2s ease-out;
  }
</style>
```

## Loading Skeleton

```svelte
<div class="animate-pulse space-y-4">
  <div class="h-8 w-48 bg-white/10 rounded"></div>
  <div class="space-y-2">
    <div class="h-16 bg-white/10 rounded-xl"></div>
    <div class="h-16 bg-white/10 rounded-xl"></div>
    <div class="h-16 bg-white/10 rounded-xl"></div>
  </div>
</div>
```

---

# Alternative: Using Convex

If you want to try a cloud-first approach instead of Jazz, here's how to build LifeDash with Convex.

## Why Choose Convex?

| Use Case | Better Choice |
|----------|---------------|
| Personal app, offline needed | Jazz |
| Multi-user collaboration | Either |
| Complex server-side logic | Convex |
| Large datasets | Convex |
| Startup/SaaS product | Convex |

## Setup

```bash
npm install convex
npx convex dev
```

## Schema Definition

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  habits: defineTable({
    userId: v.string(),
    name: v.string(),
    color: v.string(),
    frequency: v.union(v.literal("daily"), v.literal("weekly")),
    createdAt: v.number(),
  }),
  
  habitEntries: defineTable({
    habitId: v.id("habits"),
    date: v.string(), // ISO date string
    completed: v.boolean(),
  }).index("by_habit", ["habitId"]),
});
```

## Server Functions

```typescript
// convex/habits.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    
    return await ctx.db
      .query("habits")
      .filter(q => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    color: v.string(),
    frequency: v.union(v.literal("daily"), v.literal("weekly")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    return await ctx.db.insert("habits", {
      userId: identity.subject,
      name: args.name,
      color: args.color,
      frequency: args.frequency,
      createdAt: Date.now(),
    });
  },
});

export const toggleEntry = mutation({
  args: {
    habitId: v.id("habits"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("habitEntries")
      .withIndex("by_habit", q => q.eq("habitId", args.habitId))
      .filter(q => q.eq(q.field("date"), args.date))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, { completed: !existing.completed });
    } else {
      await ctx.db.insert("habitEntries", {
        habitId: args.habitId,
        date: args.date,
        completed: true,
      });
    }
  },
});
```

## Svelte Integration

```svelte
<script lang="ts">
  import { useQuery, useMutation } from 'convex-svelte';
  import { api } from '$convex/_generated/api';
  
  const habits = useQuery(api.habits.list);
  const createHabit = useMutation(api.habits.create);
  const toggleEntry = useMutation(api.habits.toggleEntry);
  
  let newHabitName = $state('');
  
  async function addHabit() {
    await createHabit({ 
      name: newHabitName, 
      color: '#60a5fa', 
      frequency: 'daily' 
    });
    newHabitName = '';
  }
</script>

{#if $habits === undefined}
  <p>Loading...</p>  <!-- Convex requires loading states -->
{:else}
  {#each $habits as habit}
    <div>{habit.name}</div>
  {/each}
{/if}
```

## Key Differences from Jazz

| Aspect | Jazz | Convex |
|--------|------|--------|
| Data location | Local first | Cloud first |
| Offline | ✅ Built-in | ❌ Requires extra work |
| Loading states | ❌ Not needed | ✅ Required |
| Server functions | ❌ None | ✅ Required |
| Type safety | ✅ Full | ✅ Full |
| Real-time | ✅ Automatic | ✅ Automatic |

## When to Use Convex Instead

1. **Building a SaaS** — Need server-side auth, billing logic
2. **Complex queries** — Aggregations, joins, computed fields
3. **Large scale** — Millions of records
4. **Team collaboration** — Multiple developers

---

# Glossary

| Term | Definition |
|------|------------|
| **CoValue** | Jazz's collaborative value type — persists and syncs automatically |
| **CoMap** | A CoValue that works like an object with named properties |
| **CoList** | A CoValue that works like an array |
| **Rune** | Svelte 5's reactive primitives ($state, $derived, $effect) |
| **$state** | Creates a reactive variable in Svelte 5 |
| **$derived** | Creates a computed value that updates when dependencies change |
| **$effect** | Runs side effects when reactive values change |
| **$props** | Declares component props in Svelte 5 |
| **PWA** | Progressive Web App — installable web app with offline support |
| **Service Worker** | Script that runs in background, handles caching and offline |
| **Local-first** | Architecture where data lives on device first, syncs to cloud |
| **Cloud-first** | Architecture where data lives on server, fetched to client |
| **IndexedDB** | Browser database for storing large amounts of structured data |
| **Glassmorphism** | Design style using frosted glass effect (blur + transparency) |
| **Neumorphism** | Design style using soft shadows for raised/sunken effects |
| **Mobile-first** | Designing for mobile screens first, then adding desktop styles |
| **Responsive** | Design that adapts to different screen sizes |

---

# Cheat Sheets

## Svelte 5 Runes

```svelte
<script>
  // Reactive state
  let count = $state(0);
  let items = $state<string[]>([]);
  
  // Computed values
  let doubled = $derived(count * 2);
  let total = $derived(items.reduce((a, b) => a + b.length, 0));
  
  // Side effects
  $effect(() => {
    console.log('Count changed:', count);
    // Cleanup function (optional)
    return () => console.log('Cleaning up');
  });
  
  // Props
  let { name, age = 0 } = $props();
</script>
```

## Tailwind Spacing

```
p-1  = 4px    m-1  = 4px    gap-1  = 4px    w-1  = 4px
p-2  = 8px    m-2  = 8px    gap-2  = 8px    w-2  = 8px
p-3  = 12px   m-3  = 12px   gap-3  = 12px   w-4  = 16px
p-4  = 16px   m-4  = 16px   gap-4  = 16px   w-8  = 32px
p-6  = 24px   m-6  = 24px   gap-6  = 24px   w-16 = 64px
p-8  = 32px   m-8  = 32px   gap-8  = 32px   w-32 = 128px
```

## Tailwind Flexbox

```html
flex              <!-- Enable flexbox -->
flex-row          <!-- Horizontal (default) -->
flex-col          <!-- Vertical -->
items-center      <!-- Align vertical center -->
items-start       <!-- Align top -->
items-end         <!-- Align bottom -->
justify-center    <!-- Justify horizontal center -->
justify-between   <!-- Space between items -->
justify-end       <!-- Push to end -->
gap-4             <!-- Gap between items -->
flex-1            <!-- Grow to fill space -->
flex-wrap         <!-- Wrap to next line -->
```

## Tailwind Grid

```html
grid                         <!-- Enable grid -->
grid-cols-3                  <!-- 3 equal columns -->
grid-cols-[200px_1fr_1fr]    <!-- Custom column sizes -->
grid-rows-2                  <!-- 2 rows -->
gap-4                        <!-- Gap between cells -->
col-span-2                   <!-- Span 2 columns -->
row-span-2                   <!-- Span 2 rows -->
```

## Tailwind Responsive

```html
<!-- Mobile first: unprefixed = mobile -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<!-- Show/hide -->
<div class="hidden md:block">Desktop only</div>
<div class="md:hidden">Mobile only</div>

<!-- Breakpoints -->
sm:  640px+
md:  768px+
lg:  1024px+
xl:  1280px+
2xl: 1536px+
```

## Jazz Patterns

```typescript
// Create CoValue
const habit = Habit.create({ name: "Test" }, { owner: account });

// Add to list
account.habits?.push(habit);

// Update property
habit.name = "New Name";

// Find in list
const found = habits?.find(h => h.id === targetId);

// Remove from list
const index = habits?.findIndex(h => h.id === targetId);
if (index !== undefined && index >= 0) {
  habits?.splice(index, 1);
}

// Use in Svelte
const account = useAccount<MyAccount>();
// $account is reactive
```

## Common Tailwind Components

```html
<!-- Card -->
<div class="bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">

<!-- Button -->
<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">

<!-- Input -->
<input class="w-full px-4 py-2 bg-surface border border-white/10 rounded-lg text-white placeholder:text-muted focus:border-primary focus:outline-none">

<!-- Badge -->
<span class="px-2 py-1 text-xs font-medium bg-success/20 text-success rounded-full">

<!-- Avatar -->
<div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">

<!-- Progress bar -->
<div class="h-2 bg-white/10 rounded-full overflow-hidden">
  <div class="h-full bg-primary rounded-full" style="width: 75%"></div>
</div>
```

---

# Project Variations

Practice the same concepts with different apps:

1. **Workout Tracker** — Same as habits, but with reps/sets/weight
2. **Reading List** — Books with progress, notes, ratings
3. **Recipe Book** — Ingredients, instructions, meal planning
4. **Finance Tracker** — Income, expenses, budgets, categories
5. **Language Learning** — Vocabulary, streak, spaced repetition

Each uses the same patterns: CoValues, CRUD, filtering, progress tracking.

---

# Resources

## Official Docs
- [SvelteKit](https://svelte.dev/docs/kit)
- [Svelte 5](https://svelte.dev/docs/svelte)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Jazz](https://jazz.tools/docs)
- [Convex](https://docs.convex.dev)

## Video Tutorials
- [The Joy of SvelteKit](https://www.youtube.com/watch?v=ydR_M0fw9Xc) — Fireship
- [Svelte 5 Runes](https://www.youtube.com/watch?v=RVnxF3j3N8U) — Rich Harris
- [Tailwind CSS Full Course](https://www.youtube.com/watch?v=ft30zcMlFao) — Fireship

## Communities
- [Svelte Discord](https://svelte.dev/chat)
- [Jazz Discord](https://discord.gg/jazz)
- [Tailwind Discord](https://tailwindcss.com/discord)

---

# Pre-Phase Exercises

Before diving into each phase, try these warm-up exercises to practice the core concepts.

## Before Phase 1 (Layout)

**Exercise: Responsive Card**
Build a card that:
- Shows 1 column on mobile
- Shows 2 columns on tablet
- Shows 3 columns on desktop

```svelte
<!-- Try it yourself first! -->
<div class="???">
  <div class="bg-blue-500 p-4 rounded">Card 1</div>
  <div class="bg-green-500 p-4 rounded">Card 2</div>
  <div class="bg-red-500 p-4 rounded">Card 3</div>
</div>
```

<details>
<summary>Solution</summary>

```svelte
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-blue-500 p-4 rounded">Card 1</div>
  <div class="bg-green-500 p-4 rounded">Card 2</div>
  <div class="bg-red-500 p-4 rounded">Card 3</div>
</div>
```
</details>

## Before Phase 2 (Jazz)

**Exercise: Local Storage Counter**
Build a counter that persists to localStorage (Jazz does this automatically, but understand the concept):

```svelte
<script>
  let count = $state(0);
  
  // TODO: Load from localStorage on mount
  // TODO: Save to localStorage when count changes
</script>

<button onclick={() => count++}>Count: {count}</button>
```

<details>
<summary>Solution</summary>

```svelte
<script>
  let count = $state(parseInt(localStorage.getItem('count') ?? '0'));
  
  $effect(() => {
    localStorage.setItem('count', count.toString());
  });
</script>

<button onclick={() => count++}>Count: {count}</button>
```
</details>

## Before Phase 3 (Habits)

**Exercise: Date Comparison**
Write a function that checks if two dates are the same day:

```typescript
function isSameDay(date1: Date, date2: Date): boolean {
  // TODO: Implement
}

// Should return true
isSameDay(new Date('2024-01-15T10:30:00'), new Date('2024-01-15T22:45:00'));

// Should return false
isSameDay(new Date('2024-01-15'), new Date('2024-01-16'));
```

<details>
<summary>Solution</summary>

```typescript
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
```
</details>

## Before Phase 4 (Tasks)

**Exercise: Sort & Filter**
Given an array of objects, sort by priority and filter by status:

```typescript
const tasks = [
  { title: 'A', priority: 'low', done: false },
  { title: 'B', priority: 'high', done: true },
  { title: 'C', priority: 'medium', done: false },
];

// TODO: Filter to only incomplete tasks
// TODO: Sort by priority (high > medium > low)
```

<details>
<summary>Solution</summary>

```typescript
const priorityOrder = { high: 0, medium: 1, low: 2 };

const result = tasks
  .filter(t => !t.done)
  .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

// Result: [{ title: 'C', priority: 'medium', done: false }, { title: 'A', priority: 'low', done: false }]
```
</details>

## Before Phase 5 (Schedule)

**Exercise: Time Grid**
Create a grid showing hours 9-17 with CSS Grid:

```svelte
<!-- TODO: Create a single-column grid with time labels -->
```

<details>
<summary>Solution</summary>

```svelte
<div class="grid gap-1">
  {#each Array(9) as _, i}
    <div class="h-12 border-b border-white/10 flex items-center text-sm text-gray-500">
      {9 + i}:00
    </div>
  {/each}
</div>
```
</details>

## Before Phase 6 (Journal)

**Exercise: Emoji Picker**
Build a mood selector with 5 emoji buttons:

```svelte
<script>
  let selected = $state<number | null>(null);
</script>

<!-- TODO: 5 emoji buttons, highlight selected -->
```

<details>
<summary>Solution</summary>

```svelte
<script>
  let selected = $state<number | null>(null);
  const moods = ['😢', '😕', '😐', '🙂', '😄'];
</script>

<div class="flex gap-2">
  {#each moods as emoji, i}
    <button
      onclick={() => selected = i}
      class={`text-2xl p-2 rounded-lg transition-all
        ${selected === i ? 'bg-blue-500 scale-110' : 'bg-gray-800 hover:bg-gray-700'}`}
    >
      {emoji}
    </button>
  {/each}
</div>
```
</details>

---

# Advanced Deep Dives

Optional challenges for those who want to go further.

## Phase 1: Advanced Layout

**Deep Dive: Persistent Layout State**
Save sidebar open/closed state to localStorage so it persists across sessions.

**Deep Dive: Keyboard Navigation**
Add keyboard shortcuts: `Ctrl+1` for Dashboard, `Ctrl+2` for Habits, etc.

**Deep Dive: Animated Sidebar**
Add a smooth width animation when collapsing sidebar to icons-only mode.

## Phase 2: Advanced Jazz

**Deep Dive: Migrations**
What happens when you change your schema? Learn about Jazz migrations.

**Deep Dive: Groups & Sharing**
Create a group and share a habit list with another user.

**Deep Dive: Custom Sync**
Set up your own Jazz sync server instead of using Jazz Cloud.

## Phase 3: Advanced Habits

**Deep Dive: Habit Analytics**
Calculate completion rate over time, best day of week, longest streak ever.

**Deep Dive: Habit Reminders**
Use the Notifications API to send reminders for incomplete habits.

**Deep Dive: Habit Templates**
Create preset habit packs (Morning Routine, Fitness, Study) users can add.

## Phase 4: Advanced Tasks

**Deep Dive: Drag & Drop Reorder**
Implement drag-and-drop task reordering using the HTML Drag and Drop API.

**Deep Dive: Subtasks**
Add nested subtasks with their own completion state.

**Deep Dive: Recurring Tasks**
Implement tasks that auto-regenerate daily/weekly/monthly.

## Phase 5: Advanced Schedule

**Deep Dive: Drag to Create**
Click and drag on the calendar to create events spanning time slots.

**Deep Dive: Conflict Detection**
Highlight overlapping events in red.

**Deep Dive: Google Calendar Sync**
Import/export events to Google Calendar using their API.

## Phase 6: Advanced Journal

**Deep Dive: Markdown Editor**
Add a proper markdown editor with preview.

**Deep Dive: Sentiment Analysis**
Use a simple sentiment API to auto-detect mood from text.

**Deep Dive: Journal Prompts**
Show random prompts to help users start writing.

## Phase 7: Advanced Goals

**Deep Dive: Goal Dependencies**
Goals that unlock after completing prerequisite goals.

**Deep Dive: Visualizations**
Add charts showing goal progress over time.

**Deep Dive: Accountability**
Share goals publicly with a unique URL for accountability.

## Phase 8: Advanced Dashboard

**Deep Dive: Customizable Widgets**
Let users drag/drop widgets to customize dashboard layout.

**Deep Dive: Weekly Email Summary**
Send weekly progress summaries via email.

**Deep Dive: Data Export**
Export all user data as JSON or CSV.

## Phase 9: Advanced PWA

**Deep Dive: Push Notifications**
Set up a push notification server for habit reminders.

**Deep Dive: Background Sync**
Queue actions while offline and sync when back online.

**Deep Dive: Share Target**
Make your app appear in the system share menu.

## Phase 10: Advanced Polish

**Deep Dive: Performance Audit**
Get Lighthouse score to 100 across all categories.

**Deep Dive: E2E Testing**
Write Playwright tests for critical user flows.

**Deep Dive: Accessibility Audit**
Pass WCAG 2.1 AA compliance.

---

# Interview Questions

After completing each phase, you should be able to answer these questions confidently.

## Phase 1: Layout

1. **What is the difference between `+page.svelte` and `+layout.svelte`?**
   - `+page.svelte` is the content for a specific route
   - `+layout.svelte` wraps pages and persists across navigation

2. **Explain mobile-first responsive design.**
   - Write styles for mobile first (unprefixed), add larger screen styles with prefixes (md:, lg:)

3. **What does `backdrop-blur` do and when would you use it?**
   - Blurs content behind an element, used for glassmorphism effects

4. **How do you conditionally apply Tailwind classes?**
   - Template literals: `class={condition ? 'class-a' : 'class-b'}`

## Phase 2: Jazz

1. **What is local-first architecture?**
   - Data stored on device first, synced to cloud in background
   - Works offline, instant UI updates

2. **What's the difference between CoMap and CoList?**
   - CoMap: object-like, named properties
   - CoList: array-like, ordered items

3. **Why do CoValues need an owner?**
   - Determines permissions and sync destination

4. **How does Jazz handle offline usage?**
   - Stores in IndexedDB, queues changes, syncs when online

## Phase 3: Habits

1. **How do you compare dates ignoring time?**
   - Compare year, month, and day separately, or use `setHours(0,0,0,0)`

2. **What is $derived in Svelte 5?**
   - Computed value that auto-updates when dependencies change

3. **How would you calculate a streak?**
   - Sort by date descending, count consecutive days from today

## Phase 4: Tasks

1. **How do you sort an array of objects by a property?**
   - `array.sort((a, b) => a.prop - b.prop)` or with comparison functions

2. **What's the difference between filter and find?**
   - `filter` returns all matches (array), `find` returns first match (single item)

3. **How do you handle multiple filter criteria?**
   - Chain filters or combine conditions in single filter

## Phase 5: Schedule

1. **When would you use CSS Grid vs Flexbox?**
   - Grid: 2D layouts (rows AND columns), like calendars
   - Flexbox: 1D layouts (row OR column), like navbars

2. **How do you position items in a CSS Grid?**
   - `grid-column` and `grid-row` with line numbers or spans

## Phase 6: Journal

1. **How would you implement a tag system?**
   - Array of strings, filter by checking `includes()`

2. **How do you render markdown safely?**
   - Use a sanitizing library like DOMPurify with marked

## Phase 7: Goals

1. **How do you model hierarchical data (goals → milestones)?**
   - Nested CoValues: Goal has CoList of Milestones

2. **How do you calculate percentage progress?**
   - `(completed / total) * 100`, handle division by zero

## Phase 8: Dashboard

1. **How do you aggregate data from multiple sources?**
   - Combine in $derived, compute stats from each source

2. **What makes a good dashboard widget?**
   - Single metric, glanceable, actionable

## Phase 9: PWA

1. **What is a service worker?**
   - Script running in background, handles caching and offline

2. **What goes in a web app manifest?**
   - Name, icons, theme colors, display mode, start URL

3. **What's the difference between `standalone` and `browser` display modes?**
   - `standalone`: no browser UI (feels like native app)
   - `browser`: normal browser with URL bar

## Phase 10: Polish

1. **What are the Core Web Vitals?**
   - LCP (loading), FID/INP (interactivity), CLS (visual stability)

2. **How do you implement page transitions?**
   - View Transitions API or Svelte transitions on layout

3. **What's the purpose of `prefers-reduced-motion`?**
   - Respect user preference for less animation

---

# Detailed Progress Tracker

Track your progress with this detailed checklist. Each task should take 15-30 minutes.

## Phase 1 Progress: Layout (Est. 4-6 hours)

### Setup
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Verify app loads at localhost:5173

### Understand Structure
- [ ] Read through +layout.svelte
- [ ] Identify where <slot /> renders
- [ ] Trace how navigation works

### Build Layout
- [ ] Create sidebar component structure
- [ ] Add navigation items with icons
- [ ] Style with Tailwind (bg, padding, borders)
- [ ] Add current page highlighting

### Mobile Responsive
- [ ] Add hamburger button (hidden on desktop)
- [ ] Implement menu open/close state
- [ ] Add slide-in animation
- [ ] Add overlay when menu open
- [ ] Test on mobile viewport

### Polish
- [ ] Add hover states to nav items
- [ ] Add transition animations
- [ ] Verify keyboard navigation
- [ ] Test all breakpoints

### ✅ Phase 1 Complete When:
- [ ] Desktop shows sidebar, content side by side
- [ ] Mobile shows hamburger, sidebar slides in
- [ ] All nav links work
- [ ] Current page is highlighted

## Phase 2 Progress: Jazz (Est. 3-4 hours)

### Setup
- [ ] Install jazz-tools and jazz-svelte
- [ ] Create schema.ts file
- [ ] Define basic CoMap schema

### Provider Setup
- [ ] Add JazzProvider to layout
- [ ] Configure account schema
- [ ] Verify no console errors

### Test CRUD
- [ ] Create a test CoValue
- [ ] Display CoValue in UI
- [ ] Update CoValue
- [ ] Verify persistence after refresh

### ✅ Phase 2 Complete When:
- [ ] Can create data
- [ ] Data displays in UI
- [ ] Data persists after refresh
- [ ] Can see data in IndexedDB

## Phase 3 Progress: Habits (Est. 6-8 hours)

### Schema
- [ ] Define Habit CoMap
- [ ] Define HabitEntry CoMap
- [ ] Define HabitEntryList
- [ ] Add habits to Account

### Create Form
- [ ] Build input for habit name
- [ ] Add color picker
- [ ] Add frequency selector
- [ ] Wire up form submission

### List Display
- [ ] Fetch habits from account
- [ ] Map to habit cards
- [ ] Style cards with Tailwind
- [ ] Handle empty state

### Daily Toggle
- [ ] Add toggle button
- [ ] Implement toggle logic
- [ ] Update UI on toggle
- [ ] Style completed state

### Streaks
- [ ] Write streak calculation function
- [ ] Display streak in UI
- [ ] Test streak logic
- [ ] Add streak visual (fire emoji)

### ✅ Phase 3 Complete When:
- [ ] Can create habits
- [ ] Can toggle daily completion
- [ ] Streak calculates correctly
- [ ] All data persists

(Continue this pattern for Phases 4-10...)

