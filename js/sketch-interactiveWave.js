//  * * * * * * * * * * * * * *
//  *   Global Variables     *
//  *   and Parameters      *
//  * * * * * * * * * * * * * *

// Wave angles for different wave calculations
let theta = 0, // Circle wave angle
  theta1 = 0, // Square wave angle
  theta2 = 0; // Triangle wave angle

// Wave amplitude controls - determines height of wave
let amplitude = 160, // Circle wave amplitude (default: 160px)
  amplitude1 = 160, // Square wave amplitude
  amplitude2 = 160; // Triangle wave amplitude

// Shape size controls - element dimensions
let diameter = 60, // Circle diameter
  diameter1 = 20, // Square size
  diameter2 = 20; // Triangle size

// Wave animation speed and offset controls
let inc = 0.1, // Circle wave increment (density of shapes)
  inc1 = 0.1, // Square wave increment
  inc2 = 0.1; // Triangle wave increment

let offset = 0, // Circle wave phase offset
  offset1 = 0, // Square wave phase offset
  offset2 = 0; // Triangle wave phase offset

let offsetInc = 0.05, // Circle wave animation speed
  offsetInc1 = 0.01, // Square wave animation speed
  offsetInc2 = 0.01; // Triangle wave animation speed

// Wave type and animation control
let currentWaveType = "circle"; // Options: 'circle', 'square', or 'triangle'
let running = true; // Animation state flag

// Color system variables
let colorModeIndex = 0; // 0 = HSB gradient, 1 = random HSB
let colorOffset = 0; // Color animation offset

// Wave frequency constants
const FREQUENCY = 0.5, // Circle wave frequency
  FREQUENCY1 = 0.5, // Square wave frequency
  FREQUENCY2 = 0.5; // Triangle wave frequency

//  * * * * * * * * * * * * * * * * *
//  *  Canvas & Initial Parameters  *
//  *           Setup               *
//  * * * * * * * * * * * * * * * * *

/**
 * Calculate canvas width based on container or window size
 * @returns {number} Canvas width in pixels
 */
function getCanvasWidth() {
  const codeDisplay = document.getElementById("interactive-wave");
  return codeDisplay
    ? codeDisplay.offsetWidth // Use container width if available
    : Math.min(windowWidth * 0.9, 2000); // Otherwise use 90% of window width, max 1200px
}

/**
 * Calculate canvas height based on container or window size
 * @returns {number} Canvas height in pixels
 */
function getCanvasHeight() {
  const codeDisplay = document.getElementById("interactive-wave");
  return codeDisplay
    ? codeDisplay.offsetHeight // Use container height if available
    : Math.min(windowHeight * 0.9, 2000); // Otherwise use portion of window height
}

/**
 * p5.js setup function - initializes canvas and drawing settings
 */
function setup() {
  // Get canvas dimensions and create canvas
  let w = getCanvasWidth();
  let h = getCanvasHeight();
  let cnv2 = createCanvas(w, h);
  cnv2.parent("canvas-wrapper"); // Attach canvas to specific HTML element

  // Set drawing quality and performance settings
  pixelDensity(2); // High-res display support
  noFill(); // Draw only outlines, no filled shapes
  frameRate(120); // Target 120 FPS for smooth animation
  strokeWeight(2); // Line thickness for wave elements

  running = true; // Start animation in running state

  // Disable right-click context menu on canvas
  cnv2.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}

/**
 * Adjusts canvas size dynamically
 */
function windowResized() {
  let w = getCanvasWidth();
  let h = getCanvasHeight();
  resizeCanvas(w, h);
}

function drawCircleWave(x, y, d) {
  circle(x, y, d);
}

function drawSquareWave(x, y, d) {
  square(x - d / 2, y - d / 2, d);
}

function drawTriangleWave(x, y, d) {
  triangle(x, y - d, x - d, y + d, x + d, y + d);
}

/**
 * p5.js draw function - called repeatedly to create animation
 */
function draw() {
  background(0); // Clear canvas with black background
  drawCurrentWave(); // Draw the current wave pattern
  colorOffset += 0.5; // Update color offset for animated gradient effects
}

//  * * * * * * * * * * * * * * * * *
//  *  Canvas & Initial Parameters  *
//  *           Setup               *
//  * * * * * * * * * * * * * * * * *

/**
 * Calculate canvas width based on container or window size
 * @returns {number} Canvas width in pixels
 */
function getCanvasWidth() {
  const codeDisplay = document.getElementById("code-display-container");
  return codeDisplay
    ? codeDisplay.offsetWidth // Use container width if available
    : Math.min(windowWidth * 0.9, 2200); // Otherwise use 90% of window width, max 1200px
}

/**
 * Calculate canvas height based on container or window size
 * @returns {number} Canvas height in pixels
 */
function getCanvasHeight() {
  const codeDisplay = document.getElementById("code-display-container");
  return codeDisplay
    ? codeDisplay.offsetHeight // Use container height if available
    : Math.min(windowHeight * 0.9, 2200); // Otherwise use portion of window height
}

/**
 * p5.js setup function - initializes canvas and drawing settings
 */
function setup() {
  // Get canvas dimensions and create canvas
  let w = getCanvasWidth();
  let h = getCanvasHeight();
  let cnv2 = createCanvas(w, h);
  cnv2.parent("canvas-wrapper"); // Attach canvas to specific HTML element

  // Set drawing quality and performance settings
  pixelDensity(2); // High-res display support
  noFill(); // Draw only outlines, no filled shapes
  frameRate(120); // Target 120 FPS for smooth animation
  strokeWeight(2); // Line thickness for wave elements

  running = true; // Start animation in running state

  // Disable right-click context menu on canvas
  cnv2.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}

/**
 * Adjusts canvas size dynamically
 */
function windowResized() {
  let w = getCanvasWidth();
  let h = getCanvasHeight();
  resizeCanvas(w, h);
}

//  * * * * * * * * * * *
//  *  Stroke Coloring  *
//  *   (Color System)  *
//  * * * * * * * * * * *

/**
 * Apply default gradient color scheme - hue changes across canvas width
 * @param {number} x - X position to determine color
 * @returns {p5.Color} The applied color
 */
function defaultStrokeColor(x) {
  colorMode(HSB, 360, 100, 100, 255); // Use HSB color mode

  // Map X position to hue value, with time-based animation
  let hue =
    map(
      x,
      0,
      width,
      colorOffset + frameCount * 5,
      colorOffset + frameCount * 5 + 360
    ) % 360;
  let saturation = 90; // High saturation for vibrant colors
  let brightness = 95; // High brightness for visibility
  let alpha = 255; // Fully opaque

  let col = color(hue, saturation, brightness, alpha);
  stroke(col);
  return col;
}

/**
 * Apply random color scheme - single hue that changes over time
 * @returns {p5.Color} The applied color
 */
function randomStrokeColor() {
  colorMode(HSB, 360, 100, 100, 255);

  // Use frame count to create time-based color animation
  let hue = map(frameCount, 0, width, colorOffset, colorOffset + 360) % 360;
  let saturation = 90;
  let brightness = 95;
  let alpha = 255;

  let col = color(hue, saturation, brightness, alpha);
  stroke(col);
  return col;
}

//  * * * * * * * * * * * * * * *
//  *  Drawing Waves Functions  *
//  *  (Core Wave Rendering)    *
//  * * * * * * * * * * * * * * *

/**
 * Generic wave drawing function using trigonometric functions
 * @param {number} offset - Phase offset for animation
 * @param {number} inc - Increment between wave points
 * @param {number} amplitude - Wave height/amplitude
 * @param {number} freq - Wave frequency (number of wave cycles across canvas)
 * @param {number} diameter - Size of individual wave shape
 * @param {function} drawShape - Function to draw individual wave shape
 * @param {function} trigFunc - Trigonometric function (sin, cos)
 */
function drawWaveTrig(
  offset,
  inc,
  amplitude,
  freq,
  diameter,
  drawShape,
  trigFunc
) {
  let theta = offset; // Start at current phase offset

  // Draw wave points across the full frequency range
  while (theta < TWO_PI * freq + offset) {
    // Calculate Y position using trigonometric function
    let y = trigFunc(theta) * amplitude;

    // Map theta to X position across canvas width
    let x = map(theta - offset, 0, TWO_PI * freq, 0, width);

    // Apply color based on current color mode
    if (colorModeIndex === 0) {
      defaultStrokeColor(x); // Gradient color mode
    } else if (colorModeIndex === 1) {
      randomStrokeColor(); // Random color mode
    }

    // Draw the wave element at calculated position
    drawShape(x, y + height / 2, diameter); // Center vertically
    theta += inc; // Move to next wave point
  }
}

/**
 * Draw multiple layered waves of the currently selected wave type
 */
function drawCurrentWave() {
  switch (currentWaveType) {
    case "circle":
      // Draw three layered sine/cosine waves
      drawWaveTrig(
        offset,
        inc,
        amplitude,
        FREQUENCY,
        diameter,
        drawCircleWave,
        Math.sin
      );
      drawWaveTrig(
        offset - 3,
        inc,
        amplitude,
        FREQUENCY,
        diameter,
        drawCircleWave,
        Math.sin
      );
      drawWaveTrig(
        offset - 6,
        inc,
        amplitude,
        FREQUENCY,
        diameter,
        drawCircleWave,
        Math.cos
      );

      // Animate the wave by updating offset
      offset += offsetInc;
      if (offset > TWO_PI) offset = 0; // Reset to prevent overflow
      break;

    case "square":
      // Draw three layered square waves
      drawWaveTrig(
        offset1,
        inc1,
        amplitude1,
        FREQUENCY1,
        diameter1,
        drawSquareWave,
        Math.sin
      );
      drawWaveTrig(
        offset1 - 3,
        inc1,
        amplitude1,
        FREQUENCY1,
        diameter1,
        drawSquareWave,
        Math.sin
      );
      drawWaveTrig(
        offset1 - 6,
        inc1,
        amplitude1,
        FREQUENCY1,
        diameter1,
        drawSquareWave,
        Math.cos
      );

      offset1 += offsetInc1;
      if (offset1 > TWO_PI) offset1 = 0;
      break;

    case "triangle":
      // Draw three layered triangle waves
      drawWaveTrig(
        offset2,
        inc2,
        amplitude2,
        FREQUENCY2,
        diameter2,
        drawTriangleWave,
        Math.sin
      );
      drawWaveTrig(
        offset2 - 3,
        inc2,
        amplitude2,
        FREQUENCY2,
        diameter2,
        drawTriangleWave,
        Math.cos
      );
      drawWaveTrig(
        offset2 - 6,
        inc2,
        amplitude2,
        FREQUENCY2,
        diameter2,
        drawTriangleWave,
        Math.cos
      );

      offset2 += offsetInc2;
      if (offset2 > TWO_PI) offset2 = 0;
      break;
  }
}

//  * * * * * * * * * * * * * * *
//  *   Shape Drawing Helpers   *
//  *  (Individual Elements)    *
//  * * * * * * * * * * * * * * *

/**
 * Draw a circle wave element
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} d - Diameter (Size reference)
 */
function drawCircleWave(x, y, d) {
  circle(x, y, d);
}

/**
 * Draw a square wave element
 * @param {number} x - X position (center)
 * @param {number} y - Y position (center)
 * @param {number} d - Size reference
 */
function drawSquareWave(x, y, d) {
  square(x - d / 2, y - d / 2, d); // Center the square
}

/**
 * Draw a triangle wave element
 * @param {number} x - X position (center)
 * @param {number} y - Y position (center)
 * @param {number} d - Size reference
 */
function drawTriangleWave(x, y, d) {
  triangle(x, y - d, x - d, y + d, x + d, y + d); // Upward-pointing triangle
}

//  * * * * * * * * *
//  *   Main Draw   *
//  *  (Animation   *
//  *     Loop)     *
//  * * * * * * * * *

/**
 * p5.js draw function - called repeatedly to create animation
 */
function draw() {
  background(0); // Clear canvas with black background
  drawCurrentWave(); // Draw the current wave pattern

  // Update color offset for animated gradient effects
  colorOffset += 0.5;
}

//  * * * * * * * * * * * * * * * *
//  *   Animation State Control   *
//  *    (Play/Pause System)      *
//  * * * * * * * * * * * * * * * *

/**
 * Pause the animation
 */
function pauseAnimation() {
  noLoop(); // Stop the draw loop
}

/**
 * Resume the animation
 */
function unpauseAnimation() {
  loop(); // Restart the draw loop
}

//  * * * * * * * * * * * * *
//  *   Keyboard Controls   *
//  *   (User Interaction)  *
//  * * * * * * * * * * * * *

/**
 * Handle keyboard input for controlling the animation
 * Controls:
 * - P/Space: Play/Pause
 * - Up Arrow: Increase animation speed
 * - Down Arrow: Decrease animation speed
 * - Right Arrow: Increase amplitude
 * - Left Arrow: Decrease amplitude
 * - 1/2/3: Switch wave types
 * - R: Reset parameters
 */
function keyPressed() {
  // Prevent default behavior for arrow keys and space
  if ([32, 37, 38, 39, 40].includes(keyCode)) event.preventDefault();

  // Play/Pause toggle (P key or Spacebar)
  if (
    keyCode === 80 ||
    key === "p" ||
    key === "P" ||
    keyCode === 32 ||
    key === " "
  ) {
    if (running) {
      running = false;
      pauseAnimation();
    } else {
      running = true;
      unpauseAnimation();
    }
  }

  // Increase animation speed (Up Arrow)
  if (keyCode === 38 || key === UP_ARROW) {
    if (currentWaveType === "circle") offsetInc += 0.01;
    if (currentWaveType === "square") offsetInc1 += 0.01;
    if (currentWaveType === "triangle") offsetInc2 += 0.01;
  }

  // Decrease animation speed (Down Arrow)
  if (keyCode === 40 || key === DOWN_ARROW) {
    if (currentWaveType === "circle") offsetInc = max(0.001, offsetInc - 0.01);
    if (currentWaveType === "square")
      offsetInc1 = max(0.001, offsetInc1 - 0.01);
    if (currentWaveType === "triangle") offsetInc2 = max(0, offsetInc2 - 0.01);
  }

  // Increase amplitude (Right Arrow)
  if (keyCode === 39 || key === RIGHT_ARROW) {
    if (currentWaveType === "circle") amplitude += 10;
    if (currentWaveType === "square") amplitude1 += 10;
    if (currentWaveType === "triangle") amplitude2 += 10;
  }

  // Decrease amplitude (Left Arrow)
  if (keyCode === 37 || key === LEFT_ARROW) {
    if (currentWaveType === "circle") amplitude = max(10, amplitude - 10);
    if (currentWaveType === "square") amplitude1 = max(10, amplitude1 - 10);
    if (currentWaveType === "triangle") amplitude2 = max(10, amplitude2 - 10);
  }

  // Wave type selection (Number keys)
  if (keyCode === 49 || key === "1") currentWaveType = "circle";
  if (keyCode === 50 || key === "2") currentWaveType = "square";
  if (keyCode === 51 || key === "3") currentWaveType = "triangle";

  // Reset parameters (R key)
  if (keyCode === 82 || key === "r" || key === "R") {
    if (currentWaveType === "circle") {
      amplitude = 160;
      diameter = 20;
      offsetInc = 0.01;
      offset = 0;
    }
    if (currentWaveType === "square") {
      amplitude1 = 160;
      diameter1 = 20;
      offsetInc1 = 0.01;
      offset1 = 0;
    }
    if (currentWaveType === "triangle") {
      amplitude2 = 160;
      diameter2 = 20;
      offsetInc2 = 0.01;
      offset2 = 0;
    }
    colorModeIndex = 0; // Reset to gradient color mode
  }
}

//  * * * * * * * * * * *
//  *  Mouse Controls   *
//  * (Element Sizing)  *
//  * * * * * * * * * * *

/**
 * Handle mouse clicks for size control
 * - Left click: Increase element size
 * - Right click: Decrease element size
 */
function mousePressed() {
  if (mouseButton === LEFT) {
    // Increase size (constrain to reasonable limits)
    diameter = constrain(diameter + 5, 0, 500);
    diameter1 = constrain(diameter1 + 5, 0, 500);
    diameter2 = constrain(diameter2 + 5, 0, 500);
  }
  if (mouseButton === RIGHT) {
    // Decrease size
    diameter = constrain(diameter - 5, 0, 500);
    diameter1 = constrain(diameter1 - 5, 0, 500);
    diameter2 = constrain(diameter2 - 5, 0, 500);
  }
}

/**
 * Handle mouse wheel for color mode switching
 * - Wheel up: Random color mode
 * - Wheel down: Gradient color mode
 */
function mouseWheel(event) {
  // Only respond to wheel events when mouse is over canvas
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    event.preventDefault(); // Prevent page scrolling

    if (event.delta > 0) {
      colorModeIndex = 1; // Switch to random color mode
    } else {
      colorModeIndex = 0; // Switch to gradient color mode
    }
    return false;
  }
}


