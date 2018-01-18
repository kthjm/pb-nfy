import React from 'react'
import chinPluginsInkscape from 'chin-plugins-inkscape'
import chinPluginsImagemin from 'chin-plugins-imagemin'
import chinPluginsHtmlEmbed from 'chin-plugins-html-embed'

const DEVELOPMENT = {
  props: ['onerror.js'],
  component: (props) =>
    <html lang="ja">
      <head>
        <title>{'title'}</title>
        {props['onerror.js']}
      </head>
      <body>
        <div id="app" />
        <script src="./dll.js" />
        <script src="./bundle.js" />
      </body>
    </html>
}

const PRODUCTION = {
  props: ['favicons.png'],
  component: (props) =>
    <html lang="ja">
      <head>
        <title>{'title'}</title>
        {props['favicons.png']}
      </head>
      <body>
        <div id="app" />
        <script src="./bundle.js" />
      </body>
    </html>
}

export default Object.assign({},
  chinPluginsInkscape(/* no options */),
  chinPluginsImagemin({
    /**
    OptimizeJpg: {},
    OptimizePng: {},
    OptimizeSvg: {}
    */
  }),
  chinPluginsHtmlEmbed([
    {
      out: 'index.html',
      env: {
        "DEVELOPMENT": DEVELOPMENT,
        "PRODUCTION": PRODUCTION
      }
    }
  ])
)