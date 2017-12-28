let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-10;

let c = canvas.getContext('2d');

let triggered = false;
let triggered1 = false;
let triggered2 = false;
let fired = false;

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
    fired = false;
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
        
        if(mouse.x - this.x < 30 && mouse.x - this.x > -30 && mouse.y - this.y < 30 && mouse.y - this.y > -30){
            if (this.radius < 5){
                this.radius +=1;
            }
        }
            else if(this.radius > 1){
                this.radius -= 1;
            }
        this.draw();
    }
}
    
let circleArray = [];

for(let i = 0; i < 3200; i++){
    let radius = 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random()-.5);
    let dy= (Math.random()-.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function ship(x, y){
    this.x = x;
    this.y = y;
    this.speedX = 0;

    this.update = function(){
        this.speedX = 0;
        if (keyboard.key == 37) {this.speedX = -10; }
        if (keyboard.key == 39) {this.speedX = 10; }
        if (keyboard.key == 32) {
            if(!fired){
                fireArray.push(new Fire(this.x,this.y));
                triggered = false;
                triggered1 = false;
                triggered2 = false;
                fired = true;
            }
        }
        this.draw();
    }

    this.draw= function(){
        base_image = new Image();
        base_image.src = 'Spaceship.png';
        c.drawImage(base_image, this.x, this.y);
    }

    this.newPos = function(){
        if(this.x <= 0){
            this.x += 1;
        }
        else if(this.x >= innerWidth - 120){
            this.x -=1;
        }
        else{
            this.x +=this.speedX;
        }
    }
}

let fireArray = [];

function Fire(x, y){
    this.x = x+62;  
    this.y = y;
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "red";
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y-17);
        c.stroke();
    }
    this.update = function(target, target2, target3){
        this.y -= 15;
        this.draw();
        let targetLeft = target.x;
        let targetRight = target.x + c.measureText(target.text).width;
        let targetLeft2 = target2.x;
        let targetRight2 = target2.x + c.measureText(target2.text).width;
        let targetLeft3 = target3.x;
        let targetRight3 = target3.x + c.measureText(target3.text).width;
        if (this.y < target.y && this.y > target.y-15 && this.x >= targetLeft && this.x <= targetRight){
            target.open();
        }
        else if (this.y < target2.y  && this.y > target2.y-15 && this.x >= targetLeft2 && this.x <= targetRight2){
            target2.open();
        }
        else if (this.y < target3.y && this.y > target3.y-15 && this.x >= targetLeft3 && this.x <= targetRight3){
            target3.open();
        }
    }   
}

function TargetResume(x, y){
    this.x = x;
    this.y = y;
    this.text = "Resume";
    this.draw = function(){
        c.beginPath();
        c.font = "50px Arial";
        c.strokeText(this.text,this.x,this.y);
    }
    this.open = function(){
        if(triggered == false){
            window.open("https://drive.google.com/file/d/1EK9D-auxZrzRodR79NU5tyEzExf1U98G/view?usp=sharing");
            triggered = true;
        }
    }
}

function TargetLinkedin(x, y){
    this.x = x;
    this.y = y;
    this.text = "Linkedin";
    this.draw = function(){
        c.beginPath();
        c.font = "50px Arial";
        c.strokeText(this.text,this.x,this.y);
    }
    this.open = function(){
        if(triggered1 == false){
            window.open("https://www.linkedin.com/in/kang-will/");
            triggered1 = true;
        }
    }
}

function TargetProjects(x, y){
    this.x = x;
    this.y = y;
    this.text = "Github";
    this.draw = function(){
        c.beginPath();
        c.font = "50px Arial";
        c.strokeText(this.text,this.x,this.y);
    }
    this.open = function(){
        if(triggered2 == false){
            window.open("https://github.com/kangwill");
            triggered2 = true;
        }
    }
}

let spaceShip = new ship((canvas.width/2)-62,canvas.height-150);
let resume = new TargetResume((canvas.width/4)-120,canvas.height/6);
let linkedin = new TargetLinkedin((2*canvas.width/4)-120,canvas.height/4);
let projects = new TargetProjects((3*canvas.width/4)-120,canvas.height/6);

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
    spaceShip.newPos();
    spaceShip.update();

    for (let index = 0; index <fireArray.length; index++) {
        fireArray[index].update(resume, linkedin, projects);
    }
    c.strokeStyle = "lightgreen";

    c.beginPath();
    c.font = "10px Arial";
    c.strokeText("Use the arrow keys to move left and right. Use the space bar to shoot or simply click on the targets.",5,canvas.height-10);

    linkedin.draw();
    projects.draw();
    resume.draw();
}

animate();