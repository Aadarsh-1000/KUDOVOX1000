const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const strokeInput = document.getElementById('stroke');
const lineWidthInput = document.getElementById('lineWidth');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = 1000;
canvas.height = 600;

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

document.getElementById("c1").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
        canvas.style.backgroundColor="honeydew";
});
document.getElementById("c2").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
    canvas.style.backgroundColor="cyan";
});
document.getElementById("c3").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
    canvas.style.backgroundColor="red";
});
document.getElementById("c4").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
    canvas.style.backgroundColor="green";
});
document.getElementById("c5").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
    canvas.style.backgroundColor="rgb(152, 148, 148)";
});
document.getElementById("c6").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
    canvas.style.backgroundColor="rgb(90, 90, 90)";
});
document.getElementById("c7").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
    canvas.style.backgroundColor="rgb(255, 255, 255)";
});
document.getElementById("c8").addEventListener("click", () => {
    canvas.style.backgroundImage = "none";
    canvas.style.backgroundColor="black";
});
document.getElementById("c9").addEventListener("click", () => {
    canvas.style.backgroundImage = 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)';
});
document.getElementById("c10").addEventListener("click", () => {
    canvas.style.backgroundImage = 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)';
});
document.getElementById("c11").addEventListener("click", () => {
    canvas.style.backgroundImage = 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)';
});
document.getElementById("c12").addEventListener("click", () => {
    canvas.style.backgroundImage = 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)';
});

const emojiBtn = document.getElementById("emoji");
const emojiPanel = document.getElementById("emoji-panel");

emojiBtn.addEventListener("click", () => {
    emojiPanel.classList.toggle("show");
}); 
document.querySelectorAll(".emoji").forEach(emoji => {
    emoji.addEventListener("click", () => {

        ctx.font = "40px Arial";
        ctx.fillText(
            emoji.textContent,
            canvas.width / 2,
            canvas.height / 2
        );

        document.getElementById("emoji-panel")
            .classList.remove("show");
    });
});

