import React, { Component, createRef } from "react";
import RecommendationForm from "./RecommendationsForm";
import RecommendationsResults from "./RecommendationsResults"; // Import your Recommendations Results component
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import BreadCrumb from "./BreadCrumb";

class Search extends Component {
  constructor(props) {
    super(props);
    const token = Cookies.get('jwt');
    this.state = {
      isAuthenticated: token,
      recommendations: null, // Add state to track recommendations
    };
  }

  // Function to update the state with recommendations
  handleRecommendationsFetch = (recommendations) => {
    this.setState({ recommendations });
  };

  render() {
    if (!this.state.isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }

    if (this.state.recommendations) {
      // If recommendations are available, render the recommendations results page
      return <RecommendationsResults data={this.state.recommendations} />;
    }

    return (
      <>
        <BreadCrumb />
        <RecommendationForm onRecommendationsFetch={this.handleRecommendationsFetch} />
      </>
    );
  }
}

export default Search;
