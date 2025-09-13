// this is a p5.js sketch
// import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

const VIDEO_SIZE = {
  '640 X 480': {width: 640, height: 480},
  '640 X 360': {width: 640, height: 360},
  '360 X 270': {width: 360, height: 270}
};
const size = VIDEO_SIZE['640 X 480'];
const mediapipeFaceConfig = {
  maxFaces: 1,
  refineLandmarks: true,
  triangulateMesh: false,
  boundingBox: true,
};
const createDetector = () => {
  return faceLandmarksDetection.createDetector(STATE.model, {
    runtime,
    refineLandmarks: STATE.modelConfig.refineLandmarks,
    maxFaces: STATE.modelConfig.maxFaces,
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`
  });
}
const videoConfig = {
  'audio': false,
  'video': {
    facingMode: 'user',
    // Only setting the video to a specified size for large screen, on
    // mobile devices accept the default size.
    width: isMobile() ? VIDEO_SIZE['360 X 270'].width : size.width,
    height: isMobile() ? VIDEO_SIZE['360 X 270'].height : size.height,
    frameRate: {
      ideal: 30,
    },
  },
};

function setup() {
  createCanvas(600, 600)
  background(0);
}

function draw() {
  if (mouseIsPressed) {
    fill(255);
  } else {
    fill(0);
  }
  ellipse(mouseX, mouseY, 50, 50);
}