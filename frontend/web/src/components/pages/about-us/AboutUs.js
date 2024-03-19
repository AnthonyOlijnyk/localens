import React, { Component, createRef } from "react";
import BreadCrumb from "./BreadCrumb";
import AboutWrapper from "./AboutWrapper";
import GuideWrapper from "./GuideWrapper";
import Achievement from "./Achievement";
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';

class AboutUs extends Component {
  guideWrapperRef = createRef(); // Step 1: Create a ref
  constructor(props) {
    super(props);
    const token = Cookies.get('jwt');
    console.log(`Current JWT token: ${token ? 'Present' : 'Absent'}`);
    this.state = {
      // isAuthenticated is true if a token is present, false otherwise
      isAuthenticated: token,
    };
  }

  scrollToGuide = () => { // Step 2: Function to scroll to the GuideWrapper
    this.guideWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  render() {
    if (!this.state.isAuthenticated) {
      // Log redirection for debugging purposes
      console.log('Not authenticated, redirecting to sign-in...');
      return <Navigate to="/signin" replace />;
    }
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
