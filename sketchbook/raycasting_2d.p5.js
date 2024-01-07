//2D visibility
// Ray Casting

// FIXME: this doesn't work with p5.js esbuild plugin
//
import { Ray } from "./raycasting/Ray.js";
import { Boundary } from "./raycasting/Boundary.js";

const CAPTURE = false;

const source = { pos: null, rays: [] };
const walls = [];
let xoff;
let cf;
const rad = 160;
let t = 0;

function setup() {
  createCanvas(400, 400);

  if (CAPTURE) {
    enableCapture({
      frameCount: 60,
      element: document.getElementById("defaultCanvas0"),
      onComplete: () => noLoop(),
    });
  }

  xoff = width / 2 + rad * cos(radians(t));
  yoff = height / 2 + rad * sin(radians(t));

  source.pos = createVector(width / 2, height / 2);
  for (let i = 0; i < 360; i += 1) {
    source.rays.push(new Ray(source.pos, radians(i)));
  }

  for (let n = 0; n < 5; n++) {
    const x1 = random(width);
    const x2 = random(width);
    const y1 = random(height);
    const y2 = random(height);

    walls.push(new Boundary(x1, y1, x2, y2));
  }
  walls.push(new Boundary(0, 0, width, 0)); // top
  walls.push(new Boundary(0, 0, 0, height)); // left
  walls.push(new Boundary(width, 0, width, height)); // right
  walls.push(new Boundary(width, height, 0, height)); // bottom
};

function draw() {
  background(0);

  for (let wall of walls) {
    wall.show();
  }

  ellipse(source.pos.x, source.pos.y, 10);
  move(source);

  for (let ray of source.rays) {
    let closest;
    let record = Infinity;
    for (let wall of walls) {
      let pt = ray.cast(wall);
      if (pt) {
        const d = p5.Vector.dist(ray.pos, pt);
        if (d < record) {
          record = d;
          closest = pt;
        }
      }
    }

    if (closest) {
      stroke(255, 100);
      line(ray.pos.x, ray.pos.y, closest.x, closest.y);
    }
  }

  // captureFrame();
};

function move(source) {
  source.pos.set(xoff, yoff);
  t += 1;

  xoff = width / 2 + rad * cos(radians(t));
  yoff = height / 2 + rad * sin(radians(t));
  // source.pos.set(noise(xoff) * width, noise(yoff) * height)
  // xoff += 0.005
  // yoff += 0.005
}
