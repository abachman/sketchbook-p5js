(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // p5js:./sketchbook/*.p5.js
  var p5_exports = {};
  __export(p5_exports, {
    p50000_circles: () => p50000_circles_bundle
  });
  var p50000_circles = (sketch) => {
    sketch.setup = function() {
      sketch.createCanvas(800, 800);
      sketch.noStroke();
      sketch.enableCapture();
    };
    sketch.draw = function() {
      if (sketch.frameCount % 10 === 0) {
        sketch.circle(sketch.random(sketch.width), sketch.random(sketch.height), 10);
      }
    };
  };
  var p50000_circles_bundle = {
    translated: "2024-01-15T18:43:45.785Z",
    path: "/home/adam/projects/sketchbook-p5js/packages/esbuild-plugin-p5js/__test__/fixtures/sketchbook/circles.p5.js",
    sketch: p50000_circles,
    metadata: { name: "like wind", author: "Adam B.", mtime: 1705342164113 }
  };

  // __test__/fixtures/blob_sketch.js
  console.log({ sketches: p5_exports });
})();
