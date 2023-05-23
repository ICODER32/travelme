import React, { useEffect, useState } from "react";
import "./trips.css";
import axios from "axios";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
const BestCities = () => {
  const navigation = useNavigate();
  const [cities, setCities] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const id = auth.getProfile().data._id;

  const handleConfirmClick = () => {
    setIsConfirmed(true);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const unsplashAccessKey = "iXSvWCh1e-okA0L8DuX3eMv7e5Hs93Tf7iqqksti7Ik";
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=5&query=city&client_id=${unsplashAccessKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await response.json();
        console.log(data);
        setCities(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  const handlePlanTripClick = async (city, reason = "To enjoy life") => {
    // Implement your logic here for handling the "Plan Trip" button click
    // You can use the `selectedCities` state to access the selected cities
    console.log(city);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5c1f8bdf12d19ea098b909d3ea10ccfa`;

      const response = await axios.get(url);
      const { lat, lon } = response.data.coord;

      const placesUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=${lon}&lat=${lat}&limit=5&apikey=5ae2e3f221c38a28845f05b6cb9f91f0c472e6cc90e078fe602ed83b`;
      const placesResponse = await axios.get(placesUrl);
      axios.post("/api/trips/create", {
        name: city,
        userId: id,
        latitude: lat,
        longitude: lon,
        places: placesResponse.data.features.map(
          (place) => place.properties.name
        ),
        warnings: ["Don't go there"],
        reason,
      });
      navigation("/trips");
    } catch (error) {
      alert("Please enter a valid place name");
    }
  };

  return (
    <div>
      {!isConfirmed && (
        <div className="trip-info-card">
          <h2>Trip Information</h2>
          <div className="warnings">
            <h3>Warnings</h3>
            <ul>
              <li>Check local travel advisories and restrictions</li>
              <li>Pack essential travel documents</li>
              <li>Ensure travel insurance coverage</li>
            </ul>
          </div>
          <div className="do-dont">
            <div className="do">
              <h3>Do</h3>
              <ul>
                <li>Research local customs and etiquette</li>
                <li>Respect local culture and traditions</li>
                <li>Carry necessary medications</li>
              </ul>
            </div>
            <div className="dont">
              <h3>Don't</h3>
              <ul>
                <li>Engage in illegal activities</li>
                <li>Disrespect sacred sites and landmarks</li>
                <li>Carry excessive cash and valuables</li>
              </ul>
            </div>
          </div>
          <button className="confirm-button" onClick={handleConfirmClick}>
            {isConfirmed ? "Confirmed" : "Confirm All Read"}
          </button>
        </div>
      )}

      <ul>
        {isConfirmed && (
          <>
            <h1>Best Cities in the World to Visit</h1>
            {cities.map((city) => (
              <div key={city.location.location}>
                {city.location.city ? (
                  <div key={city.id} className="wishlist-card">
                    <div className="wishlist-card-header">
                      <h3 className="wishlist-card-name">
                        {city.location.city}
                      </h3>
                    </div>
                    <div className="wishlist-card-content">
                      <div className="wishlist-card-details">
                        <div className="wishlist-card-likes">
                          <span>
                            <b>Famous for:</b> {city.description}
                          </span>
                          <ul className="wishlist-card-suggestions">
                            <b>Liked by:</b>
                            <span>{city.likes}</span>
                          </ul>
                          <ul className="wishlist-card-suggestions">
                            <b>Views :</b>
                            <span>{city.views}</span>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <img
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                      src={city.urls.small}
                      alt={city.alt_description}
                    />
                    <p>{city.location.name}</p>
                    <div className="card-actions">
                      <>
                        <button
                          className="card-button"
                          onClick={() =>
                            handlePlanTripClick(city.location.city)
                          }
                          disabled={false}
                          style={{
                            backgroundColor: "#FFC947",
                            color: "#000000",
                            borderRadius: 10,
                            cursor: "pointer",
                            padding: 10,
                            outline: "none",
                            border: "none",
                          }}
                        >
                          Plan Trip
                        </button>
                      </>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default BestCities;
