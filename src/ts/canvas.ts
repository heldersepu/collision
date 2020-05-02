import {distance, randomIntFromRange} from "./utils.js";
import Person from "./Person.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const c = canvas.getContext('2d')!;
const people: Person[] = [];

const mouse = {
    x: -200,
    y: -200,
}


function init() {
    canvas.width = 1300;
    canvas.height = 800;

    // Generate people
    for (let i = 0; i < 100; i++) {
        const radius = 10;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);

        // If this is not the first person generated, prevent this person from being generated on top of another person.
        if (i !== 0) {
            for (let j = 0; j < people.length; j++) {
                const dist = distance(people[j].x, people[j].y, x, y) - (2 * radius);
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

    people.forEach((person) => {
        person.update();
    })
}

let rect;
canvas.addEventListener('mousemove', (e) => {
    rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
})

init();
update();

export {
    c,
    canvas,
    people,
    mouse
}