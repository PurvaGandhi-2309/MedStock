const Medicine = require("../models/Medicine");
// POST /api/medicines
const createMedicine = async (req, res) => {
    try {
        const { medicineId, name, dosageForm, category, manufacturer, unit, minimumStock } = req.body;

        // 1. Check required fields
        if (!medicineId || !name) {
            return res.status(400).json({ message: "medicineId and name are required" });
        }

        // 2. Check minimumStock is not negative
        if (minimumStock < 0) {
            return res.status(400).json({ message: "minimumStock cannot be negative" });
        }

        // 3. Check duplicate medicineId
        const existing = await Medicine.findOne({ medicineId: medicineId });
        if (existing) {
            return res.status(400).json({ message: "medicineId already exists" });
        }

        // 4. Save
        const medicine = await Medicine.create({
            medicineId,
            name,
            dosageForm,
            category,
            manufacturer,
            unit,
            minimumStock,
        });

        res.status(201).json({ message: "Medicine created", medicine });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/medicines
// Optional query: ?search=para&category=Painkiller&dosageForm=Tablet
const getMedicines = async (req, res) => {
    try {
        const { search, category, dosageForm } = req.query;

        // Build a simple filter (exact match)
        const filter = {};
        if (category) filter.category = category;
        if (dosageForm) filter.dosageForm = dosageForm;

        let medicines = await Medicine.find(filter).sort({ createdAt: -1 });

        // Search by name or medicineId using plain JavaScript
        if (search) {
            const text = search.toLowerCase();
            medicines = medicines.filter(
                (m) =>
                    m.name.toLowerCase().includes(text) ||
                    m.medicineId.toLowerCase().includes(text)
            );
        }

        res.status(200).json({ count: medicines.length, medicines });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/medicines/:id
const getMedicineById = async (req, res) => {
    try {
        // const medicine = await Medicine.findById(req.params.id);
        const medicine = await Medicine.findOne({ medicineId: req.params.id });

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json(medicine);
    } catch (error) {
        // CastError means the id format is wrong
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid medicine id" });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT /api/medicines/:id
// PUT /api/medicines/MED001
const updateMedicine = async (req, res) => {
    try {
        // The new values come from the body (what you type in Postman)
        const { medicineId, minimumStock } = req.body;

        // STEP 1: minimumStock must not be negative
        if (minimumStock < 0) {
            return res.status(400).json({ message: "minimumStock cannot be negative" });
        }

        // STEP 2: if the user is changing medicineId to a NEW one,
        // check that no other medicine already uses it.
        // req.params.id is the MED001 written in the URL.
        if (medicineId && medicineId !== req.params.id) {
            const duplicate = await Medicine.findOne({ medicineId: medicineId });
            if (duplicate) {
                return res.status(400).json({ message: "medicineId already used by another medicine" });
            }
        }

        // STEP 3: find the medicine using MED001 from the URL and update it
        // { new: true } means "give me back the updated medicine"
        const medicine = await Medicine.findOneAndUpdate(
            { medicineId: req.params.id },
            req.body,
            { new: true }
        );

        // STEP 4: if no medicine has that medicineId, send 404
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        // STEP 5: success
        res.status(200).json({ message: "Medicine updated", medicine });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// DELETE /api/medicines/:id
const deleteMedicine = async (req, res) => {
    try {
        // const medicine = await Medicine.findByIdAndDelete(req.params.id);
        const medicine = await Medicine.findOneAndDelete({ medicineId: req.params.id })

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json({ message: "Medicine deleted" });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid medicine id" });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
};