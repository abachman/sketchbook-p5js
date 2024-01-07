// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;
var ext = {};

sketch.setup = () => {
  sketch.createCanvas(sketch.width, 400);
  current = sketch.createVector(0, 0);
  previous = sketch.createVector(0, 0);
};

sketch.draw = () => {
  sketch.background(200);

  // If it's time for a new point
  if (sketch.millis() > next && painting) {

    // Grab mouse position      
    current.x = sketch.mouseX;
    current.y = sketch.mouseY;

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = sketch.millis() + sketch.random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for (var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function mousePressed () {
  next = 0;
  painting = true;
  ext.mouseX = sketch.mouseX;
  previous.x = sketch.mouseX;
  previous.y = sketch.mouseY;

  paths.push(new Path());
}

// Stop
function mouseReleased () {
  painting = false;
}


