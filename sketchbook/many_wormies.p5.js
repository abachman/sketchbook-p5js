//  many wormies https://editor.p5js.org/abachman/sketches/B0k0vaHFo
// Wiggler, based on:
// Processing Examples > Demos > Graphics > Yellowtail
// by Golan Levin

// 
// GESTURE / MOVEMENT 
// 

// all points are arrays [ x, y ]

let worms = [];
let canvas, resetButton;

let nextWormy
let head = {}
let pause = false;

/* 
type Worm = {
  points: Array<Point>;
}

type Point = {
  from: Coord;
  to: Coord;
  at: Coord;
  w: number; // weight
  step: number;
  pathIdx: number;
}

type Coord = [ number, number ];
*/

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.touchStarted(mousePressed);

  background(0);
  stroke(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let drawing = false;
let weight = 0;
let dw = 1;
let midpoint = 40;
let start, finish;
let speed = 0.35;
let STEPS = 2;

function draw() {
  background(0);

  if (drawing) {
    stroke(255, 200, 200);
    let pp = nextWormy[nextWormy.length - 1] || [pmouseX, pmouseY];
    let d = dist(pp[0], pp[1],
      mouseX,
      mouseY);
    strokeWeight(2);
    // point(mouseX, mouseY);

    if (d > 2) {
      nextWormy.push([mouseX, mouseY, weight]);
    }

    for (let i = 0; i < nextWormy.length; i++) {
      if (i < nextWormy.length - 1) {
        line(nextWormy[i][0],
          nextWormy[i][1],
          nextWormy[i + 1][0],
          nextWormy[i + 1][1])
      }
    }
  }

  // drawWormy(wormy, path); 

  for (let worm of worms) {
    const {
      wormy,
      path
    } = worm

    if (wormy) {
      stroke(255);

      // first point continues in direction (based on follower)
      // next point follows first
      // ...
      // last point follows next to last

      let crossed = false;

      for (let p of wormy) {
        strokeWeight(p.w);

        // draw line from current `at` to next `at`
        if (p.follow && !p.crosses) {
          line(p.at[0], p.at[1], p.follow.at[0], p.follow.at[1]);
        }

        p.at[0] = lerp(p.from[0], p.to[0], p.step / STEPS);
        p.at[1] = lerp(p.from[1], p.to[1], p.step / STEPS);

        p.step++;

        if (pause) {
          continue;
        }

        if (p.step === STEPS) {
          p.pathIdx = (p.pathIdx + 1) % path.length;

          p.from = [...p.to];
          p.at = [...p.to];
          p.to = [
            p.from[0] + path[p.pathIdx][0],
            p.from[1] + path[p.pathIdx][1]
          ];
          p.step = 0;
          p.crosses = false;

          if (p.to[0] > width ||
            p.to[0] < 0 ||
            p.to[1] > height ||
            p.to[1] < 0) {
            // .to and .from are on opposite edges of the screen
            p.crosses = true;

            if (p.to[0] > width) {
              p.to[0] -= width;
            } else if (p.to[0] < 0) {
              p.to[0] = width + p.to[0];
            }

            if (p.to[1] > height) {
              p.to[1] -= height;
            } else if (p.to[1] < 0) {
              p.to[1] = height + p.to[1];
            }
          }
        }
      }
    }
  }
}

function mousePressed() {
  nextWormy = [];
  drawing = true;
  weight = 0;
}

function mouseDragged() {
  weight += dw;
  if (weight < 0 || weight > midpoint) {
    dw = -dw
  }
}

// i is index of point that this point will approach
function newPoint(x, y, i, w) {
  return {
    at: [x, y],
    from: [x, y],
    pathIdx: i,
    step: 0,
    to: [x, y],
    w: w
  }
}

function mouseReleased() {
  drawing = false;
  if (nextWormy.length === 0) {
    reset();
    return;
  }
  console.log('storing', nextWormy.length, 'points')

  const worm = {}

  worm.wormy = nextWormy.map(function(coord, i) {
    return newPoint(coord[0],
      coord[1],
      i === nextWormy.length - 1 ? 0 : i + 1, coord[2]);
  });

  // set path offsets, each path point is the offset 
  // from the previous point
  let o = worm.wormy[0]
  worm.path = worm.wormy.map(function(p, idx) {
    let po = (idx === 0) ? o : worm.wormy[idx - 1];
    return [p.at[0] - po.at[0], p.at[1] - po.at[1]];
  });

  // set `to` values on each worm point, that way each point
  // knows where it is going next
  worm.wormy.forEach(function(p) {
    p.to = [
      p.at[0] + worm.path[p.pathIdx][0],
      p.at[1] + worm.path[p.pathIdx][1],
    ]
  });

  // link each point in the worm to it's next neighbor
  for (let i = 0; i < worm.wormy.length; i++) {
    if (i < worm.wormy.length - 1) {
      worm.wormy[i].follow = worm.wormy[i + 1];
    }
  }

  // console.log('path', JSON.stringify(worm.path));
  // console.log('worm', JSON.stringifyworm.(wormy));
  worms.push(worm);
}

function reset(evt) {
  if (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  worms = [];
}

function keyPressed() {
  reset();
}
