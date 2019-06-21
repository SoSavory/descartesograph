import React, { Component }  from "react";
import NodeSymbol from "./NodeSymbol";

import { connect } from "react-redux";

import drawVisualizer from '../helpers/drawVisualizer';
import generatePDF from '../helpers/generatePDF';

import '../../css/Visualizer.css';

const mapStateToProps = (state, ownProps) => {
  return {
    active_node_id: state.active_node_id,
    nodes: state.nodes,
    mode: state.visualizer_mode,
    graph_title: state.graph_title
 };
}

// renders either the d3 graph or pdf based on props

class Visualizer extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: this.props.mode
    };
  }

  componentDidMount(){
    // drawVisualizer(this.props);
    if(this.props.mode === "d3"){
      drawVisualizer(this.props);
    } else if(this.props.mode === "pdf"){
      generatePDF(this.props);
    }

  }

  shouldComponentUpdate(next_props){
    if(this.props.mode === "d3"){
      if(this.props.active_node_id !== next_props.active_node_id && this.props.nodes === next_props.nodes){
        return false;
      }
    }

    return true;
  }

  componentDidUpdate(prevProps){
    if(this.props.mode === "d3"){
      drawVisualizer(this.props);
    } else if (this.props.mode === "pdf"){
      generatePDF(this.props);
    }
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
