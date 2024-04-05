import React, { Component } from "react";
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

class Settings extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('jwt');
        this.state = {
            isAuthenticated: !!token,
            email: '',
            username: '',
            updateChoice: '',
            currentUserEmail: '',
            currentUsername: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChoiceChange = this.handleChoiceChange.bind(this);
    }
    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChoiceChange(choice) {
        this.setState({ updateChoice: choice }, this.getCurrentUserDetails);
    }

    getCurrentUserDetails = async () => {
        const token = Cookies.get('jwt');
        if (!token) {
            this.setState({ isAuthenticated: false });
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const baseUrl = 'http://localhost:8000';
        const endpoint = `${baseUrl}/api/userDetails`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.setState({
                currentUserEmail: data.email,
                currentUsername: data.username,
            });
        } catch (error) {
            console.error('Error during the fetch:', error);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const token = Cookies.get('jwt');
        if (!token) {
            this.setState({ isAuthenticated: false });
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        let endpoint = '';
        let body = {};
        const baseUrl = 'http://localhost:8000';

        if (this.state.updateChoice === 'email') {
            endpoint = `${baseUrl}/api/updateEmail`;
            body = { email: this.state.email };
        } else if (this.state.updateChoice === 'username') {
            endpoint = `${baseUrl}/api/updateUsername`;
            body = { username: this.state.username };
        }

        try {
            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            alert('Update successful!');
        } catch (error) {
            console.error('Error during the update:', error);
            alert('An error occurred. Please try again.');
        }
    }

    renderUpdateForm() {
        const inputStyle = {
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box',
        };

        return (
            <>
                {this.state.updateChoice === 'email' && (
                    <>
                        <p>Your current email is: {this.state.currentUserEmail}</p>
                        <input
                            style={inputStyle}
                            type="email"
                            name="email"
                            placeholder="New Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </>
                )}
                {this.state.updateChoice === 'username' && (
                    <>
                        <p>Your current username is: {this.state.currentUsername}</p>
                        <input
                            style={inputStyle}
                            type="text"
                            name="username"
                            placeholder="New Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                    </>
                )}
            </>
        );
    }

    render() {
        if (!this.state.isAuthenticated) {
            return <Navigate to="/signin" replace />;
        }

        const buttonStyle = {
            cursor: 'pointer',
            padding: '10px 20px',
            backgroundColor: '#5A3553',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            margin: '10px 5px 20px 5px',
        };
        const formContainerStyle = {
            textAlign: 'center',
            maxWidth: '600px',
            margin: 'auto',
            padding: '40px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,.1)',
            backgroundColor: '#fff',
            marginBottom: '120px',
        };

        return (
            <>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-wrap">
                                    <h2>Settings</h2>
                                    <ul className="breadcrumb-links">
                                        <li>
                                            <Link to="/homepage">Home</Link>
                                            <i className="bx bx-chevron-right" />
                                        </li>
                                        <li>Settings</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-area pt-90 pb-90">
                    <div className="container">
                        <div style={formContainerStyle}>
                            <h2 style={{ marginBottom: '30px' }}>Update Account Information</h2>
                            <button style={buttonStyle} onClick={() => this.handleChoiceChange('email')}>Update Email</button>
                            <button style={buttonStyle} onClick={() => this.handleChoiceChange('username')}>Update Username</button>
                            {this.state.updateChoice && (
                                <form onSubmit={this.handleSubmit}>
                                    {this.renderUpdateForm()}
                                    <button type="submit" style={buttonStyle}>Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Settings;
