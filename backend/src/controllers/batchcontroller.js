const Batch = require("../models/Batch");
const Medicine = require("../models/Medicine");

// POST /api/batches
const createBatch = async (req, res) => {
    try {
        const { medicineId, batchNumber, quantity, purchasePrice, sellingPrice, supplier, expiryDate } = req.body;

        // 1. Required fields
        if (!medicineId || !batchNumber || quantity === undefined || purchasePrice === undefined || sellingPrice === undefined || !expiryDate) {
            return res.status(400).json({
                message: "medicineId, batchNumber, quantity, purchasePrice, sellingPrice and expiryDate are required",
            });
        }

        // 2. Numbers must not be negative
        if (quantity < 0 || purchasePrice < 0 || sellingPrice < 0) {
            return res.status(400).json({ message: "quantity and prices cannot be negative" });
        }

        // 3. The medicine must exist
        const medicine = await Medicine.findOne({ medicineId: medicineId });
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        // 4. Same batchNumber is not allowed for the same medicine
        const duplicate = await Batch.findOne({ medicineId: medicineId, batchNumber: batchNumber });
        if (duplicate) {
            return res.status(400).json({ message: "This batchNumber already exists for this medicine" });
        }

        // 5. Save
        const batch = await Batch.create({
            medicineId,
            batchNumber,
            quantity,
            purchasePrice,
            sellingPrice,
            supplier,
            expiryDate,
        });

        res.status(201).json({ message: "Batch created", batch });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/batches/medicine/MED001
const getBatchesByMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findOne({ medicineId: req.params.medicineId });
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        // earliest expiry first
        const batches = await Batch.find({ medicineId: req.params.medicineId }).sort({ expiryDate: 1 });

        res.status(200).json({ count: batches.length, batches });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/batches/:id   (id = batch _id)
// GET /api/batches/MED001/B001
const getBatch = async (req, res) => {
    try {
        const batch = await Batch.findOne({
            medicineId: req.params.medicineId,
            batchNumber: req.params.batchNumber,
        });

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        res.status(200).json(batch);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT /api/batches/MED001/B001
const updateBatch = async (req, res) => {
    try {
        const { batchNumber, quantity, purchasePrice, sellingPrice } = req.body;

        if (quantity < 0 || purchasePrice < 0 || sellingPrice < 0) {
            return res.status(400).json({ message: "quantity and prices cannot be negative" });
        }

        // Find the batch using MED001 and B001 from the URL
        const batch = await Batch.findOne({
            medicineId: req.params.medicineId,
            batchNumber: req.params.batchNumber,
        });

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        // A batch cannot be moved to another medicine
        delete req.body.medicineId;

        // If the batchNumber is being changed, make sure the new one is not already used
        if (batchNumber && batchNumber !== batch.batchNumber) {
            const duplicate = await Batch.findOne({
                medicineId: batch.medicineId,
                batchNumber: batchNumber,
            });
            if (duplicate) {
                return res.status(400).json({ message: "This batchNumber already exists for this medicine" });
            }
        }

        const updated = await Batch.findByIdAndUpdate(batch._id, req.body, { new: true });

        res.status(200).json({ message: "Batch updated", batch: updated });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE /api/batches/MED001/B001
const deleteBatch = async (req, res) => {
    try {
        const batch = await Batch.findOneAndDelete({
            medicineId: req.params.medicineId,
            batchNumber: req.params.batchNumber,
        });

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        res.status(200).json({ message: "Batch deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports = {
    createBatch,
    getBatchesByMedicine,
    getBatch,
    updateBatch,
    deleteBatch,
};