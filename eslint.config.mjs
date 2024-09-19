// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().override("nuxt/typescript", {
  rules: {
    // ...Override rules, for example:
    "vue/no-multiple-template-root": "off",
  },
});
