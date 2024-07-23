const express = require("express");
const sharemeetController = require("../controllers/sharemeetController");
const auth = require("../Middleware/auth");
const router = express.Router();

router.post("/", auth, sharemeetController.createShareMeet);
router.get("/", auth, sharemeetController.getAllShareMeets);

module.exports = router;
