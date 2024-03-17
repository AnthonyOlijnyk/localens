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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            navigate('/homepage');
        } catch (error) {
            console.error('Error during registration:', error);
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