// a fake CCapture object to make all the sketches work

var CCapture = function() {
  this.start = function() {
    // nothing
  }
  this.stop = function() {
    // nothing
  }
  this.save = function() {
    // nothing
  }
  this.capture = function(canvas) {
  }
}

module.exports = CCapture
