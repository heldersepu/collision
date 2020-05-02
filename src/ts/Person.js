import { c, canvas, mouse, people } from "./canvas.js";
import { distance } from "./utils.js";
import { resolveCollision } from './util-elastic-collision.js';
var Person = (function () {
    function Person(_x, _y, radius) {
        this._x = _x;
        this._y = _y;
        this.radius = radius;
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
        };
        this.mass = 1;
    }
    Object.defineProperty(Person.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: true,
        configurable: true
    });
    Person.prototype.draw = function () {
        c.beginPath();
        c.arc(this._x, this._y, this.radius, 0, Math.PI * 2);
        c.fill();
    };
    Person.prototype.update = function () {
        this.draw();
        this.keepDistance();
        for (var i = 0; i < people.length; i++) {
            var dist = distance(mouse.x, mouse.y, people[i].x, people[i].y) - 6 * this.radius;
            if (dist <= 0) {
                people[i].x += (mouse.x > people[i].x + this.radius) ? -1 : 1;
                people[i].y += (mouse.y > people[i].y + this.radius) ? -1 : 1;
            }
        }
        if (this._x - this.radius < 0 || this._x + this.radius > canvas.width) {
            this.velocity.x *= -1;
        }
        if (this._y - this.radius < 0 || this._y + this.radius > canvas.height) {
            this.velocity.y *= -1;
        }
        this._x += this.velocity.x;
        this._y += this.velocity.y;
    };
    Person.prototype.keepDistance = function () {
        for (var i = 0; i < people.length; i++) {
            if (people[i] === this)
                continue;
            var dist = distance(this._x, this._y, people[i].x, people[i].y) - 4 * this.radius;
            if (dist <= 0) {
                resolveCollision(this, people[i]);
            }
        }
    };
    return Person;
}());
export default Person;
