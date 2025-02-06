import { DynamicDiagrams } from "/js/DynamicDiagrams.js";

export async function initCategoryPage() {

    const data = await fetch('/data/links.json')
        .then(response => response.json());

    const main = document.querySelector("main");
    const svg = d3.select("main").append("svg")
        .attr("width", main.width)
        .attr("height", main.height)
        .style("border", "none");

    data.forEach(categoryData => {
        if (categoryData.mainnode != "Useful links") {
            let positions = { left: categoryData.allposition.left, right: categoryData.allposition.right, top: categoryData.allposition.top }
            new DynamicDiagrams('#app', svg, categoryData, { x: null, y: null }, positions);
        }
    });

}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryPage);
} else {
    initCategoryPage();
}