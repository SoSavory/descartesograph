import React, { Component }  from "react";
import NodeSymbol from "./NodeSymbol";

import { connect } from "react-redux";

import drawVisualizer from '../helpers/drawVisualizer';

import '../../css/Visualizer.css';

const mapStateToProps = (state, ownProps) => {
  return {
    active_node_id: state.active_node_id,
    nodes: state.nodes
 };
}



class Visualizer extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    // drawVisualizer(this.props);
    drawVisualizer(this.props);
  }

  shouldComponentUpdate(next_props){
    if(this.props.active_node_id !== next_props.active_node_id && this.props.nodes === next_props.nodes){
      console.log("component shouldnt update")
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps){
    drawVisualizer(this.props);
  }

  render(){
    return(
      <div id="visualizer_container">


      </div>
    )
  }

}

// export default Visualizer;

export default connect(mapStateToProps)(Visualizer);
