// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  typescript: true,
  astro: true,
  vue: true,
  react: true,

  formatters: {
    astro: false,
    css: 'prettier',
    html: 'prettier',
    markdown: 'dprint',
  },
})
