
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    tripName: {
      type: String,
      required: true
    },

    destinations: [{
      type: String,
      required: true
    }],

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    coverImage: {
      type: String,
      default: ""
    },

    isPublic: {
      type: Boolean,
      default: false
    },

    shareToken: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
