const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const {
    getExpired,
    getExpiringSoon,
    getLowStock,
} = require("../controllers/alertcontroller");

router.get("/low-stock", authMiddleware, getLowStock);
router.get("/expired", authMiddleware, getExpired);
router.get("/expiring-soon", authMiddleware, getExpiringSoon);

module.exports = router;