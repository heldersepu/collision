import { distance, randomIntFromRange } from "./utils.js";
import Person from "./Person.js";
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var people = [];
var mouse = {
    x: -200,
    y: -200,
};
function init() {
    canvas.width = 1300;
    canvas.height = 800;
    for (var i = 0; i < 100; i++) {
        var radius = 10;
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(radius, canvas.height - radius);
        if (i !== 0) {
            for (var j = 0; j < people.length; j++) {
                var dist = distance(people[j].x, people[j].y, x, y) - (2 * radius);
                if (dist <= 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }
        people.push(new Person(mouse.x, mouse.y, 10));
        people.push(new Person(x, y, radius));
    }
}
function update() {
    requestAnimationFrame(update);
    c.clearRect(0, 0, canvas.width, canvas.height);
    people.forEach(function (person) {
        person.update();
    });
}
var rect;
canvas.addEventListener('mousemove', function (e) {
    rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
init();
update();
export { c, canvas, people, mouse };
