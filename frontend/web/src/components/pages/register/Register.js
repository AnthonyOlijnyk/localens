import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./Register.css";

function Register() {
    const [enterEmail, setEnterEmail] = useState('');
    const [enterUsername, setEnterUsername] = useState('');
    const [enterNewPassword, setEnterNewPassword] = useState('');
    const [enterConfirmPassword, setEnterConfirmPassword] = useState('');

    console.log(enterEmail);
    console.log(enterUsername);
    console.log(enterNewPassword);
    console.log(enterConfirmPassword);

    const history = useHistory();

    const jsonData = {
      email: enterEmail,
      username: enterUsername,
      password: enterNewPassword
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(userData);
        const response = await fetch("http://localhost:8000/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
        });
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
                        name="userName"
                        placeholder="Username"
                        value={enterUsername}
                        onChange={(e) => setEnterUsername(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={enterEmail}
                        onChange={(e) => setEnterEmail(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={enterNewPassword}
                        onChange={(e) => setEnterNewPassword(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={enterConfirmPassword}
                        onChange={(e) => setEnterConfirmPassword(e.target.value)}
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