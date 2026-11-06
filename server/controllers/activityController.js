
const Activity = require("../models/Activity");

// Get all activities of a trip
exports.list = async (req, res) => {
  try {
    const activities = await Activity.find({
      trip: req.trip._id
    }).sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create activity
exports.create = async (req, res) => {
  try {
    const activity = await Activity.create({
      ...req.body,
      trip: req.trip._id
    });

    res.status(201).json({
      message: "Activity created successfully",
      activity
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update activity
exports.update = async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      {
        _id: req.params.itemId,
        trip: req.trip._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found"
      });
    }

    res.json({
      message: "Activity updated successfully",
      activity
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete activity
exports.remove = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.itemId,
      trip: req.trip._id
    });

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found"
      });
    }

    res.json({
      message: "Activity deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
