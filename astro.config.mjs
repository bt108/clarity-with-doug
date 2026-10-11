import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://claritywithdoug.com",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/checkout"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/astro": "/services",
  },
});
