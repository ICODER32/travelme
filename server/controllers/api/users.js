const { signToken, authMiddleware } = require("../../utils/auth");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

module.exports.Signup = async (req, res) => {
  const { firstName, lastName, email, username, hometown, images, password } =
    req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      username,
      images,
      password,
    });
    user.hometown.push(hometown); // push hometown value into the array
    await user.save();
    const token = signToken(user);
    res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found");
      return res.status(401).json({ error: "User not found" });
    }
    const hashed = user.password;
    const match = bcrypt.compareSync(password, hashed);

    if (match === false) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = signToken(user);
    res.status(200).json({ message: "User logged in", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports.GetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("hometown");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
