export function getNodeIndex(state, node_id){
  return state.nodes.findIndex(node => node.id == node_id);
}

export function getEdgeIndex(state, node_id, edge_id){
  let node_index = getNodeIndex(state, node_id);
  return {node_index: node_index, edge_index: state.nodes[node_index]['edges'].findIndex(edge => edge.id == edge_id)};
}

export function getActiveNode(state){
  return state.nodes.find(node =>
    node.id == state.active_node_id
  );
}
