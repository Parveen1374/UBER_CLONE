const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./db/db");
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/map.routes");
const rideRoutes = require("./routes/ride.routes");
const captainModel = require("./models/captain.model");

const update = async () => {
  const captains = await captainModel.find({});
  for (const captain of captains) {
    if (
      captain.location &&
      captain.location.ltd !== undefined &&
      captain.location.lng !== undefined
    ) {
      captain.location = {
        type: "Point",
        coordinates: [captain.location.lng, captain.location.ltd],
      };
      await captain.save();
    }
  }
};

update();

connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Uber Clone API");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

module.exports = app;
