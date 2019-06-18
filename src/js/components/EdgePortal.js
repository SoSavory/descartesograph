import React, { Component }  from "react";
import { connect } from "react-redux";

import {getNodeIndex} from "../selectors/index";


import ListedEdge from "./ListedEdge";
import { addEdge } from "../actions/index";

class EdgePortal extends Component {
  constructor(props){
    super(props);
    this.state = {
      node_from_id: this.props.node_id,
      node_to_id: this.props.node_id,
      title: "Untitled Edge"
    };

    // form handlers
    this.addEdge = this.addEdge.bind(this);
    this.handleNewEdgeChange = this.handleNewEdgeChange.bind(this);
  }

  handleNewEdgeChange(event){
    this.setState({node_to_id: event.target.value});
  }

  addEdge(event){
    event.preventDefault();
    this.props.addEdge(this.state);
  }

  removeEdge(){
    console.log("Removing an edge");
  }

  render(){
    return(
      <div className="editing_portal">
        <div className="editing_portal_header">
          <h3>
            Edges
            <div className="tooltip">?
              <div className="tooltiptext">
                Add, Edit, and View Edges leading from the currently selected node.
              </div>
            </div>
          </h3>
        </div>
        <div className="editing_portal_content">

          { this.props.type == "to" &&
            <form id="edge_edit_form" onSubmit={this.addEdge} >
              <select value={this.state.node_to_id} onChange={this.handleNewEdgeChange}>
                {
                  this.props.nodes.map( (node, i) => (
                    <option key={i} value={Object.keys(node)[0]}>{Object.values(node)[0]}</option>
                  ))
                }
              </select>
              <input type='submit' value="Add Edge" />
              <span className="tooltip"> ?
                <div className="tooltiptext">
                  Add an Edge from the selected node to another node. Nodes can have edges to themselves.
                </div>
              </span>
            </form>
          }
          <div className="scrolling_ul">
            <ul >
              {
                this.props.edges.map( (edge,i) => (
                  <ListedEdge key={i} edge_id={edge.id} title={edge.title} node_to_id={edge.node_id} abstracted_nodes={this.props.nodes} />
                ) )
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodes.map(n => {let o = {}; o[n.id] = n.data.title; return o;})
  };
}

function mapDispatchToProps(dispatch){
  return {
    addEdge: edge => dispatch(addEdge(edge))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EdgePortal);
