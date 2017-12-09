;(() => {
  const script = document.createElement('script')
  const which = navigator.userAgent.toLowerCase().includes('mobile')
    ? 'mobile'
    : 'desktop'
  script.type = 'text/javascript'
  script.src = `./${which}.js`
  document.body.appendChild(script)
})()

// if(which === "mobile"){
//     let viewport = document.createElement("meta");
//     viewport.name = "viewport";
//     // viewport.content = "width=device-width, height=device-height";
//     viewport.content = `height=${innerHeight}`;
//     document.head.appendChild(viewport)
// }
