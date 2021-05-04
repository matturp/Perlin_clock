var inc = 0.1;
var scl = 50;
var cols, rows;
var roboto;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  colorMode(HSB, 255);
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);

  roboto = loadFont('assets/RobotoMono-Bold.ttf');
  textFont(roboto);

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  background(0,25);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(255, 50);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(2);
      if (mouseX<width/3){
      line(0, 0, scl, 0);
      } else 
      if ((mouseX>width/3) && (mouseX<(width/3+width/3))){
      ellipse(scl,scl,10,10);
      } else
      if (mouseX>(width/3+width/3)){
      rect(0,0,scl-20,scl-20);
      }
      pop();
    }
    yoff += inc;

    zoff += 0.0002;

    push();
    var c = map(mouseY,0,height,0,255);
    var wave = sin(radians(frameCount)*10)*2;
    //stroke(c, 255, 255,50);
    //noFill();
    noStroke();
    fill(c,255,255,50);
    var htime = hour();
    var mtime = minute();
    textSize(450);
    textAlign(CENTER);
    text(htime + ':' + mtime,width/2+wave,height/2+150);
    pop();

  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

}
