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

        // Configuración inicial del centro
        center.x =
            positions.left !== null
                ? positions.left
                : positions.right !== null
                    ? this.width - positions.right
                    : this.width / 2;
        center.y = positions.top !== null ? positions.top : center.y;
        this.center = center;

        // Calcula el factor de escala (solo para escalar las distancias de los enlaces)
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
        this.scale = Math.min(this.width / 1718, this.height / 955);

        // Establecer posiciones iniciales de los nodos (sin escalar)
        this.data.nodes.forEach((node, index) => {
            node.uniqueIndex = index;
            if (node.type !== "main-node") {
                node.x = this.center.x + Math.cos(node.angle) * node.distance;
                node.y = this.center.y + Math.sin(node.angle) * node.distance;
            } else {
                node.x = this.center.x;
                node.y = this.center.y;
            }
        });

        // Calcular distancias de los enlaces aplicando el factor de escala
        this.data.links.forEach(link => {
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

        // Fijar la posición del nodo principal (si se desea)
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

        // Eliminar cualquier SVG previo
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
            // Si el nodo es de tipo "useful-links", lo creamos con <img>; sino, con enlace o div según corresponda.
            .html(d => {
                if (d.class === "useful-links") {
                    return `<div  id="Useful"><img src="${d.imgUrl || '../images/folder.png'}" 
                                  class="node-content useful-links" 
                                  alt="${d.id}" /><span>${d.id}</span></div>`;
                } else {
                    return d.type !== "main-node"
                        ? `<a href="${d.url}" class="node-content ${d.class}">${d.id}</a>`
                        : `<div class="node-content ${d.class}">${d.id}</div>`;
                }
            })
            .call(
                d3.drag()
                    .on("start", (event, d) => this.dragstarted(event, d))
                    .on("drag", (event, d) => this.dragged(event, d))
                    .on("end", (event, d) => this.dragended(event, d))
            );

        // Agregar eventos de hover SOLO para el nodo "useful-links"
        node.filter(d => d.class === "useful-links")
            .on("mouseover", (event, d) => {
                d.isHovered = true;
            })
            .on("mouseout", (event, d) => {
                d.isHovered = false;
            });

        // Inicializar tamaños y posiciones de cada nodo (se usan las dimensiones actuales)
        node.each(function (d) {
            const div = this.querySelector(".node-content");
            if (div) {
                const bbox = div.getBoundingClientRect();
                d.width = bbox.width;
                d.height = bbox.height;
                d3.select(this)
                    .attr("width", bbox.width)
                    .attr("height", bbox.height)
                    .attr("x", d.x - bbox.width / 2)
                    .attr("y", d.y - bbox.height / 2);
            }
        });

        // Función para actualizar posiciones y (re)calcular dimensiones
        function updateNodePositions() {
            node.each(function (d) {
                const div = this.querySelector(".node-content");
                if (!div) return;
                // Si es useful-links y está en hover, no recalculamos sus dimensiones
                if (d.class === "useful-links" && d.isHovered) {
                    d3.select(this)
                        .attr("x", d.x - d.width / 2)
                        .attr("y", d.y - d.height / 2);
                } else {
                    const bbox = div.getBoundingClientRect();
                    d.width = bbox.width;
                    d.height = bbox.height;
                    d3.select(this)
                        .attr("x", d.x - d.width / 2)
                        .attr("y", d.y - d.height / 2);
                }
            });

            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        }

        updateNodePositions();

        // Actualización de posiciones en cada tick de la simulación
        this.simulation.on("tick", () => {
            // Actualizar las posiciones de los nodos secundarios
            node.each(function (d) {
                if (d.type === "child-node" && !d.isDragging) {
                    // Actualización "flotante" de los nodos secundarios
                    const phaseShift = 0.01;
                    const frequency = 0.4;
                    const amplitude = 0.2;
                    d.angle += phaseShift * Math.cos(Date.now() / 10000 + d.uniqueIndex * frequency);
                    d.x += amplitude * Math.cos(d.angle);
                    d.y += amplitude * Math.sin(d.angle);
                }
            });

            // Reiniciar la simulación si es necesario
            if (this.simulation.alpha() < 0.1) {
                this.simulation.alpha(0.2).restart();
            }

            // Actualizar las posiciones de los nodos
            node
                .attr("x", d => d.x - d.width / 2)
                .attr("y", d => d.y - d.height / 2);

            // Actualizar las posiciones de los enlaces
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        });
    }

    resize() {
        // Al cambiar el tamaño del contenedor se vuelve a configurar el diagrama,
        // manteniendo la posición del nodo principal según lo establecido.
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
