(function(){
  const container = document.getElementById("listContainer");
  const val = document.getElementById("value");
  const idx = document.getElementById("index");

  let list = [];

  function genAddr() {
    return "0x" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  }

  function updateLinks() {
    list.forEach((n, i) => {
      n.prev = list[i - 1]?.addr ?? "null";
      n.next = list[i + 1]?.addr ?? "null";
    });
  }

  function render() {
    container.innerHTML = '<svg id="arrowCanvas"></svg>';
    const svgEl = container.querySelector("svg");

    list.forEach(node => {
      const nodeEl = document.createElement("div");
      nodeEl.className = "node";
      nodeEl.innerHTML = `
        <div class="top-row">
          <div class="top-cell">prev: ${node.prev}</div>
          <div class="top-cell">data: ${node.value}</div>
          <div class="top-cell">next: ${node.next}</div>
        </div>
        <div class="bottom-row">addr: ${node.addr}</div>
      `;
      container.appendChild(nodeEl);
    });

    requestAnimationFrame(() => drawArrows(svgEl));
  }

 function drawArrows(svgEl) {
  svgEl.innerHTML = `
    <defs>
      <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="3.5" orient="auto">
        <path d="M0,0 L9,3.5 L0,7 Z" fill="#ff6f3c"/>
      </marker>
    </defs>
  `;

  const nodes = [...container.querySelectorAll(".node")];
  if (nodes.length < 2) return;

  const area = container.getBoundingClientRect();

  const getPos = (el) => {
    const r = el.getBoundingClientRect();
    return {
      leftX: r.left - area.left,
      rightX: r.right - area.left,
      centerY: r.top + r.height / 2 - area.top
    };
  };

  for (let i = 0; i < nodes.length - 1; i++) {
    const a = getPos(nodes[i]);
    const b = getPos(nodes[i + 1]);

    const pathF = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathF.setAttribute("d", `M ${a.rightX} ${a.centerY} L ${b.leftX} ${b.centerY}`);
    pathF.setAttribute("stroke", "#ff6f3c");
    pathF.setAttribute("stroke-width", "3");
    pathF.setAttribute("fill", "none");
    pathF.setAttribute("marker-end", "url(#arrowHead)");
    svgEl.appendChild(pathF);

    const pathB = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathB.setAttribute("d", `M ${b.leftX} ${b.centerY - 10} L ${a.rightX} ${a.centerY - 10}`);
    pathB.setAttribute("stroke", "#ffc93c");
    pathB.setAttribute("stroke-width", "2");
    pathB.setAttribute("fill", "none");
    pathB.setAttribute("marker-end", "url(#arrowHead)");
    svgEl.appendChild(pathB);
  }
}


  document.getElementById("append").onclick = () => {
    if (!val.value.trim()) return alert("Value daalo bhai!");
    const addr = genAddr();
    list.push({ value: val.value.trim(), addr, prev: "null", next: "null" });
    updateLinks(); render();
  };

  document.getElementById("prepend").onclick = () => {
    if (!val.value.trim()) return alert("Value daalo bhai!");
    const addr = genAddr();
    list.unshift({ value: val.value.trim(), addr, prev: "null", next: "null" });
    updateLinks(); render();
  };

  document.getElementById("insert").onclick = () => {
    const index = parseInt(idx.value);
    if (!val.value.trim()) return alert("Value daalo bhai!");
    if (isNaN(index) || index < 0 || index > list.length) return alert("Index galat hai");
    const addr = genAddr();
    list.splice(index, 0, { value: val.value.trim(), addr, prev: "null", next: "null" });
    updateLinks(); render();
  };

  document.getElementById("remove").onclick = () => {
    const index = parseInt(idx.value);
    if (isNaN(index) || index < 0 || index >= list.length) return alert("Index galat hai");
    list.splice(index, 1);
    updateLinks(); render();
  };

  document.getElementById("removeFront").onclick = () => {
    if (list.length === 0) return alert("List khali hai!");
    list.shift();
    updateLinks(); render();
  };

  document.getElementById("removeBack").onclick = () => {
    if (list.length === 0) return alert("List khali hai!");
    list.pop();
    updateLinks(); render();
  };

  document.getElementById("clear").onclick = () => {
    list = [];
    render();
  };

  window.addEventListener("resize", render);

  list = [];
  updateLinks();
  render();
})();
