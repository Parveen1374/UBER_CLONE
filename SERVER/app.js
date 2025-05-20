const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./db/db");
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.routes");

connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
