A bargain basement source code translator to change sketches from p5.js Global mode to p5.js Instance mode.

Notes on what those modes are: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

We can start with a sketch like this:

```javascript
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
```

And end up with this:

```javascript
const colors = []
let square = false

sketch.setup = () => {
  let rect = null
  sketch.createCanvas(400, 400);

  for (let i=0; i < sketch.floor(sketch.PI); i++) {
    const angle = i * sketch.TWO_PI,
      HSB = 0
    colors.push([
      () => sketch.color(angle, i * 64, 0),
      () => {
        const c = sketch.color(angle, i * 64, HSB)
        c.setAlpha(64)
        return c
      },
      () => {
        rect = () => `rect ${i} ${sketch.floor(sketch.TWO_PI)}`
        return { rect }
      }
    ])
    if (i == 1) {
      square = () => `square ${i} ${sketch.floor(sketch.TWO_PI)}`
    } else if (i > 1) {
      console.log('i > 1', square())
    }
  }
}
```

Which can be hoisted into an anonymous function and run anywhere:

```javascript
new p5(
  (sketch) => {
    // translated code goes here
  }
)
```

It can be used in a builder plugin, like with esbuild, to compile sketches for distribution in browser-safe bundles.
