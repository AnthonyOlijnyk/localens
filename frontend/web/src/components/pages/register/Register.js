import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./Register.css";

function Register() {
    const [userData, setUserData] = useState({
        fullName: '',
        country: 'UAE (+971)',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        // Redirect to home page
        history.push('/home-page-2'); // Adjust the route as needed
    };

    return (
        <div className="form-container">
            <div className="register-form">
                <h2 className="form-title">Register</h2>
                <div></div>
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
                        <select className="form-select" name="countryCode">
                        <option value="+971">UAE (+971)</option>
                        {/* other options */}
                        </select>
                        <input
                        type="tel"
                        className="form-input phone-number-input"
                        name="phoneNumber"
                        placeholder="Phone Number"
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
                    <button className="continue-button" onClick={() => history.push('/signin')}>Sign In</button>
                </div>
            </div>
        </div>
        
    );
}

export default Register;
