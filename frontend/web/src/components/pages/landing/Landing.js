import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Landing.css";

function Landing() {

    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        // Redirect to home page
        navigate('/SignIn'); // Adjust the route as needed
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Redirect to home page
        navigate('/Register'); // Adjust the route as needed
    };

    return (
        <div className="form-container">
            <div className="landing-form">
                <h2 className="localens"></h2>
                <div></div>
                <form onSubmit={handleLogin}>
                    <button className="form-button" type="login">Login</button>
                </form>
                <form onSubmit={handleRegister}>
                    <button className="form-button" type="register">Register</button>
                </form>
            </div>
        </div>
        
    );
}

export default Landing;
