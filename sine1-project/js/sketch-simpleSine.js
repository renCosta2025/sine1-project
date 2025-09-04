let x = 0;
let y = 0;
let theta = 0;

let inc = 0.05;
let offset = 0;
let offsetInc = 0.01;

const AMPLITUDE = 400;
const FREQUENCY = 5;
const DIAMETER = 10;

function setup() {
    let cnv1 = createCanvas(windowWidth, windowHeight);
    cnv1.parent("canvas-wrapper");
    noStroke();
}

function draw() {
    background(0);
    
    theta = offset;
    while (theta < TWO_PI * FREQUENCY + offset) {
        y = sin(theta) * AMPLITUDE;
        fill(255, 255, 255, 120);
        circle(x, y + height / 2, DIAMETER);

        y = sin(theta - 0.2) * AMPLITUDE;
        fill(255, 0, 0, 80);
        circle(x, y + height / 2, DIAMETER * 2);

        y = sin(theta - 1) * AMPLITUDE;
        fill(0, 0, 255, 40);
        circle(x, y + height / 2, DIAMETER * 4);

        theta += inc;

        x = map(theta - offset, 0, TWO_PI * FREQUENCY, 0, width);
    }

    offset += offsetInc;
    if (offset > TWO_PI) {
        offset = 0;
    }
}