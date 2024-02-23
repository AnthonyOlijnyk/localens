import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./SignIn.css";

function SignIn() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        // Redirect to home page
        history.push('/home-page-2'); // Adjust the route as needed
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="form-container">
            <div className="signin-form">
                <h2 className="form-title">SignIn</h2>
                <div></div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={userData.userName}
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
                    <button className="form-button" type="Login">Login</button>
                </form>
                <div className="Need-to-register">
                    <p>Need to Register?</p>
                    <button className="register-button" onClick={() => history.push('/register')}>Register</button>
                </div>
            </div>
        </div>
        
    );
}

export default SignIn;
