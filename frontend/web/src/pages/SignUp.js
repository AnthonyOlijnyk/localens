import React from "react";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signup">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="group">
            <div className="overlap-group">
              <div className="div">
                <div className="rectangle" />
                <div className="text-wrapper">Confirm Password:</div>
                <div className="rectangle-2" />
                <div className="rectangle-3" />
                <div className="group-2">
                  <p className="p">Please fill out form to Register!</p>
                  <div className="text-wrapper-2">Email:</div>
                  <div className="text-wrapper-3">Username:</div>
                  <div className="rectangle-4" />
                  <div className="div-wrapper">
                    <div className="text-wrapper-4">REGISTER</div>
                  </div>
                </div>
                <div className="text-wrapper-5">Password:</div>
              </div>
              <img className="locallens" alt="Locallens" src="locallens-1.png" />
            </div>
          </div>
          <p className="new-here">Already have an account? Login</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp