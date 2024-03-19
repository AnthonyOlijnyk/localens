import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

function Register() {
    const [enterEmail, setEnterEmail] = useState('');
    const [enterUsername, setEnterUsername] = useState('');
    const [enterNewPassword, setEnterNewPassword] = useState('');
    const [enterConfirmPassword, setEnterConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [generalError, setGeneralError] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        // Email validation
        if (!enterEmail.includes('@')) {
            setErrorEmail('Invalid email');
            isValid = false;
        } else {
            setErrorEmail('');
        }

        // Username validation
        if (enterUsername.length < 4) {
            setErrorUsername('Username must be at least 4 characters');
            isValid = false;
        } else {
            setErrorUsername('');
        }

        // Password validation
        if (enterNewPassword.length < 6) {
            setErrorPassword('Password must be at least 6 characters');
            isValid = false;
        } else {
            setErrorPassword('');
        }

        // Confirm password validation
        if (enterNewPassword !== enterConfirmPassword) {
            setErrorConfirmPassword('Passwords do not match');
            isValid = false;
        } else {
            setErrorConfirmPassword('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const jsonData = {
          email: enterEmail,
          username: enterUsername,
          password: enterNewPassword
        };

        try {
            const response = await fetch("http://localhost:8000/api/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            if (response.ok) {
                navigate('/signin');
            } else if (response.status === 409) {
                const errorData = await response.json();
                // Assuming the server response includes a field 'error' indicating the issue
                if (errorData.error.includes('username')) {
                    setErrorUsername('Username already exists');
                } else if (errorData.error.includes('email')) {
                    setErrorEmail('Email already in use');
                } else {
                    setGeneralError('An unexpected error occurred');
                }
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setGeneralError('Failed to register. Email or Username already exists.');
        }
    };

    return (
        <div className="form-container">
            <div className="register-form">
                <h2 className="form-title text-center">REGISTER</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={enterUsername}
                        onChange={(e) => setEnterUsername(e.target.value)}
                    />
                    <p className="error-message">{errorUsername}</p>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={enterEmail}
                        onChange={(e) => setEnterEmail(e.target.value)}
                    />
                    <p className="error-message">{errorEmail}</p>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={enterNewPassword}
                        onChange={(e) => setEnterNewPassword(e.target.value)}
                    />
                    <p className="error-message">{errorPassword}</p>
                    <input
                        className="form-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={enterConfirmPassword}
                        onChange={(e) => setEnterConfirmPassword(e.target.value)}
                    />
                    <p className="error-message">{errorConfirmPassword}</p>
                    <button className="form-button" type="submit">Register</button>
                    {generalError && <p className="error-message">{generalError}</p>}
                </form>
                <div className="already-registered">
                    <p>Already Registered?</p>
                    <button className="continue-button" onClick={() => navigate('/signin')}>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
