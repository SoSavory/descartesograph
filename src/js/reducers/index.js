import { ADD_NODE, SET_ACTIVE, EDIT_NODE, ADD_EDGE, EDIT_EDGE, EDIT_TITLE, DELETE_EDGE, DELETE_NODE, CHANGE_VISUALIZER_MODE } from "../constants/action-types";
import { getNodeIndex, getEdgeIndex } from "../selectors/index";
import { getGraph, getGraphList, getActiveGraph } from "../helpers/localStorageManager";
import uuidv1 from 'uuid';

let initialState = {}

const DEFAULT_NODES = [{
  id: uuidv1(),
  data: {title: "Untitled Node", content: "", is_start: true},
  edges: [],
  reverse_edges: []
}];

if(getActiveGraph()){
  // set a localstorage 'active story', then access that
  initialState = getActiveGraph();

} else {

  const initial_node_id = uuidv1();
  const initial_graph_id = uuidv1();

  // edges have form {id: '', node_id: '', title: ''}

  initialState = {
    graph_id: initial_graph_id,
    graph_title: "Untitled Document",
    active_node_id: DEFAULT_NODES[0].id,
    nodes: DEFAULT_NODES,
    visualizer_mode: "d3"
  };
}


// A node is an object of form {id: 'id', data: {}, edges: [list of node ids], reverse_edges: [list of node ids]}

function rootReducer(state = initialState, action){
  switch (action.type) {
    case ADD_NODE:
      return Object.assign({}, state, {
        nodes: addNode(state)
      });
    case SET_ACTIVE:
      return Object.assign({}, state, {
        active_node_id: action.payload
      });
    case EDIT_NODE:
      return Object.assign({}, state, {
        nodes: editNode(state, action.payload)
      });
    case ADD_EDGE:
      return Object.assign({}, state, {
        nodes: addEdge(state, action.payload)
      });
    case EDIT_EDGE:
      return Object.assign({}, state, {
        nodes: editEdge(state, action.payload)
      });
    case EDIT_TITLE:
      return Object.assign({}, state, {
        graph_title: action.payload
      });
    case DELETE_EDGE:
      return Object.assign({}, state, {
        nodes: deleteEdge(state, action.payload)
      });
    case DELETE_NODE:
      let new_nodes = deleteNode(state, action.payload);
      if(!new_nodes[0]){
        new_nodes = DEFAULT_NODES;
      }
      return Object.assign({}, state, {
        active_node_id: new_nodes[0].id,
        nodes: new_nodes
      });
    case CHANGE_VISUALIZER_MODE:
      return Object.assign({}, state, {
        visualizer_mode: changeVisualizerMode(state)
      });
    default:
      return state
  }

}

// a function for determining whether there is a "start-point" node
function isStartPresent(state){
  let is_start = false;
  for(let node of state.nodes){
    if(node.data.is_start === true){
      is_start = true;
      break;
    }
  }
  return is_start;
}


function addNode(state){
  const id = uuidv1();
  return state.nodes.concat({
    id: id,
    data: {title: "Untitled Node", content: "", is_start: !(isStartPresent(state))},
    edges: [],
    reverse_edges: []
  });
}

function editNode(state, payload){
  let node_index = getNodeIndex(state, payload.node_id);
  let nodes = state.nodes.slice();
  // bother with resetting all other nodes to be not be the initial node?
  if(nodes[node_index]['data']['is_start'] != true && payload['node_data']['is_start'] === true){
    for(let node of nodes){
      node['data']['is_start'] = false;
    }
  }
  nodes[node_index]['data'] = payload.node_data;
  return nodes;
}

function addEdge(state, payload){
  let id = uuidv1();
  let nodes = state.nodes.slice();
  let node_index = getNodeIndex(state, payload.node_from_id);
  let edges = nodes[node_index]['edges'].concat({ id: id, title: payload.title, node_id: payload.node_to_id });
  nodes[node_index]['edges'] = edges;
  return nodes;
}

function editEdge(state, payload){
  let nodes = state.nodes.slice();
  let indices = getEdgeIndex(state, state.active_node_id, payload.id);
  nodes[indices['node_index']]['edges'][indices['edge_index']] = payload;
  return nodes;
}

// payload looks like { edge_id: ''}
function deleteEdge(state, payload){
  let nodes = state.nodes.slice();
  let indices = getEdgeIndex(state, state.active_node_id, payload.edge_id);
  nodes[indices['node_index']]['edges'].splice(indices['edge_index'], 1);
  return nodes;
}

// // payload looks like {node_id: ''}
function deleteNode(state, payload){
  let nodes = state.nodes.slice();
  let node_to_remove_index;
  nodes.forEach((node, i) => {

    node.edges = node.edges.filter(edge => edge.node_id !== payload.node_id);

    if(node.id === payload.node_id){
      node_to_remove_index = i;
    }

  });

  nodes.splice(node_to_remove_index, 1);

  return nodes;
}

function changeVisualizerMode(state){
  let mode = state.visualizer_mode;
  mode === "d3" ? mode = "pdf" : mode = "d3";
  return mode;
}

export default rootReducer;
