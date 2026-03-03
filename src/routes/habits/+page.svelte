<script lang="ts">
	// TODO: Add your own data solution here
	
	let showNewHabitForm = $state(false);
	let newHabitName = $state('');
	let newHabitColor = $state('#60a5fa');
	let newHabitFrequency = $state<'daily' | 'weekly' | 'custom'>('daily');

	// Placeholder habits array - wire up to your own backend
	let habits = $state<Array<{
		name: string;
		color: string;
		frequency: 'daily' | 'weekly' | 'custom';
		completedToday: boolean;
	}>>([]);

	const colors = [
		'#60a5fa', // blue
		'#34d399', // green
		'#f472b6', // pink
		'#fbbf24', // yellow
		'#a78bfa', // purple
		'#f87171', // red
	];

	function createHabit() {
		if (!newHabitName.trim()) return;

		habits.push({
			name: newHabitName.trim(),
			color: newHabitColor,
			frequency: newHabitFrequency,
			completedToday: false,
		});

		// Reset form
		newHabitName = '';
		newHabitColor = '#60a5fa';
		newHabitFrequency = 'daily';
		showNewHabitForm = false;
	}

	function deleteHabit(index: number) {
		habits.splice(index, 1);
	}

	function toggleHabitToday(index: number) {
		habits[index].completedToday = !habits[index].completedToday;
	}
</script>

<svelte:head>
	<title>Habits — lifedash</title>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-light text-white">Habits</h1>
			<p class="mt-1 text-white/50">Track daily habits and build streaks</p>
		</div>
		<button
			onclick={() => (showNewHabitForm = !showNewHabitForm)}
			class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-400"
		>
			{showNewHabitForm ? 'Cancel' : '+ New Habit'}
		</button>
	</div>

	<!-- New Habit Form -->
	{#if showNewHabitForm}
		<div class="rounded-xl border border-white/10 bg-surface-800 p-6">
			<h2 class="mb-4 text-lg font-medium text-white">Create New Habit</h2>
			<form onsubmit={(e) => { e.preventDefault(); createHabit(); }} class="space-y-4">
				<div>
					<label for="name" class="block text-sm text-white/60">Habit Name</label>
					<input
						id="name"
						type="text"
						bind:value={newHabitName}
						placeholder="e.g., Morning meditation"
						class="mt-1 w-full rounded-lg border border-white/10 bg-surface-700 px-4 py-2 text-white placeholder:text-white/30 focus:border-primary-500 focus:outline-none"
					/>
				</div>

				<div>
					<label class="block text-sm text-white/60">Color</label>
					<div class="mt-2 flex gap-2">
						{#each colors as color}
							<button
								type="button"
								onclick={() => (newHabitColor = color)}
								class="h-8 w-8 rounded-full transition-transform hover:scale-110 {newHabitColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-surface-800' : ''}"
								style="background-color: {color}"
							></button>
						{/each}
					</div>
				</div>

				<div>
					<label class="block text-sm text-white/60">Frequency</label>
					<div class="mt-2 flex gap-2">
						{#each (['daily', 'weekly', 'custom'] as Array<'daily' | 'weekly' | 'custom'>) as freq}
							<button
								type="button"
								onclick={() => (newHabitFrequency = freq)}
								class="rounded-lg px-3 py-1.5 text-sm capitalize transition-colors {newHabitFrequency === freq ? 'bg-primary-500 text-white' : 'bg-surface-700 text-white/60 hover:bg-surface-600'}"
							>
								{freq}
							</button>
						{/each}
					</div>
				</div>

				<button
					type="submit"
					disabled={!newHabitName.trim()}
					class="w-full rounded-lg bg-primary-500 py-2 font-medium text-white transition-colors hover:bg-primary-400 disabled:opacity-50"
				>
					Create Habit
				</button>
			</form>
		</div>
	{/if}

	<!-- Habits List -->
	{#if habits.length > 0}
		<div class="space-y-3">
			{#each habits as habit, i}
				<div
					class="flex items-center justify-between rounded-xl border border-white/5 bg-surface-800 p-4 transition-colors hover:border-white/10"
				>
					<div class="flex items-center gap-4">
						<button
							onclick={() => toggleHabitToday(i)}
							class="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all {habit.completedToday ? 'border-transparent bg-opacity-100' : 'border-current bg-opacity-20'}"
							style="background-color: {habit.color}; border-color: {habit.color}"
						>
							{#if habit.completedToday}
								<svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
									<path d="M5 13l4 4L19 7" />
								</svg>
							{/if}
						</button>
						<div>
							<h3 class="font-medium text-white">{habit.name}</h3>
							<p class="text-xs text-white/40 capitalize">{habit.frequency}</p>
						</div>
					</div>
					<button
						onclick={() => deleteHabit(i)}
						class="rounded-lg p-2 text-white/30 transition-colors hover:bg-white/5 hover:text-error-400"
					>
						<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{:else if !showNewHabitForm}
		<div class="rounded-xl border border-dashed border-white/10 bg-surface-900/50 p-8 text-center">
			<p class="text-white/40">No habits yet. Create your first one to get started.</p>
		</div>
	{/if}
</div>
