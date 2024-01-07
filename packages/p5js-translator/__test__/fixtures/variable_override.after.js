const rect = null

function something() {
  let square = false
  var color = true
  p5.fill(square ? color(100, 0, 0) : 0)
  if (color) {
    const fill = () => 'fill'
    console.log(fill())
  }

  p5.fill(99)

  for (let TWO_PI = 0; TWO_PI < p5.floor(p5.PI); TWO_PI++) {
    console.log(square)
    console.log(color)
    console.log(rect(1))
    console.log(p5.fill(TWO_PI))
  }
}
// okay
