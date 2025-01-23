<script>
	import LandingHeroBackground from './HeroBackground.svelte';
</script>

<section
	class="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-16"
>
	<!-- Background images -->
	<LandingHeroBackground />

	<!-- Content -->
	<div class="z-10 mx-auto w-full max-w-4xl text-center">
		<div class="mb-4">
			<span class="bg-secondary text-primary rounded-full px-4 py-1.5 text-sm font-medium">
				29 maart 2025
			</span>
		</div>
		<h1 class="title text-primary mb-6 text-4xl font-bold uppercase md:text-6xl">
			KSA Izegem
			<span class="title mt-2 block text-5xl md:text-7xl">Thunderball</span>
		</h1>
		<a
			href="https://inschrijvingen.ksaizegem.be/thunderball"
			target="_blank"
			class="bg-primary text-secondary relative inline-block overflow-hidden rounded-lg px-6 py-3 text-lg font-semibold transition-all duration-300 ease-in-out hover:text-white hover:brightness-110 active:scale-95"
		>
			Inschrijven
			<span
				class="bg-secondary absolute inset-0 -translate-x-full opacity-10 transition-transform duration-300"
			></span>
		</a>
	</div>
</section>
