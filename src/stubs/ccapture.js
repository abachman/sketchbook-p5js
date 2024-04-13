// a fake CCapture object to make all the sketches that use it work

class CCapture {
  start() {}
  stop() {}
  save() {}
  capture() {}
}

window.CCapture = CCapture
