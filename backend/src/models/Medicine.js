const mongoose = require("mongoose");

const DOSAGE_FORMS = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Ointment",
    "Drops",
    "Inhaler",
    "Cream",
    "Suppository",
    "Other",
];

const medicineSchema = new mongoose.Schema(
    {
        medicineId: {
            type: String,
            required: [true, "Medicine ID is required"],
            unique: true,
            trim: true,
            uppercase: true, // MED001 and med001 are treated as the same ID
        },

        name: {
            type: String,
            required: [true, "Medicine name is required"],
            trim: true,
            maxlength: [150, "Medicine name is too long"],
            index: true, // faster search by name
        },

        dosageForm: {
            type: String,
            required: [true, "Dosage form is required"],
            trim: true,
            enum: {
                values: DOSAGE_FORMS,
                message: "{VALUE} is not a valid dosage form",
            },
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            index: true, // faster filtering by category
        },

        manufacturer: {
            type: String,
            required: [true, "Manufacturer is required"],
            trim: true,
        },

        unit: {
            type: String,
            required: [true, "Unit is required"],
            trim: true,
        },

        minimumStock: {
            type: Number,
            default: 10,
            min: [0, "Minimum stock cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Minimum stock must be a whole number",
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);