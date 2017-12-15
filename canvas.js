let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(ev){
        mouse.x = event.x;
        mouse.y = event.y;
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this. dx = dx;
    this.dy = dy;
    this.radius = radius;
    let color = random_rgba();

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.fillStyle = color;
        c.fill()
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.radius < 40){
                this.radius +=1;
            }
        }
            else if(this.radius > 2){
                this.radius -= 1;
            }
        this.draw();
    }
}
    
let circleArray = [];

for(let i = 0; i < 800; i++){
    let radius = 2;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - .05) * 10;
    let dy= (Math.random() - .05) * 10;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
        
    }
}

animate();