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
  getAvailableInventoryByAssetTypeId,
  returnInventoryItem,
  getDeletedInventory,
  getAllAssignedInventory,
  getAssignedInventoryFiltered
 
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


// Get all assigned inventory 
router.get("/assigned", authMiddleware, async (req, res) => {
    try {
      const assets = await getAllAssignedInventory();
      res.json(assets);

    } catch (err) {
      res.status(500).json({ message: err.message});
    }
  }
);



// Reassign Inventory Item 
router.post("/reassign", authMiddleware, async (req, res) => {
  try {

    const user = req.user;

    const result = await assignInventoryItem({
      InventoryId: req.body.InventoryId,
      AssignedEmployeeId: req.body.NewEmployeeId,
      DateAssigned: new Date().toISOString()
    });

    await addInventoryHistory({
      InventoryId: req.body.InventoryId,
      ActionType: "REASSIGNED",
      OldEmployeeId: req.body.OldEmployeeId,
      NewEmployeeId: req.body.NewEmployeeId,
      Notes: req.body.Notes || "Asset reassigned",
      CreatedByLoginUserId: user.id
    });

    res.json({
      message: "Asset reassigned successfully",
      changes: result.changes
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});




// Get Deleted Inventory 
router.get("/deleted", authMiddleware, async (req, res) => {
  try {
    const items = await getDeletedInventory();
    res.json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
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




// Get all inventory filtered 
router.get("/assigned/filter", authMiddleware, async (req, res) => {
    try {
      const assets = await getAssignedInventoryFiltered(req.query.employeeId, req.query.assetTypeId);
      res.json(assets);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);




// Get Available Inventory By Asset Type Id 
router.get("/available/:id", authMiddleware, async (req, res) => {
  try {
    const assets = await getAvailableInventoryByAssetTypeId(req.params.id);  
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

    if (err.message.includes("UNIQUE")) {
      return res.status(400).json({
        message: "An Asset with this Asset Tag already exists."
      }); 
    }
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



// Return asset to storage
router.post("/return", authMiddleware, async (req, res) => {
  try {

    const user = req.user;

    const result = await returnInventoryItem(
      req.body.InventoryId
    );

    await addInventoryHistory({
      InventoryId: req.body.InventoryId,
      ActionType: "RETURNED_TO_STORAGE",
      OldEmployeeId: req.body.EmployeeId,
      NewEmployeeId: null,
      Notes: req.body.Notes || "Returned to storage",
      CreatedByLoginUserId: user.id
    });

    res.json({
      message: "Asset returned to storage",
      changes: result.changes
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

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
    const user = req.user;

    // Get asset before deleting
    const asset =
      await getInventoryItemById(
        req.params.id
      );

    // Perform delete
    const result =
      await deleteInventoryItem(
        req.params.id
      );

    // Write history
    await addInventoryHistory({
      InventoryId: req.params.id,
      ActionType: "DELETED",
      OldEmployeeId: asset.AssignedEmployeeId,
      NewEmployeeId: null,
      Notes: "Asset deleted",
      CreatedByLoginUserId: user.id
    });

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