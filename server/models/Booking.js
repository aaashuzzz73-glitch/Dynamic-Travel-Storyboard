
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },

    bookingType: {
      type: String,
      enum: ["Flight", "Train", "Bus", "Hotel"],
      required: true
    },

    title: {
      type: String,
      required: true
    },

    bookingDate: {
      type: Date
    },

    bookingTime: {
      type: String
    },

    location: {
      type: String
    },

    bookingReference: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
