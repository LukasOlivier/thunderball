<script>
	import { Icon } from 'svelte-icons-pack';
	import { AiFillTrophy } from 'svelte-icons-pack/ai';
	import { IoBeerOutline } from 'svelte-icons-pack/io';
	import { BiFootball } from 'svelte-icons-pack/bi';

	let features = [
		{
			icon: BiFootball,
			title: 'Spelregels',
			description:
				'Iedere ploeg bestaat uit minimaal 5 en maximaal 8 spelers. Deelnemers moeten minimaal 16 jaar oud zijn.'
		},
		{
			icon: AiFillTrophy,
			title: 'Competities',
			description: 'Er worden afzonderlijke competities georganiseerd voor mannen en vrouwen.'
		},
		{
			icon: IoBeerOutline,
			title: 'Voor supporters',
			description:
				'Ook supporters maken kans op prijzen! Er is een beker voor de meest enthousiaste supportersgroep en een zuipbeker voor de dorstigste ploeg.'
		}
	];
</script>

<section id="info" class="bg-secondary/20 py-24">
	<div class="container mx-auto max-w-screen-xl px-4">
		<h2 class="text-primary mb-6 text-3xl font-bold md:text-4xl">Praktische Informatie</h2>
		<div class="grid gap-8 text-center md:grid-cols-3">
			{#each features as feature, index}
				<div
					class="transform rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-md"
				>
					<div class="text-primary mb-4 flex justify-center">
						<Icon src={feature.icon} size="48" />
					</div>

					<h3
						class="text-primary mb-4 text-xl font-semibold transition-colors duration-300 ease-in-out group-hover:text-opacity-80"
					>
						{feature.title}
					</h3>
					<p
						class="text-gray transition-colors duration-300 ease-in-out group-hover:text-opacity-80"
					>
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
