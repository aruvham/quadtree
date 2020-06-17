class Ball {
    constructor(x, y, v, m) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(v);
        this.m = m;
        this.r = m / 2;
    }

    getCollisionPoint(other) {
        const { pos: { x, y }, r } = this;
        const collisionPointX = ((x * other.r) + (other.x * r)) / (r + other.r);
        const collisionPointY = ((y * other.r) + (other.y * r)) / (r + other.r);
        return createVector(collisionPointX, collisionPointY);
    }

    checkBorderCollision() {
        const { pos: { x, y }, r, vel } = this;
        if (x + r >= width  || x - r <= 0) vel.set([-vel.x,  vel.y]);
        if (y + r >= height || y - r <= 0) vel.set([ vel.x, -vel.y]);
    }
    
    checkBallCollision(other) {
        const { pos: { x, y }, r } = this;
        // Ineficient use of sqrt, work with squares
        return this !== other && dist(x, y, other.pos.x, other.pos.y) < r + other.r;
    }

    resolveBallCollision(other) {
        const { pos: { x, y }, r, vel, m } = this;
        // noLoop();
        
        // stroke(255, 0, 0);
        // console.log(other)
        // line(x, y, other.x, other.y);

        // const collisionPoint = this.getCollisionPoint(other);
        // ellipse(collisionPoint.x, collisionPoint.y, 5);

        const newVelX1 = (vel.x * (m - other.m) + (2 * other.m * other.vel.x)) / (m + other.m);
        const newVelY1 = (vel.y * (m - other.m) + (2 * other.m * other.vel.y)) / (m + other.m);
        const newVelX2 = (other.vel.x * (other.m - m) + (2 * m * vel.x)) / (m + other.m);
        const newVelY2 = (other.vel.y * (other.m - m) + (2 * m * vel.y)) / (m + other.m);

        // console.log('setting')
        this.vel = createVector(newVelX1, newVelY1);
        this.move();
        other.vel = createVector(newVelX2, newVelY2);
        other.move();

        
    }

    move() {
        const { pos, vel } = this;
        this.checkBorderCollision();
        // this.x += this.v.x;
        // this.y += this.v.y;
        this.pos.add(this.vel);
    }

    show() {
        const { pos: { x, y }, vel, m, r} = this;
        const lineV = vel.copy().normalize().mult(r);
        stroke(0, 255, 0);
        line(x, y, x + lineV.x, y + lineV.y);
        noFill();

        stroke(255);
        ellipse(x, y, m);
    }
}