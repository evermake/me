import { defineConfig, presetMini } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      'text-contrast': '#d3d3d3',
      'text-muted': '#4c4c4c',
      'text-underline': '#838383',
      'bg': '#0e0e0e',
    },
    fontFamily: {
      serif: 'Lora, serif',
    },
  },
  presets: [
    presetMini(),
  ],
})
