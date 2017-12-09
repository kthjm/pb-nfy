import React from 'react'
import { render } from 'react-dom'
import Desktop from './desktop'
import Mobile from './mobile'

document.addEventListener("DOMContentLoaded", () => rendering())

function rendering(){
  const Component = navigator.userAgent.toLowerCase().includes('mobile')
    ? Mobile
    : Desktop

  render(
    <div>
      <style>{``}</style>
      <Component />
    </div>,
    document.getElementById('app')
  )
}
