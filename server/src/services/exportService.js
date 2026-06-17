const db = require("../database/db");
const ExcelJS = require("exceljs");

const exportAllInventory = async () => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Inventory");

  worksheet.columns = [
    { header: "Asset Tag", key: "AssetTag", width: 20 },
    { header: "Asset Type", key: "AssetTypeName", width: 20 },
    { header: "Manufacturer", key: "Manufacturer", width: 20 },
    { header: "Serial Number", key: "SerialNumber", width: 25 },
    { header: "Status", key: "Status", width: 15 },
    { header: "Assigned To", key: "AssignedEmployeeName", width: 30 },
    { header: "Location", key: "CurrentLocation", width: 20 }
  ];

  const sql = `
    SELECT
      I.*,
      AT.Name AS AssetTypeName,
      E.FirstName || ' ' || E.LastName AS AssignedEmployeeName
    FROM Inventory I
    LEFT JOIN AssetTypes AT
      ON I.AssetTypeId = AT.Id
    LEFT JOIN Employees E
      ON I.AssignedEmployeeId = E.Id
    ORDER BY I.AssetTag
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [], async (err, rows) => {
      if (err) return reject(err);

      rows.forEach(row => worksheet.addRow(row));

      const buffer = await workbook.xlsx.writeBuffer();

      resolve(buffer);
    });
  });
};

const exportAssignedInventory = async () => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Assigned Assets");

  worksheet.columns = [
    { header: "Asset Tag", key: "AssetTag", width: 20 },
    { header: "Asset Type", key: "AssetTypeName", width: 20 },
    { header: "Employee", key: "EmployeeName", width: 30 },
    { header: "Manufacturer", key: "Manufacturer", width: 20 },
    { header: "Serial Number", key: "SerialNumber", width: 25 },
    { header: "Assigned Date", key: "DateAssigned", width: 20 }
  ];

  const sql = `
    SELECT
      I.*,
      AT.Name AS AssetTypeName,
      E.FirstName || ' ' || E.LastName AS EmployeeName
    FROM Inventory I
    LEFT JOIN AssetTypes AT
      ON I.AssetTypeId = AT.Id
    LEFT JOIN Employees E
      ON I.AssignedEmployeeId = E.Id
    WHERE
      I.AssignedEmployeeId IS NOT NULL
      AND I.Status <> 'Deleted'
    ORDER BY EmployeeName, I.AssetTag
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [], async (err, rows) => {
      if (err) return reject(err);

      rows.forEach(row => worksheet.addRow(row));

      const buffer = await workbook.xlsx.writeBuffer();

      resolve(buffer);
    });
  });
};

const exportAvailableInventory = async () => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Unassigned Assets");

  worksheet.columns = [
    { header: "Asset Tag", key: "AssetTag", width: 20 },
    { header: "Asset Type", key: "AssetTypeName", width: 20 },
    { header: "Manufacturer", key: "Manufacturer", width: 20 },
    { header: "Serial Number", key: "SerialNumber", width: 25 },
    { header: "Location", key: "CurrentLocation", width: 20 }
  ];

  const sql = `
    SELECT
      I.*,
      AT.Name AS AssetTypeName
    FROM Inventory I
    LEFT JOIN AssetTypes AT
      ON I.AssetTypeId = AT.Id
    WHERE
      I.AssignedEmployeeId IS NULL
      AND I.Status <> 'Deleted'
    ORDER BY I.AssetTag
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [], async (err, rows) => {
      if (err) return reject(err);

      rows.forEach(row => worksheet.addRow(row));

      const buffer = await workbook.xlsx.writeBuffer();

      resolve(buffer);
    });
  });
};

module.exports = {
  exportAllInventory,
  exportAssignedInventory,
  exportAvailableInventory
};