// +layout.js
export const load = async ({ url }) => {
	// OPTIONAL: You can use url.origin to get the base URL,
	// or even url.href to get the full URL.
	// (For example, to get URLs of images in your /static folder), like this:
	// imageURL: `${url.origin}/image.jpg`
	return {
		title: 'Thunderball - KSA Izegem',
		description: 'Thunderball is een jaarlijks evenement georganiseerd door KSA Izegem.',
		keywords: 'KSA, Izegem, Thunderball, fuif, evenement',
		canonical: 'https://thunderball.ksaizegem.be'
	};
};

export const prerender = true;
