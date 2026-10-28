import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'unicorn', 'oxc', 'react', 'jsx-a11y', 'import'],
  ignorePatterns: ['dist/**', '.astro/**'],
})
