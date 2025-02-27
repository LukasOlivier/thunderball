<script>
	import Matches from './Matches.svelte';
	import Standings from './Standings.svelte';
	import Sponsors from '../Sponsors.svelte';
	import { fetchData } from '../../utils/fetchData.js';
	import { onMount } from 'svelte';

	const STANDINGS_URL =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vTndfC3dsg5102NWxjl4lWsP4gkEcQoeZJHWwCcnRrIVR5fWMPLfwctIFWvtT70S6-eNvUmPhqAIwmO/pub?gid=0&single=true&output=csv';
	const MATCHES_URL =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vTndfC3dsg5102NWxjl4lWsP4gkEcQoeZJHWwCcnRrIVR5fWMPLfwctIFWvtT70S6-eNvUmPhqAIwmO/pub?gid=1209778637&single=true&output=csv';

	export let standingsMen = [];
	export let standingsWomen = [];
	export let matches = [];
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			const data = await fetchData(STANDINGS_URL, STANDINGS_URL, MATCHES_URL);
			standingsMen = data.standingsMen;
			standingsWomen = data.standingsWomen;
			matches = data.matches;
			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});
</script>

<div class="container mx-auto my-32 min-h-screen px-6">
	<div class="mx-auto max-w-screen-xl space-y-8">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<Standings standings={standingsMen} {loading} {error} title="Competitie Mannen" />
			<Standings standings={standingsWomen} {loading} {error} title="Competitie Vrouwen" />
		</div>
		<Matches {matches} {loading} {error} title="Gespeelde Wedstrijden" />
		<Sponsors></Sponsors>
	</div>
</div>
