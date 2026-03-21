import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import uno from 'unocss/astro'
import icons from 'unplugin-icons/vite'

export default defineConfig({
  integrations: [
    react(),
    uno(),
  ],
  vite: {
    plugins: [
      icons({
        compiler: 'astro',
      }),
    ],
  },
})
