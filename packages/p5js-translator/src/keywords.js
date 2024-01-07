const methods = [
  // "constructor", 
  "remove", "setup", "draw", "canvas", "width", "height", "drawingContext",
  "focused", "deltaTime", "frameCount", 

  "registerPreloadMethod", "registerMethod",
  "unregisterMethod", "print", "cursor", "frameRate", "getFrameRate",
  "setFrameRate", "getTargetFrameRate", "noCursor", "fullscreen", "pixelDensity",
  "displayDensity", "getURL", "getURLPath", "getURLParams", "pushStyle",
  "popStyle", "popMatrix", "pushMatrix", "registerPromisePreload", "camera",
  "perspective", "ortho", "frustum", "createCamera", "setCamera",
  "setAttributes", "createCanvas", "resizeCanvas", "noCanvas", "createGraphics",
  "createFramebuffer", "blendMode", "noLoop", "loop", "isLooping", "push", "pop",
  "redraw", "applyMatrix", "resetMatrix", "rotate", "rotateX", "rotateY",
  "rotateZ", "scale", "shearX", "shearY", "translate", "arc", "ellipse",
  "circle", "line", "point", "quad", "rect", "square", "triangle", "ellipseMode",
  "noSmooth", "rectMode", "smooth", "strokeCap", "strokeJoin", "strokeWeight",
  "bezier", "bezierDetail", "bezierPoint", "bezierTangent", "curve",
  "curveDetail", "curveTightness", "curvePoint", "curveTangent", "beginContour",
  "beginShape", "bezierVertex", "curveVertex", "endContour", "endShape",
  "quadraticVertex", "vertex", "normal", "textOutput", "gridOutput", "alpha",
  "blue", "brightness", "color", "green", "hue", "lerpColor", "lightness", "red",
  "saturation", "beginClip", "endClip", "clip", "background", "clear",
  "colorMode", "fill", "noFill", "noStroke", "stroke", "erase", "noErase",
  "createStringDict", "createNumberDict", "storeItem", "getItem", "clearStorage",
  "removeItem", "select", "selectAll", "removeElements", "createDiv", "createP",
  "createSpan", "createImg", "createA", "createSlider", "createButton",
  "createCheckbox", "createSelect", "createRadio", "createColorPicker",
  "createInput", "createFileInput", "createVideo", "createAudio",
  "createCapture", "createElement", "describe", "describeElement",
  "setMoveThreshold", "setShakeThreshold", "keyIsDown", "requestPointerLock",
  "exitPointerLock", "createImage", "saveCanvas", "encodeAndDownloadGif",
  "saveFrames", "loadImage", "saveGif", "image", "tint", "noTint", "imageMode",
  "blend", "copy", "getFilterGraphicsLayer", "filter", "get", "loadPixels",
  "set", "updatePixels", "loadJSON", "loadStrings", "loadTable", "loadXML",
  "loadBytes", "httpGet", "httpPost", "httpDo", "createWriter", "save",
  "saveJSON", "saveJSONObject", "saveJSONArray", "saveStrings", "saveTable",
  "writeFile", "downloadFile", "abs", "ceil", "constrain", "dist", "exp",
  "floor", "lerp", "log", "mag", "map", "max", "min", "norm", "pow", "round",
  "sq", "sqrt", "fract", "createVector", "noise", "noiseDetail", "noiseSeed",
  "randomSeed", "random", "randomGaussian", "acos", "asin", "atan", "atan2",
  "cos", "sin", "tan", "degrees", "radians", "angleMode", "textAlign",
  "textLeading", "textSize", "textStyle", "textWidth", "textAscent",
  "textDescent", "textWrap", "loadFont", "text", "textFont", "append",
  "arrayCopy", "concat", "reverse", "shorten", "shuffle", "sort", "splice",
  "subset", "float", "int", "str", "boolean", "byte", "char", "unchar", "hex",
  "unhex", "join", "match", "matchAll", "nf", "nfc", "nfp", "nfs", "split",
  "splitTokens", "trim", "day", "hour", "minute", "millis", "month", "second",
  "year", "beginGeometry", "endGeometry", "buildGeometry", "freeGeometry",
  "plane", "box", "sphere", "cylinder", "cone", "ellipsoid", "torus",
  "orbitControl", "debugMode", "noDebugMode", "ambientLight", "specularColor",
  "directionalLight", "pointLight", "imageLight", "lights", "lightFalloff",
  "spotLight", "noLights", "loadModel", "model", "loadShader", "createShader",
  "createFilterShader", "shader", "resetShader", "texture", "textureMode",
  "textureWrap", "normalMaterial", "ambientMaterial", "emissiveMaterial",
  "specularMaterial", "shininess", "callRegisteredHooksFor"
]

const properties = [
  "VERSION", "P2D", "WEBGL", "WEBGL2", "ARROW", "CROSS",
  "HAND", "MOVE", "TEXT", "WAIT", "HALF_PI", "PI", "QUARTER_PI", "TAU", "TWO_PI",
  "DEGREES", "RADIANS", "DEG_TO_RAD", "RAD_TO_DEG", "CORNER", "CORNERS",
  "RADIUS", "RIGHT", "LEFT", "CENTER", "TOP", "BOTTOM", "BASELINE", "POINTS",
  "LINES", "LINE_STRIP", "LINE_LOOP", "TRIANGLES", "TRIANGLE_FAN",
  "TRIANGLE_STRIP", "QUADS", "QUAD_STRIP", "TESS", "CLOSE", "OPEN", "CHORD",
  "PIE", "PROJECT", "SQUARE", "ROUND", "BEVEL", "MITER", "RGB", "HSB", "HSL",
  "AUTO", "ALT", "BACKSPACE", "CONTROL", "DELETE", "DOWN_ARROW", "ENTER",
  "ESCAPE", "LEFT_ARROW", "OPTION", "RETURN", "RIGHT_ARROW", "SHIFT", "TAB",
  "UP_ARROW", "BLEND", "REMOVE", "ADD", "DARKEST", "LIGHTEST", "DIFFERENCE",
  "SUBTRACT", "EXCLUSION", "MULTIPLY", "SCREEN", "REPLACE", "OVERLAY",
  "HARD_LIGHT", "SOFT_LIGHT", "DODGE", "BURN", "THRESHOLD", "GRAY", "OPAQUE",
  "INVERT", "POSTERIZE", "DILATE", "ERODE", "BLUR", "NORMAL", "ITALIC", "BOLD",
  "BOLDITALIC", "CHAR", "WORD", "LINEAR", "QUADRATIC", "BEZIER", "CURVE",
  "STROKE", "FILL", "TEXTURE", "IMMEDIATE", "IMAGE", "NEAREST", "REPEAT",
  "CLAMP", "MIRROR", "FLAT", "SMOOTH", "LANDSCAPE", "PORTRAIT", "GRID", "AXES",
  "LABEL", "FALLBACK", "CONTAIN", "COVER", "UNSIGNED_BYTE", "UNSIGNED_INT",
  "FLOAT", "HALF_FLOAT", "RGBA", "frameCount", "deltaTime", "focused",
  "webglVersion", "displayWidth", "displayHeight", "windowWidth", "windowHeight",
  "width", "height", "VIDEO", "AUDIO", "deviceOrientation", "accelerationX",
  "accelerationY", "accelerationZ", "pAccelerationX", "pAccelerationY",
  "pAccelerationZ", "rotationX", "rotationY", "rotationZ", "pRotationX",
  "pRotationY", "pRotationZ", "pRotateDirectionX", "pRotateDirectionY",
  "pRotateDirectionZ", "turnAxis", "isKeyPressed", "keyIsPressed", "key",
  "keyCode", "movedX", "movedY", "mouseX", "mouseY", "pmouseX", "pmouseY",
  "winMouseX", "winMouseY", "pwinMouseX", "pwinMouseY", "mouseButton",
  "mouseIsPressed", "touches", "pixels"
]

const keywords = new Set(methods.concat(properties))

const Keywords = {
  includes(name) {
    return keywords.has(name)
  }
}


module.exports = Keywords
