const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllAssetTypes,
  createAssetType,
  deleteAssetType,
  updateAssetType,
  getAssetTypeByTypeId,
  canDeleteAssetType
} = require("../services/assetTypeService");


router.get("/", authMiddleware, async (req, res) => {
  try {
    const assetTypes = await getAllAssetTypes();
    res.json(assetTypes);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const assetType = await createAssetType(req.body.Name);
    res.status(201).json(assetType);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const canDelete = await canDeleteAssetType(req.params.id); 

    // check if there is still inventory for that asset type. if so, do not allow deletion 
    if (!canDelete) {
      return res.status(400).json({
        message: "Cannot delete asset type when inventory for this type still exists"
      }); 
    }

    // If no inventory is assigned for that asset type, the user can delete the type 
    const result = await deleteAssetType(req.params.id); 
    res.json({
      message: "Asset Type Successfully Deleted",
      changes: result.changes
    });

  } catch (err) {
    res.statys(500).json({
      message: err.message 
    });
  }
});



router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const result = await updateAssetType(req.params.id, req.body); 
        res.json({
            message: "Asset Type Successfully Updated",
            changes: result.changes
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})


router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await getAssetTypeByTypeId(req.params.id); 
    if (!result) {
      return res.status(404).json({
        message: "No Asset Types Found"
      }); 
    }
    res.json(result); 
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  };
});






module.exports = router;