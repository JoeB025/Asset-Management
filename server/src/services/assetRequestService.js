const db = require("../database/db");



// Get All Asset Requests 
const getAllAssetRequests = () => {
  return new Promise((resolve, reject) => {

    const sql = `
      SELECT
        r.*,
        e.FirstName || ' ' || e.LastName AS EmployeeName,
        AT.Name AS AssetTypeName,
        LU.Username AS ApprovedBy  
      FROM AssetRequestRecord r
      LEFT JOIN Employees e ON r.EmployeeId = e.Id
      LEFT JOIN AssetTypes AT ON r.AssetTypeId = AT.Id
      LEFT JOIN LoginUsers LU ON r.ApprovedByLoginUserId = LU.Id 
      ORDER BY r.DateOfRequest DESC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);

    });
  });
};



const getAssetRequestById = (id) => {
  return new Promise((resolve, reject) => {

    const sql = `
      SELECT
        r.*,
        e.FirstName || ' ' || e.LastName AS EmployeeName,
        at.Name AS AssetTypeName,
        LU.Username AS ApprovedBy
      FROM AssetRequestRecord r
      LEFT JOIN Employees e ON r.EmployeeId = e.Id
      LEFT JOIN AssetTypes at ON r.AssetTypeId = at.Id
      LEFT JOIN LoginUsers LU ON r.ApprovedByLoginUserId = LU.Id  
      WHERE r.Id = ?
    `;

    db.get(sql, [id], (err, row) => {

      if (err) return reject(err);
      resolve(row);

    });
  });
};




const createAssetRequest = (data) => {
  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO AssetRequestRecord
      (
        EmployeeId,
        AssetTypeId,
        DateOfRequest,
        RequestedVia,
        Notes
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      data.EmployeeId,
      data.AssetTypeId,
      data.DateOfRequest,
      data.RequestedVia,
      data.Notes
    ];

    db.run(sql, params, function(err) {

      if (err) return reject(err);
      resolve({
        Id: this.lastID
      });
    });
  });
};




const completeAssetRequest = (id, data) => {
  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE AssetRequestRecord
      SET
        RequestCompleted = 1,
        ApprovedByLoginUserId = ?,
        ApprovedOn = ?
      WHERE Id = ?
    `;

    const params = [
      data.ApprovedByLoginUserId,
      data.ApprovedOn,
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



const deleteAssetRequest = (id) => {
  return new Promise((resolve, reject) => {

    const sql = `
      DELETE FROM AssetRequestRecord
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





module.exports = {
  getAllAssetRequests,
  createAssetRequest,
  getAssetRequestById,
  completeAssetRequest,
  deleteAssetRequest
};