const express = require("express"); 
const router = express.Router(); 

const authMiddleware = require("../middleware/authMiddleware"); 

const {
    getAllAssetRequests,
    getAssetRequestById,
    createAssetRequest,
    deleteAssetRequest,
    completeAssetRequest
} = require("../services/assetRequestService"); 



// Get All Asset Request 
router.get("/", authMiddleware, async (req, res) => {
    try {
        const assetRequests = await getAllAssetRequests(); 
        res.json(assetRequests); 
    } catch (err) {
        res.status(500).json({
            message: err.message 
        });
    }
});


// Get Asset Request By Id
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const assetRequest = await getAssetRequestById(req.params.id); 
        return res.json(assetRequest)
    } catch (err) {
        return res.status(500).json({
            message: err.message 
        });
    }
});


// Create Asset Request 
router.post("/", authMiddleware, async (req, res) => {
  try {
    const request =
      await createAssetRequest({
        EmployeeId: req.body.EmployeeId,
        AssetTypeId: req.body.AssetTypeId,
        DateOfRequest: new Date().toISOString(),
        RequestedVia: req.body.RequestedVia,
        Notes: req.body.Notes
      });

    res.status(201).json(request);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
});



// Complete Asset Request 
router.put("/:id/complete", authMiddleware, async (req, res) => {
  try {

    const result =
      await completeAssetRequest(
        req.params.id,
        {
          ApprovedByLoginUserId: req.user.username,
          ApprovedOn: new Date().toISOString()
        }
      );

    res.json(result);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
});



// Delete Asset Request 
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const result =
      await deleteAssetRequest(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


module.exports = router;  