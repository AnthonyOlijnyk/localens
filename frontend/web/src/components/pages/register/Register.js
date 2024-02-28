import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";

const countryCodes = [
    { name: 'Australia', code: '+61' },
    { name: 'Canada', code: '+1' },
    { name: 'India', code: '+91' },
    { name: 'UAE', code: '+971' },
    { name: 'USA', code: '+1' },
    { name: 'UK', code: '+44' },
    // Add as many countries as you need
];

function Register() {
    const [userData, setUserData] = useState({
        fullName: '',
        userName: '',
        country: countryCodes[1].code, // Default to Canada
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (userData.password !== userData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Reset error message on successful validation
        setError('');

        // Construct full phone number
        const fullPhoneNumber = `${userData.country}${userData.phoneNumber}`;

        // Prepare the data to be sent to the backend
        const userRegistrationData = {
            fullName: userData.fullName,
            userName: userData.userName,
            phoneNumber: fullPhoneNumber,
            email: userData.email,
            password: userData.password,
        };

        // Use axios to send a POST request to your backend
        try {
            const response = await axios.post('http://localhost:8000/api/signup/', userRegistrationData);
            console.log(response.data);
            // Redirect to home page on successful registration
            history.push('/home-page-2');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.message || 'An error occurred during registration.');
        }
    };

    return (
        <div className="form-container">
            <div className="register-form">
                <h2 className="form-title">Register</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={userData.fullName}
                        onChange={handleInputChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={userData.userName}
                        onChange={handleInputChange}
                    />
                    <div className="input-group">
                        <select
                            className="form-select"
                            name="country"
                            value={userData.country}
                            onChange={handleInputChange}
                        >
                            {countryCodes.map((country, index) => (
                                <option key={index} value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            className="form-input phone-number-input"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={userData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                    <input
                        className="form-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={userData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <button className="form-button" type="submit">Register</button>
                </form>
                <div className="already-registered">
                    <p>Already Registered?</p>
                    <button className="sign-in-button" onClick={() => history.push('/signin')}>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
