import React, { Component } from "react";
import { connect } from "react-redux";

import { setActive } from "../actions/index";

import '../../css/NodeSymbol.css';

class NodeSymbol extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  // Updates the stores "active_node", which the portals listen to
  populatePortals(node_id){
    this.props.setActive(node_id);
  }

  render(){
    console.log(this.props.id)
    console.log(this.props.active_node_id)
    return(
      <circle className={this.props.id == this.props.active_node_id ? 'active_node' : 'inactive_node'}>
        {this.props.title} - {this.props.id}
        <button onClick={(node_id) => this.populatePortals(this.props.id)}>
          Edit {this.key}
        </button>
      </circle>
    )
  }

}

function mapStateToProps(state, ownProps){
  return{
    active_node_id: state.active_node_id
  }
}

function mapDispatchToProps(dispatch){
  return {
    setActive: node_id => dispatch(setActive(node_id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeSymbol);
