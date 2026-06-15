const db = require("../database/db");



// Get all users 
const getAllUsers = () => {
  return new Promise((resolve, reject) => {

    const sql = `
      SELECT
        lu.*,
        e.FirstName || ' ' || e.LastName AS EmployeeName
      FROM LoginUsers lu
      LEFT JOIN Employees e
        ON lu.EmployeeId = e.Id
      ORDER BY lu.Username
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);

      resolve(rows);
    });
  });
};


// create user 
const createUser = (data) => {
  return new Promise((resolve, reject) => {
    console.log("CREATE USER PAYLOAD:", data);

    const sql = `
      INSERT INTO LoginUsers
      (
        EmployeeId,
        EmailAddress, 
        Username,
        PasswordHash,
        Role,
        IsActive
      )
      VALUES (?, ?, ?, ?, ?, 1)
    `;

    db.run(
      sql,
      [
        data.EmployeeId,
        data.EmailAddress, 
        data.Username,
        data.PasswordHash,
        data.Role
      ],
      function(err) {

        if (err) return reject(err);

        resolve({
          Id: this.lastID
        });
      }
    );
  });
};



// disable user 
const disableUser = (id) => {
  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE LoginUsers
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


// reset password 
const resetPassword = (id, passwordHash) => {
  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE LoginUsers
      SET PasswordHash = ?
      WHERE Id = ?
    `;

    db.run(
      sql,
      [passwordHash, id],
      function(err) {

        if (err) return reject(err);
        resolve({
          changes: this.changes
        });
      }
    );
  });
};



module.exports = {
  getAllUsers,
  createUser,
  disableUser,
  resetPassword
};