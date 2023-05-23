const db = require("./connection");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

db.once("open", async () => {
  // Delete all existing users and properties
  await User.deleteMany({});

  // Create a new user
  const user = await User.create({
    firstName: "M.",
    lastName: "Ibtisam",
    email: "johndoe@gmail.com",
    username: "johndoe",
    images:
      "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684250293/ewyonx0tvfend1qyz9qc.jpg",
    password: "password123",
    hometown: [
      {
        type: "Feature",
        properties: {
          name: "pacific palisades",
          latitude: 34.0424,
          longitude: -118.541,
        },
      },
    ],
    visitList: [
      {
        type: "Feature",
        properties: {
          name: "Bern",
          latitude: 46.9481,
          longitude: 7.4474,
        },
        reason: "It's called heaven on earth",
        visitTime: "Spring",
        places: [],
        warnings: ["Don't go there"],
      },
      {
        type: "Feature",
        properties: {
          name: "Lausanne",
          latitude: 46.516,
          longitude: 6.6328,
        },
        reason: "Beauty",
        visitTime: "Winter",
        places: [],
        warnings: ["Don't go there"],
      },
      {
        type: "Feature",
        properties: {
          name: "Rome",
          latitude: 34.257,
          longitude: -85.1647,
        },
        reason: "Best",
        visitTime: "Autumn",
        places: [
          "Village 3 Theatre",
          "Saint Marys Roman Catholic Church",
          "Metropolitan United Methodist Church",
          "Holsey Sinai Christian Methodist Episcopal Church",
          "Lumpkin Hill",
        ],
        warnings: ["Don't go there"],
      },
      {
        type: "Feature",
        properties: {
          name: "London",
          latitude: 51.5085,
          longitude: -0.1257,
        },
        reason: "To enjoy life",
        visitTime: "Winter",
        places: [
          "A Conversation with Oscar Wilde",
          "Queen Eleanor Memorial Cross",
          "Drinking Fountain Attached To Church Walls And Railing To Church Of St Martin In The Fields",
          "K6 Telephone Kiosk",
          "John Law Baker Memorial Drinking Fountain",
        ],
        warnings: ["Don't go there"],
      },
      {
        type: "Feature",
        properties: {
          name: "Toronto",
          latitude: 43.7001,
          longitude: -79.4163,
        },
        reason: "To enjoy life",
        visitTime: "Winter",
        places: [
          "Shearis Israel Congregation",
          "The Eglinton Grand",
          "The Adath Israel Roselawn Cemetery",
          "Avenue Theatre",
          "Holy Blossom Temple",
        ],
        warnings: ["Don't go there"],
      },
      {
        type: "Feature",
        properties: {
          name: "Chicago",
          latitude: 41.85,
          longitude: -87.65,
        },
        reason: "To enjoy life",
        visitTime: "Autumn",
        places: [
          "Spray Feature",
          "Dvorak Park",
          "Entry Fountain",
          "King David Missionary Baptist Church",
          "Iglesia Evangelica Menonite",
        ],
        warnings: ["Don't go there"],
      },
    ],
    visitedList: [
      {
        type: "Feature",
        properties: {
          name: "Tokyo",
          latitude: 35.6895,
          longitude: 139.6917,
        },
        images: [
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684347615/q4pks1dmt4onfmbbzteu.jpg",
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684347616/mxgkmhhiwv4myupfjhrz.jpg",
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684347617/jwyl8evwc17tawnmd4pu.jpg",
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684347618/uvpigmmzwjeisjhksh03.jpg",
        ],
        like: "Electronics",
        unlike: "People",
        suggestions: "Come Alone",
      },

      {
        type: "Feature",
        properties: {
          name: "pacific palisades",
          latitude: 34.0424,
          longitude: -118.541,
        },
        images: [
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684559275/wvinepgjwg5f8fjfipu1.jpg",
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684559276/o4zkaelkeesnsdjtrlgu.jpg",
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684559277/njvrpiyhp28gmq1dnbc5.webp",
          "https://res.cloudinary.com/dlwwbb8tv/image/upload/v1684559278/uq9sf2jgyirdltuqzbyk.webp",
        ],
        like: "Sea",
        unlike: "Not much",
        suggestions: "Must visit here",
      },
    ],
  });

  console.log(`User ${user.email} created with properties:`);

  // Close the database connection
  db.close();
});
