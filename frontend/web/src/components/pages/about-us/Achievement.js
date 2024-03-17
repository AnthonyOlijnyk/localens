import React, { Component } from "react";

class Achievement extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
       <>
           {/* =============== achievement area start =============== */}
           <div className="achievement-area p-80 mt-120">
               <div className="container">
                   <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12">
                           <div className="section-head pb-30">
                               <h2>Why you should travel with LocaLens</h2>
                           </div>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-lg-3 col-md-6 col-sm-6 wow fadeInLeft animated" data-wow-duration="1500ms" data-wow-delay="0ms">
                           <div className="achievement-card mt-30">
                               <div className="achievement-icon">
                                   <i className="flaticon-guide" />
                               </div>
                               <h5>Designed to Align with Your Unique Interests</h5>
                           </div>
                       </div>
                       <div className="col-lg-3 col-md-6 col-sm-6 wow fadeInLeft animated" data-wow-duration="1500ms" data-wow-delay="200ms">
                           <div className="achievement-card mt-30">
                               <div className="achievement-icon">
                                   <i className="flaticon-trust" />
                               </div>
                               <h5>Receive Personalized Recommendations</h5>
                           </div>
                       </div>
                       <div className="col-lg-3 col-md-6 col-sm-6 wow fadeInLeft animated" data-wow-duration="1500ms" data-wow-delay="400ms">
                           <div className="achievement-card mt-30">
                               <div className="achievement-icon">
                                   <i className="flaticon-experience" />
                               </div>
                               <h5>The Perfect Companion for Your Journey</h5>
                           </div>
                       </div>
                       <div className="col-lg-3 col-md-6 col-sm-6 wow fadeInLeft animated" data-wow-duration="1500ms" data-wow-delay="600ms">
                           <div className="achievement-card mt-30">
                               <div className="achievement-icon">
                                   <i className="flaticon-traveller" />
                               </div>
                               <h5>Enhance Every Moment of Your Visit</h5>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           {/* =============== achievement area end =============== */}
       </>
    );
  }
}

export default Achievement;
