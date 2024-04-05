import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import pd_thumb from "../../../assets/images/package/pd-thumb.png"
import pr_1 from "../../../assets/images/package/pr-1.png"

import gallery1Img from "../../../assets/images/gallary/gl-1.png"
import gallery2Img from "../../../assets/images/gallary/gl-2.png"
import gallery4Img from "../../../assets/images/gallary/gl-4.png"
import gallery5Img from "../../../assets/images/gallary/gl-5.png"
import gallery6Img from "../../../assets/images/gallary/gl-6.png"

import galleryGxx1Img from "../../../assets/images/gallary/g-xxl-1.png"
import galleryGxx2Img from "../../../assets/images/gallary/g-xxl-2.png"
import galleryGxx3Img from "../../../assets/images/gallary/g-xxl-3.png"

import galleryGxl1Img from "../../../assets/images/gallary/g-xl-1.png"
import galleryGxl2Img from "../../../assets/images/gallary/g-xl-2.png"
import galleryGxl3Img from "../../../assets/images/gallary/g-xl-3.png"

import pm_sm_1  from "../../../assets/images/package/p-sm-1.png";
import pm_sm_4  from "../../../assets/images/package/p-sm-4.png";
import pm_sm_2  from "../../../assets/images/package/p-sm-2.png";
import pm_sm_3  from "../../../assets/images/package/p-sm-3.png";

import { SRLWrapper } from "simple-react-lightbox";
import "react-datepicker/dist/react-datepicker.css";

const LocationDetail = () => {
    const [locationDetails, setLocationDetails] = useState(null);
    const [locationReviews, setLocationReviews] = useState(null);
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
            fetch(`http://localhost:8000/api/location-details/${locationId}/`, {
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
            fetch(`http://localhost:8000/api/review/${locationId}/`, {
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


    return (
        <>
            {/* ===============  breadcrumb area start =============== */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>Location Details</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/homepage`}>Home</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>Package Details</li>
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
                                                                <li className="p-review-card">
                                                                    <div className="p-review-texts">
                                                                        <p>Morbi dictum pulvinar velit, id mollis lorem faucibus acUt sed
                                                                            lacinia ipsum. Suspendisse massa augue lorem faucibus acUt
                                                                            sed lacinia ipsum. Suspendisse </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            <div className="tab-content-2">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="p-timeline-overview">
                                                            <h5>Overview</h5>
                                                            <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla. Duis aliquet varius mauris eget rutrum. Nullam sit amet justo consequat, bibendum orci in, convallis enim. Proin convallis neque viverra finibus cursus. Mauris lacinia lacinia erat in finibus.</p>
                                                        </div>
                                                        <ul className="p-timeline">
                                                            <li>
                                                                <div className="timeline-index">
                                                                    <div className="index-circle">
                                                                        <h5>01</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="timeline-content">
                                                                    <h5>DAY 1 : Departure And Small Tour</h5>
                                                                    <strong>10.00 AM to 10.00 PM</strong>
                                                                    <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                                                                    <ul>
                                                                        <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                                                                        <li /><li><i className="bx bx-check" />Private Transport</li>
                                                                        <li /><li><i className="bx bx-check" />Entrance Fees</li>
                                                                        <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-index">
                                                                    <div className="index-circle">
                                                                        <h5>02</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="timeline-content">
                                                                    <h5>DAY 2 : Departure And Small Tour</h5>
                                                                    <strong>10.00 AM to 10.00 PM</strong>
                                                                    <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                                                                    <ul>
                                                                        <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                                                                        <li /><li><i className="bx bx-check" />Private Transport</li>
                                                                        <li /><li><i className="bx bx-check" />Entrance Fees</li>
                                                                        <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-index">
                                                                    <div className="index-circle">
                                                                        <h5>03</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="timeline-content">
                                                                    <h5>DAY 3 : Departure And Small Tour</h5>
                                                                    <strong>10.00 AM to 10.00 PM</strong>
                                                                    <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                                                                    <ul>
                                                                        <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                                                                        <li /><li><i className="bx bx-check" />Private Transport</li>
                                                                        <li /><li><i className="bx bx-check" />Entrance Fees</li>
                                                                        <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-index">
                                                                    <div className="index-circle">
                                                                        <h5>04</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="timeline-content">
                                                                    <h5>DAY 4 : Departure And Small Tour</h5>
                                                                    <strong>10.00 AM to 10.00 PM</strong>
                                                                    <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                                                                    <ul>
                                                                        <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                                                                        <li /><li><i className="bx bx-check" />Private Transport</li>
                                                                        <li /><li><i className="bx bx-check" />Entrance Fees</li>
                                                                        <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-index">
                                                                    <div className="index-circle">
                                                                        <h5>05</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="timeline-content">
                                                                    <h5>DAY 5 : Departure And Small Tour</h5>
                                                                    <strong>10.00 AM to 10.00 PM</strong>
                                                                    <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                                                                    <ul>
                                                                        <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                                                                        <li /><li><i className="bx bx-check" />Private Transport</li>
                                                                        <li /><li><i className="bx bx-check" />Entrance Fees</li>
                                                                        <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                            <div className="tab-contant-3">
                                                <SRLWrapper>
                                                <div className="row">
                                                    <div className="col-lg-8 col-md-8">
                                                        <div className="package-grid-one">
                                                            <div className="single-grid">
                                                                <Link to={gallery1Img} className="g-img-sm-1 main-gallary">
                                                                    <img src={gallery1Img} alt="gallary-img" />
                                                                </Link>

                                                                <Link to={gallery2Img} className="g-img-sm-2 main-gallary">
                                                                    <img src={gallery2Img} alt="gallary-img" />
                                                                </Link>

                                                                <Link to={galleryGxx1Img} className="g-img-md main-gallary">
                                                                    <img src={galleryGxx1Img} alt="gallary-img" />
                                                                </Link>
                                                            </div>
                                                            <div className="single-grid mt-24">
                                                                <Link to={gallery2Img} className="g-img-sm-1 main-gallary">
                                                                    <img src={gallery2Img} alt="gallary-img" />
                                                                </Link>
                                                                <Link to={gallery4Img} className="g-img-sm-2 main-gallary">
                                                                    <img src={gallery4Img} alt="gallary-img" />
                                                                </Link>
                                                                <Link to={galleryGxx2Img} className="g-img-md main-gallary">
                                                                    <img src={galleryGxx2Img} alt="gallary-img" />
                                                                </Link>
                                                            </div>

                                                            <div className="single-grid mt-24">

                                                                <Link to={gallery5Img} className="g-img-sm-1 main-gallary">
                                                                    <img src={gallery5Img} alt="gallary-img" />
                                                                </Link>
                                                                <Link to={gallery6Img} className="g-img-sm-2 main-gallary">
                                                                    <img src={gallery6Img} alt="gallary-img" />
                                                                </Link>
                                                                <Link to={galleryGxx3Img} className="g-img-md main-gallary">
                                                                    <img src={galleryGxx3Img} alt="gallary-img" />
                                                                </Link>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="package-grid-two">
                                                            <div className="single-grid-2">
                                                                <Link to={galleryGxl1Img}  className="main-gallary">
                                                                    <img src={galleryGxl1Img} alt="gallary-img" />
                                                                </Link>
                                                            </div>
                                                            <div className="single-grid-2 mt-24">
                                                                <Link to={galleryGxl2Img}  className="single-grid-2 main-gallary mt-30">
                                                                    <img src={galleryGxl2Img} alt="gallary-img" />
                                                                </Link>
                                                            </div>
                                                            <div className="single-grid-2 mt-24">
                                                                <Link to={galleryGxl3Img}  className="main-gallary mt-30">
                                                                    <img src={galleryGxl3Img} alt="gallary-img" />
                                                                </Link>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                </SRLWrapper>
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
                                            <form>
                                                <h5 className="package-d-head">More Recommendations</h5>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <input type="submit" defaultValue="Search" />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6">
                                        <div className="p-sidebar-cards mt-40">
                                            <h5 className="package-d-head">Popular Packages</h5>
                                            <ul className="package-cards">
                                                <li className="package-card-sm">
                                                    <div className="p-sm-img">
                                                        <img src={pm_sm_1} alt="" />
                                                    </div>
                                                    <div className="package-info">
                                                        <div className="package-date-sm">
                                                            <strong><i className="flaticon-calendar" />5 Days/6 night</strong>
                                                        </div>
                                                        <h3><i className="flaticon-arrival" />
                                                            <Link to={`${process.env.PUBLIC_URL}/package-details`}>Lake Garda</Link>
                                                        </h3>
                                                        <h5><span>$180</span>/ Per Person</h5>
                                                    </div>
                                                </li>
                                                <li className="package-card-sm">
                                                    <div className="p-sm-img">
                                                        <img src={pm_sm_4} alt="" />
                                                    </div>
                                                    <div className="package-info">
                                                        <div className="package-date-sm">
                                                            <strong><i className="flaticon-calendar" />5 Days/6 night</strong>
                                                        </div>
                                                        <h3><i className="flaticon-arrival" />
                                                            <Link to={`${process.env.PUBLIC_URL}/package-details`}>Paris Hill Tour</Link>
                                                        </h3>
                                                        <h5><span>$180</span>/ Per Person</h5>
                                                    </div>
                                                </li>
                                                <li className="package-card-sm">
                                                    <div className="p-sm-img">
                                                        <img src={pm_sm_2} alt="" />
                                                    </div>
                                                    <div className="package-info">
                                                        <div className="package-date-sm">
                                                            <strong><i className="flaticon-calendar" />5 Days/6 night</strong>
                                                        </div>
                                                        <h3><i className="flaticon-arrival" />
                                                            <Link to={`${process.env.PUBLIC_URL}/package-details`}>Amalfi Costa</Link>
                                                        </h3>
                                                        <h5><span>$180</span>/ Per Person</h5>
                                                    </div>
                                                </li>
                                                <li className="package-card-sm">
                                                    <div className="p-sm-img">
                                                        <img src={pm_sm_3} alt="" />
                                                    </div>
                                                    <div className="package-info">
                                                        <div className="package-date-sm">
                                                            <strong><i className="flaticon-calendar" />5 Days/6 night</strong>
                                                        </div>
                                                        <h3><i className="flaticon-arrival" />
                                                            <Link to={`${process.env.PUBLIC_URL}/package-details`}>Mount Dtna</Link>
                                                        </h3>
                                                        <h5><span>$180</span>/ Per Person</h5>
                                                    </div>
                                                </li>
                                                <li className="package-card-sm">
                                                    <div className="p-sm-img">
                                                        <img src={pm_sm_4} alt="" />
                                                    </div>
                                                    <div className="package-info">
                                                        <div className="package-date-sm">
                                                            <strong><i className="flaticon-calendar" />5 Days/6 night</strong>
                                                        </div>
                                                        <h3><i className="flaticon-arrival" />
                                                            <Link to={`${process.env.PUBLIC_URL}/package-details`}>Fench Rivirany</Link>
                                                        </h3>
                                                        <h5><span>$180</span>/ Per Person</h5>
                                                    </div>
                                                </li>
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
