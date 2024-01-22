import { SVG } from "@svgdotjs/svg.js"

function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn);
  // If late; I mean on time.
  if (
    document.readyState === "interactive" || document.readyState === "complete"
  ) {
    fn();
  }
}

export default function () {
  domReady(function () {
    const width = window.innerWidth
    const height = window.innerHeight - 10

    // Create SVG and set viewbox
    // so that we zoom into the center
    const canvas = SVG()
      .addTo("body")
      .size(width, height)
      .viewbox(-width / 8, -height / 8, width / 4, height / 4)

    const group = canvas.group()
    const circle = group.circle(50).center(0, 0).fill("#f06")

    // Big circle
    canvas.circle(80).center(0, 0).fill("#6ac")

    canvas.add(group)
  })
}
