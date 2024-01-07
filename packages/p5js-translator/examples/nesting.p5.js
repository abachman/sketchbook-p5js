const colors = []
let square = false

function setup() { 
  let rect = null
  createCanvas(400, 400);

  for (let i=0; i < floor(PI); i++) {
    const angle = i * TWO_PI,      
      HSB = 0
    colors.push([ 
      () => color(angle, i * 64, 0),
      () => { 
        const c = color(angle, i * 64, HSB)
        c.setAlpha(64)
        return c
      },
      () => {
        rect = () => `rect ${i} ${floor(TWO_PI)}`
        return { rect }
      }
    ])
    if (i == 1) {
      square = () => `square ${i} ${floor(TWO_PI)}`
    } else if (i > 1) {
      console.log('i > 1', square())
    }
  }
}
