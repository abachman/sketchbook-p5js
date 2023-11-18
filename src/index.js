import './sketches/lsystem.js'
// import './sketches/stochastic_lsystem.js'

import p5 from 'p5'
new p5()

new EventSource('/esbuild').addEventListener('change', () => {
  console.log('RELOAD!')
  location.reload()
})
