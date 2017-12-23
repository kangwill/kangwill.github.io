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

let keyboard = {
    key: undefined
}

window.addEventListener('keydown', function (e){
    keyboard.key = e.keyCode;
})

window.addEventListener('keyup', function (e){
    keyboard.key = false;
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

for(let i = 0; i < 1600; i++){
    let radius = 2;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random()-.5);
    let dy= (Math.random()-.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function ship(x, y, color, width, height){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function(){
        this.speedX = 0;
        this.speedY = 0; 
        if (keyboard.key == 37) {this.speedX = -3; }
        if (keyboard.key == 39) {this.speedX = 3; }
        if (keyboard.key == 32) {
            fireArray.push(new Fire(this.x,this.y));
        }
        this.draw();
    }

    this.draw= function(){
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.strokeStyle = color;
        c.fillStyle = color;
        c.fill()
    }

    this.newPos = function(){
        this.x +=this.speedX;
        this.y +=this.speedY;
    }
}

let fireArray = [];

function Fire(x, y){
    this.x = x+15;
    this.y = y;
    this.draw = function(){
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y-10);
        c.stroke();
    }
    this.update = function(){
        this.y -= 10;
        this.draw();
    }
}

let spaceShip = new ship((canvas.width/2)-15,canvas.height-60,"red", 30, 30);

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
    spaceShip.newPos();
    spaceShip.update();

    for (let index = 0; index <fireArray.length; index++) {
        fireArray[index].update();
    }
}

animate();