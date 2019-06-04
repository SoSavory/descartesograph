import React, { Component }  from "react";
import { connect } from "react-redux";

import {getActiveNode} from "../selectors/index";

import NodePortal from "./NodePortal";
import EdgePortal from "./EdgePortal";

import '../../css/EditPortal.css';

// Responsible for grabbing a node from the store and populating form portals with relevant data.
// Listens for updates to active_node within the store

class EditPortal extends Component {
  constructor(props){
    super(props);
  }

  getANode(node_id){
    // console.log(state.nodes.filter(node => node.id == node_id));
  }

  printState(){
    console.log(this.props);
  }

  render(){
    return(
      <div id="edit_portal_container" key={this.props.active_node.id}>
        <div>
          <h1>Edit </h1>
          <span>Active Node is: {this.props.active_node.id}</span>
        </div>
        <NodePortal
          node_id={this.props.active_node.id}
          node_data={this.props.active_node.data}
         />
        <EdgePortal
          node_id={this.props.active_node.id}
          type="to"
          edges={ this.props.active_node_edges }
        />
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  let node = getActiveNode(state);
  return {
    active_node: node,
    active_node_edges: node['edges'],
    active_node_reverse_edges: node['reverse_edges']
  };
}


export default connect(mapStateToProps)(EditPortal);
