let grid = [];
let cols = 8;
let rows = 8;

let loc = 50;

// let hasFilling = true;
let currentShapeFillState = "filled";
let defaultCellSize = 20;
let defaultCellOffset = 100;
let currentCellSize = defaultCellSize;
let currentCellOffset = defaultCellOffset;

const MIN_CELL_SIZE = 10;
const MAX_CELL_SIZE = 100;
const CELL_SIZE_INCREMENT = 2;


class Cell {
  constructor(x0, y0, r, angle, hue, saturation, brightness, fill, stroke) {
    this.r = r;
    this.angle = angle;
    this.x0 = x0;
    this.y0 = y0;
    this.size = defaultCellSize;
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
    this.fill = fill;
    this.stroke = stroke;
  }

  update() {
    this.x = this.r * cos(this.angle);
    this.y = this.r * sin(this.angle);
    this.angle += 0.05;
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

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvas-wrapper");
  createGrid();
}

function createGrid() {
  // Calculate the size of cells

  // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
  // **  * ** **
  // **  ** **
  // ** * **
  // ** * **
  // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

  // Initial cell size for all cells
  let initialSize = defaultCellSize;
  let colSpacing = (width - initialSize) / (cols - 1);
  let rowSpacing = (height - initialSize) / (rows - 1);
  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      let x0 = initialSize / 2 + i * colSpacing;
      let y0 = initialSize / 2 + j * rowSpacing;
      let orbitRadius = min(colSpacing, rowSpacing) / 2 - initialSize / 2;
      grid[i][j] = new Cell(x0, y0, orbitRadius, i * loc + j * loc);
      grid[i][j].size = initialSize;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function draw() {
  if (currentShapeFillState === "filled") {
    drawFilledShapes();
  } else {
    currentShapeFillState = "not filled";
    drawColoredStrokeShapes();
  }
}

function drawFilledShapes() {
  background(0);
  noStroke();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];
      cell.update();
      cell.display();
      cell.hsbColor();
      fill(cell.fill);
      // Draw base shapes
      ellipse(cell.x0 + cell.x, cell.y0 + cell.y, currentCellSize, currentCellSize);
      square(
        cell.x0 + cell.x - currentCellOffset,
        cell.y0 + cell.y - currentCellOffset,
        currentCellSize      );
        // Draw additional shapes based on size thresholds
        if (currentCellSize >= 100) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 90) {
          cellOffset = 150;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 80) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 70) {
          cellOffset = 50;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 60) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 50) {
          cellOffset = 150;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 40) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 30) {
          cellOffset = 50;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 20) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 10) {
          cellOffset = 150;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
      }
    }
  }  
}

addEventListener("wheel", mouseWheel) = console.log("Cell Size:", cell.size, "cellOffset:", cellOffset); 


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
      // Draw base shapes
      ellipse(cell.x0 + cell.x, cell.y0 + cell.y, currentCellSize, currentCellSize);
      square(
        cell.x0 + cell.x - currentCellOffset,
        cell.y0 + cell.y - currentCellOffset,
        currentCellSize
      );
        // Draw additional shapes based on size thresholds
        if (currentCellSize >= 100) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 90) {
          cellOffset = 150;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 80) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 70) {
          cellOffset = 150;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 60) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 50) {
          cellOffset = 150;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 40) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 30) {
          cellOffset = 150;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 20) {
          cellOffset = 100;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
        } else if (currentCellSize >= 10) {
          cellOffset = 200;
          currentCellOffset = cellOffset;
          currentCellSize = defaultCellSize;
          // console.log("Cell Size:", cell.size, "cellOffset:", cellOffset);
      }
    }
  }
}


function mousePressed() {
  if (currentShapeFillState === "filled") {
    currentShapeFillState = "not filled";
    drawColoredStrokeShapes();
  } else {
    currentShapeFillState = "filled";
    drawFilledShapes();
  }
}

function mouseWheel(event) {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // Update each cell's size
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = grid[i][j];
        if (event.deltaY < 0) {
          cell.size += CELL_SIZE_INCREMENT;
          defaultCellSize = cell.size;
          currentCellSize = defaultCellSize;
          ;
        } else if (event.deltaY > 0) {
          cell.size -= CELL_SIZE_INCREMENT;
          defaultCellSize = cell.size;
          currentCellSize = defaultCellSize;
        }
        currentCellSize = constrain(cell.size, MIN_CELL_SIZE, MAX_CELL_SIZE);
      }
    }
    return false; // Prevent default
  }
}



