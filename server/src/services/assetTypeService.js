const db = require("../database/db");

const getAllAssetTypes = () => {
  return new Promise((resolve, reject) => {

    const sql = `
      SELECT *
      FROM AssetTypes
      WHERE IsActive = 1
      ORDER BY Name
    `;

    db.all(sql, [], (err, rows) => {

      if (err) return reject(err);

      resolve(rows);
    });
  });
};


const getAssetTypeByTypeId = (id) => {
  return new Promise((resolve, reject) => {

    const sql = `
    SELECT * FROM AssetTypes 
    WHERE Id = ? 
    `; 
    
    db.get(sql, [id], function(err, rows) {
      if (err) return reject(err)
        resolve(rows);
    });
  });
};



const createAssetType = (name) => {
  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO AssetTypes (Name)
      VALUES (?)
    `;

    db.run(sql, [name], function(err) {

      if (err) return reject(err);

      resolve({
        Id: this.lastID,
        Name: name
      });

    });

  });
};




// Delete AssetType (soft delete)
const deleteAssetType = (id) => {
    return new Promise((resolve, reject) => {
        const sql =`
        Update AssetTypes 
        Set IsActive = 0
        Where Id = ? 
        `;
        
        db.run(sql, [id], function(err) {
            if (err) return reject(err); 

            resolve({
                changes: this.changes
            });
        });
    });
};


// Update AssetType
const updateAssetType = (id, name) => {
    return new Promise((resolve, reject) => {
        
        const sql = `
        Update AssetTypes
        SET 
            Name = ?
        WHERE Id = ?
        `;

        const params = [
            name.Name,
            id
        ]; 

        db.run(sql, params, function(err) {
            if(err) return reject(err); 
            resolve({
                changes: this.changes
            });
        });
    });
};






module.exports = {
  getAllAssetTypes,
  createAssetType,
  deleteAssetType,
  updateAssetType,
  getAssetTypeByTypeId 
};