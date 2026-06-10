const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getAllEmployees, getEmployeeById, createEmployee, deleteEmployee, updateEmployee, getEmployeeAssets } = require("../services/employeeService");


// Get All Employees
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// Get Employee by Id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});



// Post new Employee
router.post("/", authMiddleware, async (req, res) => {
  try {
    const employee = await createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// Delete Employee
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await deleteEmployee(req.params.id);
    res.json({
      message: "Employee deleted successfully",
      changes: result.changes
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// update Employee
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await updateEmployee(req.params.id, req.body);
    res.json({
      message: "Employee updated successfully",
      changes: result.changes
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// Get Employee Assets by Employee Id
router.get("/:id/assets", authMiddleware, async (req, res) => {
  try {
    const assets = await getEmployeeAssets(req.params.id);
    res.json(assets);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


module.exports = router;