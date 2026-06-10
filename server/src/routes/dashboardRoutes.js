const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getDashboardStats } = require("../services/dashboardService");

router.get("/", authMiddleware, async (req, res) => {

  try {

    const stats = await getDashboardStats();

    res.json(stats);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;