// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: {
		enabled: true,
	},
	colorMode: {
		preference: "light",
	},
	modules: [
		"@nuxt/eslint",
		"@pinia/nuxt",
		"@nuxt/fonts",
		"nuxt-typed-router",
		"@nuxt/ui",
		"@nuxt/image",
	],

	fonts: {
		families: [{ name: "Noto Sans", provider: "google" }],
	},
	css: ["~/assets/scss/global.css"],
});
