let qtree = null;
let points = [];

function setup() {
  createCanvas(500, 500);

  qtree = new QuadTree(new Rectangle(0, 0, height, width));
  
  for (let i = 0; i < 1000; i ++) {
    const point = new Point(random(width), random(height));
    qtree.addPoint(point);
  }
}

function draw() {
  background(0);
  qtree.show();

  const searchRange = new Rectangle(mouseX, mouseY, 100, 100);
  stroke(0, 255, 255);
  noFill();
  rect(searchRange.x, searchRange.y, searchRange.w, searchRange.h);

  const points = qtree.findPoints(searchRange);
  for (let point of points) {
    ellipse(point.x, point.y, 2);
  }
}
