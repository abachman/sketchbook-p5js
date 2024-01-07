// p5js L-Systems sketch
// https://en.wikipedia.org/wiki/L-system
// https://p5js.org/reference/

class LSystem {
  constructor(axiom, rules) {
    this.axiom = axiom
    this.rules = rules
  }

  generate(n) {
    let s = this.axiom
    for (let i = 0; i < n; i++) {
      let ns = ""
      for (let j = 0; j < s.length; j++) {
        const c = s[j]
        if (this.rules[c]) {
          ns += this.rules[c]
        } else {
          ns += c
        }
      }
      s = ns
    }
    return s
  }

  draw(s, pattern) {
    const { angle, length, init, operations } = pattern

    if (init) init()
    else translate(width / 2, height / 2)

    for (let i = 0; i < s.length; i++) {
      const c = s[i]

      if (operations) {
        operations(c)
      } else if (c === "F") {
        // let nx = len * cos(angle)
        // let ny = len * sin(angle)
        line(0, 0, 0, length)
        translate(0, length)
      } else if (c === "+") {
        rotate(angle)
        // angle += angle
      } else if (c === "-") {
        rotate(-angle)
        // angle -= angle
      } else if (c === "[") {
        push()
      } else if (c === "]") {
        pop()
      }
    }
  }
}

function rulesets() {
  return {
    plant: {
      axiom: "X",
      rules: {
        X: "F-[[X]+X]+F[+FX]-X",
        F: "FF",
      },
      angle: PI / 7,
      init: () => {
        translate(width / 2, height)
        rotate(-PI * 0.75)
      },
      length: 5,
    },
    fractal: {
      axiom: "F-F-F-F",
      rules: {
        F: "FF-F--F-F",
      },
      angle: PI / 2,
      init: () => {
        translate(width / 2, height)
        rotate(-PI / 2)
      },
    },
    sierpinski: {
      axiom: "A",
      rules: {
        A: "B-A-B",
        B: "A+B+A",
      },
      init: () => {
        translate(20, height - 20)
        // rotate(PI / 2)
      },
      generations: 8,
      operations: (c) => {
        const length = 2
        const angle = PI / 3
        switch (c) {
          case "A":
          case "B":
            line(0, 0, 0, -length)
            translate(0, -length)
            break
          case "+":
            rotate(angle)
            break
          case "-":
            rotate(-angle)
            break
        }
      },
    },
    copilot: {
      axiom: "F",
      rules: {
        // F: 'F[+F]F[-F]F',
        F: "F-[+F-F-F]+[+F-F+F]",
      },
      length: 24,
      angle: PI * 0.47,
    },
    tree: {
      axiom: "0",
      rules: {
        1: "11",
        0: "1[0]0",
      },
      init: () => {
        translate(width / 2, height)
      },
      operations: (c) => {
        const length = 3
        const angle = PI / 4
        switch (c) {
          case "1":
            line(0, 0, 0, -length)
            translate(0, -length)
            break
          case "0":
            translate(0, -length)
            break
          case "[":
            push()
            rotate(angle)
            break
          case "]":
            pop()
            rotate(-angle)
            break
        }
      },
    },
  }
}

let sets
let pattern
let lsys

// 'plant','fractal','sierpinski','copilot','tree'
const PATTERN = "copilot"

window.setup = () => {
  createCanvas(400, 400)

  sets = rulesets()
  pattern = sets[PATTERN]
  lsys = new LSystem(pattern.axiom, pattern.rules)
}

window.draw = () => {
  background(200, 50, 40)

  stroke(0)
  const s = lsys.generate(pattern.generations || 5)
  text(s.length, 5, 16)

  console.log("s length", s.length)
  if (s.length < 500) {
    console.log(s)
  }

  if (s.length < 100000) {
    lsys.draw(s, pattern)
  } else {
    console.error("i am worried that this will crash the browser")
  }

  noLoop()
}
