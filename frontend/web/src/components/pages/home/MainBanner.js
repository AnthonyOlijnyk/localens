import React, { Component } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import {Link} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

class MainBanner extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

    changeDatepickerHandeller=(date)=>{
        this.setState({ startDate: date });
    }

  render() {
      return (
        <>
            {/* ===============  main banner area 2 start =============== */}
            <div className="main-banner-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-banner-content-2">
                                <h2>Places to Visit in<br />
                                    <span className="element">Toronto</span> </h2>
                            </div>
                        </div>
                    </div>
                    <div className="find-form-2">
                        <form className="findfrom-wrapper">
                            <div className="row centre">
                                <div className="find-btn">
                                    <Link to={`${process.env.PUBLIC_URL}/search`} className="btn-second"><i className="bx bx-search-alt" /> FIND CUSTOMIZED RECOMMENDATIONS!</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* ===============  main banner area 2 end =============== */}
        </>
    );
  }
}

export default MainBanner;
