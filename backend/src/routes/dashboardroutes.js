const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const { getDashboard } = require("../controllers/dashboardcontroller");

router.get("/", authMiddleware, getDashboard);

module.exports = router;