const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true, index: true },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity", default: null },
  date: { type: Date, required: true },
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Media", mediaSchema);
