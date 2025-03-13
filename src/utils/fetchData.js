export async function fetchData(combinedDataUrl) {
	// Now we only need to fetch a single file
	const response = await fetch(combinedDataUrl);

	if (!response.ok) {
		throw new Error('Kon gegevens niet ophalen');
	}

	const csvData = await response.text();

	// Parse the combined CSV data
	const { standings, matches } = parseCombinedData(csvData);

	return { standings, matches };
}

function parseCombinedData(csv) {
	const lines = csv.split('\n');
	const matches = [];
	let standings = [];

	// Find where the standings data begins (now accounting for the empty column)
	const standingsStartIndex = lines.findIndex(
		(line) => line.split(',')[5] === 'Ploeg' && line.split(',')[6] === 'Punten'
	);

	// Parse matches (first section)
	const matchesData = lines.slice(1, lines.length);

	matches.push(
		...matchesData
			.map((row) => {
				const columns = row.split(',');
				// Make sure we have enough columns and the first column is not empty
				if (columns.length >= 4 && columns[0].trim()) {
					return {
						team1: columns[0],
						score1: parseInt(columns[1]),
						score2: parseInt(columns[2]),
						team2: columns[3]
					};
				}
				return null;
			})
			.filter((match) => match && match.team1 && match.team2)
	);

	// Parse standings from the same rows but different columns
	standings = lines
		.slice(1)
		.map((row) => {
			const columns = row.split(',');
			if (columns.length >= 7) {
				const team = columns[5];
				const punten = parseInt(columns[6]);

				// Make sure we have valid data
				if (team && !isNaN(punten)) {
					return { team, punten };
				}
			}
			return null;
		})
		.filter((standing) => standing !== null);

	return { standings, matches };
}
