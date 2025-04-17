let altitudeSlider;
let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  altitudeSlider = createSlider(0, 800000, 400000, 10000);
  altitudeSlider.position(20, 20);
  altitudeSlider.style('width', '220px');

  textFont('monospace', 14);
  smooth();

  const numPlanets = 8;
  for (let i = 0; i < numPlanets; i++) {
    planets.push({
      orbitPix: 100 + i * 60,
      size:     12 + i * 2,
      speed:    0.002 + i * 0.001,
    });
  }
}

function draw() {
  background(0);
  rotateX(-PI / 8);

  push();
  ambientLight(80);
  pointLight(255, 255, 180, 0, 0, 0);
  emissiveMaterial(255, 230, 120);
  sphere(30);
  pop();

  for (let p of planets) {
    push();
    const θ = frameCount * p.speed;
    rotateY(θ);
    translate(p.orbitPix, 0, 0);
    normalMaterial();
    sphere(p.size);
    pop();
  }

  resetMatrix();
  fill(255);
  noStroke();

  const h = altitudeSlider.value();
  const g = EP.surfaceGravity(35, h).toFixed(4);
  const v = (EP.escapeVelocity(h) / 1000).toFixed(2);
  const T = (EP.circularOrbitPeriod(h) / 60).toFixed(1);

  text(`Altitude: ${(h / 1000).toFixed(0)} km`, 20, 60);
  text(`g        : ${g} m/s²`,               20, 80);
  text(`Escape v : ${v} km/s`,               20,100);
  text(`Orbit T  : ${T} min`,                20,120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}