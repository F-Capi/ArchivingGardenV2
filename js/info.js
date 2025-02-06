function main() {
    var elements = document.querySelectorAll('.movable-element');

    elements.forEach(function (element) {
        var posX = 0, posY = 0, lastPosX = 0, lastPosY = 0;

        // Crear una instancia de Hammer en el elemento
        var hammer = new Hammer(element);

        // Deshabilitar el arrastre nativo de imágenes
        element.ondragstart = function () { return false; };

        // Configurar para que reconozca el pan en todas las direcciones
        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        // Manejar el evento pan
        hammer.on('pan', function (ev) {
            if (ev.isFinal) { // Final del movimiento
                lastPosX += ev.deltaX;
                lastPosY += ev.deltaY;
            } else { // Durante el movimiento
                posX = lastPosX + ev.deltaX;
                posY = lastPosY + ev.deltaY;
                element.style.transform = `translate(${posX}px, ${posY}px)`;
            }
        });
    });
}


if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
