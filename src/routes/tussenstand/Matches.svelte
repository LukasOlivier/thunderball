<script>
	export let matches = [];
	export let loading = false;
	export let error = null;
	export let title = '';
</script>

<div class="overflow-hidden rounded-xl bg-white shadow-xl">
	<h1 class="bg-green-600 py-4 text-center text-2xl font-bold text-white">
		{title}
	</h1>

	{#if loading}
		<div class="flex items-center justify-center py-8">
			<div class="h-12 w-12 animate-spin rounded-full border-b-4 border-green-600"></div>
		</div>
	{:else if matches.length === 0}
		<div class="py-8 text-center text-gray-500">Geen gegevens beschikbaar.</div>
	{:else if error}
		<div
			class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
			role="alert"
		>
			{error}
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full table-auto">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Team 1</th>
						<th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Score</th>
						<th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Team 2</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each matches as match (match.team1 + match.team2)}
						<tr class="transition-colors hover:bg-gray-100">
							<td class="px-6 py-4 text-gray-800">{match.team1}</td>
							<td class="px-6 py-4 text-center font-bold text-gray-900">{match.score}</td>
							<td class="px-6 py-4 text-right text-gray-800">{match.team2}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
