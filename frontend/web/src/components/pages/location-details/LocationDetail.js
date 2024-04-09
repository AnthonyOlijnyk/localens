import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "../../../components/pages/signin/SignIn.css";

import "react-datepicker/dist/react-datepicker.css";

const LocationDetail = () => {
    const [locationDetails, setLocationDetails] = useState(null);
    const [locationReviews, setLocationReviews] = useState([]);
    const [restaurantRecommendations, setRestaurantRecommendations] = useState([]);
    const [hotelRecommendations, setHotelRecommendations] = useState([]);
    const [activityRecommendations, setActivityRecommendations] = useState([]);
    const [generalError, setGeneralError] = useState('');
    const params = useParams();
    const token = Cookies.get('jwt');

    useEffect(() => {
        if (!token) {
            console.error('Authentication token not found');
            setGeneralError('Authentication token not found. Please login again.');
            return;
        }

        const fetchLocationDetails = (locationId) => {
            console.log(`Fetching details for location ID: ${locationId}`); // For debugging
            fetch( process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/location-details/${locationId}/` : `https://localens.onrender.com/api/location-details/${locationId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Location details:', data); // For debugging
                setLocationDetails(data);
            })
            .catch(error => {
                console.error('Fetching location details failed:', error);
                setGeneralError(error.message);
            });
        };

        fetchLocationDetails(params.id);

        const fetchLocationReviews = (locationId) => {
            console.log(`Fetching reviews for location ID: ${locationId}`); // For debugging
            fetch(process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/review/${locationId}/` : `https://localens.onrender.com/api/review/${locationId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(reviews => {
                console.log('Location reviews:', reviews); // For debugging
                setLocationReviews(reviews);
            })
            .catch(error => {
                console.error('Fetching location reviews failed:', error);
                setGeneralError(error.message);
            });
        };

        fetchLocationReviews(params.id);
        
        const fetchRecommendationsFromPastData = () => {
            console.log('Fetching recommendations based on past data'); // For debugging
            fetch(process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/get-recommendations-from-past-data' : 'https://localens.onrender.com/api/get-recommendations-from-past-data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Recommendations:', data); // For debugging
                setRestaurantRecommendations(data.Restaurant || []);
                setHotelRecommendations(data.Hotel || []);
                setActivityRecommendations(data.Activity || []);
            })
            .catch(error => {
                console.error('Fetching recommendations failed:', error);
                setGeneralError(error.message);
            });
        };

        fetchRecommendationsFromPastData();

        const scrollTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
        scrollTop();
    }, [params.id, token]);

    if (!locationDetails) {
        return <div>Loading...</div>; // Display loading or a spinner until data is loaded
    }

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<i key={i} className="bx bxs-star" />);
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push(<i key={i} className="bx bxs-star-half" />); // For half-star
            } else {
                stars.push(<i key={i} className="bx bx-star" />);
            }
        }
        return stars;
    };

    const renderReviews = () => {
        if (locationReviews && locationReviews.length > 0) {
            return locationReviews.map((review, index) => (
                <React.Fragment key={review.id}>
                    <li className="p-review-card">
                        <div className="p-review-texts">
                            <p>{review.text}</p>
                        </div>
                    </li>
                    {index < locationReviews.length - 1 && <hr />} {/* Add a horizontal line except after the last item */}
                </React.Fragment>
            ));
        }
        return <div>No reviews found.</div>;
    };

    const getTitleBasedOnType = (type) => {
        switch (type) {
            case 'Restaurant':
                return 'Popular Restaurants';
            case 'Hotel':
                return 'Popular Hotels';
            case 'Activity':
                return 'Popular Activities';
            default:
                return 'Popular Locations'; // Default case if type is not one of the above
        }
    };

    const renderRecommendationsByType = () => {
        let recommendationsToDisplay = [];
        switch (locationDetails.type) {
            case 'Restaurant':
                recommendationsToDisplay = restaurantRecommendations;
                break;
            case 'Hotel':
                recommendationsToDisplay = hotelRecommendations;
                break;
            case 'Activity':
                recommendationsToDisplay = activityRecommendations;
                break;
            default:
                return <div>No recommendations available.</div>;
        }

        return recommendationsToDisplay.map(recommendation => (
            <li key={recommendation.id} className="package-card-sm">
                <div className="p-sm-img">
                    <img src={`/Images/${recommendation.id}.jpg`} alt={recommendation.name} />
                </div>
                <div className="package-info">
                    <div className="package-date-sm">
                        <strong><i className="bx bxs-star" />{recommendation.average_rating}</strong>
                    </div>
                    <h3><i className="" />
                        <Link to={`${process.env.PUBLIC_URL}/location-details/${recommendation.id}`}>{recommendation.name}</Link>
                    </h3>
                    <h5><span>${recommendation.average_cost}</span> Average Cost</h5>
                </div>
            </li>
        ));
    };


    return (
        <>
            {/* ===============  breadcrumb area start =============== */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>Details</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/homepage`}>Home</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>{locationDetails.name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  breadcrumb area end =============== */}
            <div className="package-details-wrapper pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="package-details">
                                <div className="package-thumb">
                                    <img src={`/ImageDetails/${locationDetails.id}.jpg`} alt={locationDetails.name} />
                                </div>
                                <div className="package-header">
                                    <div className="package-title">
                                        <h3>{locationDetails.name}</h3>
                                        <strong><i className="flaticon-arrival" />
                                             {/* Link to Google Maps with dynamic latitude and longitude */}
                                            <a href={`https://www.google.com/maps?q=${locationDetails.latitude},${locationDetails.longitude}`} target="_blank" rel="noopener noreferrer">
                                                Directions
                                            </a>
                                        </strong>
                                    </div>
                                    <div className="pd-review">
                                        <h5>Average Rating</h5>
                                        <div className="package-rating">
                                            <strong><span>{locationDetails.average_rating} </span></strong>
                                            <i className="bx bxs-star" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-short-info">
                                    <div className="single-info">
                                        <i className="flaticon-magnifier" />
                                        <div className="info-texts">
                                            <strong>Location Type</strong>
                                            <p>{locationDetails.type}</p>
                                        </div>
                                    </div>
                                    <div className="single-info">
                                        <i className="flaticon-clock" />
                                        <div className="info-texts">
                                            <strong>Hours</strong>
                                            <p>{locationDetails.start_time} - {locationDetails.end_time}</p>
                                        </div>
                                    </div>
                                    <div className="single-info">
                                        <i className="flaticon-user" />
                                        <div className="info-texts">
                                            <strong>Capacity</strong>
                                            <p>{locationDetails.capacity}</p>
                                        </div>
                                    </div>
                                    <div className="single-info">
                                        <i className="flaticon-group" />
                                        <div className="info-texts">
                                            <strong>Family Friendly</strong>
                                            <p>{locationDetails.is_family_friendly ? "Yes" : "No"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="package-tab">
                                    <div className="tab-content p-tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="tab-content-1">
                                                        <div className="p-overview">
                                                            <h5>About</h5>
                                                            <p>{locationDetails.about}</p>
                                                        </div>
                                                        <div className="p-highlight">
                                                            <h5>More Information</h5>
                                                        </div>
                                                        <div className="p-details-table">
                                                            <table className="table caption-top">
                                                                <tbody>
                                                                <tr>
                                                                    <td>Location Name</td>
                                                                    <td>{locationDetails.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Location Type</td>
                                                                    <td>{locationDetails.type}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Operating Hours</td>
                                                                    <td>{locationDetails.start_time} - {locationDetails.end_time}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Latitude</td>
                                                                    <td>{locationDetails.latitude}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Longitude</td>
                                                                    <td>{locationDetails.longitude}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Family Friendly</td>
                                                                    <td>{locationDetails.is_family_friendly ? "Yes" : "No"}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Capacity</td>
                                                                    <td>{locationDetails.capacity}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={2} className="table-bottom"><i className="flaticon-public-transport" />
                                                                        <a href={`https://www.google.com/maps?q=${locationDetails.latitude},${locationDetails.longitude}`} target="_blank" rel="noopener noreferrer">
                                                                            Get Directions
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="p-rationg">
                                                            <h5>Overall Ratings</h5>
                                                            <div className="rating-card">
                                                                <div className="r-card-avarag">
                                                                    <h5>Location</h5>
                                                                    <h5>Ratings</h5>
                                                                </div>
                                                                <div className="r-card-info">
                                                                    <ul>
                                                                        <li>
                                                                            <strong>Average Rating</strong>
                                                                            <ul className="r-rating">
                                                                                {renderStars(locationDetails.average_rating)}
                                                                            </ul>
                                                                        </li>
                                                                        <li>
                                                                            <strong>Accessibility</strong>
                                                                            <ul className="r-rating">
                                                                                {renderStars(locationDetails.accessibility_rating)}
                                                                            </ul>
                                                                        </li>
                                                                        <li>
                                                                            <strong>Average Cost</strong>
                                                                            <ul className="r-rating">
                                                                                ${locationDetails.average_cost}
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-rationg">
                                                            <h5>Reviews</h5>
                                                            <ul>
                                                                {renderReviews()}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="package-d-sidebar">
                                <div className="row">
                                    <div className="col-lg-12 col-md-6">
                                        <div className="p-sidebar-form">
                                            <h5 className="package-d-head">More Recommendations</h5>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <Link to={`${process.env.PUBLIC_URL}/search`}>
                                                        <input 
                                                            className="continue-button"
                                                            type="button"
                                                            defaultValue="Search" 
                                                            style={{ color: 'white' }}
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6">
                                        <div className="p-sidebar-cards mt-40">
                                            <h5 className="package-d-head">{getTitleBasedOnType(locationDetails.type)}</h5>
                                            <ul className="package-cards">
                                                {renderRecommendationsByType()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }

export default LocationDetail;
