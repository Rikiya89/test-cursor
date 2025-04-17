let spheres = [];
let numSpheres = 200;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noStroke();

  for (let i = 0; i < numSpheres; i++) {
    spheres.push({
      radius: random(100, 400),
      size: random(4, 20),
      speed: random(0.1, 1),
      angle: random(360),
      axis: p5.Vector.random3D(),
      color: [random(100, 255), random(100, 255), random(100, 255)],
    });
  }
}

function draw() {
  background(0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  ambientLight(60);
  pointLight(255, 255, 255, 0, 0, 0);

  // Draw sacred geometry-like connecting lines
  stroke(255, 50);
  noFill();
  for (let i = 0; i < spheres.length; i++) {
    for (let j = i + 1; j < spheres.length; j++) {
      let si = spheres[i];
      let sj = spheres[j];

      let ai = frameCount * si.speed + si.angle;
      let aj = frameCount * sj.speed + sj.angle;

      let xi = si.radius * cos(ai) * si.axis.x;
      let yi = si.radius * sin(ai) * si.axis.y;
      let zi = si.radius * sin(ai) * si.axis.z;

      let xj = sj.radius * cos(aj) * sj.axis.x;
      let yj = sj.radius * sin(aj) * sj.axis.y;
      let zj = sj.radius * sin(aj) * sj.axis.z;

      // Connect spheres within a certain distance
      let d = dist(xi, yi, zi, xj, yj, zj);
      if (d < 150) {
        line(xi, yi, zi, xj, yj, zj);
      }
    }
  }
  noStroke();

  for (let s of spheres) {
    push();
    let angle = frameCount * s.speed + s.angle;
    let x = s.radius * cos(angle) * s.axis.x;
    let y = s.radius * sin(angle) * s.axis.y;
    let z = s.radius * sin(angle) * s.axis.z;

    translate(x, y, z);
    ambientMaterial(...s.color);
    sphere(s.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}