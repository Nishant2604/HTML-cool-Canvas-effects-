var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
console.log(context);

// context.fillStyle='blue';
// context.fillRect(100, 100, 100, 100);
// ---------------------------------------------------
// context.beginPath();
// context.arc(100, 100, 40, 0, Math.PI * 2);
// context.stroke();

var mouseposition = {
    x: undefined,
    y: undefined
};

var colorArray = [
    '#086788',
    '#07a0c3',
    '#f0c808',
    '#fff1d0',
    '#dd1c1a',
];

addEventListener('resize', 
    function (event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
);

addEventListener('mousemove',
    function (event) {
        mouseposition.x = event.x;
        mouseposition.y = event.y;
    }
);

var maxRadius = 40;
//var minRadius = 2;


function Circles() {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function (x, y, dx, dy, radius) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        context.fillStyle= this.color;
        context.fill();        
    }

    this.update = function () {

        if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        if(Math.abs(mouseposition.x - this.x) < 50 && Math.abs(mouseposition.y - this.y) < 50){
            if(this.radius < maxRadius){
                this.radius++;
            }
        }else if(this.radius > this.minRadius){
            this.radius--;
        }

        this.draw();
    }
}


var circle =[];
var number_of_circles = 800;

for (let index = 0; index < number_of_circles; index++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.abs((Math.random() * window.innerWidth) - 2 * radius) + radius;
    var dx = (Math.random() - 0.5) * 8;
    var y = Math.abs((Math.random() * window.innerHeight) - 2 * radius) + radius;
    var dy = (Math.random() - 0.5) * 8;
    circle.push(new Circles(x, y, dx, dy));
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < circle.length; i++){
        circle[i].update();
    }
}
console.log(circle);

animate();






