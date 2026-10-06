const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const {
    getTransactions,
    getTransactionsByMedicine,
} = require("../controllers/transactioncontroller");

router.get("/", authMiddleware, getTransactions);
router.get("/medicine/:medicineId", authMiddleware, getTransactionsByMedicine);

module.exports = router;