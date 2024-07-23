const express = require("express");
const categoryController = require("../controllers/categoryController");
const auth = require("../Middleware/auth");
const router = express.Router();

router.post("/", auth, categoryController.createCategory);
router.get("/", auth, categoryController.getAllCategories);

module.exports = router;
