import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import guide1Img from "../../../assets/images/guide/guide-1.png"
import guide2Img from "../../../assets/images/guide/guide-2.png"
import guide3Img from "../../../assets/images/guide/guide-3.png"
import guide4Img from "../../../assets/images/guide/guide-4.png"

class GuideWrapper extends Component {
  render() {
      const guideWrapper = {
          items: 3,
          loop: true,
          margin:25,
          smartSpeed: 1500,
          autoplay: false,
          dots: false,
          nav: true,
          navText : ["<i class='bx bx-chevron-left' ></i>","<i class='bx bx-chevron-right'></i>"],
          responsive:{
              0:{
                  items:1,
                  nav:false,
                  dots : false
              },
              600:{
                  items:2,
                  nav:false,
                  dots : false,
              },
              1000:{
                  items:3,
                  dots: false,
                  nav: true,
                  loop:true
              }
          }
      };
    return (
       <>
           {/* ===============  Guide wrapper start =============== */}
           <div className="guide-wrapper mt-120">
               <div className="container">
                   <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12">
                           <div className="section-head head-left pb-40">
                               <h5>Meet the Team</h5>
                               <h2>The People Behind LocaLens:</h2>
                           </div>
                       </div>
                   </div>

                   <OwlCarousel className="guide-slider owl-carousel"  {...guideWrapper}>
                       <div className="guide-card">
                           <div className="guide-thumb">
                               <img src={guide1Img} alt="" className="img-fluid" />
                               <div className="guide-info">
                                   <strong>Anthony Olijnyk</strong>
                                   <p>Developer</p>
                                   <ul className="guide-links">
                                       <li>
                                            <a href="https://www.linkedin.com/in/anthonyolijnyk/" target="_blank" rel="noopener noreferrer">
                                                <i className="bx bxl-linkedin" />
                                            </a>
                                       </li>
                                       <li>
                                            <a href="mailto:anthony.olijnyk@torontomu.ca">
                                                <i className="bx bx-mail-send" />
                                            </a>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                       <div className="guide-card">
                           <div className="guide-thumb">
                               <img src={guide2Img} alt="" className="img-fluid" />
                               <div className="guide-info">
                                   <strong>Jaspreet Sahota</strong>
                                   <p>Developer</p>
                                   <ul className="guide-links">
                                       <li>
                                            <a href="https://www.linkedin.com/in/jaspreet-sahota-comp/" target="_blank" rel="noopener noreferrer">
                                                <i className="bx bxl-linkedin" />
                                            </a>
                                       </li>
                                       <li>
                                            <a href="mailto:jaspreet.sahota@torontomu.ca">
                                                <i className="bx bx-mail-send" />
                                            </a>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                       <div className="guide-card">
                           <div className="guide-thumb">
                               <img src={guide3Img} alt="" className="img-fluid" />
                               <div className="guide-info">
                                   <strong>Naureen Kaur</strong>
                                   <p>Developer</p>
                                   <ul className="guide-links">
                                       <li>
                                            <a href="https://www.linkedin.com/in/naureenkaur/" target="_blank" rel="noopener noreferrer">
                                                <i className="bx bxl-linkedin" />
                                            </a>
                                       </li>
                                       <li>
                                            <a href="mailto:naureen.kaur@torontomu.ca">
                                                <i className="bx bx-mail-send" />
                                            </a>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                       <div className="guide-card">
                           <div className="guide-thumb">
                               <img src={guide4Img} alt="" className="img-fluid" />
                               <div className="guide-info">
                                   <strong>Izza Sajotra</strong>
                                   <p>Developer</p>
                                   <ul className="guide-links">
                                       <li>
                                            <a href="https://www.linkedin.com/in/izzasajotra/" target="_blank" rel="noopener noreferrer">
                                                <i className="bx bxl-linkedin" />
                                            </a>
                                       </li>
                                       <li>
                                            <a href="mailto:izza.sajotra@torontomu.ca">
                                                <i className="bx bx-mail-send" />
                                            </a>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                   </OwlCarousel>
                   <br></br>
                   <br></br>
               </div>
           </div>
           {/* ===============  Guide wrapper end =============== */}
       </>
    );
  }
}

export default GuideWrapper;
