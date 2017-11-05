import { createElement } from 'react'
import { outputFile } from 'fs-extra'
import { transform as babelTransform } from 'babel-core'
import faviconsNotPromise from 'favicons'
const favicons = require('util').promisify(faviconsNotPromise)
import { renderHtml, htmlToReactElement } from './utils.js'
import Bomb from './Bomb.js'

const requiresMap = {
  development: ['onerror', 'dll', 'uappend'],
  production: ['favicons', 'ganalytics', 'uappend']
}

const { CHIN_ENV, CHIN_OUT } = process.env

const bomb = new Bomb({
  requires: requiresMap[CHIN_ENV],
  render: renderHtml,
  output: outputFile,
  outpath: require('path').resolve(CHIN_OUT, `index.html`)
})

if (CHIN_ENV === 'development') {
  bomb.setProp('dll', createElement('script', { src: './dll.js' }))
}

export const jsEmbed = opts => {
  return data => {
    const { code } = babelTransform(data, babelConfig)
    const script = createElement('script', {
      dangerouslySetInnerHTML: { __html: code }
    })
    bomb.setProp(opts.name, script)
    return
  }
}

export const pngToFavicons = opts => {
  opts.name = 'favicon'
  opts.ext = '.ico'

  return data =>
    Promise.resolve()
      .then(() =>
        favicons(data, faviconsConfig)
          .then(res => {
            const tags = res.html.join('')
            bomb.setProp('favicons', htmlToReactElement(tags).props.children)
            return icoAndOthers([].concat(res.images, res.files))
          })
          .then(({ ico, others }) => {
            others.forEach(({ name, contents }) =>
              outputFile(`${opts.dir}/${name}`, contents)
            )
            return ico
          })
      )
      .then(ico => ico.contents)
}

const icoAndOthers = files => ({
  ico: files.find(({ name }) => name === 'favicon.ico'),
  others: files.filter(({ name }) => name !== 'favicon.ico')
})

const babelConfig = {
  presets: [
    ['env', { targets: { browsers: ['last 2 versions', 'safari >= 7'] } }]
  ],
  compact: true,
  minified: true,
  comments: false
}

const faviconsConfig = {
  appName: '',
  path: 'favicons',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
  }
}
