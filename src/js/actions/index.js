import { ADD_NODE, SET_ACTIVE, EDIT_NODE, ADD_EDGE, EDIT_EDGE } from "../constants/action-types";

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
