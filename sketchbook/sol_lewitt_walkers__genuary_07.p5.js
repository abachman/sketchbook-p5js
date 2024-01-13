//  sol lewitt walkers, genuary 07 https://editor.p5js.org/abachman/sketches/yFWAuwlno
// https://genuary.art/prompts#jan7
// sol lewitt 

//
// `COUNT` people gather in an empty lot
// each carries one can of paint
//   they paint the spot they are standing on
//   they turn in a random direction
//   they step forward
// repeat until 
//   everyone has left the field or
//   `STEPS` steps have been taken
// 


const COUNT = 100
const STEPS = 5000
const SPD = [1.2, 3]
const HUE = [0, 20]
const SAT = [40, 70]
const BRT = [80, 100]
const TRN = 0.5

function j(l) { return l.map(v => v.toString()).join('_') }
function name(step) {
  return `sol-lewitt--${step}-${COUNT}-${j(SPD)}-${j(HUE)}-${j(SAT)}-${j(BRT)}`
}


class Person {
  constructor(w, h) {
    this.w = w
    this.h = h
    
    this.x = random(w) 
    this.y = random(h)
    this.d = random(TWO_PI)
    this.s = random(1.2, 3)
    
    this.c = color(
      random(...HUE), 
      random(...SAT),
      random(...BRT),
      TRN
    )
    
    this.left = false
  }
  
  paint() {
    fill(this.c)
    ellipse(this.x, this.y, 4)
  }
  
  turn() {
    this.d += random(TWO_PI)
  }
  
  step() {
    this.x += this.s * cos(this.d)
    this.y += this.s * sin(this.d)
    
    if (this.x < 0 || this.x > this.w || this.y < 0 || this.y > this.h) {
      this.left = true
    }
  }
}

let people = []

function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
  background(220)
  noStroke();
  for(let i=0; i < COUNT; i++) {
    people.push(new Person(width, height))
  }
}

let step = 0;

function draw() {
  people.forEach(person => {
    person.paint()
    person.turn()
    person.step()
  })
  
  people = people.filter(person => !person.left)
  step++;
  
  if (step >= STEPS || people.length == 0) {
    noLoop();
    saveCanvas(name(step), 'png');
  }
}
