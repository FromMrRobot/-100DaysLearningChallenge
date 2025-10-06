(function(){
  const container = document.getElementById("listContainer")
  const val = document.getElementById("value")
  const idx = document.getElementById("index")

  let list = []

  // random address jesa number banate hai
  function genAddr() {
    return "0x" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
  }

  function updateNextAddr() {
    list.forEach((n, i) => {
      n.next = list[i + 1]?.addr ?? "null"
    })
  }

  function render() {
    container.innerHTML = '<svg id="arrowCanvas"></svg>'
    const svgEl = container.querySelector("svg")

    list.forEach(node => {
      const nodeEl = document.createElement("div")
      nodeEl.className = "node"
      nodeEl.innerHTML = `
        <div class="top-row">
          <div class="top-cell">data: ${node.value}</div>
          <div class="top-cell">next: ${node.next}</div>
        </div>
        <div class="bottom-row">addr: ${node.addr}</div>
      `
      container.appendChild(nodeEl)
    })

    requestAnimationFrame(() => drawArrows(svgEl))
  }

  // arrows draw karne ka kaam niche hai
  function drawArrows(svgEl) {
    svgEl.innerHTML = `
      <defs>
        <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="3.5" orient="auto">
          <path d="M0,0 L9,3.5 L0,7 Z" fill="#ff006c"/>
        </marker>
      </defs>
    `

    const nodes = [...container.querySelectorAll(".node")]
    if (nodes.length < 2) return

    const area = container.getBoundingClientRect()

    const getPos = (el) => {
      const r = el.getBoundingClientRect()
      return {
        x: r.right - area.left,
        y: r.top + r.height / 2 - area.top,
        leftX: r.left - area.left,
        centerY: r.top + r.height / 2 - area.top
      }
    }

    for (let i = 0; i < nodes.length - 1; i++) {
      const a = getPos(nodes[i])
      const b = getPos(nodes[i + 1])

      let d
      if (Math.abs(a.y - b.y) < 10) {
        d = `M ${a.x} ${a.y} L ${b.leftX} ${b.y}`
      } else {
        const midX = (a.x + b.leftX) / 2
        d = `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.leftX} ${b.y}`
      }

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", d)
      path.setAttribute("stroke", "#d62b70")
      path.setAttribute("stroke-width", "3")
      path.setAttribute("fill", "none")
      path.setAttribute("marker-end", "url(#arrowHead)")
      svgEl.appendChild(path)
    }
  }

  document.getElementById("append").onclick = () => {
    if (!val.value.trim()) return alert("Value daalo bhai!")
    const addr = genAddr()
    list.push({ value: val.value.trim(), addr, next: "null" })
    updateNextAddr(); render()
  }

  document.getElementById("prepend").onclick = () => {
    if (!val.value.trim()) return alert("Value daalo bhai!")
    const addr = genAddr()
    list.unshift({ value: val.value.trim(), addr, next: "null" })
    updateNextAddr(); render()
  }

  document.getElementById("insert").onclick = () => {
    const index = parseInt(idx.value)
    if (!val.value.trim()) return alert("Value daalo bhai!")
    if (isNaN(index) || index < 0 || index > list.length) return alert("Index galat hai")
    const addr = genAddr()
    list.splice(index, 0, { value: val.value.trim(), addr, next: "null" })
    updateNextAddr(); render()
  }

  document.getElementById("remove").onclick = () => {
    const index = parseInt(idx.value)
    if (isNaN(index) || index < 0 || index >= list.length) return alert("Index galat hai")
    list.splice(index, 1)
    updateNextAddr(); render()
  }

  document.getElementById("removeFront").onclick = () => {
    if (list.length === 0) return alert("List khali hai!")
    list.shift()
    updateNextAddr(); render()
  }

  document.getElementById("removeBack").onclick = () => {
    if (list.length === 0) return alert("List khali hai!")
    list.pop()
    updateNextAddr(); render()
  }

  document.getElementById("clear").onclick = () => {
    list = []
    render()
  }

  window.addEventListener("resize", render)

  // start me kuch demo nodes dikhane ke liye
  list = [
   
  ]
  updateNextAddr()
  render()
})()
