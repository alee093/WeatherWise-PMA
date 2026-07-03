const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    latitude: Number,

    longitude: Number,

    humidity: Number,

    feelsLike: Number,

    wind: Number,

    pressure: Number,

    visibility: Number,

    uvIndex: Number,

    weatherCode: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", historySchema);