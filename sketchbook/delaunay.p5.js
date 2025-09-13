// start with a graph of nodes
class Graph {
  constructor() {
    this.nodes = []
    this.circles = []
    this.edges = []
  }

  add(node) {
    this.nodes.push(node)

    // no circles, no edges
    if (this.nodes.length < 3) {
      return
    }
    //
  }
}

function setup() {
  createCanvas(400, 400);
  background(220);
  noStroke()
}

function draw() {
  fill(100);
  ellipse(width / 2, height / 2, 100, 100);
}