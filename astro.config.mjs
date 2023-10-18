import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), vue(), react()]
});