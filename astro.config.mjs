import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),react()],
  output: "server",
  adapter: deno()
});