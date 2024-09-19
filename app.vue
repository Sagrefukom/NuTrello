<script setup>
	import { useBackgroundStore } from "~/stores/backgroundStore";

	const backgroundStore = useBackgroundStore();

	const backgroundImageStyle = computed(() => {
		return backgroundStore.backgroundImage.length <= 0
			? ""
			: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/${backgroundStore.backgroundImage})`;
	});
</script>

<template>
	<div
		class="wrapper flex flex-col bg-cover bg-no-repeat bg-fixed w-full min-h-full py-[50px]"
		:style="{
			backgroundImage: backgroundImageStyle,
		}"
	>
		<AppHeader />
		<main class="main">
			<NuxtPage />
		</main>
		<AppFooter />
	</div>
</template>
