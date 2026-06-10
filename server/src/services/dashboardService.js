const db = require("../database/db");

const getDashboardStats = () => {
  return new Promise((resolve, reject) => {

    const stats = {};

    db.get(
      `
      SELECT COUNT(*) AS totalAssets
      FROM Inventory
      `,
      [],
      (err, row) => {

        if (err) return reject(err);

        stats.totalAssets = row.totalAssets;

        db.get(
          `
          SELECT COUNT(*) AS assignedAssets
          FROM Inventory
          WHERE AssignedEmployeeId IS NOT NULL
          AND Status <> 'Deleted'
          `,
          [],
          (err, row) => {

            if (err) return reject(err);

            stats.assignedAssets = row.assignedAssets;

            db.get(
              `
              SELECT COUNT(*) AS unassignedAssets
              FROM Inventory
              WHERE AssignedEmployeeId IS NULL
              AND Status <> 'Deleted'
              `,
              [],
              (err, row) => {

                if (err) return reject(err);

                stats.unassignedAssets = row.unassignedAssets;

                db.get(
                  `
                  SELECT COUNT(*) AS deletedAssets
                  FROM Inventory
                  WHERE Status = 'Deleted'
                  `,
                  [],
                  (err, row) => {

                    if (err) return reject(err);

                    stats.deletedAssets = row.deletedAssets;

                    db.get(
                      `
                      SELECT COUNT(*) AS employees
                      FROM Employees
                      WHERE IsActive = 1
                      `,
                      [],
                      (err, row) => {

                        if (err) return reject(err);

                        stats.employees = row.employees;

                        db.get(
                          `
                          SELECT COUNT(*) AS assetTypes
                          FROM AssetTypes
                          WHERE IsActive = 1
                          `,
                          [],
                          (err, row) => {

                            if (err) return reject(err);

                            stats.assetTypes = row.assetTypes;

                            resolve(stats);

                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );

  });
};

module.exports = {
  getDashboardStats
};