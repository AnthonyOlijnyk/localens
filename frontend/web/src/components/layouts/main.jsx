import React, { Component } from "react";

import HomePage from "../pages/home/HomePage";

//default layout
class MainLayout extends Component {

  //Inherited Parent options.
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <>
              <HomePage/>
        </>
    );
  }
}

export default MainLayout;
