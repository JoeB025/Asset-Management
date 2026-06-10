const db = require("../database/db");
// const { get } = require("../routes/employeeRoutes");



// Get all employees
const getAllEmployees = () => {
  return new Promise((resolve, reject) => {

    const sql = `
      SELECT *
      FROM Employees
      WHERE IsActive = 1
      ORDER BY LastName, FirstName
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });

  });
};



// Get Employee by Id
const getEmployeeById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT *
      FROM Employees
      WHERE Id = ?
    `;
    db.get(sql, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};



// Post Employees
const createEmployee = (employee) => {
  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO Employees
      (
        FirstName,
        LastName,
        JobTitle,
        Team,
        WorksFromHome,
        Email
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      employee.FirstName,
      employee.LastName,
      employee.JobTitle,
      employee.Team,
      employee.WorksFromHome || 0,
      employee.Email
    ];

    db.run(sql, params, function(err) {

      if (err) return reject(err);

      resolve({
        Id: this.lastID,
        ...employee
      });

    });

  });
};



// Delete Employee (soft delete by setting IsActive to 0)
const deleteEmployee = (id) => {
  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE Employees
      SET IsActive = 0
      WHERE Id = ?
    `;

    db.run(sql, [id], function(err) {

      if (err) return reject(err);

      resolve({
        changes: this.changes
      });

    });

  });
};




// Update Employee
const updateEmployee = (id, employee) => {
  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE Employees
      SET
        FirstName = ?,
        LastName = ?,
        JobTitle = ?,
        Team = ?,
        WorksFromHome = ?,
        Email = ?
      WHERE Id = ?
    `;

    const params = [
      employee.FirstName,
      employee.LastName,
      employee.JobTitle,
      employee.Team,
      employee.WorksFromHome,
      employee.Email,
      id
    ];
    
    db.run(sql, params, function(err) {
      if (err) return reject(err);
      resolve({
        changes: this.changes
      });
    });
  });
};


// Get Employee Assets By Employee Id 
const getEmployeeAssets = (employeeId) => {
  return new Promise((resolve, reject) => {

    db.all(
      `
      SELECT
        Id,
        AssetTag,
        Manufacturer,
        Status,
        Condition,
        CurrentLocation
      FROM Inventory
      WHERE AssignedEmployeeId = ?
      AND Status <> 'Deleted'
      `,
      [employeeId], (err, rows) => {
        if (err) return reject(err); 

        resolve(rows); 
      }
    );
  });
};



module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeAssets
};
