const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  exportAllInventory,
  exportAssignedInventory,
  exportAvailableInventory
} = require("../services/exportService");




router.get("/inventory", authMiddleware, async (req, res) => {
  const buffer = await exportAllInventory();

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Inventory.xlsx"
  );

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.send(buffer);
});




router.get("/inventory/assigned", authMiddleware, async (req, res) => {
  const buffer = await exportAssignedInventory();

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=AssignedAssets.xlsx"
  );

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.send(buffer);
});




router.get("/inventory/available", authMiddleware, async (req, res) => {
  const buffer = await exportAvailableInventory();

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=UnassignedAssets.xlsx"
  );

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.send(buffer);
});


// router.get("/inventory/available", authMiddleware, async (req, res) => {
//   try {

//     const { assetTypeId } = req.query;

//     let assets;

//     if (assetTypeId) {
//       assets = await getAvailableInventoryByAssetTypeId(assetTypeId);
//     } else {
//       assets = await getAvailableInventory();
//     }

//     // build excel from assets
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet("Unassigned Assets");

//     sheet.columns = [
//       { header: "Asset Tag", key: "AssetTag" },
//       { header: "Type", key: "AssetTypeName" },
//       { header: "Manufacturer", key: "Manufacturer" },
//       { header: "Serial Number", key: "SerialNumber" },
//       { header: "Status", key: "Status" }
//     ];

//     assets.forEach(a => sheet.addRow(a));

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );

//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=UnassignedAssets.xlsx"
//     );

//     await workbook.xlsx.write(res);
//     res.end();

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });







module.exports = router;