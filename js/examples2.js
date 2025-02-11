async function main() {
    const data = await fetch('/data/examples.json')
        .then(response => response.json());

    let list = groupItems(data.items, 6);

    list.forEach((group) => {
        const groupContainer = document.createElement("div");
        groupContainer.classList.add("groupContainer");

        group.forEach((example) => {
            const div = document.createElement("a");
            div.classList.add("exampleContainer");
            div.href = example.link;

            const imgBox = document.createElement("div");
            imgBox.classList.add("exampleImagebox");


            const img = document.createElement("div");
            img.classList.add("exampleImage");
            img.style.backgroundImage = `url(${example.image})`;
            imgBox.appendChild(img);

            const link = document.createElement("a");
            link.classList.add("exampleLink");
            link.textContent = example.title;
            link.href = example.link;

            div.appendChild(imgBox);
            div.appendChild(link);

            groupContainer.appendChild(div);
        });

        document.getElementById("examples").appendChild(groupContainer);

    });
}

function groupItems(items, size) {
    let grouped = []
    for (let i = 0; i < items.length; i += size) {
        grouped.push(items.slice(i, i + size));
    }
    return grouped;
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
