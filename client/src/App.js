import React from "react";
import Auth from "./utils/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import AddLocation from "./pages/AddLocation/AddLocation";
import AddVisited from "./pages/AddVisited/AddVisited";
import MyTrips from "./pages/MyTrips/MyTrips";
import HotTrips from "./pages/HotTrips/HotTrips";

function App() {
  const loggedIn = Auth.loggedIn();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/profile"
          element={loggedIn ? <Profile /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/addTrip"
          element={
            loggedIn ? <AddLocation /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/visited"
          element={loggedIn ? <AddVisited /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/trips"
          element={loggedIn ? <MyTrips /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/hottrips"
          element={loggedIn ? <HotTrips /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
