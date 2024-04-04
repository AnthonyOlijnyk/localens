import React, { Component, createRef } from "react";
import RecommendationForm from "./RecommendationsForm";
import SearchResults from "./SearchResults"; // Import your Recommendations Results component
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import BreadCrumb from "./BreadCrumb";

class Search extends Component {
  constructor(props) {
    super(props);
    // Directly check for the presence of a JWT token and initialize state
    const token = Cookies.get('jwt');
    console.log(`Current JWT token: ${token ? 'Present' : 'Absent'}`);
    this.state = {
      recommendations: null, // Initialize recommendations state
      // isAuthenticated is true if a token is present, false otherwise
      isAuthenticated: token,
    };
  }

  // Function to update the state with recommendations
  handleRecommendationsFetch = (recommendations) => {
    this.setState({ recommendations });
  };

  render() {
    const {recommendations } = this.state;

    if (!this.state.isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }

    return (
      <>
        <BreadCrumb />
        {recommendations ?
          <SearchResults data={recommendations} /> :
          <RecommendationForm onRecommendationsFetch={this.handleRecommendationsFetch} />
        }
      </>
    );
  }
}

export default Search;
