import React, { Component }  from "react";
import { connect } from "react-redux";

import { editNode } from "../actions/index";
import { getActiveNode } from "../selectors/index";

function mapDispatchToProps(dispatch){
  return {
    editNode: node => dispatch(editNode(node))
  };
}

class NodePortal extends Component {
  constructor(props){
    super(props);
    // Not rerendering because I am locking changes into state
    this.state = {
      prev_node_id: this.props.node_id,
      title: this.props.node_data.title,
      content: this.props.node_data.content
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.editNode({node_id: this.props.node_id, node_data: this.state})
    // this.props.editNode();
  }

  render(){
    return(
      <div className="editing_portal">

        <div className="editing_portal_header">
          <h3>
            Active Node
            <div className="tooltip">?
              <div className="tooltiptext">
                Edit the currently selected Node.
              </div>
            </div>
          </h3>
        </div>

        <div className="editing_portal_content">
          <form id="node_edit_form" onSubmit={this.handleSubmit}>

              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />

            <br/>
              <textarea name="content" placeholder="Node Content" value={this.state.content} onChange={this.handleChange} />
            <br/>
            <input type="submit" value="Save" />
          </form>
        </div>

      </div>
    )
  }

}

export default connect(null, mapDispatchToProps)(NodePortal);
