//  Image Masking https://editor.p5js.org/abachman/sketches/jvN0CJUee
let img, c;

function setup() {
  colorMode(HSB);
  createCanvas(400, 400);
  noStroke();
  fill(100, 0, 40);
  img = loadImage('day-job-profile.jpg');
  c = 0;
}

let mask = true;

function draw() {

  image(img, 0, 0) // img.width / 2, img.height / 2);
  tint(c, 100, 100);

  // filter(POSTERIZE, 3)
  // filter(GRAY);

  if (mask) {
    beginShape();
    vertex(0, 0);
    vertex(width, 0);
    vertex(398, 304);
    vertex(276, 296);
    vertex(281, 252);
    vertex(300, 214);
    vertex(282, 187);
    vertex(282, 132);
    vertex(287, 121);
    vertex(282, 77);
    vertex(251, 39);
    vertex(181, 40);
    vertex(142, 74);
    vertex(142, 89);
    vertex(159, 165);
    vertex(90, 203);
    vertex(62, 244);
    vertex(60, 300);
    vertex(66, 369);
    vertex(71, 377);
    vertex(115, 362);
    vertex(147, 399);
    vertex(230, 398);
    vertex(269, 341);
    vertex(396, 342);
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
  c = (c + 1) % 255;
}

function mousePressed() {
  print("vertex(" + mouseX + "," + mouseY + ");")
}
