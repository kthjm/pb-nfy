import { renderToStaticMarkup } from 'react-dom/server'
import React, { createElement } from 'react'
import unified from 'unified'
import htmlToHast from 'rehype-parse'
import hastToFormat from 'rehype-format'
import hastToReactElement from 'rehype-react'
import hastToHtml from 'rehype-stringify'
import Html from './Html.js'

export const renderHtml = props => {
  const htmlViaReact = renderToStaticMarkup(<Html {...props} />)
  return htmlToFormat(`<!DOCTYPE html>${htmlViaReact}`)
}

const htmlToFormat = html =>
  unified()
    .use(htmlToHast, { position: false })
    .use(hastToFormat)
    .use(hastToHtml)
    .processSync(html).contents

export const htmlToReactElement = html =>
  unified()
    .use(htmlToHast, { position: false, fragment: true })
    .use(hastToReactElement, { createElement })
    .processSync(html).contents
