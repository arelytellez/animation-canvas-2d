const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Tamaño del canvas (se mantiene fijo)
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
canvas.style.background = "#ff8";

const MARGIN = 10;

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    // Dirección inicial completamente aleatoria
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
    // Rebote horizontal
    if (this.posX + this.radius + MARGIN >= canvas.width) {
      this.posX = canvas.width - this.radius - MARGIN;
      this.dx *= -1;
    }
    if (this.posX - this.radius - MARGIN <= 0) {
      this.posX = this.radius + MARGIN;
      this.dx *= -1;
    }

    // Rebote vertical
    if (this.posY + this.radius + MARGIN >= canvas.height) {
      this.posY = canvas.height - this.radius - MARGIN;
      this.dy *= -1;
    }
    if (this.posY - this.radius - MARGIN <= 0) {
      this.posY = this.radius + MARGIN;
      this.dy *= -1;
    }

    this.posX += this.dx;
    this.posY += this.dy;

    this.draw(context);
  }
}

// Radios aleatorios al recargar
const radius1 = Math.floor(Math.random() * 40) + 30;
const radius2 = Math.floor(Math.random() * 40) + 30;

// Posiciones iniciales seguras
const x1 = Math.random() * (canvas.width - radius1 * 2) + radius1;
const y1 = Math.random() * (canvas.height - radius1 * 2) + radius1;

const x2 = Math.random() * (canvas.width - radius2 * 2) + radius2;
const y2 = Math.random() * (canvas.height - radius2 * 2) + radius2;

// Crear círculos
const circle1 = new Circle(x1, y1, radius1, "blue", "Tec1", 4);
const circle2 = new Circle(x2, y2, radius2, "red", "Tec2", 2);

// Animación
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circle1.update(ctx);
  circle2.update(ctx);
  requestAnimationFrame(animate);
}

animate();
