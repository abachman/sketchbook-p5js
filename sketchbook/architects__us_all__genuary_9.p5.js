const LINES = [
  `The programmer, like the poet
works only slightly removed
from pure thought stuff.`,
  `They build their castles
in the air, from air,`,
  `creating by exertion
of the imagination.`,
  `Few media of creation
are so flexible,`,
  `so easy to polish and rework,`,
  `so readily capable of realizing
grand conceptual structures.`,
  `The magic of myth and legend
has come true in our time.`,
  `Fred Brooks, 
"The Mythical Man Month"`,
];
let current = 0;

let COLORS;

const liners = [];

// color management
let cidx = 0,
  nidx = 0,
  ccol,
  ncol;
function cycleColor() {
  cidx = nidx;
  while (abs(cidx - nidx) < 30) {
    nidx = random(0, 360);
  }
  ccol = color(cidx, 40, random(90, 100));
  ncol = color(nidx, 40, random(90, 100));
}

function setup() {
  createCanvas(400, 400);
  textFont("David Libre", 22)
  textSize(22);
  // textStyle(BOLD);
  textAlign(LEFT, TOP);
  noStroke();
  colorMode(HSB);
  cycleColor();
}

let frames = 0;

function draw() {
  frames++;

  background(ccol);

  const line = LINES[current];

  fill(18);
  text(line, 
       30,
       30 + map(LINES.indexOf(line), 0, LINES.length, 0, height - 60));

  if (frames == 200) {
    current++;
    current %= LINES.length;
    frames = 0;
    cycleColor();
  }
}
