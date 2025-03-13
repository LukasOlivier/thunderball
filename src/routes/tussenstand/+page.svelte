<script>
	import Matches from './Matches.svelte';
	import Standings from './Standings.svelte';
	import Sponsors from '../Sponsors.svelte';
	import { fetchData } from '../../utils/fetchData.js';
	import { onMount } from 'svelte';

	const SHEETS_URL =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4ZJ9230fQrGqpBw-3fOxMkCFxaT5JkU5ZcbR6wY7ITfY_O90q4k412Sn4B_dGoCCKt_EAn9uPX44D/pub?gid=0&single=true&output=csv';

	export let standings = [];
	export let matches = [];
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			const data = await fetchData(SHEETS_URL);
			matches = data.matches;
			standings = data.standings;

			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});
</script>

<div class="container mx-auto my-32 min-h-screen px-6">
	<div class="mx-auto max-w-screen-xl space-y-8">
		<Standings {standings} {loading} {error} title="Competitie" />
		<Matches {matches} {loading} {error} title="Gespeelde Wedstrijden" />
		<Sponsors></Sponsors>
	</div>
</div>
