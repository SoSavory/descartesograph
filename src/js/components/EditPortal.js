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
    this.state = {
      graph_id: this.props.active_story_id,
      graph_title: this.props.active_story_title
    }


  }

  render(){
    return(
      <div id="edit_portal_container" key={this.props.active_node.id}>
        <div id="edit_portal_meta_info">
          
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
    active_graph_id: state.graph_id,
    active_graph_title: state.graph_title,
    active_node: node,
    active_node_edges: node['edges'],
    active_node_reverse_edges: node['reverse_edges']
  };
}


export default connect(mapStateToProps)(EditPortal);
