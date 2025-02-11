export class DynamicDiagram {
    constructor(
        selector,
        data,
        center = { x: null, y: null },
        positions = { left: null, right: null, top: null },
        lowMovement
    ) {
        this.lowMovement = lowMovement;
        this.selector = selector;
        const container = d3.select(this.selector).node();
        this.width = container.clientWidth;
        this.height = container.clientHeight;

        // Asegúrate de que el contenedor tiene dimensiones válidas
        if (this.width === 0 || this.height === 0) {
            console.error("El contenedor debe tener una anchura y altura mayores a cero");
            return;
        }
        this.data = data;
        this.positions = positions;

        // Configuración inicial del centro (sin escalado en posiciones)
        // Se utiliza positions.left/positions.right/positions.top si se definen,
        // de lo contrario se usa el centro del contenedor para x (y para y se deja como esté o se provea desde el JSON)
        center.x =
            positions.left !== null
                ? positions.left
                : positions.right !== null
                    ? this.width - positions.right
                    : this.width / 2;
        center.y = positions.top !== null ? positions.top : center.y; // Si no se provee, se mantiene el valor previo (podría venir del JSON)
        this.center = center;

        // Calcula el factor de escala basado en la resolución original (1718 x 955)
        // Este factor se usará ÚNICAMENTE para escalar las distancias de los enlaces
        this.scale = Math.min(this.width / 1718, this.height / 955);

        this.isDragging = false;
        this.simulation = null;
        this.setup();

        // Redimensionar el diagrama cuando cambia el tamaño de la ventana
        window.addEventListener("resize", () => this.resize());
    }

    setup() {
        const container = d3.select(this.selector).node();
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        // Recalcular el factor de escala (solo para distancias)
        this.scale = Math.min(this.width / 1718, this.height / 955);

        // **No se sobrescribe this.center**, de modo que se conserva la posición
        // asignada en el constructor o establecida en el JSON

        // Establecer posiciones de los nodos SIN escalar (se usan las distancias originales)
        this.data.nodes.forEach((node, index) => {
            node.uniqueIndex = index;
            if (node.type !== "main-node") {
                node.x = this.center.x + Math.cos(node.angle) * node.distance;
                node.y = this.center.y + Math.sin(node.angle) * node.distance;
            } else {
                // El main-node conserva su posición definida en el constructor/JSON
                // (no se forzará al centro)
                node.x = this.center.x;
                node.y = this.center.y;
            }
        });

        // Calcular distancias de los enlaces aplicando el factor de escala
        this.data.links.forEach(link => {
            // Si link.source (o target) es un objeto, usamos su propiedad id; si no, es el ID
            const sourceId = typeof link.source === "object" ? link.source.id : link.source;
            const targetId = typeof link.target === "object" ? link.target.id : link.target;

            const sourceNode = this.data.nodes.find(node => node.id === sourceId);
            const targetNode = this.data.nodes.find(node => node.id === targetId);

            if (!sourceNode || !targetNode) {
                console.error("Uno de los nodos para el enlace no se encuentra:", link);
            } else {
                link.distance = (sourceNode.distance + targetNode.distance) * this.scale;
            }
        });

        // Fijar la posición del nodo principal (si se desea fijarla)
        this.data.nodes.forEach(node => {
            if (node.type === "main-node") {
                node.fx = this.center.x;
                node.fy = this.center.y;
            }
        });

        // Configurar la simulación de D3
        this.simulation = d3.forceSimulation(this.data.nodes)
            .force(
                "link",
                d3.forceLink(this.data.links)
                    .id(d => d.id)
                    .distance(d => d.distance)
                    .strength(1)
            )
            .force("charge", d3.forceManyBody().strength(d => (d.type === "main-node" ? -500 : -50)))
            .alpha(0.3)
            .alphaMin(0.02)
            .alphaDecay(0.1);

        // Eliminar cualquier SVG previo para redibujar el diagrama
        d3.select(this.selector).select("svg").remove();

        const svg = d3.select(this.selector)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("border", "none");

        const link = svg
            .append("g")
            .selectAll("line")
            .data(this.data.links)
            .join("line")
            .attr("stroke", "#999")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg
            .append("g")
            .selectAll("foreignObject")
            .data(this.data.nodes)
            .join("foreignObject")
            .html(d =>
                d.type !== "main-node"
                    ? `<a href="${d.url}" class="node-content ${d.class}">${d.id}</a>`
                    : `<div class="node-content ${d.class}">${d.id}</div>`
            )
            .call(
                d3.drag()
                    .on("start", (event, d) => this.dragstarted(event, d))
                    .on("drag", (event, d) => this.dragged(event, d))
                    .on("end", (event, d) => this.dragended(event, d))
            );

        // Inicializar tamaños y posiciones de cada nodo (sin escalar tamaños)
        node.each(function (d) {
            const div = this.querySelector(".node-content");
            if (div) {
                const bbox = div.getBoundingClientRect();
                d3.select(this)
                    .attr("width", bbox.width)
                    .attr("height", bbox.height)
                    .attr("x", d.x - bbox.width / 2)
                    .attr("y", d.y - bbox.height / 2);
            }
        });

        // Función para actualizar posiciones de nodos y enlaces
        function updateNodePositions() {
            node.each(function (d) {
                const div = this.querySelector(".node-content");
                const bbox = div.getBoundingClientRect();
                d.width = bbox.width;
                d.height = bbox.height;
                d3.select(this)
                    .attr("x", d.x - d.width / 2)
                    .attr("y", d.y - d.height / 2);
            });

            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        }

        updateNodePositions();

        // Configuración de la simulación: actualización de posiciones en cada tick
        this.simulation.on("tick", () => {
            let amplitude, frequency, phaseShift;
            if (this.lowMovement) {
                amplitude = 0.2;
                frequency = 0.4;
                phaseShift = 0.01;
            } else {
                amplitude = 0.2;
                frequency = 0.4;
                phaseShift = 0.01;
            }

            // Actualizar las posiciones de los nodos secundarios
            node.each(function (d) {
                if (d.type === "child-node" && !d.isDragging) {
                    d.angle += phaseShift * Math.cos(Date.now() / 10000 + d.uniqueIndex * frequency);
                    d.x += amplitude * Math.cos(d.angle);
                    d.y += amplitude * Math.sin(d.angle);
                }
            });

            if (this.simulation.alpha() < 0.1) {
                this.simulation.alpha(0.2).restart();
            }

            node
                .attr("x", d => d.x - d.width / 2)
                .attr("y", d => d.y - d.height / 2);

            // Actualizar las posiciones de los enlaces.
            // Para el main-node, se usan sus bordes según la propiedad linkStart
            link
                .attr("x1", d => {
                    if (d.source.type === "main-node") {
                        switch (d.source.linkStart) {
                            case "bottom":
                                return d.source.x;
                            case "top":
                                return d.source.x;
                            case "left":
                                return d.source.x - d.source.width / 2;
                            case "right":
                                return d.source.x + d.source.width / 2;
                            default:
                                return d.source.x;
                        }
                    }
                    return d.source.x;
                })
                .attr("y1", d => {
                    if (d.source.type === "main-node") {
                        switch (d.source.linkStart) {
                            case "bottom":
                                return d.source.y + d.source.height / 2;
                            case "top":
                                return d.source.y - d.source.height / 2;
                            case "left":
                            case "right":
                                return d.source.y;
                            default:
                                return d.source.y;
                        }
                    }
                    return d.source.y;
                })
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        });
    }

    resize() {
        // Al cambiar el tamaño del contenedor se vuelve a configurar el diagrama,
        // pero se mantiene la posición del nodo principal según lo establecido inicialmente.
        this.setup();
    }

    dragstarted(event) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
        if (event.subject.type === "main-node") {
            this.data.links.forEach(link => {
                if (link.source.id === event.subject.id || link.target.id === event.subject.id) {
                    // Reducir gradualmente la distancia de los enlaces
                    link.distance *= 0.9986;
                }
            });
            this.simulation.force("link").distance(link => link.distance);
            this.simulation.alpha(0.3).restart();
        }
    }

    dragended(event) {
        if (!event.active) this.simulation.alphaTarget(0.1);
        if (event.subject.type === "main-node") {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        } else {
            event.subject.fx = null;
            event.subject.fy = null;
            this.data.links.forEach(link => {
                if (link.source.id === event.subject.id || link.target.id === event.subject.id) {
                    const sourceNode = this.data.nodes.find(node => node.id === link.source.id);
                    const targetNode = this.data.nodes.find(node => node.id === link.target.id);
                    const dx = targetNode.x - sourceNode.x;
                    const dy = targetNode.y - sourceNode.y;
                    const currentDistance = Math.sqrt(dx * dx + dy * dy) + 35;
                    link.distance = currentDistance;
                }
            });
            this.simulation.force("link").initialize(this.data.nodes);
            this.simulation.alpha(0.3).restart();
        }
    }
}
