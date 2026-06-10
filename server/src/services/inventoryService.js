const db = require("../database/db");
// const { get } = require("../routes/employeeRoutes");

// GET all inventory items
const getAllInventory = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        i.*,
        e.FirstName || ' ' || e.LastName AS AssignedEmployeeName
      FROM Inventory i
      LEFT JOIN Employees e ON i.AssignedEmployeeId = e.Id
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};



// Get Single Inventory Item by Id
const getInventoryItemById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM Inventory Where Id = ?`

      db.get(sql, [id], (err, rows) => {
        if (err) return reject(err); 
        resolve(rows); 
      });
  });
};



// Create new inventory item
const createInventoryItem = (item) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Inventory 
      (AssetTag, AssetTypeId, Manufacturer, SerialNumber, PurchaseDate, Status, AssignedEmployeeId, DateAssigned, Condition, CurrentLocation, Notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      item.AssetTag,
      item.AssetTypeId,
      item.Manufacturer,
      item.SerialNumber,
      item.PurchaseDate,
      item.Status,
      item.AssignedEmployeeId || null,
      item.DateAssigned || null,
      item.Condition,
      item.CurrentLocation,
      item.Notes
    ];

    db.run(sql, params, function (err) {
      if (err) return reject(err);

      resolve({
        Id: this.lastID,
        ...item
      });
    });
  });
};






// Assign inventory item to employee
const assignInventoryItem = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Inventory
      SET 
        AssignedEmployeeId = ?,
        DateAssigned = ?
      WHERE Id = ?
    `;

    const params = [
      data.AssignedEmployeeId,
      data.DateAssigned,
      data.InventoryId
    ];

    db.run(sql, params, function (err) {
      if (err) return reject(err);

      resolve({
        changes: this.changes
      });
    });
  });
};

// Once the ability to add inventory is in the frontend, update this to 'Where Id = ? AND AssignedEmployeeId IS NULL AND Status = 'Active' to prevent assigning already assigned or deleted assets



// Get Available Inventory Items (not assigned and not deleted)
const getAvailableInventory = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT * FROM Inventory 
    WHERE 
      AssignedEmployeeId IS NULL
      AND Status != 'Deleted'
    ORDER BY AssetTag 
    `; 

    db.all(sql, [], (err, rows) => {
      if(err) return reject(err)       
        console.log(rows); 
      resolve(rows); 
    });
  });
};



// Add inventory history record
const addInventoryHistory = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO InventoryHistory
      (InventoryId, ActionType, OldEmployeeId, NewEmployeeId, Notes, CreatedByLoginUserId)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.InventoryId,
      data.ActionType,
      data.OldEmployeeId,
      data.NewEmployeeId,
      data.Notes,
      data.CreatedByLoginUserId
    ];

    db.run(sql, params, function (err) {
      if (err) return reject(err);

      resolve({ Id: this.lastID });
    });
  });
};



const getInventoryHistory = (inventoryId) => {
  return new Promise((resolve, reject) => {

    let sql = `
      SELECT
        h.*,
        e1.FirstName || ' ' || e1.LastName AS OldEmployeeName,
        e2.FirstName || ' ' || e2.LastName AS NewEmployeeName
      FROM InventoryHistory h
      LEFT JOIN Employees e1 ON h.OldEmployeeId = e1.Id
      LEFT JOIN Employees e2 ON h.NewEmployeeId = e2.Id
    `;

    const params = [];

    if (inventoryId) {
      sql += ` WHERE h.InventoryId = ?`;
      params.push(inventoryId);
    }

    sql += ` ORDER BY h.CreatedOn DESC`;

    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};



const updateInventoryItem = (id, data) => {
  return new Promise((resolve, reject) => {
    
    const sql = `
      UPDATE Inventory 
      SET 
        AssetTag = ?,
        AssetTypeId = ?,
        Manufacturer = ?, 
        SerialNumber = ?,
        Status = ?,
        AssignedEmployeeId = ?,
        DateAssigned = ?,
        Condition = ?,
        CurrentLocation = ?,
        Notes = ?
      WHERE Id = ?
      `; 

    const params = [
      data.AssetTag,
      data.AssetTypeId,
      data.Manufacturer,
      data.SerialNumber,
      data.Status,
      data.AssignedEmployeeId || null,
      data.DateAssigned || null,
      data.Condition,
      data.CurrentLocation,
      data.Notes,
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




// Delete Inventory Item 
const deleteInventoryItem = (id) => {
  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE Inventory
      SET Status = "Deleted"
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



// Get Available inventory filtered by asset Type 
const getAvailableInventoryByAssetTypeId = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT I.*, AT.Name AS AssetTypeName 
    FROM Inventory I 
    LEFT JOIN AssetTypes AT ON I.AssetTypeId = AT.Id 
    WHERE (I.AssignedEmployeeId IS NULL OR I.AssignedEmployeeId = 0) 
      AND I.Status <> 'Deleted' 
      AND I.AssetTypeId = ? 
    ORDER BY I.AssetTag    
    `;

    db.all(sql, [id], function(err, rows) {
      if (err) return reject(err)
        resolve(rows);
    });
  });
};


module.exports = {
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
};