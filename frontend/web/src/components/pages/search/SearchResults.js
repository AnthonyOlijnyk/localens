import React from "react";
import { useLocation, Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import destinations4Img from "../../../assets/images/destination/d-4.png";

const SearchResults = () => {
    const location = useLocation();
    const results = location.state?.recommendations || [];

    const destinationsOptions = {
        stagePadding: 1,
        items: 5,
        loop: true,
        margin: 20,
        smartSpeed: 1500,
        autoplay: false,
        dots: false,
        nav: true,
        navText: ["<i class='bx bx-chevron-left' ></i>", "<i class='bx bx-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: false
            },
            600: {
                items: 2,
                nav: false,
                dots: false,
            },
            1000: {
                items: 3,
                nav: true,
                loop: true
            }
        }
    };

    const searchElements = results.map(result => {
        return (
            <div className="package-card" key={result.id}>
                <div className="package-thumb">
                    <Link to={`${process.env.PUBLIC_URL}/package-details`}>
                        <img src={`/Images/${result.id}.jpg`} alt={result.name} className="img-fluid" />
                    </Link>
                </div>
                <div className="package-details">
                    <div className="package-info">
                        <h5><span>${result.average_cost}</span> Average Cost</h5>
                    </div>
                    <h3><i className="flaticon-arrival" />
                        <Link to={`${process.env.PUBLIC_URL}/package-details`}>{result.name}</Link>
                    </h3>
                    <div className="package-rating">
                        <i className="bx bxs-star" />
                        <strong><span>{result.average_rating}</span></strong>
                    </div>
                </div>
            </div>
        );
    });

    if (results.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>Search Results</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/search`}>Search</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>Search Results</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="destinations-area pt-105">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="package-slider-wrap">
                                <img src={destinations4Img} alt="" className="img-fluid" />
                                <div className="pakage-overlay">
                                    <strong>Results</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <OwlCarousel className="row owl-carousel destinations-1" {...destinationsOptions}>
                                {searchElements}
                            </OwlCarousel>
                        </div>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
