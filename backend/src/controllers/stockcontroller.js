const Batch = require("../models/Batch");
const Medicine = require("../models/Medicine");
const Transaction = require("../models/Transaction");

// POST /api/stock/in
// Body: { "medicineId": "MED001", "batchNumber": "B001", "quantity": 20 }
const stockIn = async (req, res) => {
    try {
        const { medicineId, batchNumber, quantity } = req.body;

        // 1. Check the input
        if (!medicineId || !batchNumber) {
            return res.status(400).json({ message: "medicineId and batchNumber are required" });
        }
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "quantity must be greater than 0" });
        }

        // 2. Medicine must exist
        const medicine = await Medicine.findOne({ medicineId: medicineId });
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        // 3. Batch must exist (found by medicineId + batchNumber)
        const batch = await Batch.findOne({ medicineId: medicineId, batchNumber: batchNumber });
        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        // 4. Increase the batch quantity
        batch.quantity = batch.quantity + quantity;
        await batch.save();

        // 5. Save a transaction record
        await Transaction.create({
            medicineId: medicineId,
            batchId: batch._id,
            batchNumber: batch.batchNumber,
            type: "IN",
            quantity: quantity,
        });

        res.status(200).json({
            message: "Stock added",
            medicineId: medicineId,
            batchNumber: batch.batchNumber,
            newQuantity: batch.quantity,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST /api/stock/out
// Body: { "medicineId": "MED001", "quantity": 30 }
const stockOut = async (req, res) => {
    try {
        const { medicineId, quantity } = req.body;

        // 1. Check the input
        if (!medicineId) {
            return res.status(400).json({ message: "medicineId is required" });
        }
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "quantity must be greater than 0" });
        }

        // 2. Medicine must exist
        const medicine = await Medicine.findOne({ medicineId: medicineId });
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        // 3. Get valid batches only:
        //    - quantity more than 0
        //    - not expired (expiryDate is today or later)
        //    Sorted by earliest expiry first. This is FEFO.
        const today = new Date();
        const batches = await Batch.find({
            medicineId: medicineId,
            quantity: { $gt: 0 },
            expiryDate: { $gte: today },
        }).sort({ expiryDate: 1 });

        // 4. Add up the available stock
        let totalAvailable = 0;
        for (const batch of batches) {
            totalAvailable = totalAvailable + batch.quantity;
        }

        // 5. Not enough stock? Stop before changing anything
        if (totalAvailable < quantity) {
            return res.status(400).json({
                message: "Not enough stock. Available: " + totalAvailable,
            });
        }

        // 6. Take stock batch by batch (earliest expiry first)
        let remaining = quantity;
        const batchesUsed = [];

        for (const batch of batches) {
            if (remaining === 0) break;

            // take the smaller of: what this batch has, what we still need
            const take = Math.min(batch.quantity, remaining);

            batch.quantity = batch.quantity - take;
            await batch.save();

            await Transaction.create({
                medicineId: medicineId,
                batchId: batch._id,
                batchNumber: batch.batchNumber,
                type: "OUT",
                quantity: take,
            });

            batchesUsed.push({
                batchNumber: batch.batchNumber,
                quantityTaken: take,
                quantityLeft: batch.quantity,
            });

            remaining = remaining - take;
        }

        res.status(200).json({
            message: "Stock removed",
            medicineId: medicineId,
            totalQuantity: quantity,
            batchesUsed: batchesUsed,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { stockIn, stockOut };