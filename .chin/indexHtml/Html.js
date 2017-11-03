import React from 'react'

export default props => (
  <html lang="ja">
    <head>
      <title>{'title'}</title>
      {props.favicons}
      {props.onerror}
      {props.ganalytics}
    </head>
    <body>
      <div id="app" />
      {props.dll}
      {props.uappend}
    </body>
  </html>
)
