const path = require("path");
const fs = require("fs");
const Media = require("../models/Media");
const Activity = require("../models/Activity");

exports.list = async (req, res) => {
  try { res.json(await Media.find({ trip: req.trip._id }).sort({ date: 1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Choose an image to upload." });
    const activityId = req.body.activity || null;
    if (activityId) {
      const activity = await Activity.findOne({ _id: activityId, trip: req.trip._id });
      if (!activity) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Selected activity does not belong to this trip." });
      }
    }
    const date = req.body.date || req.trip.startDate;
    const media = await Media.create({
      trip: req.trip._id, activity: activityId, date,
      originalName: req.file.originalname, filename: req.file.filename,
      url: `/uploads/${req.file.filename}`, mimetype: req.file.mimetype, size: req.file.size
    });
    res.status(201).json({ message: "Photo uploaded successfully", media });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const media = await Media.findOneAndDelete({ _id: req.params.itemId, trip: req.trip._id });
    if (!media) return res.status(404).json({ message: "Photo not found." });
    const filePath = path.join(__dirname, "..", "uploads", media.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ message: "Photo deleted successfully." });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
