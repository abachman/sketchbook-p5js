(() => {
  // __test__/fixtures/sketchbook/circles.p5.js
  var mySketch = (sketch) => {
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
  var mySketch_bundle = {
    translated: "2024-01-15T18:43:45.769Z",
    path: "/home/adam/projects/sketchbook-p5js/packages/esbuild-plugin-p5js/__test__/fixtures/sketchbook/circles.p5.js",
    sketch: mySketch,
    metadata: { "name": "like wind", "author": "Adam B.", "mtime": 1705342164113 }
  };
  var circles_p5_default = mySketch_bundle;

  // __test__/fixtures/single_sketch.js
  console.log({ sketch: circles_p5_default });
})();
