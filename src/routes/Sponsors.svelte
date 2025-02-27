<script>
	const sponsors = [
		{
			name: 'Werbrouck',
			image: '/sponsors/Logo_Werbrouck_klein.jpg',
			url: 'https://www.aluwerbrouck.be/'
		},
		{
			name: 'Vanhaverbeke',
			image: '/sponsors/hout-vanhaverbeke.jpg',
			url: 'https://www.hout-vanhaverbeke.be/nl'
		},
		{
			name: 'Slagerij t Worstje',
			image: '/sponsors/logo-tworstje.jpg',
			url: 'https://g.co/kgs/F5Ao4aM'
		},
		{ name: 'Naturoof', image: '/sponsors/NATUROOF.png', url: 'https://www.naturoof.be/nl' },
		{
			name: 'Outback Wines',
			image: '/sponsors/outback-wines.png',
			url: 'https://www.instagram.com/outback_wines/'
		}
	];
</script>

<section id="info" class="mx-auto flex w-full max-w-screen-xl flex-col px-4 py-24">
	<h2 class="mb-6 text-3xl font-bold text-primary md:text-4xl">Met dank aan onze sponsors!</h2>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
		{#each sponsors as sponsor}
			<div class="flex items-center justify-center rounded-lg">
				<a href={sponsor.url} target="_blank" rel="noopener noreferrer">
					<img src={sponsor.image} alt={sponsor.name} class="max-h-24 object-contain sm:max-h-32" />
				</a>
			</div>
		{/each}
	</div>
</section>
