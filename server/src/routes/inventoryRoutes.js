const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllInventory, 
  getInventoryItemById,
  createInventoryItem,
  assignInventoryItem,
  addInventoryHistory,
  getInventoryHistory,
  updateInventoryItem,
  deleteInventoryItem,
  getAvailableInventory,
  getAvailableInventoryByAssetTypeId
 
} = require("../services/inventoryService");



// GET all inventory (protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await getAllInventory();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get available inventory items (not assigned to anyone)
router.get("/available", authMiddleware, async (req, res) => {
  try {
    const assets = await getAvailableInventory();
    res.json(assets);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get Available Inventory By Asset Type Id 
router.get("/available/:id", authMiddleware, async (req, res) => {
  try {
    const assets = await getAvailableInventoryByAssetTypeId(req.params.id); 
    console.log("-------------------------- Available ---------------------------------");
    console.log(assets); 
    console.log("-------------------------- Available ---------------------------------");
 
    res.json(assets)
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
})


// Get Inventory Item by Id 
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await getInventoryItemById(req.params.id); 
    res.json(item); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
})




// POST new inventory item
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newItem = await createInventoryItem(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Assign inventory item to employee
router.post("/assign", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    // Step 1: update inventory
    const result = await assignInventoryItem(req.body);

    // Step 2: write history log
    await addInventoryHistory({
      InventoryId: req.body.InventoryId,
      ActionType: "ASSIGNED",
      OldEmployeeId: req.body.OldEmployeeId || null,
      NewEmployeeId: req.body.AssignedEmployeeId,
      Notes: req.body.Notes || "Asset assigned",
      CreatedByLoginUserId: user.id
    });

    res.json({
      message: "Asset assigned successfully",
      changes: result.changes
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get inventory history
router.get("/history", authMiddleware, async (req, res) => {
  try {

    const inventoryId = req.query.inventoryId;

    const history = await getInventoryHistory(inventoryId);

    res.json(history);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





// Update Inventory Item 
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await updateInventoryItem(req.params.id, req.body);
        
    res.json({
      message: "Inventory item updated successfully",
      changes: result.changes
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// Delete Inventory Item (soft delete by setting IsActive to 0)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await deleteInventoryItem(req.params.id);
    res.json({
      message: "Inventory item deleted successfully",
      changes: result.changes
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});




module.exports = router;