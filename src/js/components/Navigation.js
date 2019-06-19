import React, { Component }  from "react";
import { connect } from "react-redux";

import { addNode, editTitle } from "../actions/index";
import { quickSaveGraph, setActiveGraph } from "../helpers/localStorageManager";

function mapDispatchToProps(dispatch){
  return {
    addNode: node => dispatch(addNode(node)),
    editTitle: title => dispatch(editTitle(title))
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    graph_id: state.graph_id,
    graph_title: state.graph_title
  }
}


class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      graph_id: this.props.graph_id,
      graph_title: this.props.graph_title
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({graph_title: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.editTitle(this.state.graph_title);
    this.saveGraph();
  }

  saveGraph(){
    quickSaveGraph(window.store.getState());
    setActiveGraph(window.store.getState().graph_id);
  }

  addByButton(){
    this.props.addNode(null);
  }

  render(){
    return(
      <div id="toolbar">

          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.graph_title} onChange={this.handleChange}/>
            <input type="submit" value="Save Changes" title="Story will be saved on this computer in this browser. Clearing your browser cache will delete this story." />
          </form>

        <button onClick={() => this.addByButton()}>
          Add Node
        </button>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
