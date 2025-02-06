import { DynamicDiagram } from "./dynamicDiagram.js";

function forceReflow(element) {
    // Acceder a esta propiedad forzará al navegador a recalcular estilos y layout
    return element.offsetHeight;
}

async function main() {
    const appContainer = document.querySelector('#app');
    forceReflow(appContainer);  // Esto podría ayudar a que los estilos se apliquen correctamente

    // Cargar datos dinámicamente desde un archivo JSON
    const response = await fetch('/data/links.json');
    const datasets = await response.json();

    // Obtener los datos del archivo JSON
    const data = await fetch('/data/links.json')
        .then(response => response.json());

    // Buscar el objeto correcto en el arreglo que coincida con la categoría
    const categoryData = data.find(item => item["main-node"] === "Useful links");

    new DynamicDiagram('#app', categoryData, { x: null, y: null }, { right: 150, top: 95 }, false);

}



if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
