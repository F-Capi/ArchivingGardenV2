function iniciarRotacion(imagen) {
    imagen.style.animation = 'none';
    imagen.offsetHeight; // Fuerza reflow
    imagen.style.animation = '';
    imagen.style.animation = 'rotar 2s ease-in-out forwards';
    setTimeout(() => iniciarRotacion(imagen), 3000);
}

function tonteria(imagen) {
    imagen.style.animation = 'none';
    imagen.offsetHeight; // Fuerza reflow
    imagen.style.animation = '';
    imagen.style.animation = 'rotar 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    setTimeout(() => tonteria(imagen), 3000);
}

function timeline() {
    const yearSpans = document.querySelectorAll('.year');
    const allCards = document.querySelectorAll('.timeCard');

    // Initially hide all cards except the first and set the first year as active
    allCards.forEach(card => card.classList.add('hidden'));
    allCards[0].classList.remove('hidden');
    allCards[0].style.display = 'block';

    yearSpans[0].classList.add('active');

    yearSpans.forEach(span => {
        span.onclick = function () {
            allCards.forEach(card => {
                card.classList.add('hidden');
                card.style.display = 'none'; // Hide card
            });

            const selectedCard = document.querySelector(`.timeCard[data-year="${this.dataset.year.trim()}"]`);
            if (selectedCard) {
                selectedCard.classList.remove('hidden');
                selectedCard.style.display = 'block'; // Show card and ensure it’s visible
                // Force restart of animation
                selectedCard.style.animation = 'none';
                requestAnimationFrame(() => {
                    selectedCard.style.animation = '';
                });
            }

            yearSpans.forEach(s => {
                s.classList.remove('active');
            });

            this.classList.add('active');
        };
    });
}

function mapa() {
    const firstItem = document.querySelector('#section5-numbers span');
    if (firstItem) {
        firstItem.classList.add('active-eco'); // Ensures first item is active
        document.getElementById('ecosystems').textContent = firstItem.getAttribute('data-text');
        document.getElementById('ecosystems').style.backgroundColor = firstItem.getAttribute('data-color');
    }
    document.querySelectorAll('#section5-numbers span').forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all and add to the clicked one
            document.querySelectorAll('#section5-numbers span').forEach(innerItem => {
                innerItem.classList.remove('active-eco');
            });
            item.classList.add('active-eco');

            // Change the content of the ecosystems container
            document.getElementById('ecosystems').textContent = item.getAttribute('data-text');

            // Change the background color of the ecosystems container
            document.getElementById('ecosystems').style.backgroundColor = item.getAttribute('data-color');
        });
    });
}
function scrollAnimations() {
    try {
        var typed = false;
        document.addEventListener('scroll', function () {
            var element1 = document.querySelector('.book');
            var position1 = element1.getBoundingClientRect();

            // Activar la animación cuando la parte inferior del elemento esté por entrar en la pantalla
            if (position1.top < window.innerHeight && position1.bottom >= 0) {
                element1.classList.add('book-active');
            } else {
                element1.classList.remove('book-active');
            }

            var grass = document.querySelector('.archivalGrass');
            var grassPos = grass.getBoundingClientRect();

            // Activar la animación cuando la parte inferior del elemento esté por entrar en la pantalla
            if (grassPos.top < window.innerHeight && grassPos.bottom >= 0) {
                grass.classList.add('archival-grass-active');
            } else {
                grass.classList.remove('archival-grass-active');
            }

            var element2 = document.querySelector('.phrase');
            var position2 = element2.getBoundingClientRect();

            // Activar la animación cuando la parte inferior del elemento esté por entrar en la pantalla
            if (position2.top < window.innerHeight - 300 && position2.bottom >= 0) {
                element2.classList.add('phrase-active');
            } else {
                element2.classList.remove('phrase-active');
            }


            var element3 = document.querySelector('.chair');
            var position3 = element3.getBoundingClientRect();

            // Activar la animación cuando la parte inferior del elemento esté por entrar en la pantalla
            if (position3.top < window.innerHeight && position3.bottom >= 0) {
                element3.classList.add('chair-active');
            } else {
                element3.classList.remove('chair-active');
            }

            var element4 = document.querySelector('#section6-h1');
            var position4 = element4.getBoundingClientRect();

            // Activar la animación cuando la parte inferior del elemento esté por entrar en la pantalla
            if (position4.top < window.innerHeight - 300 && position4.bottom >= 0 && !typed) {
                typed = true;
                type();
            }
        });
    } catch (error) {

    }

}


function type() {
    const text = "Thinking of your own archival project?";
    const typingContainer = document.getElementById('section6-h1');
    let index = 0;
    let cursorHtml = '<span class="cursor">|</span>';
    function typeLetter() {
        if (index < text.length) {
            typingContainer.innerHTML = text.substring(0, index + 1) + cursorHtml;
            index++;
            setTimeout(typeLetter, 120);
        } else {
            typingContainer.innerHTML = text; // Opcional: elimina el cursor al final
        }
    }

    typeLetter();
}
function poster() {
    const container = document.getElementById('poster');
    let isRotating = false;
    let hasHovered = false;

    container.addEventListener('mouseover', function () {
        if (!isRotating) {
            isRotating = true;
            this.style.transition = 'transform 2s';
            this.style.transform = 'rotateZ(-360deg)';

            setTimeout(() => {
                if (!hasHovered) {
                    const extraElement = this.querySelector('.extra-element');
                    extraElement.classList.add('show');
                    hasHovered = true;
                }
                isRotating = false;
                // Resetea la rotación para futuros hovers
                this.style.transition = 'none';
                this.style.transform = 'rotateZ(0deg)';
            }, 2000);
        }
    });
}
function main() {
    mapa();
    timeline();
    poster();
    scrollAnimations();

    var imagen1 = document.getElementById('home0');
    var imagen2 = document.getElementById('section3img');

    iniciarRotacion(imagen1);
    tonteria(imagen2);
    // script.js
    var flipper = document.querySelector('.flipper');
    setInterval(function () {
        flipper.classList.toggle('flipped');
    }, 3000);
    let indice = 0;
    const estilos = [
        { color: "#000000", texto: "And why is this back and forth another word for which is sharing; another phrase for which is mutual aid the gardener's disposition or maybe more to the point, practice? Because a garden a healthy, thriving garden-tells us to. I suspect, whether we know it or not, we're just emulating the garden, which is a repository of sharing.", autor: "Ross Gay,", reference: "Repository of sharing", colorTexto: "white" },
        { color: "#747D03", texto: "All stories are also the stories of hands — picking up, balancing, pointing, joining, kneading, threading, caressing abandoned in sleep, cutting, eating, wiping, playing music scratching, grasping, peeling, clenching, pulling a trigger, folding.", autor: "John Berger,", reference: "A to X: A Story in Letters", colorTexto: "white" },
        { color: "#D4FD7D", texto: "Gathering is the tender and thoughtful collection of goods for your kin, and a moment for reunion, for celebration, and for introspection around those goods.", autor: "Mindy Seu,", reference: "Cyberfeminism Index", colorTexto: "black" },
        { color: "#BAECB7", texto: "Afropresentism is you channeling your ancestry through every technology at your disposal - meditation, conversation, love, the Web - and turning absolutely everything into a portal that takes you precisely where you need to be, in this moment, towards the next. Until finally, the space between the dream and the memory collapses into being your reality - now.", autor: "John Berger,", reference: "A to X: A Story in Letters", colorTexto: "black" },
        { color: "#7B4B29", texto: "I want to model a collective practice between us: remembering as making sense, and remembering as becoming.", autor: "Sara Hendren,", reference: "Everything you learn you’re only remembering", colorTexto: "white" },
        { color: "#15D076", texto: "If you have a garden and a library, you have everything you need.", autor: "Marcus Tullius Cicero", reference: "", colorTexto: "black" },
        { color: "#E6E6E6", texto: "And why is this back and forth another word for which is sharing; another phrase for which is mutual aid the gardener's disposition or maybe more to the point, practice? Because a garden a healthy, thriving garden-tells us to. I suspect, whether we know it or not, we're just emulating the garden, which is a repository of sharing.", autor: "Ross Gay,", reference: "Repository of sharing", colorTexto: "black" },
        { color: "#000000", texto: "I want to model a collective practice between us: remembering as making sense, and remembering as becoming.", autor: "Sara Hendren,", reference: "Everything you learn you’re only remembering", colorTexto: "white" },
    ];

    const contenedor = document.getElementById("quotes");
    const texto = document.getElementById("quote-p");
    const autor = document.getElementById("quote-author");
    const reference = document.getElementById("quote-reference");
    const title = document.querySelector("#quotes .card-title");
    const subtitle = document.querySelector("#quotes #quoteContainer .sub-card-subtitle");

    function actualizarEstilos() {
        if (estilos[indice].colorTexto == "white") {
            subtitle.style.color = '#FFFFFF80';
        } else {
            subtitle.style.color = '#00000080';
        }

        contenedor.style.backgroundColor = estilos[indice].color;
        texto.textContent = estilos[indice].texto;
        texto.style.color = estilos[indice].colorTexto;
        autor.textContent = estilos[indice].autor;
        autor.style.color = estilos[indice].colorTexto;
        reference.textContent = estilos[indice].reference;
        reference.style.color = estilos[indice].colorTexto;
        title.style.color = estilos[indice].colorTexto;
    }

    actualizarEstilos();  // Inicializar los estilos y contenidos al cargar

    contenedor.addEventListener('click', function () {
        indice = (indice + 1) % estilos.length; // Incrementa el índice y vuelve a 0 si alcanza el final
        actualizarEstilos();  // Actualizar los estilos y contenidos en cada clic
    });
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
