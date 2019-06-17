// Manages localStorage.

// localStorage looks like: {active_graph_id: '', graph_id: graph_string ...}

export function quickSaveGraph(graph){
    localStorage.setItem(graph.graph_id, JSON.stringify(graph));
}

export function getGraph(graph_id){
  return JSON.parse(localStorage.getItem(graph_id));
}

export function getActiveGraph(){
  return getGraph(localStorage.getItem('active_graph_id'));
}

export function setActiveGraph(graph_id){
  localStorage.setItem('active_graph_id', graph_id)
}

export function getGraphList(){
  const graph_ids = [];
  Object.keys(localStorage).forEach(function(key) {
    if (!key === 'active_graph_id'){
      graph_ids.push(key);
    }
  });
  return graph_ids;
}
