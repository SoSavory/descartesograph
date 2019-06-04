import React, { Component }  from "react";
import { connect } from "react-redux";

import { addNode } from "../actions/index";

function mapDispatchToProps(dispatch){
  return {
    addNode: node => dispatch(addNode(node))
  };
}

class Navigation extends Component {
  constructor(props){
    super(props);
  }

  addByButton(){
    this.props.addNode(null);
  }

  render(){
    return(
      <div>
        <button onClick={() => this.addByButton()} >
          Add Node
        </button>
      </div>
    )
  }

}

export default connect(null, mapDispatchToProps)(Navigation);
