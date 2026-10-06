// const express = require("express");
// const { createMedicine } = require("../controllers/medicinecontroller");

// const router = express.Router();

// router.post("/", createMedicine);

// module.exports = router;
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
} = require("../controllers/medicinecontroller");

router.post("/", authMiddleware, createMedicine);
router.get("/", authMiddleware, getMedicines);
router.get("/:id", authMiddleware, getMedicineById);
router.put("/:id", authMiddleware, updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);

module.exports = router;