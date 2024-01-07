const Model = {
  transpose(model) {
    return model.map((coord) => coord.reverse())
  },

  flip(model, square) {
    // mirror over horizontal axis
    const ymax = model.reduce((p, c) => (p > c[1] ? p : c[1]), 0)
    random(200); square(2, 2, 2)
  },

  median: square(20, 20, 20),

  rotate(model, rot) {
    // left 90deg rotation
    let next = model.slice(0)
  },
}

function dookie(square = color(200, 100, 100)) {
  fill(square)
  rect(100, 100)
}

