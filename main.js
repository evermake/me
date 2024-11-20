const iconsSvg = {
  telegram: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#888888" d="M236.88 26.19a9 9 0 0 0-9.16-1.57L25.06 103.93a14.22 14.22 0 0 0 2.43 27.21L80 141.45V200a15.92 15.92 0 0 0 10 14.83a15.91 15.91 0 0 0 17.51-3.73l25.32-26.26L173 220a15.88 15.88 0 0 0 10.51 4a16.3 16.3 0 0 0 5-.79a15.85 15.85 0 0 0 10.67-11.63L239.77 35a9 9 0 0 0-2.89-8.81m-61.14 36l-89.59 64.16l-49.6-9.73ZM96 200v-47.48l24.79 21.74Zm87.53 8l-82.68-72.5l119-85.29Z"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#888888" d="M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32M200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.81 43.81 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.81 43.81 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.72 41.72 0 0 1 7 22.52Z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#888888" d="M128 80a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32m48-136H80a56.06 56.06 0 0 0-56 56v96a56.06 56.06 0 0 0 56 56h96a56.06 56.06 0 0 0 56-56V80a56.06 56.06 0 0 0-56-56m40 152a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40V80a40 40 0 0 1 40-40h96a40 40 0 0 1 40 40ZM192 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/></svg>`,
}

const linksEncoded = {
  gh: {
    domain1: 'com',
    domain2: 'github',
    handle: 'evermake',
  },
  tg: {
    domain1: 'me',
    domain2: 't',
    handle: 'evermake',
  },
  ig: {
    domain1: 'com',
    domain2: 'instagram',
    handle: 'evermake.jpg',
  },
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', main)
else
  main()

function main() {
  createCssForIcons()
  generateRealLinks()
}

function createCssForIcons() {
  const newStyles = []

  Object
    .entries(iconsSvg)
    .forEach(([iconName, iconSvg]) => {
      newStyles.push(`.i-${iconName} { --icon: url("data:${createIconDataUri(iconSvg)}"); }`)
    })

  const style = document.createElement('style')
  style.innerHTML = newStyles.join('\n')
  document.getElementsByTagName('head')[0].appendChild(style)
}

/**
 * Encodes an SVG to an inline CSS image format.
 *
 * Credits to Anthony Fu for his research:
 * https://antfu.me/posts/icons-in-pure-css
 *
 * @param {string} svg SVG of the icon.
 */
function createIconDataUri(svg) {
  // https://bl.ocks.org/jennyknuth/222825e315d45a738ed9d6e04c7a88d0
  const svgEncoded = svg
    .replace('<svg', (~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
    .replace(/"/g, '\'')
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/\{/g, '%7B')
    .replace(/\}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')

  return `image/svg+xml;utf8,${svgEncoded}`
}

function generateRealLinks() {
  document
    .querySelectorAll('a[data-link]')
    .forEach((el) => {
      const linkId = el.dataset['link']
      el.setAttribute('href', decodeLink(linkId))
    })
}

function decodeLink(id) {
  const encoded = linksEncoded[id]
  if (!encoded) return '';
  const { domain1, domain2, handle } = encoded
  return `https://${domain2}.${domain1}/${handle}`
}
