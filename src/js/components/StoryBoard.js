import React, { Component } from "react";
import { connect } from "react-redux";

import Navigation from "./Navigation";
import EditPortal from "./EditPortal";
import Visualizer from "./Visualizer";

import '../../css/StoryBoard.css';


class StoryBoard extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div id="storyboard_container">
        <div className="left_right_container">
          <div id="left">
            <EditPortal />
          </div>
          <div id="right">
            <div id="top">
              <Navigation />
            </div>
            <Visualizer />
          </div>
        </div>
      </div>
    );
  }

}

export default StoryBoard;
// export default connect(mapStateToProps)(StoryBoard);
