const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
    {
        medicineId: { type: String, required: true },      // example: MED001
        batchNumber: { type: String, required: true },     // example: B001
        quantity: { type: Number, required: true, min: 0 },
        purchasePrice: { type: Number, required: true, min: 0 },
        sellingPrice: { type: Number, required: true, min: 0 },
        supplier: { type: String },
        expiryDate: { type: Date, required: true },
    },
    { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("Batch", batchSchema);