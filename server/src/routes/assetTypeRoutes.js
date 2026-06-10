const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllAssetTypes,
  createAssetType,
  deleteAssetType,
  updateAssetType,
  getAssetTypeByTypeId
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



// Delete AssetType ( Soft Delete )
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const result = await deleteAssetType(req.params.id); 
        res.json({
            message: "Asset Type Successfully Deleted",
            changes: result.changes
        });
    } catch (err) {
            res.status(500).json({
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