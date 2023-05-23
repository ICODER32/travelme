import React, { useEffect, useState } from "react";
import "./AddLocation.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import GlobeFun from "../../components/Globe/Globe";

const AddTrip = () => {
  const location = useLocation();
  const id = location.state._id;
  const [isVisible, setIsVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [reason, setReason] = useState("");
  const [vistList, setVisitList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    axios.get(`/api/users/${id}`).then((res) => {
      setVisitList(res.data.visitList);
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with placeName and reason, such as submit them to a server
    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=5c1f8bdf12d19ea098b909d3ea10ccfa`;

      const response = await axios.get(url);
      const { lat, lon } = response.data.coord;

      const placesUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=${lon}&lat=${lat}&limit=5&apikey=5ae2e3f221c38a28845f05b6cb9f91f0c472e6cc90e078fe602ed83b`;
      const placesResponse = await axios.get(placesUrl);
      axios.post("/api/trips/create", {
        name: placeName,
        userId: id,
        latitude: lat,
        longitude: lon,
        places: placesResponse.data.features.map(
          (place) => place.properties.name
        ),
        warnings: ["Don't go there"],
        reason,
      });
      setIsVisible(false);
      setPlaceName("");
      setReason("");
      getUser();
      setLoading(false);
    } catch (error) {
      alert("Please enter a valid place name");
      setIsVisible(false);
    }
  };
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="add-trip-container">
      <button className="add-trip-button" onClick={handleButtonClick}>
        Add Trip
      </button>
      {isVisible && (
        <form className="add-trip-form visible" onSubmit={handleSubmit}>
          <div className="add-trip-form-group">
            <label htmlFor="place-name">Place name:</label>
            <input
              id="place-name"
              type="text"
              placeholder="Enter place name"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />
          </div>
          <div className="add-trip-form-group">
            <label htmlFor="reason">Reason for visit:</label>
            <input
              id="reason"
              type="text"
              placeholder="Enter reason for visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <button className="add-trip-close-button" type="submit">
            Plan Now
          </button>
        </form>
      )}

      <div style={{ marginTop: 20 }}>
        {vistList.length > 0 ? (
          <GlobeFun data={vistList} />
        ) : (
          <h4>No Places to visit</h4>
        )}
      </div>
    </div>
  );
};

export default AddTrip;
