import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="log-out-login-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="group">
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="locallens-wrapper">
                  <img className="locallens" alt="Locallens" src="localens.svg" />
                </div>
                <div className="div">
                  <div className="text-wrapper">Welcome Back!</div>
                  <div className="overlap-2">
                    <div className="text-wrapper-2">Email:</div>
                    <div className="rectangle" />
                  </div>
                  <div className="overlap-3">
                    <div className="text-wrapper-2">Password:</div>
                    <div className="rectangle-2" />
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-3">LOGIN</div>
                  </div>
                </div>
                <div className="new-here">New here? Register</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
