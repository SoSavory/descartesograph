import React, { Component }  from "react";
import { connect } from "react-redux";

import {getActiveNode} from "../selectors/index";

import NodePortal from "./NodePortal";
import EdgePortal from "./EdgePortal";

// Responsible for grabbing a node from the store and populating form portals with relevant data.
// Listens for updates to active_node within the store

class VisualizerOverlay extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="visualizer_overlay">
        <ul>
          {
            this.props.nodes.map((node, i) => (
              <li>{node.data.title}</li>
            ))
          }
        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    active_node: state.active_node_id,
    nodes: state.nodes
  };
}


export default connect(mapStateToProps)(VisualizerOverlay);
