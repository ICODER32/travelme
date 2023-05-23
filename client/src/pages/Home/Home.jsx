import React from "react";
import "./Home.css";
import earth from "../../assets/earth.png";
const LandingPage = () => {
  return (
    <div className="body">
      <div className="wrapper">
        <div className="main">
          <h1>Travel Me</h1>
          <h4>Your Travel Companion</h4>
        </div>
        <img src={earth} alt="" />
      </div>
    </div>
  );
};

export default LandingPage;
