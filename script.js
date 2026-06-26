// ======================
// ELEMENTS
// ======================

const strokeInput = document.getElementById("stroke");
const lineWidthInput = document.getElementById("lineWidth");
const canvasEl = document.getElementById("drawing-board");
const board = document.querySelector(".drawing-board");

const fontSelect = document.getElementById("font");
const fontSizeSlider = document.getElementById("fontsize");

const canvas = new fabric.Canvas("drawing-board");

// ======================
// CANVAS SIZE
// ======================

function resizeCanvas() {
    canvas.setWidth(board.clientWidth - 40);
    canvas.setHeight(window.innerHeight - 40);
    canvas.renderAll();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ======================
// DRAW SETTINGS
// ======================

canvas.isDrawingMode = true;
canvas.freeDrawingBrush.color = strokeInput.value;
canvas.freeDrawingBrush.width = parseInt(lineWidthInput.value);

strokeInput.addEventListener("input", () => {

    canvas.freeDrawingBrush.color = strokeInput.value;

    const obj = canvas.getActiveObject();

    if (obj && obj.type === "i-text") {
        obj.set("fill", strokeInput.value);
        canvas.renderAll();
    }
});

lineWidthInput.addEventListener("input", () => {
    canvas.freeDrawingBrush.width = parseInt(lineWidthInput.value);
});

// ======================
// PEN TOOL
// ======================

document.getElementById("penn").addEventListener("click", () => {

    canvas.isDrawingMode = true;

    canvas.discardActiveObject();
    canvas.requestRenderAll();
});

// ======================
// TEXT TOOL
// ======================

document.getElementById("textTool").addEventListener("click", () => {

    canvas.isDrawingMode = false;

    const text = new fabric.IText("Double click to edit", {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: "center",
        originY: "center",
        fontSize: 32,
        fontFamily: "Poppins",
        fill: strokeInput.value
    });

    canvas.add(text);
    canvas.setActiveObject(text);

    text.enterEditing();
    text.selectAll();
});

// ======================
// FONT CONTROLS
// ======================

fontSelect.addEventListener("change", async function () {

    const obj = canvas.getActiveObject();

    if (!obj) return;

    await document.fonts.load(`32px "${this.value}"`);

    obj.set({
        fontFamily: this.value
    });

    canvas.requestRenderAll();
});

fontSizeSlider.addEventListener("input", function () {

    const obj = canvas.getActiveObject();

    if (!obj) return;

    obj.set("fontSize", parseInt(this.value));
    canvas.renderAll();
});

// ======================
// GRID TOOL
// ======================

let gridMode = 0;

document.getElementById("gridtool").addEventListener("click", () => {

    gridMode = (gridMode + 1) % 3;

    switch (gridMode) {

        case 0:
            canvasEl.style.backgroundImage = "none";
            canvasEl.style.backgroundColor = "white";
            break;

        case 1:
            canvasEl.style.backgroundImage =
                "radial-gradient(#d0d0d0 1px, transparent 1px)";
            canvasEl.style.backgroundSize = "25px 25px";
            break;

        case 2:
            canvasEl.style.backgroundImage =
                `linear-gradient(#ddd 1px, transparent 1px),
                 linear-gradient(90deg,#ddd 1px,transparent 1px)`;
            canvasEl.style.backgroundSize = "25px 25px";
            break;
    }
});

// ======================
// CLEAR
// ======================

document.getElementById("clear").addEventListener("click", () => {

    canvas.clear();

    canvas.backgroundColor = "white";

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = strokeInput.value;
    canvas.freeDrawingBrush.width = parseInt(lineWidthInput.value);

    canvas.renderAll();
});

// ======================
// EXPORT
// ======================

document.getElementById("pdfTool").addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "Kudovox.png";

    link.href = canvas.toDataURL({
        format: "png"
    });

    link.click();
});

// ======================
// BACKGROUND COLORS
// ======================

function setBg(color) {

    canvas.backgroundColor = color;
    canvas.renderAll();
}

document.getElementById("c1").onclick = () => setBg("honeydew");
document.getElementById("c2").onclick = () => setBg("cyan");
document.getElementById("c3").onclick = () => setBg("red");
document.getElementById("c4").onclick = () => setBg("green");
document.getElementById("c5").onclick = () => setBg("rgb(152,148,148)");
document.getElementById("c6").onclick = () => setBg("rgb(90,90,90)");
document.getElementById("c7").onclick = () => setBg("white");
document.getElementById("c8").onclick = () => setBg("black");

// ======================
// GRADIENT BACKGROUNDS
// ======================

document.getElementById("c9").onclick = () => {
    canvasEl.style.background =
        "linear-gradient(135deg,#FF512F 0%,#DD2476 100%)";
};

document.getElementById("c10").onclick = () => {
    canvasEl.style.background =
        "linear-gradient(135deg,#00C6FF 0%,#0072FF 100%)";
};

document.getElementById("c11").onclick = () => {
    canvasEl.style.background =
        "linear-gradient(135deg,#6A11CB 0%,#2575FC 100%)";
};

document.getElementById("c12").onclick = () => {
    canvasEl.style.background =
        "linear-gradient(135deg,#11998E 0%,#38EF7D 100%)";
};
const bg = document.getElementById("bg");
document.getElementById("closesidebar").addEventListener("click", () => {
        if(bg.style.display === "none"){
            bg.style.display = "grid"
        }
        else{
            bg.style.display = "none";
        }
         setTimeout(resizeCanvas, 50);
});