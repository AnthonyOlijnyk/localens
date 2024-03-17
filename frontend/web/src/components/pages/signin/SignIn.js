import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "./SignIn.css";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onLoginButtonClick = async () => {
        const jsonData = { email, password };

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                const cookies = new Cookies();
                cookies.set('jwt', data.token, { path: '/' });
                navigate("/homepage");
            } else {
                setErrorMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error during sign in');
        }
    };

    return (
        <div className="form-container">
            <div className="signin-form">
                <h2 className="form-title text-center">SIGN IN</h2>
                <div className="error-message">{errorMessage}</div>
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="form-button" onClick={onLoginButtonClick}>Login</button>
                <div className="need-to-register">
                    <p>Need to Register?</p>
                    <button className="continue-button" onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
