const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "WeatherWise Backend Connected!"
    });
});

module.exports = app;