const Batch = require("../models/Batch");
const Medicine = require("../models/Medicine");

const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day

// GET /api/alerts/expired
// Batches whose expiryDate is before today (only if they still have stock)
const getExpired = async (req, res) => {
    try {
        const today = new Date();

        const batches = await Batch.find({
            expiryDate: { $lt: today },
            quantity: { $gt: 0 },
        }).sort({ expiryDate: 1 });

        const medicines = await Medicine.find();

        const result = [];
        for (const batch of batches) {
            const medicine = medicines.find((m) => m.medicineId === batch.medicineId);

            result.push({
                medicineId: batch.medicineId,
                medicineName: medicine ? medicine.name : "Unknown",
                batchNumber: batch.batchNumber,
                quantity: batch.quantity,
                expiryDate: batch.expiryDate,
                daysExpired: Math.floor((today - batch.expiryDate) / ONE_DAY),
            });
        }

        res.status(200).json({ count: result.length, expiredBatches: result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/alerts/expiring-soon
// Not expired yet, but expires within the next 30 days
const getExpiringSoon = async (req, res) => {
    try {
        const today = new Date();
        const in30Days = new Date(today.getTime() + 30 * ONE_DAY);

        const batches = await Batch.find({
            expiryDate: { $gte: today, $lte: in30Days },
            quantity: { $gt: 0 },
        }).sort({ expiryDate: 1 });

        const medicines = await Medicine.find();

        const result = [];
        for (const batch of batches) {
            const medicine = medicines.find((m) => m.medicineId === batch.medicineId);

            result.push({
                medicineId: batch.medicineId,
                medicineName: medicine ? medicine.name : "Unknown",
                batchNumber: batch.batchNumber,
                quantity: batch.quantity,
                expiryDate: batch.expiryDate,
                daysLeft: Math.ceil((batch.expiryDate - today) / ONE_DAY),
            });
        }

        res.status(200).json({ count: result.length, expiringSoonBatches: result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/alerts/low-stock
// Total valid (not expired) quantity <= minimumStock
const getLowStock = async (req, res) => {
    try {
        const today = new Date();

        // 1. Get all batches that are NOT expired
        const validBatches = await Batch.find({ expiryDate: { $gte: today } });

        // 2. Add up the quantity for each medicine
        const totals = {}; // example: { MED001: 80, MED002: 10 }
        for (const batch of validBatches) {
            if (!totals[batch.medicineId]) {
                totals[batch.medicineId] = 0;
            }
            totals[batch.medicineId] = totals[batch.medicineId] + batch.quantity;
        }

        // 3. Compare each medicine's total with its minimumStock
        const medicines = await Medicine.find();

        const result = [];
        for (const medicine of medicines) {
            const totalStock = totals[medicine.medicineId] || 0;

            if (totalStock <= medicine.minimumStock) {
                result.push({
                    medicineId: medicine.medicineId,
                    name: medicine.name,
                    totalStock: totalStock,
                    minimumStock: medicine.minimumStock,
                });
            }
        }

        res.status(200).json({ count: result.length, lowStockMedicines: result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getExpired, getExpiringSoon, getLowStock };