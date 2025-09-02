import { GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_API_KEY, GOOGLE_SHEETS_RANGE } from "$env/static/private";

export async function GET() {
	const SPREADSHEET_ID = GOOGLE_SHEETS_SPREADSHEET_ID;
	const API_KEY = GOOGLE_SHEETS_API_KEY;
	const RANGE = GOOGLE_SHEETS_RANGE || 'wedstrijdblad!A:Z';

	if (!SPREADSHEET_ID || !API_KEY) {
		return new Response(JSON.stringify({ error: 'Missing server environment variables' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(
		RANGE
	)}?key=${API_KEY}`;

	try {
		const res = await fetch(url);
		if (!res.ok) {
			const text = await res.text();
			return new Response(JSON.stringify({ error: 'Sheets API error', detail: text }), {
				status: res.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		const data = await res.json();
		return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
	} catch (err) {
        console.error('Error fetching Sheets API:', err);
		return new Response(JSON.stringify({ error: String(err) }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
