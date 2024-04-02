import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainBanner from "./MainBanner";
import Packages from "./Packages";
import Destinations from "./Destinations";

class HomePage extends Component {
  constructor(props) {
    super(props);
    // Directly check for the presence of a JWT token and initialize state
    const token = Cookies.get('jwt');
    console.log(`Current JWT token: ${token ? 'Present' : 'Absent'}`);
    this.state = {
      // isAuthenticated is true if a token is present, false otherwise
      isAuthenticated: token,
    };
  }

  // componentDidMount remains useful if you plan to add token validation or 
  // session extension features in the future. For now, it's not strictly needed 
  // since you're setting isAuthenticated based on the token's presence at initialization.

  render() {
    if (!this.state.isAuthenticated) {
      // Log redirection for debugging purposes
      console.log('Not authenticated, redirecting to sign-in...');
      return <Navigate to="/signin" replace />;
    }
    return (
       <div>

           {/* Start Preloader Area */}
           <div className="preloader">
               <div className="loader loader1">
                   <span style={{'--i': 1}} />
                   <span style={{'--i': 2}}/>
                   <span  style={{'--i': 3}}/>
                   <span  style={{'--i': 4}}/>
                   <span  style={{'--i': 5}}/>
                   <span  style={{'--i': 6}}/>
                   <span  style={{'--i': 7}} />
                   <span  style={{'--i': 8}}/>
                   <span  style={{'--i': 9}}/>
                   <span  style={{'--i': 10}}/>
                   <span  style={{'--i': 11}}/>
                   <span  style={{'--i': 12}}/>
                   <span  style={{'--i': 13}}/>
                   <span  style={{'--i': 14}}/>
                   <span  style={{'--i': 15}}/>
                   <span  style={{'--i': 16}}/>
                   <span  style={{'--i': 17}}/>
                   <span  style={{'--i': 18}}/>
                   <span  style={{'--i': 19}}/>
                   <span  style={{'--i': 20}}/>
                   <div className="rocket" />
               </div>
           </div>
           {/* End Preloader Area */}

           {/*---------Start Imported All Sections-----------*/}
            <MainBanner/>
            <Packages/>
            <Destinations/>
           {/*---------End Imported All Sections-----------*/}
       </div>
    );
  }
}

export default HomePage;
