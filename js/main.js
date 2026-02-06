const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// CONTROLES
const circleRange = document.getElementById("circleRange");
const widthRange = document.getElementById("widthRange");
const heightRange = document.getElementById("heightRange");

// VALORES VISIBLES
const circleValue = document.getElementById("circleValue");
const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");

// VALORES INICIALES
circleValue.textContent = circleRange.value;
widthValue.textContent = widthRange.value;
heightValue.textContent = heightRange.value;

canvas.width = widthRange.value;
canvas.height = heightRange.value;

let circles = [];

/* ===============================
   FUNCIÓN COLOR ALEATORIO
================================ */
function randomColor() {
    return `hsl(${Math.random() * 360}, 80%, 60%)`;
}

/* ===============================
   CLASE CIRCLE
================================ */
class Circle {
    constructor(x, y, radius, text, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.text = text;
        this.color = color;

        this.dx = (Math.random() < 0.5 ? -1 : 1) * speed;
        this.dy = (Math.random() < 0.5 ? -1 : 1) * speed;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x, this.y);

        ctx.closePath();
    }

    update(ctx) {
        // REBOTES
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy *= -1;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw(ctx);
    }
}

/* ===============================
   CREAR CÍRCULOS
================================ */
function createCircles(amount) {
    circles = [];

    for (let i = 1; i <= amount; i++) {
        const radius = Math.floor(Math.random() * 25 + 20);

        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;

        const speed = Math.random() * 2 + 1;
        const color = randomColor();

        circles.push(new Circle(x, y, radius, i, speed, color));
    }
}

/* ===============================
   ANIMACIÓN
================================ */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => circle.update(ctx));
    requestAnimationFrame(animate);
}

/* ===============================
   EVENTOS
================================ */
circleRange.addEventListener("input", () => {
    circleValue.textContent = circleRange.value;
    createCircles(circleRange.value);
});

widthRange.addEventListener("input", () => {
    widthValue.textContent = widthRange.value;
    canvas.width = widthRange.value;
    createCircles(circleRange.value);
});

heightRange.addEventListener("input", () => {
    heightValue.textContent = heightRange.value;
    canvas.height = heightRange.value;
    createCircles(circleRange.value);
});

/* ===============================
   INICIO
================================ */
createCircles(circleRange.value);
animate();

