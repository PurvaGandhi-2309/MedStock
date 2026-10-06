const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    medicineId: { type: String, required: true },   // example: MED001
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true }, // saved automatically, you never type it
    batchNumber: { type: String },                  // example: B001 (so records are easy to read)
    type: { type: String, enum: ["IN", "OUT"], required: true },
    quantity: { type: Number, required: true, min: 1 },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);