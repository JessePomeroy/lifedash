<script lang="ts">
	import '$lib/styles/global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen bg-surface-950">
	<!-- Sidebar -->
	<aside class="hidden w-60 shrink-0 border-r border-white/5 bg-surface-900 md:flex md:flex-col md:justify-between">
		<Nav />
		<Footer />
	</aside>

	<!-- Mobile header -->
	<div class="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-surface-900 px-4 py-3 md:hidden">
		<h1 class="text-lg font-light text-white">lifedash</h1>
		<!-- TODO: mobile menu toggle -->
	</div>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto pt-14 md:pt-0">
		<div class="mx-auto max-w-5xl p-6 md:p-10">
			{@render children()}
		</div>
	</main>
</div>
