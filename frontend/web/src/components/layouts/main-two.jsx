import React, { Component } from "react";

import HomePage from "../pages/home/HomePage";
import Headers from "../common/headers";
import Footers from "../common/footers";

//Second layout
class MainTwoLayout extends Component {

  //Inherited Parent options.
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <>
          <Headers/>
              <HomePage/>
          <Footers/>
        </>
    );
  }
}

export default MainTwoLayout;
