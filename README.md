# Animación de Círculos en Canvas con JavaScript

## 📌 Descripción
Este programa implementa una animación gráfica utilizando **HTML5 Canvas y JavaScript**, donde se dibujan círculos que se mueven de manera automática dentro de los límites de la pantalla.  
Cada círculo rebota al tocar los bordes del canvas y muestra un texto en su interior.

El canvas se ajusta automáticamente al tamaño de la ventana del navegador.

---

## 🎯 Objetivo
- Dibujar círculos dinámicos en un canvas.
- Aplicar movimiento continuo mediante animación.
- Detectar colisiones con los bordes de la pantalla.
- Reforzar el uso de **Programación Orientada a Objetos (POO)** en JavaScript.

---

## 🛠️ Tecnologías utilizadas
- **HTML5**
- **JavaScript**
- **Canvas API**
- `requestAnimationFrame` para animaciones suaves

---

## 📐 Configuración del Canvas
El canvas se obtiene desde el documento HTML y se ajusta al tamaño de la ventana del navegador:

```js
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";
