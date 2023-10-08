// https://observablehq.com/@webdingens/tree-of-my-plants@194
function _1(md){return(
md` `
)}

function _chart(d3,data,cluster,setRadius,innerRadius,maxLength,setColor,outerRadius,width,legend,linkExtensionConstant,linkConstant,nodeCircle)
{
  const root = d3.hierarchy(data)
      .sum(d => d.chiildren?.length ? 0 : 1)
      .sort((a, b) => (a.value - b.value) || d3.ascending(a.data.length, b.data.length));

  cluster(root);
  setRadius(root, root.data.length = 0, innerRadius / maxLength(root));
  setColor(root);

  const svg = d3.create("svg")
      .attr("viewBox", [-outerRadius, -outerRadius, width, width])
      .attr("font-family", "sans-serif")
      .attr("font-size", 12);

  svg.append("g")
      .call(legend);

  svg.append("style").text(`

.link--active {
  stroke: #000 !important;
  stroke-width: 1.5px;
}

.link-extension--active {
  stroke-opacity: .6;
}

text {
  cursor: default;
}

.label--active {
  font-weight: bold;
}

`);

  const linkExtension = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.25)
    .selectAll("path")
    .data(root.links().filter(d => !d.target.children))
    .join("path")
      .each(function(d) { d.target.linkExtensionNode = this; })
      .attr("d", linkExtensionConstant);

  const link = svg.append("g")
      .attr('class', 'link-wrapper')
      .attr("fill", "none")
      .attr("stroke", "#ccc")
    .selectAll("path")
    .data(root.links())
    .join("path")
      .each(function(d) { d.target.linkNode = this; })
      .attr("d", linkConstant)
      .attr("stroke", d => d.target.color);

  const nodes = svg.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#ccc")
      .selectAll("circle")
      .data(root.links())
      .join("circle")
        .attr("cx", d => nodeCircle(d, true))
        .attr("cy", d => nodeCircle(d, false))
        .attr("r", width * .002)
        .attr("stroke", d => d.target.color);

  svg.append("g")
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .attr("dy", ".31em")
      .attr("transform", d => `rotate(${d.x - 90}) translate(${innerRadius + 4},0)${d.x < 180 ? "" : " rotate(180)"}`)
      .attr("text-anchor", d => d.x < 180 ? "start" : "end")
      .text(d => d.data.name.replace(/_/g, " "))
      .on("mouseover", mouseovered(true))
      .on("mouseout", mouseovered(false));

  linkExtension.attr("d", linkExtensionConstant);
  link.attr("d", linkConstant);

  function mouseovered(active) {
    return function(event, d) {
      d3.select(this).classed("label--active", active);
      d3.select(d.linkExtensionNode).classed("link-extension--active", active).raise();
      do d3.select(d.linkNode).classed("link--active", active).raise();
      while (d = d.parent);
    };
  }

  return svg.node();
}


function _cluster(d3,innerRadius){return(
d3.cluster()
    .size([360, innerRadius])
    .separation((a, b) => 1)
)}

function _color(d3){return(
d3.scaleOrdinal()
    .domain(["Bacteria Superkingdom", "Eukaryota Superkingdom"])
    .range(d3.schemeCategory10)
)}

function _maxLength(d3){return(
function maxLength(d) {
  return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
}
)}

function _setRadius(){return(
function setRadius(d, y0, k) {
  d.radius = (y0 += d.data.length) * k;
  if (d.children) d.children.forEach(d => setRadius(d, y0, k));
}
)}

function _setColor(color){return(
function setColor(d) {
  var name = d.data.name;
  d.color = color.domain().indexOf(name) >= 0 ? color(name) : d.parent ? d.parent.color : null;
  if (d.children) d.children.forEach(setColor);
}
)}

function _linkConstant(linkStep){return(
function linkConstant(d) {
  return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
}
)}

function _linkExtensionConstant(linkStep,innerRadius){return(
function linkExtensionConstant(d) {
  return linkStep(d.target.x, d.target.y, d.target.x, innerRadius);
}
)}

function _linkStep(){return(
function linkStep(startAngle, startRadius, endAngle, endRadius) {
  const c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI);
  const s0 = Math.sin(startAngle);
  const c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI);
  const s1 = Math.sin(endAngle);
  return "M" + startRadius * c0 + "," + startRadius * s0
      + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
      + "L" + endRadius * c1 + "," + endRadius * s1;
}
)}

function _nodeCircle(innerRadius){return(
function nodeCircle(d, returnX = true) {
    let startAngle = d.target.x;
    let startRadius = d.target.y;
    let endAngle = d.target.x;
    let endRadius = innerRadius;

    const c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI);
    const s0 = Math.sin(startAngle);
    const c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI);
    const s1 = Math.sin(endAngle);
    const x = startRadius * c1
    const y = startRadius * s1;
    if (returnX) return x;
    else return y;
}
)}

function _legend(color,outerRadius){return(
svg => {
  const g = svg
    .selectAll("g")
    .data(color.domain())
    .join("g")
      .attr("transform", (d, i) => `translate(${-outerRadius},${-outerRadius + i * 20})`);

}
)}

async function _data(FileAttachment){return(
await FileAttachment("treeDataPruned.json").json()
)}

function _width(){return(
954
)}

function _outerRadius(width){return(
width / 2
)}

function _innerRadius(outerRadius){return(
outerRadius - 250
)}



export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["treeDataPruned.json", {url: new URL("./files/8142e79b2af93cc1f17ff42e92d02e85abe8c704409a39d7156bd41cb237fad0da4ef0a300707bfed7333d4f16c646097dd289c9edd55853973a20978a4ddfeb.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","data","cluster","setRadius","innerRadius","maxLength","setColor","outerRadius","width","legend","linkExtensionConstant","linkConstant","nodeCircle"], _chart);
  main.variable().define("cluster", ["d3","innerRadius"], _cluster);
  main.variable().define("color", ["d3"], _color);
  main.variable().define("maxLength", ["d3"], _maxLength);
  main.variable().define("setRadius", _setRadius);
  main.variable().define("setColor", ["color"], _setColor);
  main.variable().define("linkConstant", ["linkStep"], _linkConstant);
  main.variable().define("linkExtensionConstant", ["linkStep","innerRadius"], _linkExtensionConstant);
  main.variable().define("linkStep", _linkStep);
  main.variable().define("nodeCircle", ["innerRadius"], _nodeCircle);
  main.variable().define("legend", ["color","outerRadius"], _legend);
  main.variable().define("data", ["FileAttachment"], _data);
  main.variable().define("width", _width);
  main.variable().define("outerRadius", ["width"], _outerRadius);
  main.variable().define("innerRadius", ["outerRadius"], _innerRadius);
  main.variable().define("d3", ["require"], _d3);
  return main;
}
