import {c, canvas, mouse, people} from "./canvas.js";
import {distance} from "./utils.js";

// @ts-ignore
import {resolveCollision} from './util-elastic-collision.js';


export default class Person {
    private velocity: { x: number, y: number };
    private mass: number;
    constructor(
        private _x: number,
        private _y: number,
        private radius: number,
    ) {
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
        }
        this.mass = 1;
    }
    
    get x() {
        return this._x;
    }
    
    set x(x: number) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
    }

    draw() {
        c.beginPath();
        c.arc(this._x, this._y, this.radius, 0, Math.PI * 2);
        c.fill();
    }

    update() {
        this.draw();
        this.keepDistance();

        // Bounce off the mouse // Failed
        for (let i = 0; i < people.length; i++) {
            let dist = distance(mouse.x, mouse.y, people[i].x, people[i].y) - 6 * this.radius;
            if (dist <= 0) {
                people[i].x += (mouse.x > people[i].x + this.radius) ? -1 : 1;
                people[i].y += (mouse.y > people[i].y + this.radius) ? -1 : 1;
            }
        }

        // Bounce off the walls
        if (this._x - this.radius < 0 || this._x + this.radius > canvas.width) {
            this.velocity.x *= -1;
        }

        if (this._y - this.radius < 0 || this._y + this.radius > canvas.height) {
            this.velocity.y *= -1;
        }

        this._x += this.velocity.x;
        this._y += this.velocity.y;
    }

    keepDistance() {
        // Bounce off other people
        for (let i = 0; i < people.length; i++) {
            if (people[i] === this) continue;
            let dist = distance(this._x, this._y, people[i].x, people[i].y) - 4 * this.radius;
            if (dist <= 0) {
                resolveCollision(this, people[i]);
            }
        }
    }
}