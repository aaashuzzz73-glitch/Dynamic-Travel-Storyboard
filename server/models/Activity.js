
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String
    },

    location: {
      type: String
    },

    category: {
      type: String,
      enum: ["Travel", "Sightseeing", "Food", "Adventure", "Other"],
      default: "Other"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
