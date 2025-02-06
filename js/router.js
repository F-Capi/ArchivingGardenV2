const pageTitle = "Archiving_Garden";
const routes = [
    {
        path: '/',
        template: '/html/home_page.html',
        title: "Archiving Garden",
        description: "This is the home page",
        scripts: [
            '/js/setsvgs.js',
            '/js/lineFix.js',
            '/js/homeInteractions.js',
            '/js/svgIntersection2.js'
        ],
        styles: ['/css/homepage.css']
    },
    {
        path: '/prueba',
        template: '/html/prueba3.html',
        title: "",
        description: "This is the home page",
        scripts: [
            '/js/svgIntersection2.js'
        ],
        styles: ['/css/homepage.css']
    },
    {
        path: '/how',
        template: '/html/howto.html',
        title: "How to archive your work digitally",
        description: "How to archive your work digitally",
        scripts: ['/js/hammer.js', '/js/howto.js',],
        styles: ['/css/howto.css']
    },
    {
        path: '/examples',
        template: '/html/examples3.html',
        title: "Examples",
        description: "Examples",
        scripts: ['/js/examples2.js'],
        styles: ['/css/examples3.css']
    },

    {
        path: '/useful-links',
        template: '/html/usefulLinks.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: ['https://d3js.org/d3.v7.min.js', '/js/linksMenu.js'],
        styles: ['/css/usefulLinks.css']
    },
    {
        path: '/useful-links/categories',
        template: '/html/links_category.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: ['https://d3js.org/d3.v7.min.js', 'js/category.js'],
        styles: ['/css/usefulLinks.css']
    },
    {
        path: '/useful-links/categories/all-links',
        template: '/html/all_links.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: ['https://d3js.org/d3.v7.min.js', '/js/allLinks.js'],
        styles: ['/css/allLinks.css']
    },

    {
        path: '/info',
        template: '/html/info2.html',
        title: "Information",
        description: "Information page",
        scripts: [],
        styles: ['/css/info.css']
    },
    {
        path: '/shop',
        template: '/html/shop.html',
        title: "Shop",
        description: "Shop page",
        scripts: ['/js/shop.js'],
        styles: ['/css/shop.css']
    }
];



function loadStyles(styles) {
    return Promise.all(styles.map(style => {
        return new Promise((resolve, reject) => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = style;
            linkElement.onload = resolve;
            linkElement.onerror = () => reject(new Error(`Failed to load style: ${style}`));
            document.head.appendChild(linkElement);
        });
    }));
}


async function loadScripts(scripts) {
    // Eliminar cualquier script anterior
    document.querySelectorAll('script[data-route-script]').forEach(script => {
        script.parentNode.removeChild(script);
    });

    for (let script of scripts) {
        try {
            await new Promise((resolve, reject) => {
                const scriptElement = document.createElement('script');
                scriptElement.src = script + '?v=' + Date.now();  // Añadir timestamp para forzar la recarga
                scriptElement.type = 'module';
                scriptElement.dataset.routeScript = 'active'; // Marcar el script para posible eliminación
                scriptElement.onload = resolve;
                scriptElement.onerror = reject;
                document.body.appendChild(scriptElement);
            });
        } catch (error) {
            console.error("Failed to load script: ", script, error);
        }
    }
}

function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy-load:not([src])');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.01
    });

    lazyImages.forEach(img => observer.observe(img));
}
const locationHandler = async () => {
    const location = window.location.hash.replace("#", "") || '/';
    const pathSegments = location.split('?')[0];

    const route = routes.find(r => r.path === pathSegments) || {
        template: "/html/404.html",
        title: "404 | " + pageTitle,
        description: "Page not found",
        scripts: [],
        styles: []
    };

    // Limpiar el contenido existente
    document.getElementById("app").innerHTML = '';
    document.title = route.title;


    // Quitar estilos antiguos y cargar nuevos
    document.querySelectorAll('link[rel="stylesheet"]:not(#common-styles)').forEach(link => link.remove());
    await loadStyles(route.styles);

    // Cargar nuevo contenido HTML después de que los estilos estén listos
    const html = await fetch(route.template).then(response => response.text());
    document.getElementById("app").innerHTML = html;
    window.scrollTo(0, 0);



    if (location.split('?')[0].split("/").includes("all-links")) {

        try {
            let menu_items_c = document.querySelectorAll(".category-navbar a");
            menu_items_c.forEach((item) => {
                if (item.classList.contains("category-active")) {
                    item.classList.remove("category-active");
                }
            });
            let menu_item_c = document.querySelector(`[category-name="${location.split('?')[0].split("/")[3]}"]`);
            menu_item_c.classList.add("category-active");

        } catch (error) {

        }

    }



    let menu_items = document.querySelectorAll(".menu-item");
    menu_items.forEach((item) => {
        if (item.classList.contains("menu-item-active")) {
            item.classList.remove("menu-item-active");
        }
    });
    try {
        let menu_item = document.querySelector(`[page-name="${route.title}"]`);
        menu_item.classList.add("menu-item-active");

    } catch (error) {

    }


    // Manejar la barra de navegación de categorías
    const nav = document.querySelector(".category-navbar");
    if (pathSegments !== "/useful-links/categories" && pathSegments !== "/useful-links/categories/all-links") {
        nav.classList.add("hidden");
    } else {
        nav.classList.remove("hidden");
    }
    await loadScripts(route.scripts);


    if (pathSegments === "/" || pathSegments === "#/") {
        // Eliminar el script de Paper.js del head
        const script = document.getElementById('paperScript');
        if (script) {
            script.parentNode.removeChild(script);
        }
        // Cargar el nuevo script de Paper.js
        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js');
            await loadScript('/js/svgIntersection2.js');
        } catch (error) {
            console.error('Error al cargar el script de Paper.js:', error);
        }
    }


    if (pathSegments === "/prueba" || pathSegments === "#/prueba") {
        // Eliminar el script de Paper.js del head
        const script = document.getElementById('paperScript');
        if (script) {
            script.parentNode.removeChild(script);
        }
        // Cargar el nuevo script de Paper.js
        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js');
            await loadScript('/js/svgIntersection2.js');
        } catch (error) {
            console.error('Error al cargar el script de Paper.js:', error);
        }
    }
};

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;

        document.body.appendChild(script);
    });
}
function displayCategoryName(categoryName) {
    const categoryDisplay = document.getElementById('category-name');
    if (categoryDisplay) {
        categoryDisplay.textContent = categoryName || 'Category not found';
    }
}


document.addEventListener("DOMContentLoaded", function () {
    locationHandler();
});

window.addEventListener("hashchange", locationHandler);
