import React, { useState } from "react";
import "./Signup.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import auth from "../../utils/auth";

function Signup() {
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
      ); // replace with your upload preset
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, // replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      setImage(data.secure_url);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${homeTown}&appid=5c1f8bdf12d19ea098b909d3ea10ccfa`;

      const response = await axios.get(url);
      const { lat, lon } = response.data.coord;

      const data = await axios.post("/api/users/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
        hometown: {
          type: "Feature",
          properties: {
            name: homeTown,
            latitude: lat,
            longitude: lon,
          },
        },
        images: image,
      });
      auth.login(data.data.token);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="login-card__container">
      <div className="signupmain-card">
        <div className="login-card__header">
          <img className="login-card__logo" src={logo} alt="Logo" />
          <h2 className="login-card__title">Travel Me Signup</h2>
        </div>
        <div className="login-card__content">
          <form onSubmit={handleSubmit}>
            <div className="signup_card">
              <div className="signup_right">
                <label htmlFor="picture" className="signup-card__picture-label">
                  <p>Upload Picture</p>
                  <img
                    className="signup-card__picture"
                    src="https://png.pngtree.com/png-vector/20191129/ourlarge/pngtree-image-upload-icon-photo-upload-icon-png-image_2047547.jpg"
                    alt="Upload "
                  />
                </label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
              <div className="signup_left">
                <div className="names">
                  <div>
                    <label htmlFor="fname">First Name:</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      id="fname"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lname">Last Name:</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      id="lname"
                      required
                    />
                  </div>
                </div>
                <label htmlFor="username">Username:</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  required
                />
                <label htmlFor="email">Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="password">Password:</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  required
                />

                <label htmlFor="cpassword">Confirm Password:</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="cpassword"
                  required
                />
                {error ? (
                  <p style={{ color: "red" }} className="error">
                    {error}
                  </p>
                ) : null}
                <label htmlFor="hometown">Home Town:</label>
                <input
                  value={homeTown}
                  onChange={(e) => setHomeTown(e.target.value)}
                  type="text"
                  id="hometown"
                  required
                />

                <button
                  disabled={loading}
                  type="submit"
                  className="login-card__button"
                >
                  Signup
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="login-card__footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-card__link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
