import React, { useEffect, useState } from "react";
import auth from "../../utils/auth";
import axios from "axios";
import "./myTrips.css";

const MyTrips = () => {
  const [visitedList, setVisitedList] = useState([]);
  const [visitList, setVisitList] = useState([]);
  const id = auth.getProfile().data._id;
  const getVisited = async () => {
    await axios.get(`/api/users/${id}`).then((res) => {
      setVisitedList(res.data.visitedList);
      console.log(res.data.visitList);

      setVisitList(res.data.visitList);
    });
  };

  useEffect(() => {
    getVisited();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ margin: 10 }}>Places you have visited</h1>
      {visitedList.map((visit, index) => (
        <div key={index} className="wishlist-card">
          <div className="wishlist-card-header">
            <h3 className="wishlist-card-name">{visit.properties.name}</h3>
          </div>
          <div className="wishlist-card-content">
            <div className="wishlist-card-details">
              <div className="wishlist-card-likes">
                <span>
                  {" "}
                  <b>Best thing about this place:</b> {visit.like}
                </span>
                <span>
                  {" "}
                  <b>Thing's you didn't liked here:</b> {visit.unlike}
                </span>
                <ul className="wishlist-card-suggestions">
                  <b>Things you would like to suggest:</b>
                  {visit.suggestions}
                </ul>
              </div>
            </div>
            <h3 style={{ margin: 10, textAlign: "center" }}>Some Memories </h3>
            <div className="wishlist-card-images">
              {visit.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="img"
                  className="wishlist-card-image"
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      <h1 style={{ margin: 10 }}>Places you want to visit</h1>
      {visitList?.map((item) => (
        <div key={item.properties.latitude} className="wishlist-card">
          <div className="wishlist-card-header">
            <h3 className="wishlist-card-name">{item.properties.name}</h3>
          </div>
          <div className="wishlist-card-content">
            <div className="wishlist-card-details">
              <div className="wishlist-card-likes">
                <span>
                  <b>Best Time to visit this place:</b> {item.visitTime}
                </span>
                <span>
                  <b>Motivation for Trip:</b> {item.reason}
                </span>
                <ul className="wishlist-card-suggestions">
                  <b>Best venues to visit:</b>
                  {item.places.map((place) => (
                    <li style={{ textAlign: "justify" }}>{place}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTrips;
