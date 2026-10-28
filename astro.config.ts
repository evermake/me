import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  // Astro 7 defaults to JSX whitespace rules ('jsx'), which drops spaces
  // around inline elements. Keep the HTML-aware compression from Astro <= 6.
  compressHTML: true,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    worker: {
      format: 'es',
    },
  },
})
