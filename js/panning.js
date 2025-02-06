


function loadHTMLContent() {
    const container = document.querySelector('.horizontal-page');
    const htmlContent = `
    <div class="example" id="example-1"><img class="lazy-load" data-src="/images/examples-1.png" alt="" loading="lazy"><a
    href="http://driftingcurriculum.org/">Decolonial Curatorial Agendas for
    a Green New Deal</a>
</div>

<div class="example" id="example-2"><img class="lazy-load" data-src="/images/examples-2.png" alt="" loading="lazy"><a
    href="https://www.archivalconsciousness.org/">Archival Consciousness</a>
</div>

<div class="example" id="example-3"><img class="lazy-load" data-src="/images/examples-3.png" alt="" loading="lazy"><a
    href="https://diagram.website/">diagram.website</a>
</div>

<div class="example" id="example-4"><img class="lazy-load" data-src="/images/examples-4.png" alt="" loading="lazy"><a
    href="https://diagram.website/">PLATZ project</a>
</div>

<div class="example" id="example-5"><img class="lazy-load" data-src="/images/examples-5.png" alt="" loading="lazy"><a
    href="https://second-shelf.org/books/valie-export-time-and-countertime/">Second
    shelf</a>
</div>

<div class="example" id="example-6"><img class="lazy-load" data-src="/images/examples-6.png" alt="" loading="lazy"><a
    href="https://liamyoung.org">Liam young</a>
</div>

<div class="example" id="example-7"><img class="lazy-load" data-src="/images/examples-7.png" alt="" loading="lazy"><a
    href="https://www.noteson.love/submit/">noteson.love</a>
</div>

<div class="example" id="example-8"><img class="lazy-load" data-src="/images/examples-8.png" alt="" loading="lazy"> <a
    href="https://www.mobilephonemuseum.com/catalogue">mobile phone
    museum</a>
</div>
<div class="example" id="example-9"><img class="lazy-load" data-src="/images/examples-9.png" alt="" loading="lazy"><a
    href="https://web.archive.org/web/20140106083717/http://www.cneai.com/evenement/">cneai</a>
</div>

<div class="example" id="example-10"><img class="lazy-load" data-src="/images/examples-10.png" alt="" loading="lazy"><a
    href="https://www.robidacollective.com/">Robida Collective</a>
</div>
<div class="example" id="example-11"><img class="lazy-load" data-src="/images/examples-11.png" alt="" loading="lazy"><a
    href="https://animalsasobjects.org/articles/">animals as objects</a>
</div>
<div class="example" id="example-12"><img class="lazy-load" data-src="/images/examples-12.png" alt="" loading="lazy"><a
    href="https://massfiles.net/city/323">massfiles.net</a>
</div>
<div class="example" id="example-13"><img class="lazy-load" data-src="/images/examples-13.png" alt="" loading="lazy"><a
    href="https://6mon.hotglue.me/?garden">6mon.hotglue.me</a>
</div>
<div class="example" id="example-14"><img class="lazy-load" data-src="/images/examples-14.png" alt="" loading="lazy"><a
    href="https://ortederbonnerrepublik.de">orte der bonner republik</a>
</div>
<div class="example" id="example-15"><img class="lazy-load" data-src="/images/examples-15.png" alt="" loading="lazy"><a
    href="https://fact.110west40th.com/">Fact</a>
</div>
<div class="example" id="example-16"><img class="lazy-load" data-src="/images/examples-16.png" alt="" loading="lazy"><a
    href="https://canopycanopycanopy.com/issues/parts-of-speech">Parts of
    Speech</a>
</div>
<div class="example" id="example-17"><img class="lazy-load" data-src="/images/examples-17.png" alt="" loading="lazy"><a
    href="https://womenwritingarchitecture.org/">Women Writing
    Architecture</a>
</div>
<div class="example" id="example-18"><img class="lazy-load" data-src="/images/examples-18.png" alt="" loading="lazy"><a
    href="https://www.mkg-hamburg.de/en/home.html">MK&G</a>
</div>
<div class="example" id="example-19"><img class="lazy-load" data-src="/images/examples-19.png" alt="" loading="lazy"><a
    href="https://here-there.ca/">here-there</a>
</div>
<div class="example" id="example-20"><img class="lazy-load" data-src="/images/examples-20.png" alt="" loading="lazy"><a
    href="https://www.fuse.kiwi/">fuse.kiwi</a>
</div>
<div class="example" id="example-21"><img class="lazy-load" data-src="/images/examples-21.png" alt="" loading="lazy"><a
    href="https://network-matters.xyz/">Network Matters</a>
</div>
<div class="example" id="example-22"><img class="lazy-load" data-src="/images/examples-22.png" alt="" loading="lazy"><a
    href="https://www.suvatypefoundry.ee/?ref=fuse-kiwi">suva type
    foundry</a>
</div>
<div class="example" id="example-23"><img class="lazy-load" data-src="/images/examples-23.png" alt="" loading="lazy"><a
    href="https://s-n-d.si/index.html">Soot</a>
</div>
<div class="example" id="example-24"><img class="lazy-load" data-src="/images/examples-24.png" alt="" loading="lazy"><a
    href="https://offf24.soot.com/?sootid=uid-am613n2vvq-e5dkxksx1n">s-n-d.
    index</a>
</div>
<div class="example" id="example-25"><img class="lazy-load" data-src="/images/examples-25.png" alt="" loading="lazy"><a
    href="https://www.millermaranta.ch/index">miller & maranta</a>
</div>
<div class="example" id="example-26"><img class="lazy-load" data-src="/images/examples-26.png" alt="" loading="lazy"><a
    href="https://kioskkiosk.com/">KIOSK</a>
</div>
<a class="url-example" id="url-example-1"
href="https://www.are.na/joel-humphries/queer-computer">[Queer
Computer]</a>

<a class="url-example" id="url-example-2"
href="https://outdoor-index.net/">[https://outdoor-index.net/]</a>

<a class="url-example" id="url-example-3"
href="https://howtobuildanarchive.com/">[https://howtobuildanarchive.com/]</a>

<a class="url-example" id="url-example-4"
href="https://www.andreaszuest.net/archiv.php">[https://www.andreaszuest.net/index.php]</a>

<a class="url-example" id="url-example-5"
href="https://cyberfeminismindex.com">[https://cyberfeminismindex.com/]</a>

<a class="url-example" id="url-example-6"
href=" https://docs.google.com/spreadsheets/d/1uvxZiMGYU-UyOqHa9HudWMVyTEvDLIzgUnN6AkXzHJ8/edit#gid=0">[https://docs.google.com/spreadsheets/Alternative
Libraries and Archives]</a>

<a class="url-example" id="url-example-7"
href="https://www.instagram.com/pin_archive/">[@pin_archive]</a>

<a class="url-example" id="url-example-8"
href="http://skylerbrickley.com/archive-list">[http://skylerbrickley.com/archive-list]</a>

<a class="url-example" id="url-example-9"
href="https://walbaum-archiv">[https://walbaum-archiv.ch/]</a>

</div>
    `;

    container.innerHTML = htmlContent;
}

loadHTMLContent();

var isScrollingWithinBounds = true;

//document.addEventListener('DOMContentLoaded', function () {
console.log("fds");
var container = document.querySelector('.horizontal-container');
var inner = document.querySelector('.horizontal-page');

// Create a new instance of Hammer on the container
var hammer = new Hammer(container);

// Configura la posición inicial deseada en X
var initialPosX = -1990; // Desplazamiento hacia la izquierda en px

var posX = initialPosX, posY = 0,
    lastPosX = posX, lastPosY = posY,
    velocityX = 0, velocityY = 0,
    maxPosX = 0, // El máximo en X es 0, que es el borde derecho del contenedor
    minPosX = -1 * (inner.offsetWidth - container.offsetWidth), // El mínimo en X es el borde izquierdo
    maxPosY = 0, // El máximo en Y es 0, que es el borde inferior visible del contenedor
    minPosY = -1 * (inner.offsetHeight - container.offsetHeight), // El mínimo en Y es el borde superior visible
    deceleration = 0.05, // Aumentado la fricción
    scaleFactor = 0.5, // Factor de escala para hacer el movimiento más lento
    animationFrameId;

// Establece la transformación inicial basada en la posición inicial
inner.style.transform = `translate(${initialPosX}px, 0px)`;

hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

hammer.on('panstart', function (e) {
    lastPosX = posX;
    lastPosY = posY;
    // Detiene cualquier animación actual
    cancelAnimationFrame(animationFrameId);
});

hammer.on('panmove', function (e) {
    // Reduce el desplazamiento aplicando el scaleFactor
    posX = Math.max(Math.min(lastPosX + (e.deltaX * scaleFactor), maxPosX), minPosX);
    posY = Math.max(Math.min(lastPosY + (e.deltaY * scaleFactor), maxPosY), minPosY);
    inner.style.transform = `translate(${posX}px, ${posY}px)`;
});

hammer.on('panend', function (e) {
    velocityX = e.velocityX * 20; // Reduce la velocidad inicial de la inercia
    velocityY = e.velocityY * 20;

    // Inicia el efecto de momentum
    (function momentum() {
        posX += velocityX;
        posY += velocityY;
        velocityX *= (1 - deceleration);
        velocityY *= (1 - deceleration);

        // Detiene el movimiento cuando la velocidad es muy baja
        if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
            posX = Math.max(Math.min(posX, maxPosX), minPosX);
            posY = Math.max(Math.min(posY, maxPosY), minPosY);
            inner.style.transform = `translate(${posX}px, ${posY}px)`;
            animationFrameId = requestAnimationFrame(momentum);
        } else {
            posX = Math.round(posX);
            posY = Math.round(posY);
            inner.style.transform = `translate(${posX}px, ${posY}px)`;
        }
    })();
});

container.addEventListener('wheel', function (e) {
    e.preventDefault();

    var scrollThreshold = 0.1; // Umbral de sensibilidad del scroll para determinar la intención
    var scrollDeltaY = e.deltaY;

    // Verifica si el movimiento predominante es vertical y si se encuentra en los límites del contenedor
    if (Math.abs(scrollDeltaY) > scrollThreshold) {
        if ((scrollDeltaY > 0 && posY <= minPosY) || (scrollDeltaY < 0 && posY >= maxPosY)) {
            window.scrollBy(0, scrollDeltaY); // Hace scroll de la página
            return;
        }
    }

    var deltaX = e.deltaX * 2.5;
    var deltaY = e.deltaY * 2.5;
    posX = Math.max(Math.min(posX - deltaX, maxPosX), minPosX);
    posY = Math.max(Math.min(posY - deltaY, maxPosY), minPosY);
    inner.style.transform = `translate(${posX}px, ${posY}px)`;
}, { passive: false });