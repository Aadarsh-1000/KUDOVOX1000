const stroke = document.getElementById("stroke");
const width = document.getElementById("lineWidth");
const canvasEl = document.getElementById("drawing-board")
const board = document.querySelector(".drawing-board");
const fontSelect = document.getElementById("font");
const size = document.getElementById("fontsize");
const canvas = new fabric.Canvas("drawing-board");


function resize (){
    canvas.setDimensions({
         width: board.clientWidth - 40,
     height: window.innerHeight - 40
    });
    canvas.renderAll();
};
 resize(); 
 
 window.addEventListener("resize", resize);

canvas.isDrawingMode = true;
canvas. freeDrawingBrush.color = stroke.value;

stroke.addEventListener("input", function () {
   canvas.freeDrawingBrush.color = stroke.value;
     changetextcolor(stroke.value);
});

 function changetextcolor (color){
    const activeobj = canvas.getActiveObject();
    if (activeobj?.type === "i-text"){
         activeobj.set("fill", color);
        canvas.renderAll();
    };
 };

width.addEventListener("input", ()=> {
    canvas.freeDrawingBrush.width = parseInt(width.value)
});
document.getElementById("penn").addEventListener("click", () => {
    canvas.isDrawingMode = true;
 
});

document.getElementById("c1").onclick = () => setbg("Honeydew");
document.getElementById("c2").onclick = () => setbg("cyan");
document.getElementById("c3").onclick = () => setbg("red");
document.getElementById("c4").onclick = () => setbg("green");
document.getElementById("c5").onclick = () => setbg("rgb(152,148,148)");
document.getElementById("c6").onclick = () => setbg("rgb(90,90,90)");
document.getElementById("c7").onclick = () => setbg("white");
document.getElementById("c8").onclick = () => setbg("black");

document.getElementById("c9").addEventListener("click", () => {
     canvas.backgroundColor = null;
    canvas.renderAll();

    canvasEl.style.backgroundImage = "none";
    canvasEl.style.backgroundColor = "transparent";
canvasEl.style.background = "linear-gradient(135deg,#FF512F 0%,#DD2476 100%)";
});

function setbg(color) {
    canvasEl.style.background = "none";
    canvasEl.style.backgroundImage = "none";
    canvasEl.style.backgroundColor = "transparent";
    canvas.backgroundColor = null;
    canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
}



document.getElementById("c10").addEventListener("click", () => {
       canvas.backgroundColor = null;
    canvas.renderAll();
    canvasEl.style.backgroundImage = "none";
    canvasEl.style.backgroundColor = "transparent";
 canvasEl.style.background = "linear-gradient(135deg,#00C6FF 0%,#0072FF 100%)";});


document.getElementById("c11").addEventListener("click", () => {
      canvas.backgroundColor = null;
    canvas.renderAll();

    canvasEl.style.backgroundImage = "none";
    canvasEl.style.backgroundColor = "transparent";
    canvasEl.style.background = "linear-gradient(135deg,#6A11CB 0%,#2575FC 100%)";
});

document.getElementById("c12").addEventListener("click", () => {
      canvas.backgroundColor = null;
    canvas.renderAll();

    canvasEl.style.backgroundImage = "none";
    canvasEl.style.backgroundColor = "transparent";
    canvasEl.style.background ="linear-gradient(135deg,#11998E 0%,#38EF7D 100%)";
});

const bg = document.getElementById("bg");
document.getElementById("closesidebar").addEventListener("click", ()=> {
 if(bg.style.display === "none"){
    bg.style.display = "grid"
      requestAnimationFrame(resize);
 }
 else{
    bg.style.display = "none";
      requestAnimationFrame(resize);
}
});

 document.getElementById("pdfTool").addEventListener("click", () => {
   
       const link = document.createElement("a");
    link.download = "Kudovox.png";
     link.href = canvas.toDataURL({
        format: "png", 
        multiplier: 2   
    });
  link.click();
});

 document.getElementById("clear").addEventListener("click", () => {
   window.location.reload();
 });
 document.getElementById("textTool").addEventListener("click", () => {
        canvas.isDrawingMode = false;
        const text = new fabric.IText("Double click to edit", {
                left: canvas.getWidth() / 2,
                top: canvas.getHeight() / 2,
                fill: stroke.value

        

        });
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
 });
 size.addEventListener("input", function(){
    const obj = canvas.getActiveObject();
    if (!obj) return;
     obj.set("fontSize", parseInt(this.value));
    canvas.renderAll();
 });
 
 fontSelect.addEventListener("change", async function (){
        const obj = canvas.getActiveObject();
    if (!obj) return;
    await document.fonts.load(`28px  "${this.value}"`);
 obj.set({
        fontFamily: this.value
    });

    canvas.requestRenderAll();

 });
 function clearCanvasBackground() {
    canvasEl.style.background = "";
    canvasEl.style.backgroundImage = "";
    canvasEl.style.backgroundColor = "";
}
