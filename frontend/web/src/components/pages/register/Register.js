import React, { useState } from 'react';
import './style.css'; // Make sure to use the correct path to your CSS file

function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your logic to submit data to the server
        console.log(userData);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleInputChange}
                />
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
        </div>
    );
}

export default Register;
