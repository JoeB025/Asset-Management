const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const assetTypeRoutes = require("./routes/assetTypeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const assetRequests = require("./routes/assetRequestRoutes"); 

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/asset-types", assetTypeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/assetRequests", assetRequests); 

app.get("/", (req, res) => {
  res.json({ message: "Inventory API running" });
});

module.exports = app;