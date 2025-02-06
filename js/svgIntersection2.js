if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
var movementRange = 150;
function main() {
    const canvas = document.getElementById('myCanvas');
    paper.setup(canvas);

    let yesGroup, noGroup; // Definir aquí para tener acceso en todo el ámbito de la función

    // Importar el SVG desde una ubicación específica
    paper.project.importSVG('/images/goodInternet.svg', {
        expandShapes: true,
        onLoad: function (svg) {
            window.svg = svg;
            svg.applyMatrix = true;

            yesGroup = svg.getItem({ name: 'yes' });
            noGroup = svg.getItem({ name: 'no' });

            if (yesGroup && noGroup) {
                console.log('Grupos cargados correctamente');
                yesGroup.applyMatrix = true;
                noGroup.applyMatrix = true;

                // Inicialmente centrar el grupo "yes"
                centerGroup(yesGroup, true);
                centerGroup(noGroup, false);
                // Ajustar al cargar
                adjustCanvasAndSVG()
                var centerY = paper.view.center.y;
                // Máximo movimiento hacia arriba y hacia abajo desde el centro

                canvas.addEventListener('mousemove', function (event) {
                    var rect = canvas.getBoundingClientRect();
                    var mouseX = event.clientX - rect.left;
                    var mouseY = event.clientY - rect.top;
                    var newY = Math.min(Math.max(mouseY, centerY - movementRange), centerY + movementRange);

                    // Asignar solo la posición y del grupo 'no', permitiendo que x se mueva libremente
                    noGroup.position = new paper.Point(mouseX, newY);

                    updateIntersections();
                });

                window.addEventListener('scroll', function () {
                    var elementUnderMouse = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
                    if (elementUnderMouse && elementUnderMouse.id === 'myCanvas') {
                        var rect = canvas.getBoundingClientRect();
                        var relativeX = window.innerWidth / 2 - rect.left;
                        var relativeY = window.innerHeight / 2 - rect.top;
                        var newY = Math.min(Math.max(relativeY, centerY - movementRange), centerY + movementRange);

                        noGroup.position = new paper.Point(relativeX, newY);

                        updateIntersections();
                    }
                });
            } else {
                console.log('Error cargando los grupos:', yesGroup, noGroup);
            }

            window.addEventListener('resize', adjustCanvasAndSVG);
        }
    });

    function updateIntersections() {
        paper.project.activeLayer.children.forEach(function (item) {
            if (item.data && item.data.isIntersection) {
                item.remove();
            }
        });

        for (var i = 0; i < yesGroup.children.length; i++) {
            for (var j = 0; j < noGroup.children.length; j++) {
                showIntersections(noGroup.children[j], yesGroup.children[i]);
            }
        }
    }

    function showIntersections(path1, path2) {
        var minDistance = 40;
        var circles = [];

        var intersections = path1.getIntersections(path2);
        intersections.forEach(function (intersection) {
            var foundClose = false;
            for (var i = 0; i < circles.length; i++) {
                if (intersection.point.getDistance(circles[i].position) < minDistance) {
                    foundClose = true;
                    break;
                }
            }
            if (!foundClose) {
                var newCircle = new paper.Path.Circle({
                    center: intersection.point,
                    radius: 5,
                    fillColor: '#009dec',
                    data: { isIntersection: true }
                });
                circles.push(newCircle);
            }
        });

        // Limpiar círculos viejos y redibujar los nuevos
        circles.forEach(function (circle) {
            circle.addTo(paper.project.activeLayer);  // Asegurarse de que los círculos se añaden al layer activo
        });
    }

    function adjustCanvasAndSVG() {
        if (!window.svg) return;

        const maxWidth = 1200; // Ancho máximo del canvas que podemos tener
        const maxHeight = 600; // Altura máxima del canvas
        const padding = 20; // Espacio de padding lateral

        const availableWidth = Math.min(window.innerWidth - 2 * padding, maxWidth);
        const availableHeight = Math.min(window.innerHeight - 2 * padding, maxHeight);

        const scaleWidth = availableWidth / window.svg.bounds.width;
        const scaleHeight = availableHeight / window.svg.bounds.height;
        const scale = Math.min(scaleWidth, scaleHeight);

        window.svg.scaling = new paper.Point(1, 1);
        window.svg.scale(scale);
        window.svg.position = new paper.Point(paper.view.bounds.width / 2, paper.view.bounds.height / 2);

        canvas.style.width = `${availableWidth}px`;
        canvas.style.height = `${availableHeight}px`;
        paper.view.viewSize = new paper.Size(availableWidth, availableHeight);
        paper.view.draw(); // Redibujar para aplicar los cambios
        centerGroup(yesGroup, false);
        centerGroup(noGroup, true);

        // Actualizar el rango de movimiento basado en la nueva altura del canvas
        movementRange = paper.view.size.height / 4; // Un cuarto de la altura del canvas como rango de movimiento
    }

    function centerGroup(group, center) {

        if (!center) {
            group.position = new paper.Point(paper.view.bounds.width / 2, paper.view.bounds.height / 2);
        } else {
            group.position = new paper.Point(paper.view.bounds.width / 2, paper.view.bounds.height / 4);
        }
    }

};

