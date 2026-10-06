const Medicine = require("../models/Medicine");
const Batch = require("../models/Batch");
const Transaction = require("../models/Transaction");

const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day

// GET /api/dashboard
const getDashboard = async (req, res) => {
    try {
        const today = new Date();
        const in30Days = new Date(today.getTime() + 30 * ONE_DAY);

        const medicines = await Medicine.find();
        const batches = await Batch.find();

        // 1. Total medicines
        const totalMedicines = medicines.length;

        // 2. Go through every batch once
        let totalStock = 0;        // stock of non-expired batches
        let expiredCount = 0;      // expired batches that still have quantity
        let expiringSoonCount = 0; // batches expiring within 30 days
        const stockByMedicine = {}; // example: { MED001: 80, MED002: 10 }

        for (const batch of batches) {
            if (batch.expiryDate < today) {
                // expired batch
                if (batch.quantity > 0) {
                    expiredCount = expiredCount + 1;
                }
            } else {
                // valid batch
                totalStock = totalStock + batch.quantity;

                if (!stockByMedicine[batch.medicineId]) {
                    stockByMedicine[batch.medicineId] = 0;
                }
                stockByMedicine[batch.medicineId] = stockByMedicine[batch.medicineId] + batch.quantity;

                if (batch.quantity > 0 && batch.expiryDate <= in30Days) {
                    expiringSoonCount = expiringSoonCount + 1;
                }
            }
        }

        // 3. Go through every medicine: low stock count and category summary
        let lowStockCount = 0;
        const categories = {}; // example: { Painkiller: { category, medicineCount, totalStock } }

        for (const medicine of medicines) {
            const stock = stockByMedicine[medicine.medicineId] || 0;

            if (stock <= medicine.minimumStock) {
                lowStockCount = lowStockCount + 1;
            }

            const categoryName = medicine.category || "Uncategorized";
            if (!categories[categoryName]) {
                categories[categoryName] = { category: categoryName, medicineCount: 0, totalStock: 0 };
            }
            categories[categoryName].medicineCount = categories[categoryName].medicineCount + 1;
            categories[categoryName].totalStock = categories[categoryName].totalStock + stock;
        }

        const categorySummary = Object.values(categories); // turn the object into a list

        // 4. Stock IN and OUT totals from the transaction history
        const transactions = await Transaction.find();
        let stockInTotal = 0;
        let stockOutTotal = 0;

        for (const t of transactions) {
            if (t.type === "IN") {
                stockInTotal = stockInTotal + t.quantity;
            } else {
                stockOutTotal = stockOutTotal + t.quantity;
            }
        }

        // 5. Last 5 transactions, newest first
        const recentTransactions = await Transaction.find().sort({ date: -1 }).limit(5);

        res.status(200).json({
            totalMedicines,
            totalStock,
            lowStockCount,
            expiredCount,
            expiringSoonCount,
            stockInTotal,
            stockOutTotal,
            recentTransactions,
            categorySummary,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getDashboard };