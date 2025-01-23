<script>
	import '../app.css';
	let { children } = $props();
	import Seo from 'sk-seo';
	import Header from '../components/HeaderComponent.svelte';
	import Footer from '../components/FooterComponent.svelte';
</script>

<Seo />
<!-- Header -->
<Header />

{@render children()}

<!-- Footer -->
<Footer />
