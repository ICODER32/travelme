const e = require("express");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use("/api/users", require("./routes/api/users"));
app.use("/api/trips", require("./routes/api/trips"));

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
