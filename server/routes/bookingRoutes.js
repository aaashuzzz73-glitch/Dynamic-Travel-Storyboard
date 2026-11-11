
const express = require("express");
const router = express.Router({ mergeParams: true });

const bookingController = require("../controllers/bookingController");
const ownedTrip = require("../middleware/ownedTrip");

router.get("/", ownedTrip, bookingController.list);
router.post("/", ownedTrip, bookingController.create);
router.put("/:itemId", ownedTrip, bookingController.update);
router.delete("/:itemId", ownedTrip, bookingController.remove);

module.exports = router;
