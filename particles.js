let balls = [];

function setup() {
  createCanvas(500, 500);

  for (let i = 0; i < 1000; i++) {
    const m = 5;
    const r = m / 2;
    const v = random(2, 4);
    const x = random(r, width  - r);
    const y = random(r, height - r);
    balls.push(new Ball(x, y, v, m));
  }
}

function draw() {
  background('#333');
  
  for (let ball of balls) {
      ball.move();
      ball.show();
  }

  for (let ball of balls) {
    for (let other of balls) {
      if (ball.checkBallCollision(other)) {
        ball.resolveBallCollision(other);
      }
    }
  }
}
