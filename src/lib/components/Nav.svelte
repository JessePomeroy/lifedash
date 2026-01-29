<script lang="ts">
	import { page } from '$app/state';

	const navItems = [
		{ href: '/', label: 'Dashboard', icon: '📊' },
		{ href: '/habits', label: 'Habits', icon: '✅' },
		{ href: '/schedule', label: 'Schedule', icon: '📅' },
		{ href: '/tasks', label: 'Tasks', icon: '📋' },
		{ href: '/journal', label: 'Journal', icon: '📝' },
		{ href: '/goals', label: 'Goals', icon: '🎯' },
		{ href: '/settings', label: 'Settings', icon: '⚙️' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<nav class="flex flex-col gap-1 p-4">
	<div class="mb-6 px-2">
		<h1 class="text-xl font-light tracking-tight text-white">lifedash</h1>
		<p class="text-xs text-white/40">your life, organized</p>
	</div>

	{#each navItems as item}
		<a
			href={item.href}
			class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200
				{isActive(item.href)
					? 'bg-white/10 text-white'
					: 'text-white/50 hover:bg-white/5 hover:text-white/80'}"
		>
			<span class="text-lg">{item.icon}</span>
			<span>{item.label}</span>
		</a>
	{/each}
</nav>
