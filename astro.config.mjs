// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://www.bar-uno.de",
	trailingSlash: "always",

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [sitemap()],
});
