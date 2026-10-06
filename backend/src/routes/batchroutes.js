const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const {
    createBatch,
    getBatchesByMedicine,
    getBatch,
    updateBatch,
    deleteBatch,
} = require("../controllers/batchcontroller");

router.post("/", authMiddleware, createBatch);
router.get("/medicine/:medicineId", authMiddleware, getBatchesByMedicine); // keep this line FIRST
router.get("/:medicineId/:batchNumber", authMiddleware, getBatch);
router.put("/:medicineId/:batchNumber", authMiddleware, updateBatch);
router.delete("/:medicineId/:batchNumber", authMiddleware, deleteBatch);

module.exports = router;