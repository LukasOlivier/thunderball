<script>
	import '../app.css';
	let { children } = $props();
	import Seo from 'sk-seo';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<Seo />

<Header />
{@render children()}
<Footer />
