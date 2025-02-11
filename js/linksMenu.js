import { DynamicDiagram } from "./dynamicDiagram.js";

// Fuerza el reflow para que se apliquen correctamente los estilos y layout
function forceReflow(element) {
    return element.offsetHeight;
}

async function main() {
    const appContainer = document.querySelector('#app');
    forceReflow(appContainer);

    // Cargar datos dinámicamente desde el archivo JSON
    const response = await fetch('/data/links.json');
    const datasets = await response.json();

    // Obtener los datos del archivo JSON
    const data = await fetch('/data/links.json')
        .then(response => response.json());

    // Buscar el objeto que corresponda a la categoría "Useful links"
    const categoryData = data.find(item => item["main-node"] === "Useful links");

    // Crear el diagrama dinámico
    new DynamicDiagram(
        '#app',
        categoryData,
        { x: null, y: null },
        { left: null, right: null, top: 251.04 },
        true
    );

    // Habilitar la funcionalidad de arrastrar imágenes con clase "moveable"
    enableImageDrag();
}

// Ejecutar main() cuando el DOM esté completamente cargado
if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}

/**
 * Habilita el arrastre (drag) para todos los elementos con la clase "moveable".
 * Se deshabilita el comportamiento nativo del navegador para evitar el ghost image.
 */
function enableImageDrag() {
    // Selecciona todos los elementos con la clase 'moveable'
    document.querySelectorAll('.moveable').forEach(elem => {
        // Deshabilitar el comportamiento nativo de arrastrar la imagen
        elem.setAttribute('draggable', 'false');
        elem.addEventListener('dragstart', e => e.preventDefault());

        // Agregar el listener para el arrastre personalizado
        elem.addEventListener('mousedown', mouseDownHandler);
    });

    function mouseDownHandler(e) {
        const elem = e.target;
        // Evitar que se dispare el comportamiento por defecto (en algunos navegadores)
        e.preventDefault();

        // Guarda la posición inicial del mouse
        const startX = e.clientX;
        const startY = e.clientY;

        // Obtener la posición actual del elemento
        const rect = elem.getBoundingClientRect();
        if (!elem.style.left) {
            elem.style.left = rect.left + 'px';
        }
        if (!elem.style.top) {
            elem.style.top = rect.top + 'px';
        }
        // Usar left/top en vez de right/top
        elem.style.right = 'auto';

        // Convertir la posición actual a número (píxeles)
        const origLeft = parseFloat(elem.style.left);
        const origTop = parseFloat(elem.style.top);

        function mouseMoveHandler(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            elem.style.left = (origLeft + dx) + 'px';
            elem.style.top = (origTop + dy) + 'px';
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        // Agregar los listeners para mover el elemento y finalizar el arrastre
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
}
