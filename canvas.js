let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let x = 200;
let y = 200;
function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.stroke();

    x+=1;
    y+=1;
}

animate();