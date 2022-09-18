# svg-edge-editor
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
