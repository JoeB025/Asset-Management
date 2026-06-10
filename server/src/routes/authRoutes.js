const express = require("express");
const router = express.Router();

const { login } = require("../services/authService");

console.log("AUTH ROUTES LOADED");

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body.username, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;