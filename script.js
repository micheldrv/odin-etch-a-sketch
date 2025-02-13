let currentSize = 16;
let brushColor = "black";
let eraserColor = "white";
let isMouseDown = false;
let isEraser = false;
let brushSize = 1;
let eraserSize = 1;

function getSquares() {
  return document.querySelector("#squares");
}
function getCanvasSizeButton() {
  return document.querySelector("#canvas-size-btn");
}

function getClearCanvasButton() {
  return document.querySelector("#clear-canvas-btn");
}

function getCreditsButton() {
  return document.querySelector("#credits-btn");
}

function getCanvasSizeDialog() {
  return document.querySelector("#canvas-size-dialog");
}

function getCreditsDialog() {
  return document.querySelector("#credits-dialog");
}

function getCanvasSizeInput() {
  return document.querySelector("#canvas-size-input");
}

function getDialogBackgrounds() {
  return document.querySelectorAll(".dialog-background");
}

function getDialogConfirmButton() {
  return document.querySelector("#dialog-confirm");
}

function getDialogCancelButtons() {
  return document.querySelectorAll(".dialog-cancel");
}

function getBrushColorPicker() {
  return document.querySelector("#brush-color-picker");
}

function getEraserColorPicker() {
  return document.querySelector("#eraser-color-picker");
}

function getBrushOption() {
  return document.querySelector("#brush-option");
}

function getEraserOption() {
  return document.querySelector("#eraser-option");
}

function getBrushSizeInput() {
  return document.querySelector("#brush-size-input");
}

function getEraserSizeInput() {
  return document.querySelector("#eraser-size-input");
}

function recomputeSquareSize() {
  const squares = getSquares();

  const canvasWidth = squares.clientWidth;
  const squareSize = canvasWidth / currentSize;

  for (const square of Array.from(squares.childNodes)) {
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
  }
}

function clearCanvas(size) {
  currentSize = Math.floor(size);

  const squares = getSquares();
  squares.innerHTML = "";

  const canvasWidth = squares.clientWidth;
  const squareSize = canvasWidth / currentSize;

  const findSquares = (square, bSize) => {
    const squareArray = Array.from(squares.children);
    const arr = [];

    const x = parseInt(square.dataset.x);
    const y = parseInt(square.dataset.y);

    for (let i = 0; i < bSize; i++) {
      for (let j = 0; j < bSize; j++) {
        const sq = squareArray.find((sq) => {
          const sx = parseInt(sq.dataset.x);
          const sy = parseInt(sq.dataset.y);
          return x + i === sx && y + j === sy;
        });
        if (sq) {
          arr.push(sq);
        }
      }
    }

    return arr;
  };

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.dataset.color = eraserColor;
    square.style.backgroundColor = eraserColor;
    square.dataset.x = (i % size).toString();
    square.dataset.y = Math.floor(i / size).toString();

    const onPaint = (square) => {
      const color = isEraser ? eraserColor : brushColor;
      const bSize = isEraser ? eraserSize : brushSize;

      const squares = findSquares(square, bSize);

      for (const sq of squares) {
        sq.style.backgroundColor = color;
        if (isMouseDown) {
          sq.dataset.color = color;
        }
      }
    };

    square.addEventListener("mouseenter", () => {
      onPaint(square);
    });

    square.addEventListener("mouseleave", () => {
      const bSize = isEraser ? eraserSize : brushSize;

      const squares = findSquares(square, bSize);

      for (const sq of squares) {
        const color = sq.dataset.color;
        if (color) {
          sq.style.backgroundColor = color;
        }
      }
    });

    square.addEventListener("mousedown", () => {
      isMouseDown = true;
      onPaint(square);
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

function showCreditsDialog() {
  getCreditsDialog().setAttribute("open", "");
}

function hideCanvasSizeDialog() {
  getCanvasSizeDialog().removeAttribute("open");
}

function hideCreditsDialog() {
  getCreditsDialog().removeAttribute("open");
}

function hideDialogs() {
  hideCanvasSizeDialog();
  hideCreditsDialog();
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
  for (const background of getDialogBackgrounds()) {
    background.addEventListener("click", () => {
      hideDialogs();
    });
  }

  for (const cancelButton of getDialogCancelButtons()) {
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      hideDialogs();
    });
  }

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

  getCreditsButton().addEventListener("click", (event) => {
    event.preventDefault();
    showCreditsDialog();
  });

  getBrushColorPicker().addEventListener("change", () => {
    brushColor = getBrushColorPicker().value;
  });

  getEraserColorPicker().addEventListener("change", () => {
    eraserColor = getEraserColorPicker().value;
  });

  document.body.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  document.body.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  getBrushOption().addEventListener("click", () => {
    isEraser = false;
  });

  getEraserOption().addEventListener("click", () => {
    isEraser = true;
  });

  getBrushSizeInput().addEventListener("change", () => {
    brushSize = parseInt(getBrushSizeInput().value);
    if (Number.isNaN(brushSize)) {
      brushSize = 1;
    } else if (brushSize < 1) {
      brushSize = 1;
    } else if (brushSize > 8) {
      brushSize = 8;
    }
  });

  getEraserSizeInput().addEventListener("change", () => {
    eraserSize = parseInt(getEraserSizeInput().value);
    if (Number.isNaN(eraserSize)) {
      eraserSize = 1;
    } else if (eraserSize < 1) {
      eraserSize = 1;
    } else if (eraserSize > 8) {
      eraserSize = 8;
    }
  });

  setDialogEvents();

  window.addEventListener("resize", () => {
    recomputeSquareSize();
  });

  clearCanvas(currentSize);
});
