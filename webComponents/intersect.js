document.addEventListener("DOMContentLoaded", function () {
    // Esperar a que Paper.js esté completamente cargado
    if (typeof paper !== 'undefined') {
        initializePaperJS();
    } else {
        // Cargar Paper.js si no está disponible
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js';
        script.onload = initializePaperJS;
        document.head.appendChild(script);
    }
});

function initializePaperJS() {
    paper.setup('myCanvas');

    // Import SVG
    var words = paper.project.importSVG(document.getElementById('svg'), {
        expandShapes: true // This option ensures all shapes are converted to paths
    });
    words.visible = true;

    var yesGroup = words.children.yes;
    var noGroup = words.children.no;

    // Remove fill colors and set stroke color
    yesGroup.children.forEach(function (child) {
        child.fillColor = null;
        child.strokeColor = 'black';
    });
    noGroup.children.forEach(function (child) {
        child.fillColor = null;
        child.strokeColor = 'black';
    });

    // Resize the words to fit snugly inside the view:
    words.fitBounds(paper.view.bounds);
    words.scale(0.8);

    yesGroup.position = paper.view.center;
    noGroup.position = paper.view.bounds.bottomRight.subtract([noGroup.bounds.width / 2, noGroup.bounds.height / 2]); // Initially off-screen

    // Define the tool
    var tool = new paper.Tool();
    tool.onMouseMove = function (event) {
        noGroup.position = event.point;
        for (var i = 0; i < yesGroup.children.length; i++) {
            for (var j = 0; j < noGroup.children.length; j++) {
                showIntersections(noGroup.children[j], yesGroup.children[i]);
            }
        }
    };

    function showIntersections(path1, path2) {
        if ((path1 instanceof paper.Path || path1 instanceof paper.CompoundPath) && (path2 instanceof paper.Path || path2 instanceof paper.CompoundPath)) {
            var intersections = path1.getIntersections(path2);
            for (var i = 0; i < intersections.length; i++) {
                new paper.Path.Circle({
                    center: intersections[i].point,
                    radius: 5,
                    fillColor: '#009dec'
                }).removeOnMove();
            }
        }
    }

    paper.view.onResize = function () {
        words.fitBounds(paper.view.bounds);
        words.scale(0.8);
        yesGroup.position = paper.view.center;
        noGroup.position = paper.view.bounds.bottomRight.subtract([noGroup.bounds.width / 2, noGroup.bounds.height / 2]); // Initially off-screen
    };
}
