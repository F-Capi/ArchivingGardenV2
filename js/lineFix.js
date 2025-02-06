function adjustLine() {
    try {

        const svgWidth = document.getElementById('mySvg').clientWidth;
        const line = document.getElementById('myLine');
        line.setAttribute('x2', svgWidth - 61.08);

        const line2 = document.getElementById('otherLine');
        line2.setAttribute('x1', svgWidth - 61.08);
        line2.setAttribute('x2', svgWidth - 61.08);


        const svgWidth2 = document.getElementById('section3lines').clientWidth;

        const line3 = document.getElementById('line3');
        line3.setAttribute('x2', svgWidth2 - 41);


        const line5 = document.getElementById('line5');
        line5.setAttribute('x1', svgWidth2 - 41);
        line5.setAttribute('x2', svgWidth2 - 41);


        const line4 = document.getElementById('line4');
        line4.setAttribute('x2', svgWidth2 - 41);

        const line6 = document.getElementById('l3-1');
        line6.setAttribute('x2', svgWidth2 - 355);

        const svgWidth4 = document.getElementById('svg4').clientWidth;


        const line7 = document.getElementById('svg4-1');
        line7.setAttribute('x2', svgWidth4 - 103);

        const line8 = document.getElementById('svg4-2');

        line8.setAttribute('x1', svgWidth4 - 103);
        line8.setAttribute('x2', svgWidth4 - 103);

        const line9 = document.getElementById('svg4-3');

        line9.setAttribute('x1', svgWidth4 - 186.42);
        line9.setAttribute('x2', svgWidth4 - 103);

        const line10 = document.getElementById('svg4-4');

        line10.setAttribute('x2', svgWidth4 - 186.42);
        line10.setAttribute('x1', svgWidth4 - 186.42);


        const line11 = document.getElementById('svg4-5');
        line11.setAttribute('x2', svgWidth4 - 428);


    } catch {

    }

}



if (document.readyState === 'complete') {
    adjustLine();
}
window.onresize = adjustLine;