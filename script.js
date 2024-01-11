const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');
let painting = false;
let currentColor = 'black'; // Default color

function start(e) {
    painting = true;
    if (currentColor === 'white') {
        // Use a larger line width for the eraser
        context.lineWidth = 20;
    } else {
        context.lineWidth = 5;
    }
    draw(e);
}

function end() {
    painting = false;
    context.beginPath();
}

function draw(e) {
    if (!painting) return;

    context.lineCap = 'round';
    context.strokeStyle = currentColor;

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.arc(
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop,
        2.5, // Adjust the radius of the dots as needed
        0,
        Math.PI * 2
    );
    context.fillStyle = currentColor;
    context.fill();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function changeColor(color) {
    currentColor = color;
}

function eraseCanvas() {
    currentColor = 'white';
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    currentColor = 'black'; // Reset to default color after erasing
}

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', end);
canvas.addEventListener('mousemove', draw);

// Add colored dots horizontally at the top of the page
const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

const dotsContainer = document.createElement('div');
dotsContainer.classList.add('color-dots-container');
document.body.appendChild(dotsContainer);

colors.forEach((color, index) => {
    const dot = document.createElement('div');
    dot.classList.add('color-dot');
    dot.style.backgroundColor = color;
    dot.addEventListener('click', () => changeColor(color));
    dotsContainer.appendChild(dot);
});

// Add eraser button
const eraserButton = document.createElement('button');
eraserButton.innerText = 'Eraser';
eraserButton.classList.add('eraser-button');
eraserButton.addEventListener('click', eraseCanvas);
document.body.appendChild(eraserButton);
