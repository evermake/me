import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    astro: false,
  },
  astro: true,
  react: true,
})
