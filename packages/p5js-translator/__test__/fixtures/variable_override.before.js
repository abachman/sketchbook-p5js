const rect = null

function something() {
  let square = false
  var color = true
  fill(square ? color(100, 0, 0) : 0)
  if (color) {
    const fill = () => 'fill'
    console.log(fill())
  }

  fill(99)

  for (let TWO_PI = 0; TWO_PI < floor(PI); TWO_PI++) {
    console.log(square)
    console.log(color)
    console.log(rect(1))
    console.log(fill(TWO_PI))
  }
}
// okay
