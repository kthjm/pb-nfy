import React from 'react'
import { render } from 'react-dom'
import App from './app'

fetch('./props.json')
  .then(res => res.json())
  .then(props =>
    render(
      <div>
        <style>{``}</style>
        <App {...props} />
      </div>,
      document.getElementById('app')
    )
  )
