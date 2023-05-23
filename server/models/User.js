const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [5, "Email must be at least 5 characters long"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [5, "Username must be at least 5 characters long"],
    unique: [true, "Username already exists"],
  },
  hometown: {
    type: [
      {
        type: { type: String },
        properties: {
          name: { type: String },
          latitude: { type: Number },
          longitude: { type: Number },
        },
      },
    ],
    required: [true, "Hometown is required"],
    minlength: [5, "Hometown must be at least 5 characters long"],
  },
  visitList: {
    type: [
      {
        type: { type: String, default: "Feature" },
        properties: {
          name: { type: String },
          latitude: { type: Number },
          longitude: { type: Number },
        },
        reason: { type: String },
        visitTime: { type: String },
        places: [{ type: String }],
        warnings: [{ type: String }],
      },
    ],
    required: [true, "Visit list is required"],
    minlength: [1, "Visit list must contain at least one item"],
  },
  visitedList: {
    type: [
      {
        type: { type: String, default: "Feature" },
        properties: {
          name: { type: String },
          latitude: { type: Number },
          longitude: { type: Number },
        },
        images: [{ type: String }],
        like: { type: String },
        unlike: {
          type: String,
        },
        suggestions: { type: String },
      },
    ],
    required: [true, "Visit list is required"],
    minlength: [1, "Visit list must contain at least one item"],
  },
  images: {
    type: String,
    required: [true, "Image is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

userSchema.pre("save", function (next) {
  // Hash the password before saving the user model
  try {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    }
  } catch (error) {
    next(error);
  }
});
userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, passwordHash)
      .then((isMatch) => {
        resolve(isMatch);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;

//  - first Name
//   - last name
//   -email
//   -username
//   -hometown or when you life now
//   -images
