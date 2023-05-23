const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.post("/create", async (req, res) => {
  const seasons = ["Spring", "Summer", "Autumn", "Winter"];
  const randomSeason = seasons[Math.floor(Math.random() * 4)];

  try {
    const { name, latitude, longitude, places, warnings, reason, userId } =
      req.body;
    const newTrip = {
      properties: {
        name,
        latitude,
        longitude,
      },
      visitTime: randomSeason,
      places,
      warnings,
      reason,
    };
    const user = await User.findById(userId);
    user.visitList.push(newTrip);
    await user.save();
    return res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/visited", async (req, res) => {
  try {
    const {
      name,
      latitude,
      longitude,
      userId,
      images,
      like,
      unlike,
      suggestions,
    } = req.body;
    const newTrip = {
      properties: {
        name,
        latitude,
        longitude,
      },
      images,
      like,
      unlike,
      suggestions,
    };
    const user = await User.findById(userId);
    user.visitedList.push(newTrip);
    await user.save();
    return res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
