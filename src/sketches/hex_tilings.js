/* gridding the plane with hexagons */

// radius: hexagon center to corner distance
var r = 30

// perpendicular radius: center to flat side
// http://mathcentral.uregina.ca/QQ/database/QQ.09.07/h/martin4.html
var pr = Math.sqrt(3) / 2 * r

// 6 angle values for the 6 corners
var THETAS = [
  0, Math.PI * 0.33, Math.PI * 0.66,
  Math.PI, Math.PI + Math.PI * 0.33, Math.PI + Math.PI * 0.66
];

function setup() {
  createCanvas(800, 800);
  noStroke();
  // noFill();
  colorMode(HSB);
}

function draw() {
  // mouseY controls hue of background
  background(map(mouseY, 0, height, 0, 255), 70, 50);

  fill(255)

  // horizontal distance between hexagon centers
  var xstep = r + r / 2

  // vertical distance between hexagon centers
  var ystep = 2 * pr

  // draw hexagons as a grid
  for (var col = -1; col < width / xstep + 2; col++) {
    for (var row = -1; row < height / ystep + 2; row++) {
      var x = col * xstep;
      var y = row * ystep;

      var dm = dist(mouseX, mouseY, x, y)

      // squishin'
      var _r = map(
        // dm < 200 ? dm : dm * 2,
        dm,
        0, width,
        10, 60
      )

      // center of every other column is offset by half a vertical step
      if (col % 2 === 1) {
        y += ystep / 2
      }

      // wigglin'
      var rot = dm < 180 ?
        noise((x + frameCount) * 0.05, (x + frameCount) * 0.05) * 1.2 :
        0

      var scale = r
      var ox = (
        noise((y + frameCount) * 0.1) *
        scale - scale / 2
      ) * map(dm, 0, width, 1, 0)
      var oy = (
        noise((x + frameCount) * 0.1) *
        scale - scale / 2
      ) * map(dm, 0, height, 1, 0)

      hexa(
        x + ox,
        y + oy,
        _r, rot)
    }
  }
}



// draw a hexagon 
// x: horizontal position, 
// y: vertical position (number)
// r: radius (distance from center to corner)
// rot: rotation relative to 0 (angle in radians)
function hexa(x, y, r, rot) {
  push();
  translate(x, y);

  beginShape();
  for (var i = 0; i < THETAS.length; i++) {
    var t = THETAS[i] + rot;
    vertex(r * cos(t), r * sin(t))
  }
  endShape(CLOSE);
  pop();
}