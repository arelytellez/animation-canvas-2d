const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Tamaño del canvas
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
canvas.style.background = "#ff8";

const MARGIN = 10;
const MAX_CIRCLES = 10;

// Función velocidad aleatoria
function randomSpeed(min, max) {
  return Math.random() * (max - min) + min;
}

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    // Dirección inicial aleatoria
    const angle = Math.random() * Math.PI * 2;
    this.dx = Math.cos(angle) * this.speed;
    this.dy = Math.sin(angle) * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    if (this.posX + this.radius + MARGIN >= canvas.width ||
        this.posX - this.radius - MARGIN <= 0) {
      this.dx *= -1;
    }

    if (this.posY + this.radius + MARGIN >= canvas.height ||
        this.posY - this.radius - MARGIN <= 0) {
      this.dy *= -1;
    }

    this.posX += this.dx;
    this.posY += this.dy;
    this.draw(context);
  }
}

// Número aleatorio de círculos (1 a 10)
const totalCircles = Math.floor(Math.random() * MAX_CIRCLES) + 1;
const circles = [];

// Crear círculos
for (let i = 0; i < totalCircles; i++) {
  const radius = Math.floor(Math.random() * 30) + 25;
  const speed = randomSpeed(1.5, 5);

  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;

  const color = `hsl(${Math.random() * 360}, 80%, 50%)`;

  circles.push(
    new Circle(x, y, radius, color, i + 1, speed)
  );
}

// Animación
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => {
    circle.update(ctx);
  });

  requestAnimationFrame(animate);
}

animate();
