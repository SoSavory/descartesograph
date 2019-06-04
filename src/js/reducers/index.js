import { ADD_NODE, SET_ACTIVE, EDIT_NODE, ADD_EDGE, EDIT_EDGE } from "../constants/action-types";
import { getNodeIndex, getEdgeIndex } from "../selectors/index";
import uuidv1 from 'uuid';

const initial_id = uuidv1();

// edges have form {id: '', node_id: '', title: ''}

const initialState = {
  active_node_id: initial_id,
  nodes: [{
    id: initial_id,
    data: {title: "Untitled Node", content: ""},
    edges: [],
    reverse_edges: []
  }]
};

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
      })
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

export default rootReducer;
