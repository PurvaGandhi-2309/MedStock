const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const { getInventoryInsights } = require("../controllers/aicontroller");

router.post("/inventory-insights", authMiddleware, getInventoryInsights);

module.exports = router;