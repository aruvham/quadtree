class Point {
    constructor(x, y, userData = null) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        const { x, y } = point;
        return (
            x >= this.x &&
            x <= this.x + this.w &&
            y <= this.y + this.h &&
            y >= this.y
        );
    }

    intersects(range) {
        return !(
            range.x > this.x + this.w ||
            range.x + range.w < this.x ||
            range.y > this.y + this.h ||
            range.y + range.h < this.y
        );
    }
}

class QuadTree {
    constructor(range, capacity = 4) {
        this.range = range;
        this.capacity = capacity;
        this.points = [];

        this.ne = null;
        this.nw = null;
        this.se = null;
        this.sw = null;
    }

    subdivide() {
        const { x, y, w, h } = this.range;
        this.ne = this.ne || new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2 ));
        this.nw = this.nw || new QuadTree(new Rectangle(x, y, w / 2, h / 2 ));
        this.se = this.se || new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2 ));
        this.sw = this.sw || new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2 ));
    }

    addPoint(point) {
        if (!this.range.contains(point)) return false;

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.ne) this.subdivide();
            if (this.ne.addPoint(point)) return true;
            if (this.nw.addPoint(point)) return true;
            if (this.se.addPoint(point)) return true;
            if (this.sw.addPoint(point)) return true;
        }

        return false;
    }

    findPoints(searchRange, points = []) {
        if (!this.range.intersects(searchRange)) return points;

        for (point of this.points) {
            if (searchRange.contains(point)) points.push(point);
        }

        if (this.ne) {
            this.ne.findPoints(searchRange, points);
            this.nw.findPoints(searchRange, points);
            this.se.findPoints(searchRange, points);
            this.sw.findPoints(searchRange, points);
        }

        return points;
    }

    show() {
        const { x, y, w, h } = this.range;
        noFill();
        stroke(255);

        for (point of this.points) {
            ellipse(point.x, point.y, 2);
        }

        rect(x, y, w, h);

        if (this.ne) {
            this.ne.show();
            this.nw.show();
            this.se.show();
            this.sw.show();
        }
    }
}
