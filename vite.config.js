import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Embedded via iframe at prod.amipi.com's /eternity-ring-builder route,
  // served from prodweb's public/eternity-ring-builder/ — asset paths need
  // to resolve under that same base, not the site root.
  base: "/eternity-ring-builder/",
});
