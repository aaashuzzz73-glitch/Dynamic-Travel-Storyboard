
const Booking = require("../models/Booking");

// Get all bookings of a trip
exports.list = async (req, res) => {
  try {
    const bookings = await Booking.find({
      trip: req.trip._id
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create booking
exports.create = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      trip: req.trip._id
    });

    res.status(201).json({
      message: "Booking added successfully",
      booking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking
exports.update = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.itemId,
        trip: req.trip._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json({
      message: "Booking updated successfully",
      booking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking
exports.remove = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.itemId,
      trip: req.trip._id
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json({
      message: "Booking deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
