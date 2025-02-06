const content = document.getElementById('content');
const container = document.getElementById('content-container'); // Selecciona el contenedor

let scale = 1;
let lastScale = 1;
let lastPosX = 0;
let lastPosY = 0;
let posX = 0;
let posY = 0;

// Inicializa Hammer.js en el contenedor en lugar de directamente en el contenido
const mc = new Hammer.Manager(container);
const pinch = new Hammer.Pinch();
const pan = new Hammer.Pan({ threshold: 0, pointers: 0 });

mc.add([pinch, pan]);
pinch.recognizeWith(pan);

mc.on('panstart panmove', function (e) {
    if (e.type === 'panstart') {
        lastPosX = posX;
        lastPosY = posY;
    }

    posX = e.deltaX + lastPosX;
    posY = e.deltaY + lastPosY;

    updateTransform();
});

mc.on('pinchstart pinchmove', function (e) {
    if (e.type === 'pinchstart') {
        lastScale = scale;
    }

    scale = Math.max(0.1, Math.min(lastScale * e.scale, 4));
    updateTransform();
});

function updateTransform() {
    content.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale})`;
}

container.addEventListener('wheel', function (e) {
    e.preventDefault();
    const rect = container.getBoundingClientRect(); // Asegúrate de usar las dimensiones y posición del contenedor
    const zoomFactor = 0.1;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const oldScale = scale;

    scale += e.deltaY < 0 ? zoomFactor : -zoomFactor;
    scale = Math.max(0.4, Math.min(scale, 4));

    posX -= (x * (scale - oldScale));
    posY -= (y * (scale - oldScale));

    updateTransform();
});
