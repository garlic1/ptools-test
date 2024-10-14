const root = document.getElementById("root");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let scaleFactor = 1;
let isSelecting = false;
let isDrawMode = false;
let canvasHeight = 267 * 3; // a4 proportions
let canvasWidth = 210 * 3; // a4 proportions

class Rectangle { 
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

let initialCoordinates;
let rectangle;
let rectangles = Array.from({ length: pagination.maxPages }, () => []);
let rectanglesArray = rectangles[pagination.currentPage];

function updateRectanglesArray(currentPage) {
    rectanglesArray = rectangles[currentPage];
}

function checkClickInsideRectangle(rectangle, x, y) {
    const minX = Math.min(rectangle.x1 * scaleFactor, rectangle.x2 * scaleFactor);
    const maxX = Math.max(rectangle.x1 * scaleFactor, rectangle.x2 * scaleFactor);
    const minY = Math.min(rectangle.y1 * scaleFactor, rectangle.y2 * scaleFactor);
    const maxY = Math.max(rectangle.y1 * scaleFactor, rectangle.y2 * scaleFactor);

    return minX <= x && x <= maxX && minY <= y && y <= maxY;
}

canvas.addEventListener("mousedown", function (event){
    if (!isDrawMode) return;

    const { x, y } = event;
    const bounds = canvas.getBoundingClientRect();
    const indexRemove = rectangles[pagination.currentPage].length ? rectangles[pagination.currentPage].reverse().findIndex(rectangle => checkClickInsideRectangle(rectangle, x - bounds.left, y - bounds.top)) : -1;
    
    if (indexRemove !== -1) {
        isSelecting = false;
        rectanglesArray.splice(indexRemove, 1);
        rectangles[pagination.currentPage] = rectanglesArray;
        localStorage.setItem("rectangles", JSON.stringify(rectangles));
        redrawCanvas();
    } else if (!isSelecting) {
        initialCoordinates = { x: x - bounds.left, y: y - bounds.top };
        isSelecting = true;
    }
});

canvas.addEventListener("mousemove", function (event) {
    if (!isDrawMode) return;

    const { x, y } = event;
    if (isSelecting) {
        const bounds = canvas.getBoundingClientRect();
        currentCoordinates = { x: x - bounds.left, y: y - bounds.top };
        rectangle = new Rectangle(initialCoordinates.x, initialCoordinates.y, x, y);
        redrawCanvas();
        drawRectangle(initialCoordinates, currentCoordinates);
    }
});

canvas.addEventListener("mouseup", function (event) {
    if (!isDrawMode) return;

    const { x, y } = event;
    const bounds = canvas.getBoundingClientRect();
    if (isSelecting) {
        isSelecting = false;
        if (Math.abs((x - bounds.left) - initialCoordinates.x) > 1 && Math.abs((y - bounds.top) - initialCoordinates.y) > 1) {
            rectangle = new Rectangle(
                initialCoordinates.x / scaleFactor, 
                initialCoordinates.y / scaleFactor, 
                (x - bounds.left) / scaleFactor, 
                (y - bounds.top) / scaleFactor
            );
            rectangles[pagination.currentPage].push(rectangle);
            rectanglesArray = rectangles[pagination.currentPage];
            localStorage.setItem("rectangles", JSON.stringify(rectangles));
            redrawCanvas();
        }
    }
});


canvas.addEventListener("wheel", function (event) {
    const { deltaY } = event;

    if (deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawCanvas() {
    clearCanvas();
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    rectanglesArray.forEach(
        rectangle => drawRectangle(
            { x: rectangle.x1*scaleFactor, y: rectangle.y1*scaleFactor }, 
            { x: rectangle.x2*scaleFactor, y: rectangle.y2*scaleFactor }
        )
    );
}

function drawRectangle(corner1, corner2) {
    const width = corner2.x - corner1.x;
    const height = corner2.y - corner1.y;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(corner1.x, corner1.y, width, height);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
    ctx.fillRect(corner1.x, corner1.y, width, height);
}

function zoomIn() {
    scaleFactor *= 1.2;
    canvasHeight *= 1.2;
    canvasWidth *= 1.2;
    redrawCanvas();
}

function zoomOut() {
    scaleFactor /= 1.2;
    canvasHeight /= 1.2;
    canvasWidth /= 1.2;
    redrawCanvas();
}

function redrawCircles() {
    clearCanvas();
}

function activateDrawMode() {
    const drawModeButton = document.getElementById("drawModeButton");
    if (isDrawMode) {
        isDrawMode = false;
        drawModeButton.classList.remove("selected");
        drawModeButton.innerText = "Ativar Modo de Desenho";
    } else {
        isDrawMode = true;
        drawModeButton.classList.add("selected");
        drawModeButton.innerText = "Desativar Modo de Desenho";
    }
}
