export async function fetchData(standingsMenUrl, standingsWomenUrl, matchesUrl) {
	const [standingsMenResponse, standingsWomenResponse, matchesResponse] = await Promise.all([
		fetch(standingsMenUrl),
		fetch(standingsWomenUrl),
		fetch(matchesUrl)
	]);

	if (!standingsMenResponse.ok || !standingsWomenResponse.ok || !matchesResponse.ok) {
		throw new Error('Kon gegevens niet ophalen');
	}

	const standingsMenCsv = await standingsMenResponse.text();
	const standingsWomenCsv = await standingsWomenResponse.text();
	const matchesCsv = await matchesResponse.text();

	const standingsMen = parseStandings(standingsMenCsv);
	const standingsWomen = parseStandings(standingsWomenCsv);
	const matches = parseMatches(matchesCsv);

	return { standingsMen, standingsWomen, matches };
}

function parseStandings(csv) {
	return csv
		.split('\n')
		.slice(1)
		.map((row) => {
			const [team, punten] = row.split(',');
			return { team, punten: parseInt(punten) };
		})
		.filter((standing) => standing.team);
}

function parseMatches(csv) {
	return csv
		.split('\n')
		.slice(1)
		.map((row) => {
			const [team1, team2, score] = row.split(',');
			return { team1, team2, score };
		})
		.filter((match) => match.team1);
}
