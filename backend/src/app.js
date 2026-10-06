// const express = require("express");
// const cors = require("cors");

// // const authMiddleware = require("./middleware/authMiddleware");
// const authMiddleware = require("./middleware/authmiddleware");

// const authRoutes = require("./routes/authroutes");
// const medicineRoutes = require("./routes/medicineroutes");
// const batchRoutes = require("./routes/batchroutes");
// const stockRoutes = require("./routes/stockroutes");
// const transactionRoutes = require("./routes/transactionroutes");
// const alertRoutes = require("./routes/alertroutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/medicines", medicineRoutes);
// app.use("/api/batches", batchRoutes);
// app.use("/api/stock", stockRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/alerts", alertroutes);



// app.get("/api/health", (req, res) => {
//     res.json({ message: "MedStock API is running" });
// });
// app.get("/api/protected", authMiddleware, (req, res) => {
//     res.json({
//         message: "You can access this protected route",
//         user: req.user,
//     });
// });

// module.exports = app;
const express = require("express");
const cors = require("cors");

const authMiddleware = require("./middleware/authmiddleware");

const authRoutes = require("./routes/authroutes");
const medicineRoutes = require("./routes/medicineroutes");
const batchRoutes = require("./routes/batchroutes");
const stockRoutes = require("./routes/stockroutes");
const transactionRoutes = require("./routes/transactionroutes");
const alertRoutes = require("./routes/alertroutes");
const dashboardRoutes = require("./routes/dashboardroutes");
const reorderRoutes = require("./routes/reorderroutes");
const aiRoutes = require("./routes/airoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reorder", reorderRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api/health", (req, res) => {
    res.json({ message: "MedStock API is running" });
});

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You can access this protected route",
        user: req.user,
    });
});

module.exports = app;