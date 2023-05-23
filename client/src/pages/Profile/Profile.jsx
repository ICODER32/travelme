import React, { useEffect, useState } from "react";
import auth from "../../utils/auth";
import axios from "axios";
import "./Profile.css";
import GlobeFun from "../../components/Globe/Globe";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const profile = auth.getProfile();
  const [loading, setLoading] = useState(false);
  const [homeTown, setHomeTown] = useState([]);

  const getData = async () => {
    setLoading(true);
    axios.get(`/api/users/${profile.data._id}`).then((res) => {
      setData(res.data);
      setHomeTown(res.data.hometown);
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div className="user-profile">
        <div className="left-column">
          <img src={data.images} alt="User Profile" className="profile-img" />
        </div>
        <div className="right-column">
          <h2 className="name">
            {data.firstName} {data.lastName}
          </h2>
          <p className="username">@{data.username}</p>
          <p className="email">{data.email}</p>
          <p className="hometown">
            {homeTown.map((home) => `${home.properties.name}`)}
          </p>
        </div>
      </div>
      <h3 style={{ textAlign: "center", fontSize: 30 }}>My hometown</h3>
      <div className="globe_card">
        <GlobeFun data={homeTown} />
      </div>
      <div className="button-container">
        <button
          className="visited-button"
          onClick={() => {
            navigate("/visited", { state: { _id: profile.data._id } });
          }}
        >
          Add Visited Place
        </button>
        <button
          className="to-visit-button"
          onClick={() =>
            navigate("/addTrip", { state: { _id: profile.data._id } })
          }
        >
          Add Place to Visit
        </button>
      </div>
    </div>
  );
};

export default Profile;
