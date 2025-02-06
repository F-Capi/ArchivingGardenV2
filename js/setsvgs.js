function main() {
    const section2 = document.getElementById('section2');

    var svgHTML1 = `
   <svg  width="100%" height="665" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; "
        id='mySvg'>
        <line id="otherLine" x1="1452.92" y1="0.506226" x2="1452.92" y2="19.5062" stroke="black" />
        <line x1="41.3419" y1="257.006" x2="83.8419" y2="257.006" stroke="black" />
        <line x1="83.8419" y1="257.006" x2="83.8419" y2="654.785" stroke="black" />
        <line x1="41.8419" y1="257.006" x2="41.8419" y2="10.0062" stroke="black" />
        <line id="myLine" x1="41.8419" y1="10.0062" x2="1452.34" y2="10.0062" stroke="black" />
        <line x1="103.3419" y1="645.284" x2="103.3419" y2="664.284" stroke="black" />
        <line x1="102.8419" y1="654.784" x2="83.8419" y2="654.784" stroke="black" />
    </svg>`;

    // Inserta el SVG justo antes del cierre del contenedor
    section2.insertAdjacentHTML('beforeend', svgHTML1);


    const section3 = document.getElementById('section3');

    var svgHTML2 = `
    <svg  id="section3lines" width="100%" height="804" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="127.5371" y1="793.861" x2="156" y2="793.861" stroke="black" />
        <line x1="127.6299" y1="794.361" x2="127.6299" y2="598.829" stroke="black" />
        <line x1="127.6299" y1="598.829" x2="42" y2="598.829" stroke="black" />
        <line x1="42" y1="598.829" x2="42" y2="94.4287" stroke="black" />
        <line id="line3" x1="42" y1="94.4287" x2="1472" y2="94.4287" stroke="black" />
        <line id="line5" x1="1472" y1="94.4287" x2="1472" y2="10.3613" stroke="black" />
        <line id="line4" x1="322.218" y1="10.3613" x2="1472" y2="10.3613" stroke="black" />
        <line x1="322.5" y1="0.361328" x2="322.5" y2="19.3613" stroke="black" />
        <line x1="156.5" y1="784.361" x2="156.5" y2="803.361" stroke="black" />


        
    </svg>`;

    section3.insertAdjacentHTML('beforeend', svgHTML2);

    const section5 = document.getElementById('section5');

    var svgHTML3 = `<svg id="lines3" width="100%" height="145" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Convertido del primer path con margen izquierdo añadido -->
  <line x1="64.42188" y1="21.3516" x2="64.42188" y2="65.3516" stroke="black"/>
  <line x1="64.42188" y1="65.3516" x2="534.422" y2="65.3516" stroke="black"/>

  <!-- Convertido del segundo path con margen izquierdo añadido -->
  <line id="l3-1" x1="535.422" y1="1.35156" x2="1158.42" y2="1.35156" stroke="black"/>
  <line x1="535.422" y1="1.35156" x2="535.422" y2="127.352" stroke="black"/>

  <!-- Convertido del tercer path con margen izquierdo añadido -->
  <line x1="594.422" y1="144.352" x2="615.922" y2="144.352" stroke="black"/>
</svg>


`;
    section5.insertAdjacentHTML('beforeend', svgHTML3);

    var svgHTML4 = `<svg id="svg4" width="100%" height="973"  fill="none" xmlns="http://www.w3.org/2000/svg">
    <line id="svg4-2" x1="1408.42" y1="342.352" x2="1408.42" y2="389.045" stroke="black"/>
    <line id="svg4-3" x2="1408.42" y1="389.045" x1="1325.75" y2="389.045" stroke="black"/>
    <line id="svg4-4" x1="1325.75" y1="389.045" x2="1325.75" y2="443.352" stroke="black"/>
    <!-- Segundo path convertido en línea -->
    <line id="svg4-1" x2="1405.42" y1="342.352" x1="123.422" y2="342.352" stroke="black"/>
    <line x1="123.422" y1="342.352" x2="123.422" y2="388.583" stroke="black"/>
    <line x1="123.422" y1="388.583" x2="229.909" y2="388.583" stroke="black"/>
    <line x1="229.909" y1="388.583" x2="229.909" y2="442.352" stroke="black"/>
</svg>
`;
    section5.insertAdjacentHTML('beforeend', svgHTML4);


    var svgHTML5 = `<svg  id="svg5" width="100%" height="165" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Primer path convertido en líneas -->
        <line x1="61.42188" y1="30.4898" x2="452.15" y2="30.4898" stroke="black"/>
        <line x1="452.15" y1="30.4898" x2="452.15" y2="1.35059" stroke="black"/>
        <line x1="452.15" y1="1.35059" x2="616.422" y2="1.35059" stroke="black"/>
        <line x1="616.422" y1="1.35059" x2="616.422" y2="143.301" stroke="black"/>
        <line x1="616.422" y1="143.301" x2="139.5022" y2="143.301" stroke="black"/>
        <line x1="139.5022" y1="143.301" x2="139.5022" y2="164.351" stroke="black"/>
        <line x1="139.5022" y1="164.351" x2="121.3471" y2="164.351" stroke="black"/>
        <line x1="121.3471" y1="164.351" x2="121.3471" y2="113.169" stroke="black"/>
        <line x1="121.3471" y1="113.169" x2="61.42188" y2="113.169" stroke="black"/>
        <line x1="61.42188" y1="113.169" x2="61.42188" y2="30.4898" stroke="black"/>
        <!-- Segundo path convertido en línea -->
        <line id="svg4-5" x1="616.422" x2="1086.42" y1="26.3516" y2="26.3516" stroke="black"/>
    </svg>
    
    `;

    section5.insertAdjacentHTML('beforeend', svgHTML5);

}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
