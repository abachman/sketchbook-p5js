class Cell {
  constructor({ coords, band, stack, x, y }) {
    this.coords = coords // geometry
    this.center = { 
      x: this.coords[0] + this.coords[2]/2, 
      y: this.coords[1] + this.coords[3]/2
    }

    this.band = band
    this.stack = stack
    this.x = x
    this.y = y

    this.draw = null
    this.element = null

    this.label = null
  }

  set el(element) {
    let cell = (this.element = element)

    this.setLabel(`${this.x},${this.y}`)

    cell.on("mouseover", () => {
      cell.fill("#6ac")
    })

    cell.on("mouseout", () => {
      cell.fill("#fff")
    })
  }

  setLabel(str) {
    if (this.label) {
      this.label.text(str)
    } else { 
      this.label = this.draw.text(str).css({ "pointer-events": "none" })
    }
    this.label.center(this.center.x, this.center.y)
  }
}

export { Cell }
