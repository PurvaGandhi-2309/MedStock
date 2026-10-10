const Medicine = require("../models/Medicine");
const Batch = require("../models/Batch");
const Transaction = require("../models/Transaction");

const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day

const User = require("../models/User");

// GET /api/dashboard
const getDashboard = async (req, res) => {
    try {
        let userName = "Pharmacist";
        if (req.user && req.user.id) {
            const user = await User.findById(req.user.id);
            if (user) userName = user.name;
        }

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

        // 4. Stock IN and OUT totals and 7-day daily stats
        const transactions = await Transaction.find();
        let stockInTotal = 0;
        let stockOutTotal = 0;

        // Initialize daily stats for the last 7 days
        const dailyStatsMap = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            dailyStatsMap[dateStr] = { date: dateStr, in: 0, out: 0 };
        }

        for (const t of transactions) {
            if (t.type === "IN") {
                stockInTotal = stockInTotal + t.quantity;
            } else {
                stockOutTotal = stockOutTotal + t.quantity;
            }

            // Aggregate daily stats
            const tDateStr = t.date.toISOString().split('T')[0];
            if (dailyStatsMap[tDateStr]) {
                if (t.type === "IN") dailyStatsMap[tDateStr].in += t.quantity;
                else dailyStatsMap[tDateStr].out += t.quantity;
            }
        }
        
        const dailyStats = Object.values(dailyStatsMap);

        // 5. Last 5 transactions, newest first
        const transactionsList = await Transaction.find().sort({ date: -1 }).limit(5);
        const recentTransactions = transactionsList.map(t => {
            const med = medicines.find(m => m.medicineId === t.medicineId);
            return {
                id: t._id,
                type: t.type,
                medicineName: med ? med.name : t.medicineId,
                quantity: t.quantity,
                date: t.date
            };
        });

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
            categorySummary,
            dailyStats,
            userName
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getDashboard };