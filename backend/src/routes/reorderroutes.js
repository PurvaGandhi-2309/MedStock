const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const { getReorder } = require("../controllers/reordercontroller");

router.get("/", authMiddleware, getReorder);

module.exports = router;