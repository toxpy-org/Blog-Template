import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), vue(), react()],
  site: "https://toxpy_s_org.github.io",
  base: "/blog-template",
});
