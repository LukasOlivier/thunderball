<script>
	export let standings = [];
	export let loading = false;
	export let error = null;
	export let title = '';
</script>

<div class="overflow-hidden rounded-xl bg-white shadow-xl">
	<h1 class="bg-primary py-4 text-center text-2xl font-bold text-white">
		{title}
	</h1>

	{#if loading}
		<div class="flex items-center justify-center py-8">
			<div class="h-12 w-12 animate-spin rounded-full border-b-4 border-blue-600"></div>
		</div>
	{:else if standings.length === 0}
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
						<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Team</th>
						<th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Punten</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each standings.sort((a, b) => b.punten - a.punten) as standing (standing.team)}
						<tr class="transition-colors hover:bg-gray-100">
							<td class="px-6 py-4 text-gray-800">{standing.team}</td>
							<td class="px-6 py-4 text-right font-bold text-gray-900">{standing.punten}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
