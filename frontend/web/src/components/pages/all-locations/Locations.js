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
        const apiUrl = `http://localhost:8000/api/locations-all`;

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
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            if (this._isMounted) {
                const restaurants = data.filter(location => location.type === 'Restaurant');
                const hotels = data.filter(location => location.type === 'Hotel');
                const activities = data.filter(location => location.type === 'Activity');

                this.setState({ restaurants, hotels, activities });
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

    renderCarouselItems(items) {
        return items.map(item => (
            <div className="package-card" key={item.id}>
                <div className="package-thumb">
                    <Link to={`${process.env.PUBLIC_URL}/location-details/${item.id}`}>
                        <img src={`/Images/${item.id}.jpg`} alt={item.name} className="img-fluid" />
                    </Link>
                </div>
                <div className="package-details">
                    <div className="package-info">
                        <h5><span>${item.average_cost}</span> Average Cost</h5>
                    </div>
                    <h3>
                        <i className="flaticon-arrival" />
                        <Link to={`${process.env.PUBLIC_URL}/location-details/${item.id}`}>{item.name}</Link>
                    </h3>
                    <div className="package-rating">
                        <i className="bx bxs-star" />
                        <strong><span>{item.average_rating}</span></strong>
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        const { restaurants, hotels, activities } = this.state;
        const destinationsOptions = {
            stagePadding: 1,
            items: 3,
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
                {/* =============== Top Recommendations Area Start =============== */}
                <div className="destinations-area pt-105">
                    <div className="container">
                        {/* =============== ALL Restaurants =============== */}
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                <div className="package-slider-wrap">
                                    <img src={destinations1Img} alt="" className="img-fluid" />
                                    <div className="pakage-overlay">
                                        <strong>Restaurants</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <OwlCarousel className="row owl-carousel destinations-1" {...destinationsOptions}>
                                    {this.renderCarouselItems(this.state.restaurants)}
                                </OwlCarousel>
                            </div>
                        </div>

                        {/* =============== ALL Hotels =============== */}
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                <div className="package-slider-wrap">
                                    <img src={destinations2Img} alt="" className="img-fluid" />
                                    <div className="pakage-overlay">
                                        <strong>Hotels</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <OwlCarousel className="row owl-carousel destinations-1" {...destinationsOptions}>
                                    {this.renderCarouselItems(this.state.hotels)}
                                </OwlCarousel>
                            </div>
                        </div>

                        {/* =============== ALL Activities =============== */}
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                <div className="package-slider-wrap">
                                    <img src={destinations3Img} alt="" className="img-fluid" />
                                    <div className="pakage-overlay">
                                        <strong>Activities</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <OwlCarousel className="row owl-carousel destinations-1" {...destinationsOptions}>
                                    {this.renderCarouselItems(this.state.activities)}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
                {/* =============== Top Recommendations Area End =============== */}
            </>
        );
    }
}

export default Locations;
