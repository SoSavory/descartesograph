import React, { Component } from "react";
import { connect } from "react-redux";

import { editEdge, deleteEdge } from "../actions/index";


class ListedEdge extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.edge_id,
      node_id: this.props.node_to_id,
      title: this.props.title
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.editEdge(this.state);

  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  deleteEdgeButton(edge_id){
    console.log("hello")
    this.props.deleteEdge({edge_id: edge_id});
  }


  render(){
    return(
      <div>
        <li>
          <form className="listed_edge_form" onSubmit={this.handleSubmit}>
            <select name="node_id" value={this.state.node_id} onChange={this.handleChange}>
              {

                this.props.abstracted_nodes.map( (node, i) => (
                  <option key={i} value={Object.keys(node)[0]}>{Object.values(node)[0]}</option>
                ))

              }
            </select>
            <input type="text" name="title" value={this.state.title} placeholder={this.state.title} onChange={this.handleChange}/>
            <div className="save_delete_container">
              <input type="submit" value="Save" />
              <button onClick={() => this.deleteEdgeButton(this.state.id)}>Delete</button>
            </div>
          </form>
        </li>
      </div>
    );
  }

}

// const mapStateToProps = (state, ownProps) => {
//   return { nodes: state.nodes.map(n => {let o = {}; o[n.id] = n.data.title; return o;}) };
// }

const mapDispatchToProps = (dispatch) => {
  return {
    editEdge: edge => dispatch(editEdge(edge)),
    deleteEdge: edge => dispatch(deleteEdge(edge))
  };
}

export default connect(null, mapDispatchToProps)(ListedEdge);
