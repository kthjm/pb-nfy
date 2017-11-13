import faviconsNotPromise from 'favicons'
const favicons = require('util').promisify(faviconsNotPromise)
import { outputFile } from 'fs-extra'
import { htmlToReactElement } from '../processor.js'
import htmlBomb from "../htmlBomb"

export default opts => {
  opts.name = 'favicon'
  opts.ext = '.ico'

  return data =>
    Promise.resolve()
      .then(() =>
        favicons(data, faviconsConfig)
          .then(res => {
            const tags = res.html.join('')
            htmlBomb.setProp('favicons', htmlToReactElement(tags).props.children)
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