<script setup lang="ts">
	const colorMode = useColorMode();
	const isDark = computed({
		get() {
			return colorMode.value === "dark";
		},
		set() {
			colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
		},
	});
</script>

<template>
	<header
		class="fixed top-0 left-0 w-full flex items-center justify-between px-[15px] bg-[rgba(208,221,223,0.1)] backdrop-blur-md h-[50px]"
	>
		<span class="text-[25px] font-bold tracking-wide">Nutrello</span>
		<div class="flex gap-x-[10px]">
			<BackgorundSelect />
			<UButton
				:icon="
					isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
				"
				color="gray"
				variant="ghost"
				aria-label="Theme"
				@click="isDark = !isDark"
			/>
		</div>
	</header>
</template>
