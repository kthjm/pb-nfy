import { createElement } from 'react'
import { outputFile } from 'fs-extra'
import { resolve } from 'path'
import { transform as babelTransform } from 'babel-core'
import faviconsNotPromise from 'favicons'
const favicons = require('util').promisify(faviconsNotPromise)
import { renderHtml, htmlToReactElement } from './utils.js'

const { CHIN_ENV, CHIN_OUT } = process.env

const requiresMap = {
  development: ['onerror', 'dll', 'uappend'],
  production: ['favicons', 'ganalytics', 'uappend']
}

const outputIndexHtml = {
  outPath: resolve(CHIN_OUT, `index.html`),
  props: {
    favicons: undefined,
    onerror: undefined,
    ganalytics: undefined,
    dll:
      CHIN_ENV === 'development' &&
      createElement('script', { src: './dll.js' }),
    uappend: undefined
  },
  isReady() {
    const requires = requiresMap[CHIN_ENV]
    return requires.every(key => this.props[key])
  },
  out() {
    return this.isReady() && outputFile(this.outPath, renderHtml(this.props))
  }
}

export const jsEmbedHtml = opts => {
  return data => {
    const { code } = babelTransform(data, {
      presets: [
        ['env', { targets: { browsers: ['last 2 versions', 'safari >= 7'] } }]
      ],
      compact: true,
      minified: true,
      comments: false
    })

    outputIndexHtml.props[opts.name] = createElement('script', {
      dangerouslySetInnerHTML: { __html: code }
    })

    outputIndexHtml.out()
    return
  }
}

export const pngToFavicons = opts => {
  const faviconsDir = `${opts.dir}/favicons`
  opts.dir = faviconsDir
  opts.ext = '.ico'

  return data =>
    toFavicons(data)
      .then(res => {
        const tags = res.html.join('')
        outputIndexHtml.props.favicons = htmlToReactElement(tags).props.children
        outputIndexHtml.out()
        return icoAndOthers([].concat(res.images, res.files))
      })
      .then(({ ico, others }) =>
        Promise.all(
          others.map(({ name, contents }) =>
            outputFile(`${faviconsDir}/${name}`, contents)
          )
        ).then(() => ico.contents)
      )
}

const icoAndOthers = files => {
  const ico = files.find(({ name }) => name === 'favicon.ico')
  const others = files.filter(({ name }) => name !== 'favicon.ico')
  return { ico, others }
}

const toFavicons = data =>
  favicons(data, {
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
  })

// exports.default = (choose, opts) =>
//    getConfig(opts.config)
//       .then((config) => {
//         config = choose ? config[choose] : config
//         config = config.default || config
//         ;(0, _utils.throwIf)(config, 'object', 'config')
//         process.env.CHIN_ENV = choose
//         process.env.CHIN_CONFIG = config
//         return config
//       })
//       .then(config =>
//         // config = choose ? config[choose] : config
//         // config = config.default || config
//         // ;(0, _utils.throwIf)(config, 'object', 'config')
//          getPreset(opts.preset).then(preset => {
//             ;(0, _utils.throwIf)(preset, 'object', 'preset')
//             var _config = config
//             const put = _config.put,
//                out = _config.out,
//                process = _config.process,
//                weirs = _config.weirs,
//                ignore = _config.ignore
//
//             return [put, out, { process, weirs, ignore }, preset]
//          })
//       )
//       .then(arg =>
//          (0, _main2.default)(...arg).then(
//             opts.verbose ? contentsExecOra : contentsExec
//          )
//       )
//       .catch(errorHandler)
