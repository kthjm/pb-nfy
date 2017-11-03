;(() => {
  let useragent = navigator.userAgent.toLowerCase(),
    which = useragent.includes('mobile') ? 'mobile' : 'desktop'

  // if(which === "mobile"){
  //     let viewport = document.createElement("meta");
  //     viewport.name = "viewport";
  //     // viewport.content = "width=device-width, height=device-height";
  //     viewport.content = `height=${innerHeight}`;
  //     document.head.appendChild(viewport)
  // }

  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `./${which}.js`
  document.body.appendChild(script)
})()
