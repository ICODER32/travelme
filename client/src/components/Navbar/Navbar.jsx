import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Navbar() {
  const loggedIn = Auth.loggedIn();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault(); // Prevent the default prompt from showing
      // Store the deferred prompt for later use
      setDeferredPrompt(event);
    });
  }, [deferredPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      console.log("first");
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        // Reset the deferred prompt so it can be used again
        setDeferredPrompt(null);
      });
    }
  };
  const handleLogout = () => {
    Auth.logout();
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link className="navbar__logo" to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="navbar__right">
          {loggedIn ? (
            <>
              <Link className="navbar__link" to="/profile">
                Profile
              </Link>
              <Link className="navbar__link" to="/trips">
                My Trips
              </Link>
              <Link className="navbar__link" to="/hottrips">
                Best Places
              </Link>

              <span
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
                className="navbar__link"
                href="/logout"
              >
                Logout
              </span>
              <button
                className="navbar__link navbar__button"
                onClick={handleInstallClick}
              >
                Install Application
              </button>
            </>
          ) : (
            <>
              <Link className="navbar__link" to="/login">
                Login
              </Link>
              <Link className="navbar__link" to="/signup">
                Signup
              </Link>
              <button
                className="navbar__link navbar__button"
                onClick={handleInstallClick}
              >
                Install Application
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
