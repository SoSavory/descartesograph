import React, { Component } from "react";
import { connect } from "react-redux";

import Navigation from "./Navigation";
import EditPortal from "./EditPortal";
import Visualizer from "./Visualizer";
import VisualizerOverlay from "./VisualizerOverlay";

import '../../css/StoryBoard.css';


class StoryBoard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="storyboard_container">
        <div className="left_right_container">
          <div id="left">

            <EditPortal />
          </div>
          <div id="right">
              <Navigation mode="d3" />

              <Visualizer />

          </div>
        </div>
      </div>
    );
  }

}

export default StoryBoard;
// export default connect(mapStateToProps)(StoryBoard);
