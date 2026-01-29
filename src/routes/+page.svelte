<script lang="ts">
	// Dashboard — overview/stats
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
		<div class="rounded-xl border border-white/5 bg-surface-800 p-5">
			<p class="text-xs text-white/40 uppercase tracking-wider">Habits Today</p>
			<p class="mt-2 text-2xl font-light text-white">0 / 0</p>
		</div>
		<div class="rounded-xl border border-white/5 bg-surface-800 p-5">
			<p class="text-xs text-white/40 uppercase tracking-wider">Tasks Open</p>
			<p class="mt-2 text-2xl font-light text-white">0</p>
		</div>
		<div class="rounded-xl border border-white/5 bg-surface-800 p-5">
			<p class="text-xs text-white/40 uppercase tracking-wider">Mood</p>
			<p class="mt-2 text-2xl font-light text-white">—</p>
		</div>
	</div>

	<p class="text-sm text-white/30">Stats and charts will appear here once data flows through Jazz.</p>
</div>
