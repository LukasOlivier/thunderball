<script>
	import { onMount } from 'svelte';
	import Papa from 'papaparse';
	
	const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLT6Yn35K7oK4_KO0FvJfuERsjoTAXD96tPUd1_apQPievUFJf41rsDQKXNT9PtdaQ1V1dIwpTQ8u8/pub?gid=2030833085&single=true&output=csv';
	export let pools = {};
	export let matches = [];
	export let activePool = null;
	let loading = true;
	let error = null;
	let teamStandings = [];  // New variable to store team standings
	
	// Helper function to sort by time
	function sortByTime(a, b) {
	  // Parse time from format like "9u" or "9u35"
	  const parseTime = (timeStr) => {
		const match = timeStr.match(/(\d+)u(\d+)?/);
		if (!match) return [0, 0];
		const hours = parseInt(match[1], 10);
		const minutes = match[2] ? parseInt(match[2], 10) : 0;
		return [hours, minutes];
	  };
	  
	  const timeA = parseTime(a.Time);
	  const timeB = parseTime(b.Time);
	  
	  // Compare hours first
	  if (timeA[0] !== timeB[0]) {
		return timeA[0] - timeB[0];
	  }
	  // If hours are the same, compare minutes
	  return timeA[1] - timeB[1];
	}
	
	onMount(async () => {
	  try {
		const response = await fetch(CSV_URL);
		if (!response.ok) {
		  throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`);
		}
		
		const csvText = await response.text();
		const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
		
		// Filter out rows without time
		matches = parsed.data.filter(row => row['Time']);
		
		 // Extract team standings data
		teamStandings = parsed.data
		  .filter(row => row['Ploegnaam'] && row['Totaal Punten'])
		  .map(row => ({
		    name: row['Ploegnaam'],
		    points: parseInt(row['Totaal Punten'], 10) || 0
		  }))
		  .sort((a, b) => b.points - a.points); // Sort by points (descending)
		
		// Group matches by pool
		pools = {};
		matches.forEach(match => {
		  const poolName = match['Pool'] || 'Unassigned';
		  
		  // Handle knockout stages separately
		  if (poolName.includes('Halve finale') || poolName.includes('Finale')) {
			if (!pools[poolName]) {
			  pools[poolName] = [];
			}
			pools[poolName].push(match);
		  } else {
			// Regular pool matches
			if (!pools[poolName]) {
			  pools[poolName] = [];
			}
			pools[poolName].push(match);
		  }
		});
		
		// Sort each pool's matches by time
		Object.keys(pools).forEach(poolName => {
		  pools[poolName].sort(sortByTime);
		});
		
		// Set default active pool
		if (Object.keys(pools).length > 0) {
		  const regularPools = Object.keys(pools).filter(pool => 
			!pool.includes('Halve finale') && !pool.includes('Finale')
		  );
		  
		  if (regularPools.length > 0) {
			activePool = regularPools.sort()[0];
		  } else {
			activePool = Object.keys(pools).sort()[0];
		  }
		}
		
		loading = false;
	  } catch (err) {
		error = err.message;
		loading = false;
		console.error("Error loading CSV:", err);
	  }
	});
	
	function setActivePool(poolName) {
	  activePool = poolName;
	}
	
	function hasScore(match) {
	  return match.Uitslag && match.Uitslag.trim() !== '';
	}
	
	// Get sorted keys that separates knockout stages
	function getSortedPoolKeys() {
	  const regularPools = Object.keys(pools).filter(pool => 
	    !pool.includes('Halve finale') && !pool.includes('Finale')
	  ).sort();

	  const semifinalPools = Object.keys(pools).filter(pool => 
	    pool.includes('Halve finale')
	  ).sort();
	  
	  const finalePools = Object.keys(pools).filter(pool => 
	    pool.includes('Finale')
	  ).sort();

	  return [...regularPools, ...semifinalPools, ...finalePools];
	}


	
	// Check if current pool is a knockout stage
	function isKnockoutStage(poolName) {
	  return poolName.includes('Halve finale') || poolName.includes('Finale');
	}

	function getTeamPoints(teamName) {
		const team = teamStandings.find(t => t.name.toLowerCase() === teamName.toLowerCase());
		return team ? team.points : 0;
	}
</script>

<div class="bg-zinc-50 min-h-screen py-16">


	<div class="container mx-auto px-4 py-8 max-w-6xl">

	  <!-- Loading and Error States -->
	  {#if loading}
		<div class="flex justify-center items-center py-16">
		  <div class="flex flex-col items-center gap-3">
			<div class="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-800"></div>
			<p class="text-zinc-600 font-medium">Loading schedule...</p>
		  </div>
		</div>
	  {:else if error}
		<div class="rounded-lg bg-red-50 p-6 border border-red-200 text-center my-8">
		  <p class="text-red-700 font-medium">{error}</p>
		  <button 
			class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
			on:click={() => window.location.reload()}
		  >
			Try Again
		  </button>
		</div>
	  {:else}


		<!-- Pool Selection Tabs -->
		<h2 class="text-xl font-semibold text-zinc-900 mb-4">Planning</h2>

		<div class="mb-6 overflow-x-auto pb-1">
		  <div class="flex space-x-1 border-b border-zinc-200">
			{#each getSortedPoolKeys() as poolName}
			  <button 
				class="px-4 py-2 font-medium text-sm whitespace-nowrap {activePool === poolName ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-600 hover:text-zinc-900'}"
				on:click={() => setActivePool(poolName)}
			  >
				{poolName}
			  </button>
			{/each}
		  </div>
		</div>

			<!-- Active Pool Matches -->
		{#if activePool && pools[activePool] && !isKnockoutStage(activePool)}
		  <div class="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
			
			<div class="overflow-x-auto">
			  <table class="w-full">
				<thead>
				  <tr class="bg-zinc-50 border-b border-zinc-200">
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Time</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Team 1</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Totaal punten</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Team 2</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Totaal punten</th>
					<th class="px-6 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider">Score</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Field</th>
				  </tr>
				</thead>
				<tbody class="divide-y divide-zinc-200">
				  {#each pools[activePool] as match, i}
					<tr class="hover:bg-zinc-50 transition-colors ">
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-900 font-medium">{match.Time}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-700">{match["Team 1"]}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-500">{getTeamPoints(match["Team 1"])}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-700">{match["Team 2"]}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-500">{getTeamPoints(match["Team 2"])}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-center">
						{#if hasScore(match)}
						  <span class="font-medium text-zinc-900">{match.Uitslag}</span>
						{:else}
						  <span class="text-zinc-400">—</span>
						{/if}
					  </td>
					  <td class="px-6 py-4 whitespace-nowrap">
						<span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
						  {match.Field}
						</span>
					  </td>
					</tr>
				  {/each}
				</tbody>
			  </table>
			</div>
			
			<!-- Empty state -->
			{#if pools[activePool].length === 0}
			  <div class="py-12 flex flex-col items-center justify-center text-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-zinc-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
				</svg>
				<p class="text-zinc-500">No matches scheduled for this pool.</p>
			  </div>
			{/if}
		  </div>
		{/if}

		<!-- Knockout stages when specifically selected -->
		{#if activePool && isKnockoutStage(activePool)}	
		  <div class="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
			<div class="overflow-x-auto">
			  <table class="w-full">
				<thead>
				  <tr class="bg-gray-50 border-b border-zinc-200">
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Time</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Team 1</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Totaal punten</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Team 2</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Totaal punten</th>
					<th class="px-6 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider">Score</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Field</th>
				  </tr>
				</thead>
				<tbody class="divide-y divide-zinc-200">
				  {#each pools[activePool] as match, i}
					<tr class="hover:bg-zinc-50 transition-colors {hasScore(match) ? 'bg-green-50 hover:bg-green-100' : ''}">
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-900 font-medium">{match.Time}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-700">{match["Team 1"]}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-500">{getTeamPoints(match["Team 1"])}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-700">{match["Team 2"]}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-zinc-500">{getTeamPoints(match["Team 2"])}</td>
					  <td class="px-6 py-4 whitespace-nowrap text-center">
						{#if hasScore(match)}
						  <span class="font-medium text-zinc-900">{match.Uitslag}</span>
						{:else}
						  <span class="text-zinc-400">—</span>
						{/if}
					  </td>
					  <td class="px-6 py-4 whitespace-nowrap">
						<span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
						  {match.Field}
						</span>
					  </td>
					</tr>
				  {/each}
				</tbody>
			  </table>
			</div>
		  </div>
		{/if}

	  {/if}
	</div>
</div>