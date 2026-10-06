const Transaction = require("../models/Transaction");
const Medicine = require("../models/Medicine");

// Helper: builds the filter from the URL query (?type=IN&startDate=2026-10-01&endDate=2026-10-31)
// It returns { filter, error }
const buildFilter = (query) => {
    const filter = {};

    // Filter by type (IN or OUT)
    if (query.type) {
        const type = query.type.toUpperCase();
        if (type !== "IN" && type !== "OUT") {
            return { error: "type must be IN or OUT" };
        }
        filter.type = type;
    }

    // Filter by date range (format: YYYY-MM-DD)
    if (query.startDate || query.endDate) {
        filter.date = {};

        if (query.startDate) {
            const start = new Date(query.startDate);
            if (isNaN(start)) {
                return { error: "startDate is not a valid date. Use YYYY-MM-DD" };
            }
            filter.date.$gte = start; // date is greater than or equal to start
        }

        if (query.endDate) {
            const end = new Date(query.endDate);
            if (isNaN(end)) {
                return { error: "endDate is not a valid date. Use YYYY-MM-DD" };
            }
            end.setUTCHours(23, 59, 59, 999); // include the whole end day
            filter.date.$lte = end; // date is less than or equal to end
        }
    }

    return { filter };
};

// GET /api/transactions
// Optional: ?type=IN  ?startDate=2026-10-01&endDate=2026-10-31
const getTransactions = async (req, res) => {
    try {
        const { filter, error } = buildFilter(req.query);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 }); // newest first

        res.status(200).json({ count: transactions.length, transactions });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/transactions/medicine/MED001
// Same filters work here too
const getTransactionsByMedicine = async (req, res) => {
    try {
        // Medicine must exist
        const medicine = await Medicine.findOne({ medicineId: req.params.medicineId });
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        const { filter, error } = buildFilter(req.query);
        if (error) {
            return res.status(400).json({ message: error });
        }

        // Only this medicine's transactions
        filter.medicineId = req.params.medicineId;

        const transactions = await Transaction.find(filter).sort({ date: -1 });

        res.status(200).json({ count: transactions.length, transactions });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getTransactions, getTransactionsByMedicine };