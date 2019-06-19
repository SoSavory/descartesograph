import { ADD_NODE, SET_ACTIVE, EDIT_NODE, ADD_EDGE, EDIT_EDGE, EDIT_TITLE, DELETE_EDGE, DELETE_NODE } from "../constants/action-types";
import { getNodeIndex, getEdgeIndex } from "../selectors/index";
import { getGraph, getGraphList, getActiveGraph } from "../helpers/localStorageManager";
import uuidv1 from 'uuid';

let initialState = {}

const DEFAULT_NODES = [{
  id: uuidv1(),
  data: {title: "Untitled Node", content: ""},
  edges: [],
  reverse_edges: []
}]

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
    active_node_id: initial_node_id,
    nodes: [{
      id: initial_node_id,
      data: {title: "Untitled Node", content: ""},
      edges: [],
      reverse_edges: []
    }]
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
      let node_index = getNodeIndex(state, action.payload.node_id);
      let nodes = state.nodes.slice();
      nodes[node_index]['data'] = action.payload.node_data;
      return Object.assign({}, state, {
        nodes: nodes
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
    default:
      return state
  }

}

function addNode(state){
  const id = uuidv1();

  return state.nodes.concat({
    id: id,
    data: {title: "Untitled Node", content: ""},
    edges: [],
    reverse_edges: []
  });
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

export default rootReducer;
