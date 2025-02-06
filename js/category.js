import { DynamicDiagram } from "/js/DynamicDiagram.js";

export async function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    let categoryName = urlParams.get('category').replace(/_/g, ' ');  // Reemplaza los guiones bajos con espacios

    if (categoryName == "Code and Develop") {
        categoryName = "Code & Develop";
    }


    var imagenes = document.querySelectorAll('.categoryImage');
    imagenes.forEach(function (imagen) {
        if (!imagen.classList.contains('hidden')) {
            imagen.classList.add('hidden');
        }
        // Correcto acceso al atributo data-category usando dataset.category
        if (imagen.dataset.category == categoryName) {
            imagen.classList.remove('hidden');
            let menu_items = document.querySelectorAll(".category-navbar a");
            menu_items.forEach((item) => {
                if (item.classList.contains("category-active")) {
                    item.classList.remove("category-active");
                }
            });
        }
    });
    let menu_item = document.querySelector(`[category-name="${categoryName}"]`);
    menu_item.classList.add("category-active");

    // Obtener los datos del archivo JSON
    const data = await fetch('/data/links.json')
        .then(response => response.json());

    // Buscar el objeto correcto en el arreglo que coincida con la categoría
    const categoryData = data.find(item => item["main-node"] === categoryName);

    if (!categoryData) {
        return;
    }

    generateCategoryDiagram(categoryData);
}

function generateCategoryDiagram(categoryData) {
    let positions = { left: categoryData.position.left, right: categoryData.position.right, top: categoryData.position.top }
    new DynamicDiagram('#app', categoryData, { x: null, y: null }, positions, true);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryPage);
} else {
    initCategoryPage();
}