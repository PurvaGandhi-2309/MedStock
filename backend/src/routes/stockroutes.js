const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const { stockIn, stockOut } = require("../controllers/stockcontroller");

router.post("/in", authMiddleware, stockIn);
router.post("/out", authMiddleware, stockOut);

module.exports = router;