const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const weatherRoutes = require("./routes/weatherRoutes");

app.use("/api/weather", weatherRoutes);

module.exports = app;