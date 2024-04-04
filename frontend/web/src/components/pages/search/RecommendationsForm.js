import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import "./RecommendationForm.css";

const RecommendationsForm = () => {
  const navigate = useNavigate();
  // Separate state for each input
  const [type, setType] = useState('');
  const [average_rating, setAverageRating] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [family_friendly, setFamilyFriendly] = useState(false);
  const [cost, setCost] = useState('');
  const [open_time, setOpenTime] = useState('');
  const [close_time, setCloseTime] = useState('');
  const [accessibility_rating, setAccessibilityRating] = useState('');
  const [capacity, setCapacity] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('jwt');
    
    // Check if the token exists before sending the request
    if (!token) {
        console.error('Authentication token not found');
        // Update the state or show an error message to the user accordingly
        setGeneralError('Authentication token not found. Please login again.');
        return;
    }

    // Construct the submission data from the state
    const dataToSubmit = {
        type,
        average_rating,
        latitude,
        longitude,
        family_friendly: family_friendly ? 1 : 0, // converting boolean to 1/0
        cost,
        open_time,
        close_time,
        accessibility_rating,
        capacity
    };

    try {
        const response = await fetch('http://localhost:8000/api/make-recommendation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSubmit)
        });

        // Attempt to read the response as JSON
        let responseData;
        if (response.headers.get("content-type")?.includes("application/json")) {
          responseData = await response.json();
        } else {
          // Non-JSON response, handle as text for debugging purposes
          const textData = await response.text();
          console.error('Received non-JSON response:', textData);
          // You can display an error message or perform another type of error handling here
          setGeneralError('Received non-JSON response from the server.');
          return;
        }

        // Handle the response data
        if (response.ok) {
          console.log('Recommendations:', responseData);
          navigate('/search-results', { state: { recommendations: responseData } });
        } else {
          console.error('Failed to fetch recommendations:', responseData);
          // Here you would handle HTTP errors and update the state or show an error message
          setGeneralError(responseData.message || 'Failed to fetch recommendations.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        // Update the state with the error message
        setGeneralError(error.message || 'An error occurred while submitting the form.');
    }
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <h2 className="search-heading">Find Recommendations</h2>

        {/* Type Select Input */}
        <select
          className="search-form-input"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Hotel">Hotel</option>
          <option value="Activity">Activity</option>
        </select>

        {/* Average Rating Input */}
        <input
          className="search-form-input"
          type="number"
          name="average_rating"
          placeholder="Average Rating (1-5 Stars)"
          value={average_rating}
          onChange={(e) => setAverageRating(e.target.value)}
          min="1"
          max="5"
          step="0.1"
          required
        />

        {/* Latitude Input */}
        <input
          className="search-form-input"
          type="number"
          name="latitude"
          placeholder="Latitude (42 to 45 N)"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          min="42"
          max="45"
          step="0.001"
          required
        />

        {/* Longitude Input */}
        <input
          className="search-form-input"
          type="number"
          name="longitude"
          placeholder="Longitude (78 to 82 W)"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          min="-82"
          max="-78"
          step="0.001"
          required
        />

        {/* Family Friendly Checkbox */}
        <label className="search-form-checkbox-label">
          Family Friendly
          <input
            type="checkbox"
            name="family_friendly"
            className="search-form-checkbox"
            checked={family_friendly}
            onChange={(e) => setFamilyFriendly(e.target.checked)}
          />
        </label>

        {/* Cost Input */}
        <input
          className="search-form-input"
          type="number"
          name="cost"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          min="0"
          required
        />

        {/* Open Time Input */}
        <input
          className="search-form-input"
          type="number"
          name="open_time"
          placeholder="Open Time (9.5 for 9:30am)"
          value={open_time}
          onChange={(e) => setOpenTime(e.target.value)}
          min="0"
          max="23.99"
          step="0.01"
          required
        />

        {/* Close Time Input */}
        <input
          className="search-form-input"
          type="number"
          name="close_time"
          placeholder="Close Time (17.5 for 5:30pm)"
          value={close_time}
          onChange={(e) => setCloseTime(e.target.value)}
          min="0"
          max="23.99"
          step="0.01"
          required
        />

        {/* Accessibility Rating Input */}
        <input
          className="search-form-input"
          type="number"
          name="accessibility_rating"
          placeholder="Accessibility Rating (1-5)"
          value={accessibility_rating}
          onChange={(e) => setAccessibilityRating(e.target.value)}
          min="1"
          max="5"
          required
        />

        {/* Capacity Input */}
        <input
          className="search-form-input"
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          min="1"
          required
        />

        {/* Submit Button */}
        <button className="search-form-button" type="submit">
          Find Recommendations
        </button>
      </form>
    </div>
  );
};

export default RecommendationsForm;
