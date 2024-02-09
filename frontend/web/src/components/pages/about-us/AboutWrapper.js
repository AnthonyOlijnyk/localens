import React, { Component } from "react";
import ModalVideo from 'react-modal-video'

import about1Img from "../../../assets/images/about-1.png"
import about2Img from "../../../assets/images/about-2.png"
import {Link} from "react-router-dom";

class AboutWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

  render() {
      const {isOpen } = this.state;
    return (
       <>
           {/* ===============  About wrapper area start =============== */}
           <div className="about-wrapper mt-120">
               <div className="container">
                   <div className="row">
                       <div className="col-lg-7 col-md-12">
                           <div className="about-wrapper-left">
                               <div className="about-img">
                                   <img src={about1Img} alt="" className="img-fluid" />
                               </div>
                               <div className="about-video">
                                   <img src={about2Img} alt="" className="img-fluid"  />
                                   <i onClick={() => this.setState({ isOpen: true })} class="flaticon-play-button-arrowhead"></i>
                               </div>
                           </div>
                       </div>
                       <div className="col-lg-5 col-md-12">
                           <div className="about-wrapper-right section-head head-left">
                               <h5>About LocaLens</h5>
                               <h2>Your Ultimate Travel Companion.</h2>
                               <p>LocaLens simplifies your adventures by putting every travel necessity within reach. 
                                With LocaLens, you can effortlessly discover hidden gems and create unforgettable memories. 
                                It's like having a personal tour guide, travel agent, and local expert, all wrapped into one intuitive platform. 
                                LocaLens is your passport to a world of seamless exploration and personalized travel experiences. </p>
                               <div className="about-wrapper-btn">
                                   <Link to={"#"} className="btn-common">Read More</Link>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           <React.Fragment>
               <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="-tJYN-eG1zk" onClose={() => this.setState({ isOpen: false })} />
           </React.Fragment>

           {/* ===============  About wrapper area end =============== */}
       </>
    );
  }
}

export default AboutWrapper;
