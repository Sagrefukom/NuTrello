<template>
	<footer
		class="fixed bottom-0 left-0 w-full flex items-center justify-center px-[15px] bg-[rgba(208,221,223,0.1)] backdrop-blur-md h-[50px]"
	>
		<UDivider
			type="solid"
			:ui="{ border: { base: 'border-gray-700 dark:border-gray-200' } }"
			>{{ new Date().getFullYear() }}</UDivider
		>
	</footer>
</template>
