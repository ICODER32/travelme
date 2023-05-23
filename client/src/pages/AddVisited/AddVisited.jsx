import React, { useEffect, useState } from "react";
import "./AddVisited.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import GlobeFun from "../../components/Globe/Globe";
import { useNavigate } from "react-router-dom";

const AddVisited = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const id = location.state._id;
  const [isVisible, setIsVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [vistList, setVisitList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState("");
  const [unlike, setunLike] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [images, setImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  const handleImageChange = async (e) => {
    const files = e.target.files;

    try {
      setUploaded(false);
      const imageUrls = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("upload_preset", "q1s4yqgc"); // replace with your upload preset
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dlwwbb8tv/image/upload`, // replace with your Cloudinary cloud name
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        imageUrls.push(data.secure_url);
      }

      setImages(imageUrls);
      setUploaded(true);
    } catch (err) {
      alert(err);
    }
  };
  const getUser = async () => {
    axios.get(`/api/users/${id}`).then((res) => {
      setVisitList(res.data.visitedList);
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

      axios.post("/api/trips/visited", {
        name: placeName,
        userId: id,
        latitude: lat,
        images,
        like,
        unlike,
        suggestions,
        longitude: lon,
      });
      setIsVisible(false);
      setPlaceName("");
      getUser();
      setLoading(false);
      navigation("/");
    } catch (error) {
      alert("Please enter a valid place name");
      setIsVisible(false);
    }
  };
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="add-trip-container">
      <button className="add-trip-button" onClick={handleButtonClick}>
        Add Visited Place
      </button>
      {isVisible && (
        <form
          encType="multipart/form-data"
          className="add-trip-form visible"
          onSubmit={handleSubmit}
        >
          <div className="add-trip-form-group">
            <label htmlFor="place-name">Place name:</label>
            <input
              id="Enter City Name"
              type="text"
              placeholder="Enter place name"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />
            <label htmlFor="place-name">What you liked in this city?</label>
            <input
              id="Enter Likings"
              type="text"
              placeholder="Enter Likings"
              value={like}
              onChange={(e) => setLike(e.target.value)}
            />
            <label htmlFor="place-name">
              What you didn't liked in this city?
            </label>
            <input
              id="Enter Likings"
              type="text"
              placeholder="Enter Not Liked things"
              value={unlike}
              onChange={(e) => setunLike(e.target.value)}
            />
            <label htmlFor="suggestions">What will you suggest others?</label>
            <textarea
              id="suggestions"
              rows={10}
              type="text"
              placeholder="Your Suggestions"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
            />

            <label htmlFor="image">Please Upload Images?</label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              multiple
            />
          </div>
          {uploaded && (
            <button
              disabled={false}
              className="add-trip-close-button"
              type="submit"
            >
              Plan Now
            </button>
          )}
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

export default AddVisited;
