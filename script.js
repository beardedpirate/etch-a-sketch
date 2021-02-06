const canvasGrid = document.querySelector(`#canvas-grid`);
const sizeSlider = document.querySelector(`#size-slider`);
const sizeValue = document.querySelector(`#size-value`);
const randomSizeBtn = document.querySelector(`#random-size-btn`);
const colorPicker = document.querySelector(`#color-picker`);
const randomColorBtn = document.querySelector(`#random-color-btn`);
const resetBtn = document.querySelector(`#reset-button`);

let color = colorPicker.value;

function createGrid(gridSize) {
    let gridArea = gridSize * gridSize;

    canvasGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    canvasGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridArea; i++) {
        let gridItem = document.createElement("div");
        gridItem.className = "canvas-cells";
        canvasGrid.insertAdjacentElement("beforeend", gridItem);
    }
    let gridPixels = canvasGrid.querySelectorAll("div");

    canvasGrid.addEventListener("mousedown", () => {
        gridPixels.forEach((gridPixel) =>
            gridPixel.addEventListener("mousemove", colorize)
        );
    });

    canvasGrid.addEventListener("mouseup", () => {
        gridPixels.forEach((gridPixel) =>
            gridPixel.removeEventListener("mousemove", colorize)
        );
    });
}

function colorize() {
    this.style.backgroundColor = `${color}`;
}

function recreateGrid() {
    let gridPixels = canvasGrid.querySelectorAll("div");
    gridPixels.forEach((gridPixel) => gridPixel.remove());
    sizeValue.textContent = sizeSlider.value;
    createGrid(sizeSlider.value);
}

function randomizeSize() {
    sizeSlider.value = Math.floor(Math.random() * 51);
    sizeValue.textContent = sizeSlider.value;
    recreateGrid();
}

function selectColor() {
    color = colorPicker.value;
}

function randomizeColor() {
    let letters = "0123456789ABCDEF";
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
        randomColor += letters[Math.floor(Math.random() * 16)];
    }
    colorPicker.value = `${randomColor}`;
    color = `${colorPicker.value}`;
}

randomSizeBtn.addEventListener("click", randomizeSize);
sizeSlider.addEventListener("mouseup", recreateGrid);
colorPicker.addEventListener("change", selectColor);
randomColorBtn.addEventListener("click", randomizeColor);
resetBtn.addEventListener("click", recreateGrid);

createGrid(16);
