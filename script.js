const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const strokeInput = document.getElementById('stroke');
const lineWidthInput = document.getElementById('lineWidth');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;
let mode = 'pen';

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }
    ctx.strokeStyle = strokeInput.value || '#000000';
    ctx.lineWidth = parseInt(lineWidthInput.value, 10) || 5;
    ctx.lineCap = 'round';

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(
        e.clientX - rect.left,
        e.clientY - rect.top
    );
    ctx.stroke();
}
canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
    ctx.beginPath();
    
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

const gridTool = document.getElementById("gridtool");

let gridMode = 0;

gridTool.addEventListener("click", () => {

    gridMode = (gridMode + 1) % 3;

    if (gridMode === 0) {
        canvas.style.backgroundImage = "none";
    }

    if (gridMode === 1) {
        canvas.style.backgroundImage =
            "radial-gradient(#d0d0d0 1px, transparent 1px)";
        canvas.style.backgroundSize = "25px 25px";
    }

    if (gridMode === 2) {
        canvas.style.backgroundImage =
            `linear-gradient(#ddd 1px, transparent 1px),
                linear-gradient(90deg, #ddd 1px, transparent 1px)`;
        canvas.style.backgroundSize = "25px 25px";
    }

});
document.getElementById("pdfTool").addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "Kudovox.png";
    link.href = canvas.toDataURL();

    link.click();
});
