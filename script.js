const canvas= document.getElementById('drawing-board');
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

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

});

const draw = (e) => {
    if(!isPainting){
        return;
    }
    ctx.strokeStyle = strokeInput.value || '#000000';
    ctx.lineWidth = parseInt(lineWidthInput.value, 10) || 5;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
}
canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
    ctx.beginPath();
    ctx.moveTo(startX - canvasOffsetX, startY - canvasOffsetY);
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
} );

canvas.addEventListener('mousemove', draw);


