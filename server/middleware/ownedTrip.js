const mongoose = require("mongoose");
const Trip = require("../models/Trip");

async function ownedTrip(req, res, next) {
  try {
    const id = req.params.tripId || req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid trip ID." });
    const trip = await Trip.findOne({ _id: id, user: req.user._id });
    if (!trip) return res.status(404).json({ message: "Trip not found." });
    req.trip = trip;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = ownedTrip;
