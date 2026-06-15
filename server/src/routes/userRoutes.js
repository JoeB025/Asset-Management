const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getAllUsers,
  createUser,
  disableUser,
  resetPassword
} = require("../services/userService");

const {
  hashPassword
} = require("../utils/hash");


// get users 
router.get("/",authMiddleware, async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);



// post new user 
router.post("/",authMiddleware, async (req, res) => {
    try {
      const passwordHash = await hashPassword(req.body.Password);

      const result =
        await createUser({
          EmployeeId: req.body.EmployeeId,
          EmailAddress: req.body.EmailAddress, 
          Username: req.body.Username,
          PasswordHash: passwordHash,
          Role: req.body.Role
        });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);



// Disable user 
router.put("/:id/disable", authMiddleware, async (req, res) => {
    try {
      const result = await disableUser(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);



// Reset user password 
router.put("/:id/reset-password", authMiddleware, async (req, res) => {
    try {

      const passwordHash = await hashPassword(req.body.Password);
      const result = await resetPassword(req.params.id, passwordHash);
      res.json(result);

    } catch (err) {

      res.status(500).json({message: err.message});
    
    }
  }
);


module.exports = router; 