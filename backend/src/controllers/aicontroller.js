const Medicine = require("../models/Medicine");
const Batch = require("../models/Batch");
const Transaction = require("../models/Transaction");
const { askGemini } = require("../services/geminiservice");

const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day
const DAYS = 30;

// POST /api/ai/inventory-insights
const getInventoryInsights = async (req, res) => {
    try {
        const today = new Date();
        const in30Days = new Date(today.getTime() + DAYS * ONE_DAY);
        const startDate = new Date(today.getTime() - DAYS * ONE_DAY);

        const medicines = await Medicine.find();
        const batches = await Batch.find();
        const outTransactions = await Transaction.find({ type: "OUT", date: { $gte: startDate } });

        // 1. Go through the batches (all numbers are calculated HERE, by the backend)
        let totalStock = 0;
        const stockByMedicine = {};
        const expiredBatches = [];
        const expiringSoonBatches = [];

        for (const batch of batches) {
            if (batch.expiryDate < today) {
                if (batch.quantity > 0) {
                    expiredBatches.push({
                        medicineId: batch.medicineId,
                        batchNumber: batch.batchNumber,
                        quantity: batch.quantity,
                        expiryDate: batch.expiryDate.toISOString().slice(0, 10),
                    });
                }
            } else {
                totalStock = totalStock + batch.quantity;

                if (!stockByMedicine[batch.medicineId]) {
                    stockByMedicine[batch.medicineId] = 0;
                }
                stockByMedicine[batch.medicineId] = stockByMedicine[batch.medicineId] + batch.quantity;

                if (batch.quantity > 0 && batch.expiryDate <= in30Days) {
                    expiringSoonBatches.push({
                        medicineId: batch.medicineId,
                        batchNumber: batch.batchNumber,
                        quantity: batch.quantity,
                        expiryDate: batch.expiryDate.toISOString().slice(0, 10),
                        daysLeft: Math.ceil((batch.expiryDate - today) / ONE_DAY),
                    });
                }
            }
        }

        // 2. Sales of the last 30 days for each medicine
        const soldByMedicine = {};
        for (const t of outTransactions) {
            if (!soldByMedicine[t.medicineId]) {
                soldByMedicine[t.medicineId] = 0;
            }
            soldByMedicine[t.medicineId] = soldByMedicine[t.medicineId] + t.quantity;
        }

        // 3. Numbers for each medicine
        let lowStockCount = 0;
        const medicineStats = [];

        for (const medicine of medicines) {
            const currentStock = stockByMedicine[medicine.medicineId] || 0;
            const last30DaysSales = soldByMedicine[medicine.medicineId] || 0;
            const needed = last30DaysSales + medicine.minimumStock - currentStock;
            const suggestedReorderQuantity = needed > 0 ? Math.ceil(needed) : 0;
            const isLowStock = currentStock <= medicine.minimumStock;

            if (isLowStock) {
                lowStockCount = lowStockCount + 1;
            }

            medicineStats.push({
                medicineId: medicine.medicineId,
                name: medicine.name,
                category: medicine.category,
                currentStock: currentStock,
                minimumStock: medicine.minimumStock,
                last30DaysSales: last30DaysSales,
                suggestedReorderQuantity: suggestedReorderQuantity,
                isLowStock: isLowStock,
            });
        }

        // 4. Put everything in one object (the source of truth)
        const stats = {
            totalMedicines: medicines.length,
            totalStock: totalStock,
            lowStockCount: lowStockCount,
            expiredBatchCount: expiredBatches.length,
            expiringSoonBatchCount: expiringSoonBatches.length,
        };

        const inventoryData = {
            ...stats,
            medicines: medicineStats,
            expiredBatches: expiredBatches,
            expiringSoonBatches: expiringSoonBatches,
        };

        // 5. Write the prompt for Gemini
        const prompt =
            "You are an assistant for a pharmacy inventory system.\n" +
            "Below is inventory data. All numbers were already calculated by the backend.\n" +
            "Do NOT recalculate, change or invent any numbers. Only use the numbers given.\n" +
            "Write short, simple sentences for a pharmacy owner.\n" +
            "Reply ONLY with JSON in exactly this shape:\n" +
            '{"summary": "text", "importantWarnings": ["text"], "reorderSuggestions": ["text"]}\n\n' +
            "Inventory data:\n" +
            JSON.stringify(inventoryData);

        // 6. Ask Gemini
        const answer = await askGemini(prompt);

        // 7. Turn Gemini's text reply into a JSON object
        const cleanAnswer = answer.replace("```json", "").replace("```", "").trim();
        let insights;
        try {
            insights = JSON.parse(cleanAnswer);
            // 8. Send back the backend numbers + Gemini's text
            res.status(200).json({
                stats: stats,
                insights: {
                    summary: insights.summary,
                    importantWarnings: insights.importantWarnings,
                    reorderSuggestions: insights.reorderSuggestions,
                },
            });
        } catch (parseError) {
            // Fallback: If Gemini didn't return valid JSON, just return the raw text as the summary
            console.error("Failed to parse Gemini JSON:", parseError);
            res.status(200).json({
                stats: stats,
                insights: {
                    summary: answer, // Return the raw text
                    importantWarnings: [],
                    reorderSuggestions: []
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: "AI service error", error: error.message });
    }
};

module.exports = { getInventoryInsights };