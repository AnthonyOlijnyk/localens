import React, { Component, createRef } from "react";
import BreadCrumb from "./BreadCrumb";
import AboutWrapper from "./AboutWrapper";
import GuideWrapper from "./GuideWrapper";
import Achievement from "./Achievement";

class AboutUs extends Component {
  guideWrapperRef = createRef(); // Step 1: Create a ref

  scrollToGuide = () => { // Step 2: Function to scroll to the GuideWrapper
    this.guideWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  render() {
    return (
       <>
          <BreadCrumb/>
          <AboutWrapper scrollToGuide={this.scrollToGuide}/> {/* Pass the function to AboutWrapper */}
          <Achievement/>
          {/* Attach the ref to the GuideWrapper component */}
          <div ref={this.guideWrapperRef}>
            <GuideWrapper/>
          </div>
       </>
    );
  }
}

export default AboutUs;
