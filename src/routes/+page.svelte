<script lang="ts">
	// TODO: Add your own auth/data solution here
</script>

<svelte:head>
	<title>Dashboard — lifedash</title>
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-light text-white">Dashboard</h1>
		<p class="mt-1 text-white/50">Your daily overview</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<div class="rounded-xl border border-white/5 bg-surface-800 p-5 transition-colors hover:border-white/10">
			<p class="text-xs uppercase tracking-wider text-white/40">Habits</p>
			<p class="mt-2 text-2xl font-light text-white">0</p>
			<p class="mt-1 text-xs text-white/30">active habits</p>
		</div>
		<div class="rounded-xl border border-white/5 bg-surface-800 p-5 transition-colors hover:border-white/10">
			<p class="text-xs uppercase tracking-wider text-white/40">Tasks</p>
			<p class="mt-2 text-2xl font-light text-white">0</p>
			<p class="mt-1 text-xs text-white/30">open tasks</p>
		</div>
		<div class="rounded-xl border border-white/5 bg-surface-800 p-5 transition-colors hover:border-white/10">
			<p class="text-xs uppercase tracking-wider text-white/40">Today's Mood</p>
			<p class="mt-2 text-2xl font-light text-white">—</p>
			<p class="mt-1 text-xs text-white/30">not logged yet</p>
		</div>
	</div>

	<div class="rounded-xl border border-dashed border-white/10 bg-surface-900/50 p-8 text-center">
		<p class="text-white/50">
			Welcome to LifeDash! Start by creating some
			<a href="/habits" class="text-primary-400 hover:text-primary-300">habits</a>
			or
			<a href="/tasks" class="text-primary-400 hover:text-primary-300">tasks</a>.
		</p>
	</div>
</div>
