import React, { Component } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import Cookies from "js-cookie";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import destinations1Img from "../../../assets/images/destination/d-1.png";
import destinations2Img from "../../../assets/images/destination/d-2.png";
import destinations3Img from "../../../assets/images/destination/d-3.png";

class Locations extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            hotels: [],
            activities: [],
            generalError: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const token = Cookies.get('jwt');
        const apiUrl = 'http://localhost:8000/api/locations-all';

        if (!token) {
            console.error('Authentication token not found');
            this.setState({ generalError: 'Authentication token not found. Please login again.' });
            return;
        }

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (this._isMounted) {
                this.setState({ 
                    restaurants: data.filter(location => location.type === 'Restaurant'),
                    hotels: data.filter(location => location.type === 'Hotel'),
                    activities: data.filter(location => location.type === 'Activity')
                });
            }
        })
        .catch(error => {
            if (this._isMounted) {
                console.error('Error fetching data:', error);
                this.setState({ generalError: error.toString() });
            }
        });
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    renderCarouselItems(items, image) {
        return items.map(item => (
            <div className="package-card" key={item.id}>
                <div className="package-thumb">
                    <Link to={`/location-details/${item.id}`}>
                        <img src={`/Images/${item.id}.jpg`} alt={item.name} className="img-fluid" />
                    </Link>
                </div>
                <div className="package-details">
                    <div className="package-info">
                        <h5><span>${item.average_cost}</span> Average Cost</h5>
                    </div>
                    <h3>
                        <i className="flaticon-arrival"></i>
                        <Link to={`/location-details/${item.id}`}>{item.name}</Link>
                    </h3>
                    <div className="package-rating">
                        <i className="bx bxs-star"></i>
                        <strong><span>{item.average_rating}</span></strong>
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        const { restaurants, hotels, activities, generalError } = this.state;
        const destinationsOptions = {
            stagePadding: 1,
            items: 3,
            loop: true,
            margin: 20,
            smartSpeed: 1500,
            autoplay: false,
            dots: false,
            nav: true,
            navContainerClass: 'owl-nav custom-owl-nav', // Custom class for the nav container
            navText: ["<div class='custom-nav-btn custom-nav-prev'><i class='bx bx-chevron-left'></i></div>",
                "<div class='custom-nav-btn custom-nav-next'><i class='bx bx-chevron-right'></i></div>"],
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: true
                }
            }
        };

        return (
            <>
                {generalError && <div className="error">{generalError}</div>}
                <div className="destinations-area pt-105">
                    <div className="container">
                        {/* All Restaurants */}
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                <div className="package-slider-wrap">
                                    <img src={destinations1Img} alt="All Restaurants" className="img-fluid" />
                                    <div className="pakage-overlay">
                                        <strong>All Restaurants</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <OwlCarousel key={restaurants.length} className="owl-carousel destinations-1" {...destinationsOptions}>
                                    {this.renderCarouselItems(restaurants, destinations1Img)}
                                </OwlCarousel>
                            </div>
                        </div>

                        {/* All Hotels */}
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                <div className="package-slider-wrap">
                                    <img src={destinations2Img} alt="All Hotels" className="img-fluid" />
                                    <div className="pakage-overlay">
                                        <strong>All Hotels</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <OwlCarousel key={hotels.length} className="owl-carousel destinations-1" {...destinationsOptions}>
                                    {this.renderCarouselItems(hotels, destinations2Img)}
                                </OwlCarousel>
                            </div>
                        </div>

                        {/* All Activities */}
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                <div className="package-slider-wrap">
                                    <img src={destinations3Img} alt="All Activities" className="img-fluid" />
                                    <div className="pakage-overlay">
                                        <strong>All Activities</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <OwlCarousel key={activities.length} className="owl-carousel destinations-1" {...destinationsOptions}>
                                    {this.renderCarouselItems(activities, destinations3Img)}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Locations;
