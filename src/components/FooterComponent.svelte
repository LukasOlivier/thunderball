<script>
	import { Icon } from 'svelte-icons-pack'; // Import icons from the Svelte Icons Pack
	import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from 'svelte-icons-pack/ai'; // Import Font Awesome icons

	export let socials = [
		{
			icon: AiFillInstagram,
			link: 'https://www.instagram.com/thunderball_2025/'
		},
		{
			icon: AiFillTwitterSquare,
			link: 'https://twitter.com/thunderball_2025'
		},
		{
			icon: AiFillFacebook,
			link: 'https://facebook.com/thunderball_2025'
		}
		// Add more social links as needed
	];
</script>

<footer class="bg-primary text-secondary py-8">
	<div class="container mx-auto max-w-screen-xl px-4">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<enhanced:img
				src="/src/lib/assets/images/thunderball.webp"
				alt="Thunderball Logo"
				class="mb-8 h-24 w-24 object-contain md:mb-0"
				title="Thunderball Logo"
				width="500"
				height="500"
			/>

			<!-- Social Icons -->
			<div class="flex gap-6">
				{#each socials as social, index}
					<a
						href={social.link}
						target="_blank"
						rel="noopener noreferrer"
						class="text-secondary h text-4xl"
						aria-label="Social Media"
					>
						<Icon src={social.icon} />
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
