import { ADD_NODE, SET_ACTIVE, EDIT_NODE, ADD_EDGE, EDIT_EDGE, EDIT_TITLE, DELETE_EDGE, DELETE_NODE, CHANGE_VISUALIZER_MODE } from "../constants/action-types";

// Payload is a node of form {id: '', data: {}, edges: [], reverse_edges: []}
export function addNode(payload) {
  return {type: ADD_NODE, payload}
};

// Payload is a valid node identifier
export function setActive(payload){
  return {type: SET_ACTIVE, payload}
}

// Payload is a node identitifier and an object of data fields to update with
export function editNode(payload){
  return {type: EDIT_NODE, payload}
}

export function addEdge(payload){
  return {type: ADD_EDGE, payload}
}

export function editEdge(payload){
  return {type: EDIT_EDGE, payload}
}

export function editTitle(payload){
  return {type: EDIT_TITLE, payload}
}

export function deleteEdge(payload){
  return {type: DELETE_EDGE, payload}
}

export function deleteNode(payload){
  return {type: DELETE_NODE, payload}
}

export function changeVisualizerMode(){
  return {type: CHANGE_VISUALIZER_MODE}
}
