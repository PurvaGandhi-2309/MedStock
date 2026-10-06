const Medicine = require("../models/Medicine");
const Batch = require("../models/Batch");
const Transaction = require("../models/Transaction");

const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day
const DAYS = 30; // we look at the last 30 days of sales

// GET /api/reorder
const getReorder = async (req, res) => {
    try {
        const today = new Date();
        const startDate = new Date(today.getTime() - DAYS * ONE_DAY); // 30 days ago

        const medicines = await Medicine.find();

        // Only batches that are NOT expired (expired stock can't be sold)
        const validBatches = await Batch.find({ expiryDate: { $gte: today } });

        // Only OUT (sales) transactions from the last 30 days
        const outTransactions = await Transaction.find({
            type: "OUT",
            date: { $gte: startDate },
        });

        // 1. Current stock of each medicine
        const stockByMedicine = {}; // example: { MED001: 80 }
        for (const batch of validBatches) {
            if (!stockByMedicine[batch.medicineId]) {
                stockByMedicine[batch.medicineId] = 0;
            }
            stockByMedicine[batch.medicineId] = stockByMedicine[batch.medicineId] + batch.quantity;
        }

        // 2. Total sold in the last 30 days for each medicine
        const soldByMedicine = {}; // example: { MED001: 90 }
        for (const t of outTransactions) {
            if (!soldByMedicine[t.medicineId]) {
                soldByMedicine[t.medicineId] = 0;
            }
            soldByMedicine[t.medicineId] = soldByMedicine[t.medicineId] + t.quantity;
        }

        // 3. Work out the reorder suggestion for each medicine
        const reorderList = [];

        for (const medicine of medicines) {
            const currentStock = stockByMedicine[medicine.medicineId] || 0;
            const last30DaysSales = soldByMedicine[medicine.medicineId] || 0;

            // average sold per day (rounded to 2 decimals)
            const averageDailySales = Math.round((last30DaysSales / DAYS) * 100) / 100;

            // enough to cover the next 30 days of sales + keep the minimum stock
            const needed = last30DaysSales + medicine.minimumStock - currentStock;

            // if needed is 0 or less, no need to order
            const suggestedReorderQuantity = needed > 0 ? Math.ceil(needed) : 0;

            reorderList.push({
                medicineId: medicine.medicineId,
                name: medicine.name,
                last30DaysSales: last30DaysSales,
                averageDailySales: averageDailySales,
                currentStock: currentStock,
                minimumStock: medicine.minimumStock,
                suggestedReorderQuantity: suggestedReorderQuantity,
                needsReorder: suggestedReorderQuantity > 0,
            });
        }

        // Show the medicines that need the biggest order first
        reorderList.sort((a, b) => b.suggestedReorderQuantity - a.suggestedReorderQuantity);

        res.status(200).json({ count: reorderList.length, reorderList });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getReorder };