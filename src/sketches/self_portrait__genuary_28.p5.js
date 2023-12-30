/*
self portrait: image, picture, camera, webcam, selfie
*/

let img

function preload() {
  img = loadImage('assets/selfie.jpg')
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  image(img, 0, 0, 400, 400)
}