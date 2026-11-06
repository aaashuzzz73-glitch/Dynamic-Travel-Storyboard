
const router = require("express").Router();

const c = require("../controllers/tripController");
const protect = require("../middleware/auth");
const ownedTrip = require("../middleware/ownedTrip");

const booking = require("../controllers/bookingController");
const activity = require("../controllers/activityController");
const note = require("../controllers/noteController");
const media = require("../controllers/mediaController");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folder
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`
    );
  }
});

// Image upload configuration
const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, WEBP and GIF images are allowed."));
    }
  }
});

// Authentication
router.use(protect);

// Trip routes
router.post("/", c.createTrip);
router.get("/", c.getTrips);
router.get("/:id", ownedTrip, c.getTrip);
router.put("/:id", ownedTrip, c.updateTrip);
router.delete("/:id", ownedTrip, c.deleteTrip);
router.patch("/:id/sharing", ownedTrip, c.setSharing);

// Booking routes
router.get("/:tripId/bookings", ownedTrip, booking.list);
router.post("/:tripId/bookings", ownedTrip, booking.create);
router.put("/:tripId/bookings/:itemId", ownedTrip, booking.update);
router.delete("/:tripId/bookings/:itemId", ownedTrip, booking.remove);

// Activity routes
router.get("/:tripId/activities", ownedTrip, activity.list);
router.post("/:tripId/activities", ownedTrip, activity.create);
router.put("/:tripId/activities/:itemId", ownedTrip, activity.update);
router.delete("/:tripId/activities/:itemId", ownedTrip, activity.remove);

// Note routes
router.get("/:tripId/notes", ownedTrip, note.list);
router.post("/:tripId/notes", ownedTrip, note.create);
router.put("/:tripId/notes/:itemId", ownedTrip, note.update);
router.delete("/:tripId/notes/:itemId", ownedTrip, note.remove);

// Media routes
router.get("/:tripId/media", ownedTrip, media.list);

router.post(
  "/:tripId/media",
  ownedTrip,
  (req, res, next) => {
    upload.single("photo")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  media.upload
);

router.delete("/:tripId/media/:itemId", ownedTrip, media.remove);

module.exports = router;
