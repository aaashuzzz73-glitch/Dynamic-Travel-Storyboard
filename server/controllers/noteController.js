
const Note = require("../models/Note");

// Get all notes of a trip
exports.list = async (req, res) => {
  try {
    const notes = await Note.find({
      trip: req.trip._id
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create note
exports.create = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      trip: req.trip._id
    });

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update note
exports.update = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.itemId,
        trip: req.trip._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete note
exports.remove = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.itemId,
      trip: req.trip._id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
