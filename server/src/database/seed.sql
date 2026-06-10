DELETE FROM InventoryHistory;
DELETE FROM Inventory;
DELETE FROM Employees;
DELETE FROM AssetTypes;

DELETE FROM sqlite_sequence WHERE name='Inventory';
DELETE FROM sqlite_sequence WHERE name='Employees';
DELETE FROM sqlite_sequence WHERE name='AssetTypes';
DELETE FROM sqlite_sequence WHERE name='InventoryHistory';



-- Asset Types
INSERT INTO AssetTypes (Id, Name, IsActive)
VALUES
(1, 'Laptop', 1),
(2, 'Tower', 1), 
(3, 'Monitor', 1),
(4, 'HP Port', 1),
(5, 'Mouse', 1),
(6, 'Keyboard', 1),
(7, 'Phone', 1),
(8, 'HDMI Cable', 1);

-- Employees
INSERT INTO Employees (FirstName, LastName, JobTitle, Team, WorksFromHome, Email, IsActive)
VALUES
('Bugs', 'Bunny', 'HR Manager', 'Human Resources', 0, 'bugs.bunny@test.com', 1),
('Daffy', 'Duck', 'Compliance Manager', 'Compliance', 0, 'daffy.duck@test.com', 1),
('Porky', 'Pig', 'IT Support', 'IT', 0, 'porky.pig@test.com', 1),
('Elmer', 'Fudd', 'Property Technical Executive', 'Property', 1, 'elmer.fudd@test.com', 1),
('Tweety', 'Bird', 'Office Administrator', 'Administration', 0, 'tweety.bird@test.com', 1),
('Sylvester', 'Cat', 'Team Leader', 'Management', 1, 'sylvester.cat@test.com', 1),
('Lola', 'Bunny', 'Client Services Consultant', 'New Business', 1, 'lola.bunny@test.com', 1),
('Yosemite', 'Sam', 'Director', 'Management', 0, 'yosemite.sam@test.com', 1),
('Marvin', 'Martian', 'Technical Manager', 'IT', 0, 'marvin.martian@test.com', 1),
('Foghorn', 'Leghorn', 'Pension Administrator', 'Pensions', 0, 'foghorn.leghorn@test.com', 1);  

-- Inventory
INSERT INTO Inventory (
  AssetTag,
  AssetTypeId,
  Manufacturer,
  SerialNumber,
  Status,
  AssignedEmployeeId,
  Condition,
  CurrentLocation,
  Notes,
  CreatedOn
)
VALUES
('LAP-001', 1, 'Dell', 'DL-PC-001', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('LAP-002', 1, 'Dell', 'DL-PC-002', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('LAP-003', 1, 'HP', 'HP-PC-003', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('LAP-004', 1, 'HP', 'HP-PC-004', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('LAP-005', 1, 'HP', 'HP-PC-005', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('MON-001', 3, 'Dell', 'DL-MON-001', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-002', 3, 'Dell', 'DL-MON-002', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('TOW-001', 2, 'Lenovo', 'LN-TWR-001', 'Active', NULL, 'New', 'Office', 'Seed tower', datetime('now')),
('MOU-001', 5, 'Logitech', 'LG-MSE-001', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('DOC-001', 4, 'HP', 'HP-DOC-001', 'Active', NULL, 'New', 'Office', 'Seed docking station', datetime('now')),
('PHN-001', 7, 'Apple', 'IPH-001', 'Active', NULL, 'New', 'Office', 'Seed phone', datetime('now')),
('HDM-001', 8, 'Generic', 'HDM-001', 'Active', NULL, 'New', 'Office', 'Seed HDMI cable', datetime('now')),
('KEY-001', 6, 'Logitech', 'LG-KBD-001', 'Active', NULL, 'New', 'Office', 'Seed keyboard', datetime('now'));