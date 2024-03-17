import React, { Component } from "react";
import {Link} from "react-router-dom";
class AboutUs extends Component {
    componentDidMount(){
        this.scrollTop();
    }

    scrollTop()
    {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
  render() {
    return (
        <>
            {/* ===============  breadcrumb area start =============== */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>Contact Us</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/homepage`}>Home</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  breadcrumb area end =============== */}
            <div className="contact-wrapper pt-90">
                <div className="contact-cards">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="contact-card">
                                    <div className="contact-icon"><i className="flaticon-arrival" />
                                    </div>
                                    <div className="contact-info">
                                        <h5>Address</h5>
                                        <p>245 Church Street, Toronto, Ontario, Canada</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="contact-card">
                                    <div className="contact-icon"><i className="flaticon-customer-service" />
                                    </div>
                                    <div className="contact-info">
                                        <h5>Email &amp; Phone</h5>
                                        <p>(123) 456 7890
                                            localens@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="contact-card">
                                    <div className="contact-icon"><i className="flaticon-thumbs-up" />
                                    </div>
                                    <div className="contact-info">
                                        <h5>Social Media</h5>
                                        <ul className="contact-icons">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                                </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                                </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                                </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                                </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div classname = "container" >
                    <br></br>
                    <br></br>
                </div>
            </div>
        </>
    );
  }
}

export default AboutUs;
