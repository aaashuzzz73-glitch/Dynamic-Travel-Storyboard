const router = require("express").Router();
const { getSharedTrip } = require("../controllers/tripController");
router.get("/share/:token", getSharedTrip);
module.exports = router;
