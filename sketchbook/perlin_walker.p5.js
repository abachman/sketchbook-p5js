//  Perlin Walker https://editor.p5js.org/abachman/sketches/AUAUzrL1C
// based on https://www.openprocessing.org/sketch/494102

let points = []
const noiseScale = 800

function setup() {
  createCanvas(1200, 800);
  strokeWeight(4);
  smooth()
  background(0)
  stroke(255, 30)
  fill(255)

  for (let i = 0; i < 250; i++) {
    points.push(new Particle(random(width), random(height)))
  }
}

let saved = false

function draw() {
  // background(0); // comment out this line to draw paths

  points.forEach(function(p) {
    p.move()
    p.display()
    p.checkEdge()
  })
  
  /* if (frameCount > 1800 && !saved) {
    saveCanvas();
    saved = true;
  } */
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.dir = createVector(0, 0)
    this.vel = createVector(0, 0)
    this.color = [random(100, 255), random(255), random(255)]
    this.speed = 0.4
  }

  move() {
    let angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * 
        TWO_PI * noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }

  display() {
    stroke(this.color[0], this.color[1], this.color[2])
    // stroke(this.color)
    point(this.pos.x, this.pos.y)
  }

  checkEdge() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.pos = createVector(random(width), random(height))
      this.color = [random(255), random(255), random(255)] 
    }
  }
}
