let currentSize = 16;

function getSquares() {
  return document.querySelector("#squares");
}
function getCanvasSizeButton() {
  return document.querySelector("#canvas-size-btn");
}

function getClearCanvasButton() {
  return document.querySelector("#clear-canvas-btn");
}

function getCanvasSizeDialog() {
  return document.querySelector("#canvas-size-dialog");
}

function getCanvasSizeInput() {
  return document.querySelector("#canvas-size-input");
}

function getDialogBackground() {
  return document.querySelector("#dialog-background");
}

function getDialogConfirmButton() {
  return document.querySelector("#dialog-confirm");
}

function getDialogCancelButton() {
  return document.querySelector("#dialog-cancel");
}

function clearCanvas(size) {
  currentSize = Math.floor(size);

  const squares = getSquares();
  squares.innerHTML = "";

  squares.removeAttribute("style");
  const originalCanvasWidth = squares.clientWidth;
  const newCanvasWidth =
    Math.floor(originalCanvasWidth / currentSize) * currentSize;

  squares.style.width = `${newCanvasWidth}px`;

  const squareSize = Math.floor(newCanvasWidth / currentSize);

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = "black";
    });

    squares.appendChild(square);
  }
}

function showCanvasSizeDialog() {
  getCanvasSizeDialog().setAttribute("open", "");
  const input = getCanvasSizeInput();
  input.value = currentSize.toString();
  input.focus();
}

function hideCanvasSizeDialog() {
  getCanvasSizeDialog().removeAttribute("open");
}

function onDialogConfirm() {
  const input = getCanvasSizeInput();
  const value = input.value;
  if (!Number.isNaN(value) && value > 0 && value <= 100) {
    clearCanvas(value);
    hideCanvasSizeDialog();
  }
}

function setDialogEvents() {
  getDialogBackground().addEventListener("click", () => {
    hideCanvasSizeDialog();
  });

  getDialogCancelButton().addEventListener("click", (event) => {
    event.preventDefault();
    hideCanvasSizeDialog();
  });

  getDialogConfirmButton().addEventListener("click", (event) => {
    event.preventDefault();
    onDialogConfirm();
  });

  getCanvasSizeInput().addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      onDialogConfirm();
    } else if (event.key == "Escape") {
      hideCanvasSizeDialog();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  getCanvasSizeButton().addEventListener("click", (event) => {
    event.preventDefault();
    showCanvasSizeDialog();
  });

  getClearCanvasButton().addEventListener("click", (event) => {
    event.preventDefault();
    clearCanvas(currentSize);
  });

  setDialogEvents();

  clearCanvas(currentSize);
});
