# svg-edge-editor

Live demo : https://svg-edge-editor.deno.dev/

SVG import and edit edges with input SVG curves, runs as a service with proper UI

* drag and drop and SVG file
    * Extract straight edges from all paths
* drag and drop SVG curves
* highlight curve
* click on edge to assign
* click again on edge to toggle
* click on another curve to assign

# Dev
## Usage
pnpm need to be installed globally
```shell
    pnpm install
    pnpm run dev
    deno run --allow-env --allow-net --allow-read dist/server/entry.mjs
```
## Frameworks
* Astro.build
* pnpm
* SSR Mode with deno
* tailwind web only (or fallback on solid/svelte)
* sign-in with github
* try aws / deno deploy
### deno deploy
* pnpm action from https://github.com/pnpm/action-setup
## Features
* Top menu with entries and sign in
* css adjustable side menu with min max

# TODO
* improve the coordinates Offset not to be hardcoded but to the SVG Offset within the client
* only cycle the shape when clicking on the same side

# Issues
* @astro-auth/core does not build with deno 
```cmd
[commonjs--resolver] Cannot bundle Node.js built-in "stream" imported from "node_modules\.pnpm\@astro-auth+core@1.0.12\node_modules\@astro-auth\core\dist\index.js". Consider disabling ssr.noExternal or remove the built-in dependency.  ncy.
```