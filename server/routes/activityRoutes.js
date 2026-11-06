
const express = require("express");
const router = express.Router();

const {
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity
} = require("../controllers/activityController");

router.post("/", createActivity);
router.get("/", getAllActivities);
router.get("/:id", getActivityById);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
