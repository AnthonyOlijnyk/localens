import React, { Component } from "react";
import {Link} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import Cookies from "js-cookie";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

//Import Images
import destinations1Img from "../../../assets/images/destination/d-1.png"
import destinations2Img from "../../../assets/images/destination/d-2.png"
import destinations3Img from "../../../assets/images/destination/d-3.png"

class Destinations extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
        destinations: [],
        generalError: '',
    };
  }

  //get results from api/get-recommendations-from-past-data
  componentDidMount() {
    this._isMounted = true;
    const token = Cookies.get('jwt');
    const apiUrl = `http://localhost:8000/api/get-recommendations-from-past-data`; // Replace with your API's URL

    if (!token) {
        console.error('Authentication token not found');
        // Here you can update the state to reflect the error
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
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (this._isMounted) {
            console.log('Data fetched successfully:', data); // Logging the fetched data
            this.setState({ destinations: data }); // Update the state with the fetched data
        }
    })
    .catch(error => {
        if (this._isMounted) {
            console.error('Error fetching data:', error);
            this.setState({ generalError: error.message });
        }
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const { destinations } = this.state;
    const destinationsOptions = {
        stagePadding: 1,
        items: 5,
        loop: true,
        margin:20,
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
                dost : false,
            },
            1000:{
                items:3,
                nav:true,
                loop:true
            }
        }
    };

    const restaurants = destinations.Restaurant || [];
    const hotels = destinations.Hotel || [];
    const activities = destinations.Activity || [];
    
    console.log('Restaurants: ', restaurants);
    
    if (restaurants.length === 0) {
        return <div>Loading...</div>; //loading indicator
    }

    const restaurantElements = restaurants.slice(0, 5).map(restaurant => {
        return (
            <div className="package-card" key={restaurant.id}>
                <div className="package-thumb">
                    <Link to={`${process.env.PUBLIC_URL}/location-details/${restaurant.id}`}>
                        <img src={`/Images/${restaurant.id}.jpg`} alt={restaurant.name} className="img-fluid" />
                    </Link>
                </div>
                <div className="package-details">
                    <div className="package-info">
                        <h5><span>${restaurant.average_cost}</span> Average Cost</h5>
                    </div>
                        <h3><i className="flaticon-arrival" />
                            <Link to={`${process.env.PUBLIC_URL}/location-details/${restaurant.id}`}>{restaurant.name}</Link>
                        </h3>
                    <div className="package-rating">
                        <i className="bx bxs-star" />
                        <strong><span>{`${restaurant.average_rating}` }</span></strong>
                    </div>
                </div>
            </div>
        );
    });
    
    console.log('Hotels: ', hotels);

    if (hotels.length === 0) {
        return <div>Loading...</div>; //loading indicator
    }

    const hotelElements = hotels.slice(0, 5).map(hotel => {
        return (
            <div className="package-card" key={hotel.id}>
                <div className="package-thumb">
                    <Link to={`${process.env.PUBLIC_URL}/location-details/${hotel.id}`}>
                        <img src={`/Images/${hotel.id}.jpg`} alt={hotel.name} className="img-fluid" />
                    </Link>
                </div>
                <div className="package-details">
                    <div className="package-info">
                        <h5><span>${hotel.average_cost}</span> Average Cost</h5>
                    </div>
                        <h3><i className="flaticon-arrival" />
                            <Link to={`${process.env.PUBLIC_URL}/location-details/${hotel.id}`}>{hotel.name}</Link>
                        </h3>
                    <div className="package-rating">
                        <i className="bx bxs-star" />
                        <strong><span>{`${hotel.average_rating}` }</span></strong>
                    </div>
                </div>
            </div>
        );
    });

    console.log('Activities: ', activities);

    if (activities.length === 0) {
        return <div>Loading...</div>; //loading indicator
    }

    const activityElements = activities.slice(0, 5).map(activity => {
        return (
            <div className="package-card" key={activity.id}>
                <div className="package-thumb">
                    <Link to={`${process.env.PUBLIC_URL}/location-details/${activity.id}`}>
                        <img src={`/Images/${activity.id}.jpg`} alt={activity.name} className="img-fluid" />
                    </Link>
                </div>
                <div className="package-details">
                    <div className="package-info">
                        <h5><span>${activity.average_cost}</span> Average Cost</h5>
                    </div>
                        <h3><i className="flaticon-arrival" />
                            <Link to={`${process.env.PUBLIC_URL}/location-details/${activity.id}`}>{activity.name}</Link>
                        </h3>
                    <div className="package-rating">
                        <i className="bx bxs-star" />
                        <strong><span>{`${activity.average_rating}` }</span></strong>
                    </div>
                </div>
            </div>
        );
    });

    return (
       <>
           {/* =============== top recommendations area start =============== */}
           <div className="destinations-area pt-105">
               <div className="container">

                   <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12">
                           <div className="section-head pb-40">
                               <h5>Top Recommendations Near You</h5>
                               <h2>Visit The Best Rated Places In Toronto!</h2>
                           </div>
                       </div>
                   </div>
                    {/* =============== TOP 5 RESTAURANTS =============== */}
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
                           <OwlCarousel className="row owl-carousel destinations-1"  {...destinationsOptions}>
                                {restaurantElements}
                           </OwlCarousel>
                       </div>
                   </div>

                   {/* =============== TOP 5 HOTELS =============== */}
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
                           <OwlCarousel className="row owl-carousel destinations-1"  {...destinationsOptions}>
                                {hotelElements}
                           </OwlCarousel>
                       </div>
                   </div>

                    {/* =============== TOP 5 ACTIVITIES =============== */}
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
                           <OwlCarousel className="row owl-carousel destinations-1"  {...destinationsOptions}>
                                {activityElements}
                           </OwlCarousel>
                       </div>
                   </div>
                    <br></br>
               </div>
           </div>
           {/* =============== top recommendations area end =============== */}
       </>
    );
  }
}

export default Destinations;
