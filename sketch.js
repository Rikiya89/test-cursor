let mic, amp;
let spheres = [];
let numSpheres = 100;
let easycam;

function setup() {
  createCanvas(720, 1080, WEBGL);
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  amp.setInput(mic);
  easycam = createEasyCam();
  angleMode(DEGREES);
  noStroke();

  for (let i = 0; i < numSpheres; i++) {
    spheres.push({
      radius: random(100, 400),
      size: random(6, 24),
      speed: random(0.1, 1),
      angle: random(360),
      axis: p5.Vector.random3D(),
      color: [random(150, 255), random(150, 255), random(200, 255)],
    });
  }
}

function draw() {
  background(0);

  ambientLight(80, 80, 100);
  directionalLight(255, 255, 255, -0.5, -1, -0.3);

  // Draw sacred geometry-like connecting lines
  stroke(255, 50);
  noFill();
  for (let i = 0; i < spheres.length; i++) {
    for (let j = i + 1; j < Math.min(i + 20, spheres.length); j++) {
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
      if (d < 250) {
        line(xi, yi, zi, xj, yj, zj);
      }
    }
  }
  noStroke();

  let level = amp.getLevel();
  let scaleFactor = map(level, 0, 0.3, 0.8, 2);

  for (let s of spheres) {
    push();
    let angle = frameCount * s.speed + s.angle;
    let x = s.radius * cos(angle) * s.axis.x;
    let y = s.radius * sin(angle) * s.axis.y;
    let z = s.radius * sin(angle) * s.axis.z;

    translate(x, y, z);
    ambientMaterial(...s.color);
    sphere(s.size * scaleFactor);
    pop();
  }
}