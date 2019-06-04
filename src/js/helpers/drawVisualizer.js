import * as d3 from 'd3';
import store from "../store/index";

import {SET_ACTIVE} from "../constants/action-types";
import { setActive } from "../actions/index";

// Define an update method,
// which (re) enters data
// Then have something like this:
// store.subscribe(() => {
//   var state = store.getState();
//    update()
//   }
// );
// then uncouple this rendering from props in visualizer.js

function color(d, active_node_id){
  // const scale = d3.scaleOrdinal(d3.schemeCategory10);
  // return d.id === active_node_id ? '#fff' : scale(d.group);
  return '#fff';
}

function drag(simulation) {

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}


function activateNode(d){
  store.dispatch(setActive(d.id));

}

function anyIdMatches(arr, val){
  return arr.some(function(arrVal){
    return val === arrVal.id;
  })
}

function update(nodes,links,state,prev_state){
  for(let node of state.nodes){

    nodes.push(Object.create({
      id: node.id,
      title: node.data.title
    }));


    for(let edge of node.edges){

      links.push(Object.create({
        source: node.id,
        target: edge.node_id,
        title: edge.title
      }));


    }
  }
}




// props follows shape of nodes
const drawVisualizer = (props) => {
  d3.select('#visualizer_container > *').remove();
  const container = document.getElementById('visualizer_container');
  const w = container.clientWidth;
  const h = container.clientHeight;

  const links = [];
  const nodes = [];
  const prev_state = props;

  update(nodes, links, props);

  const svg = d3.select('#visualizer_container').append("svg")
      .attr('height', h)
      .attr('width', w)
      .attr("viewBox", [-w/2,-h/2,w,h])
      .attr("preserveAsppectRatio", "xMinYMin meet")
      .attr("overflow", "auto");

  const g = svg.append('g').attr("class", "zoomable");

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(() => -1000))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    const link = g.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", 1);

    const node = g.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .classed("node_symbol", true)
        .classed("active_node", function(d){return d.id === props.active_node_id})
        .attr("r", 15)
        .attr("fill", color)
        .on("click", activateNode)
        .call(drag(simulation));

      node.append("title")
        .text(function(d){return d.title});

      const zoom_handler = d3.zoom().on("zoom", () => {
        g.attr("transform", d3.event.transform)
      });

      zoom_handler(svg);


}

export default drawVisualizer;
