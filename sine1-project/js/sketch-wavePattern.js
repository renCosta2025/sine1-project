class Cell {
  constructor(
    x0,
    y0,
    r,
    phase = 0,
    angle = random(TWO_PI),
    hue,
    saturation,
    brightness,
    fill,
    stroke
  ) {
    this.r = r;
    this.x0 = x0;
    this.y0 = y0;
    this.size = gridState.currentCellSize;
    this.phase = phase;
    this.angle = angle; // Can be provided or defaults to random
    this.orbitSpeed = DEFAULT_ORBIT_SPEED;
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
    this.fill = fill;
    this.stroke = stroke;
  }

  update() {
    // Calculate position using orbit and phase
    this.x = this.r * cos(this.angle + this.phase);
    this.y = this.r * sin(this.angle + this.phase);
    this.angle += this.orbitSpeed;
  }

  hsbColor() {
    colorMode(HSB, 360);
    this.hue = map(Math.cos(this.angle), -1, 1, 0, 360);
    this.saturation = map(Math.cos(frameCount * 0.1), -1, 1, 50, 100);
    this.brightness = map(Math.sin(frameCount * 0.1), -1, 1, 90, 100);
    this.fill = color(
      this.hue,
      this.saturation * 5,
      this.brightness * this.brightness
    );
    this.stroke = color(
      this.hue,
      this.saturation * 5,
      this.brightness * this.brightness
    );
  }

  display() {
    // Placeholder for any additional display logic if needed
  }
}

// Grid configuration
let grid = [];
let cols = 8;
let rows = 8;

// State management for preserving parameters across resizes
let gridState = {
  cells: [], // Will store individual cell states
  currentShapeFillState: "filled",
  defaultCellSize: 10,
  currentCellSize: 10,
  defaultCellOffset: 100,
  currentCellOffset: 100,
  isInitialized: false,
};

// Configuration constants
const CELL_SIZE_INCREMENT = 2;
const MIN_CELL_SIZE = 2;
const MAX_CELL_SIZE = 100;
const DEFAULT_ORBIT_SPEED = 0.05;
const DEFAULT_LOCATION_MULTIPLIER = 50; // This replaces the 'loc' variable

function setup() {
  // Create canvas with window dimensions
  let cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);

  // Attach canvas to the wrapper element
  cnv.parent("canvas-wrapper");

  // Wait for next frame to ensure canvas is properly sized
  window.requestAnimationFrame(() => {
    // Get actual canvas size
    let canvas = document.querySelector("#canvas-wrapper canvas");
    if (canvas) {
      let bounds = canvas.getBoundingClientRect();
      // Update default offset based on actual canvas size
      gridState.defaultCellOffset = Math.min(bounds.width, bounds.height) * 0.1;
      gridState.currentCellOffset = gridState.defaultCellOffset;
    }

    // Initialize grid if not already done
    if (!gridState.isInitialized) {
      createGrid();
      gridState.isInitialized = true;
    }
  });

  // Add wheel event listener to prevent page scrolling
  cnv.canvas.addEventListener("wheel", function (event) {
    mouseWheel(event);
    event.preventDefault();
  });
}
function createGrid() {
  // Calculate cell size based on current state
  let initialSize = gridState.currentCellSize;
  let colSpacing = (width - initialSize) / (cols - 1);
  let rowSpacing = (height - initialSize) / (rows - 1);

  // Clear and initialize grid
  grid = [];

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      // Calculate position
      let x0 = initialSize / 2 + i * colSpacing;
      let y0 = initialSize / 2 + j * rowSpacing;
      let orbitRadius = min(colSpacing, rowSpacing) / 2 - initialSize / 2;

      // Get existing cell state or create new one
      let existingState = gridState.cells[i]?.[j];

      // Create new cell with preserved or new state
      grid[i][j] = new Cell(
        x0,
        y0,
        orbitRadius,
        existingState ? existingState.phase : i * loc + j * loc
      );

      // Apply saved properties or defaults
      grid[i][j].size = initialSize;
      if (existingState) {
        grid[i][j].angle = existingState.angle;
        grid[i][j].orbitSpeed = existingState.orbitSpeed;
      }
    }
  }

  // Save current state
  gridState.cells = grid.map((row) =>
    row.map((cell) => ({
      angle: cell.angle,
      orbitSpeed: cell.orbitSpeed,
      phase: cell.phase,
    }))
  );
}

function windowResized() {
  // Resize canvas maintaining the same proportions as setup
  resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);

  // Save current state before resize
  gridState.cells = grid.map((row) =>
    row.map((cell) => ({
      angle: cell.angle,
      orbitSpeed: cell.orbitSpeed,
      phase: cell.phase,
    }))
  );

  // Update canvas size info
  let canvas = document.querySelector("#canvas-wrapper canvas");
  if (canvas) {
    let bounds = canvas.getBoundingClientRect();
    // Adjust cell offset based on new size while maintaining relative scale
    let newOffset = Math.min(bounds.width, bounds.height) * 0.1;
    gridState.currentCellOffset =
      (gridState.currentCellOffset / gridState.defaultCellOffset) * newOffset;
    gridState.defaultCellOffset = newOffset;
  }

  // Recreate grid with preserved state
  createGrid();
}

function draw() {
  if (gridState.currentShapeFillState === "filled") {
    drawFilledShapes();
  } else {
    gridState.currentShapeFillState = "not filled";
    drawColoredStrokeShapes();
  }
}

function drawFilledShapes() {
  background(0);
  noStroke();
  // Create a 2D grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];

      console.log(
        "Current cell size:",
        gridState.currentCellSize,
        "Current cell offset",
        gridState.currentCellOffset
      );
      cell.update();
      cell.display();
      cell.hsbColor();
      fill(cell.fill);

      // Draw base shapes
      ellipse(cell.x0 + cell.x, cell.y0 + cell.y, cell.size, cell.size);
      square(
        cell.x0 + cell.x - gridState.defaultCellOffset,
        cell.y0 + cell.y - gridState.defaultCellOffset,
        cell.size
      );
      // Draw additional shapes based on size thresholds
      if (currentCellSize >= 100) {
        cellOffset = 550;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 90) {
        cellOffset = 500;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 80) {
        cellOffset = 450;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 70) {
        cellOffset = 400;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 60) {
        cellOffset = 350;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 50) {
        cellOffset = 300;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 40) {
        cellOffset = 250;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 30) {
        cellOffset = 200;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      } else if (currentCellSize >= 20) {
        cellOffset = 150;
        currentCellOffset = cellOffset;
        currentCellSize = cell.size;
        console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      }
    }
  }
}

function drawColoredStrokeShapes() {
  background(0);
  noFill();
  strokeWeight(3);
  // Create a 2D grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];
      cell.update();
      cell.display();
      cell.hsbColor();
      stroke(cell.stroke);
      ellipse(cell.x0 + cell.x, cell.y0 + cell.y, cell.size, cell.size);
      square(cell.x0 + cell.x - 100, cell.y0 + cell.y - 100, cell.size);
    }
  }
}

function mousePressed() {
  if (gridState.currentShapeFillState === "filled") {
    gridState.currentShapeFillState = "not filled";
  } else {
    gridState.currentShapeFillState = "filled";
  }
}

// function mouseWheel(event) {
//   // Update each cell's size
//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       let cell = grid[i][j];
//       if (event.deltaY < 0) {
//         cell.size += cellSizeIncrement;
//         console.log("Increasing size:", cell.size);
//       } else if (event.deltaY > 0) {
//         cell.size -= cellSizeIncrement;
//         console.log("Decreasing size:", cell.size);
//       }
//       cell.size = constrain(cell.size, 2, maxCellSize);
//       console.log("Cell size after constraint:", cell.size);
//     }
//   }
// }
function mouseWheel(event) {
  // Only process if mouse is within canvas bounds
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // Save current state before size change
    gridState.cells = grid.map((row) =>
      row.map((cell) => ({
        angle: cell.angle,
        orbitSpeed: cell.orbitSpeed,
        phase: cell.phase,
      }))
    );

    // Update cell size based on scroll direction
    let direction = event.delta > 0 ? -1 : 1;
    gridState.currentCellSize = constrain(
      gridState.currentCellSize + direction * CELL_SIZE_INCREMENT,
      MIN_CELL_SIZE,
      MAX_CELL_SIZE
    );

    // Recreate grid with new size but preserved state
    createGrid();
  }
}
