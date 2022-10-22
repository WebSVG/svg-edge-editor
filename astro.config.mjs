import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  server: {
    port: 3000,
    host: true
  },
  adapter: deno({
    port: 3000,
    hostname: 'localhost'
  }),
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore',
  integrations: [tailwind()]
});