
const router = require("express").Router();
const auth = require("../controllers/authController");
const protect = require("../middleware/auth");

router.post("/register", auth.register);
router.post("/login", auth.login);

router.get("/me", protect, auth.me);
router.put("/me", protect, auth.updateProfile);

module.exports = router;
