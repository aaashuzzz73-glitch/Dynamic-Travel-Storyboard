
const Trip = require("../models/Trip");
const crypto = require("crypto");

// Create Trip
exports.createTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      ...req.body,
      user: req.user._id || req.user.id
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trips of logged-in user
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user._id || req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single trip
exports.getTrip = async (req, res) => {
  try {
    const trip = req.trip;

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Trip
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id || req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip updated successfully",
      trip
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id || req.user.id
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enable / Disable Trip Sharing
exports.setSharing = async (req, res) => {
  try {
    const updateData = {
      isPublic: req.body.isPublic
    };

    if (req.body.isPublic) {
      updateData.shareToken = crypto.randomBytes(16).toString("hex");
    } else {
      updateData.shareToken = null;
    }

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id || req.user.id
      },
      updateData,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip sharing updated successfully",
      trip
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Shared Trip
exports.getSharedTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      shareToken: req.params.token,
      isPublic: true
    });

    if (!trip) {
      return res.status(404).json({
        message: "Shared trip not found"
      });
    }

    res.status(200).json({ trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
