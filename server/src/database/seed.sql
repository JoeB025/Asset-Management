DELETE FROM AssetRequestRecord;
DELETE FROM InventoryHistory;
DELETE FROM Inventory;
DELETE FROM LoginUsers; 
DELETE FROM Employees;
DELETE FROM AssetTypes;


DELETE FROM sqlite_sequence WHERE name ='LoginUsers'; 
DELETE FROM sqlite_sequence WHERE name='Inventory';
DELETE FROM sqlite_sequence WHERE name='Employees';
DELETE FROM sqlite_sequence WHERE name='AssetTypes';
DELETE FROM sqlite_sequence WHERE name='InventoryHistory';
DELETE FROM sqlite_sequence WHERE name='AssetRequestRecord';


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
(8, 'Scanner', 1), 
(9, 'HDMI Cable', 1);

-- Employees
INSERT INTO Employees (
FirstName, 
LastName, 
JobTitle, 
Team, 
WorksFromHome, 
Email, 
IsActive)
VALUES

('Administration', 'Account', 'Office Administrator', 'Administration', 0, 'admin@toontown.com', 1),
('Bugs', 'Bunny', 'Account', 'Administration', 0, 'bugs-bunny@toontown.com', 1),
('Daffy', 'Duck', 'Office Administrator', 'Administration', 0, 'daffy-duck@toontown.com', 1),
('Lola', 'Bunny', 'Director', 'Management', 0, 'lola-bunny@toontown.com', 1),
('Porky', 'Pig', 'Director', 'Management', 0, 'porky-pig@toontown.com', 1),
('Elmer', 'Fudd', 'HR Manager', 'Human Resources', 0, 'elmer-fudd@toontown.com', 1),
('Yosemite', 'Sam', 'Central Operations Team Leader', 'Finance', 0, 'yosemite-sam@toontown.com', 1),
('Tweety', 'Bird', 'New Business Administrator', 'New Business', 0, 'tweety-bird@toontown.com', 1),
('Sylvester', 'Cat', 'Client Services Consultant', 'Pensions', 0, 'sylvester-cat@toontown.com', 1),
('Foghorn', 'Leghorn', 'Banking and Payroll Officer', 'Finance', 1, 'foghorn-leghorn@toontown.com', 1),
('Marvin', 'Martian', 'Team Leader', 'Pensions', 0, 'marvin-martian@toontown.com', 1),
('Wile', 'Coyote', 'Compliance Manager', 'Compliance', 0, 'wile-coyote@toontown.com', 1),
('Road', 'Runner', 'Technical Manager', 'Management', 1, 'road-runner@toontown.com', 1),
('Speedy', 'Gonzales', 'Client Services Consultant', 'Pensions', 1, 'speedy-gonzales@toontown.com', 1),
('Taz', 'Devil', 'Client Services Consultant', 'Management', 1, 'taz-devil@toontown.com', 1),
('Granny', 'Granny', 'Account Manager', 'Pensions', 0, 'granny-granny@toontown.com', 1),
('Penelope', 'Pussycat', 'Pension Administrator', 'Pensions', 0, 'penelope-pussycat@toontown.com', 1),
('Gossamer', 'Monster', 'Pension Administrator', 'Pensions', 0, 'gossamer-monster@toontown.com', 1),
('Hector', 'Bulldog', 'Pension Administrator', 'Pensions', 0, 'hector-bulldog@toontown.com', 1),
('Barnyard', 'Dawg', 'Pension Administrator', 'Pensions', 0, 'barnyard-dawg@toontown.com', 1),
('Charlie', 'Dog', 'Pension Administrator', 'Pensions', 0, 'charlie-dog@toontown.com', 1),
('Sam', 'Sheepdog', 'New Business Administrator', 'New Business', 0, 'sam-sheepdog@toontown.com', 1),
('Michigan', 'J.Frog', 'Software Architect', 'IT', 1, 'michigan-j.frog@toontown.com', 1),
('Roger', 'Rabbit', 'Account Manager', 'Pensions', 0, 'roger-rabbit@toontown.com', 1),
('Jessica', 'Rabbit', 'New Business Administrator', 'New Business', 0, 'jessica-rabbit@toontown.com', 1);

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
('PC-1', 1, 'Dell', 'DL-PC-001', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-2', 1, 'Dell', 'DL-PC-002', 'Active', 2, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-3', 1, 'HP', 'HP-PC-003', 'Active', 3, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-4', 1, 'HP', 'HP-PC-004', 'Active', 4, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-5', 1, 'HP', 'HP-PC-005', 'Active', 5, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-6', 1, 'HP', 'HP-PC-006', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-7', 1, 'HP', 'HP-PC-007', 'Active', 6, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-8', 1, 'HP', 'HP-PC-008', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-9', 1, 'HP', 'HP-PC-009', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-10', 1, 'HP', 'HP-PC-010', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-11', 1, 'HP', 'HP-PC-011', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-12', 1, 'HP', 'HP-PC-012', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-13', 1, 'HP', 'HP-PC-013', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-14', 1, 'HP', 'HP-PC-014', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-15', 1, 'HP', 'HP-PC-015', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('TOW-1', 2, 'Lenovo', 'LN-TWR-001', 'Active', NULL, 'New', 'Office', 'Seed tower', datetime('now')),
('TOW-2', 2, 'Lenovo', 'LN-TWR-002', 'Active', 1, 'New', 'Office', 'Seed tower', datetime('now')),
('TOW-3', 2, 'Lenovo', 'LN-TWR-003', 'Active', NULL, 'New', 'Office', 'Seed tower', datetime('now')),
('MON-1', 3, 'Dell', 'DL-MON-001', 'Active', 1, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-2', 3, 'Dell', 'DL-MON-002', 'Active', 2, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-3', 3, 'HP', 'HP-MON-001', 'Active', 2, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-4', 3, 'HP', 'HP-MON-002', 'Active', 2, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-5', 3, 'HP', 'HP-MON-003', 'Active', 3, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-6', 3, 'HP', 'HP-MON-004', 'Active', 3, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-7', 3, 'HP', 'HP-MON-005', 'Active', 4, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-8', 3, 'HP', 'HP-MON-006', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-9', 3, 'HP', 'HP-MON-007', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-10', 3, 'HP', 'HP-MON-008', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-12', 3, 'ACER', 'ACER-MON-001', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-13', 3, 'ACER', 'ACER-MON-002', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-14', 3, 'ACER', 'ACER-MON-003', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-15', 3, 'ACER', 'ACER-MON-004', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-16', 3, 'ACER', 'HP-MON-009', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-17', 3, 'ACER', 'HP-MON-010', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-18', 3, 'ACER', 'HP-MON-011', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('DOC-1', 4, 'HP', 'HP-DOC-001', 'Active', NULL, 'Used', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-2', 4, 'HP', 'HP-DOC-002', 'Active', 1, 'Used', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-3', 4, 'HP', 'HP-DOC-003', 'Active', 2, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-4', 4, 'HP', 'HP-DOC-004', 'Active', 3, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-5', 4, 'HP', 'HP-DOC-005', 'Active', 4, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-6', 4, 'HP', 'HP-DOC-006', 'Active', 5, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-7', 4, 'HP', 'HP-DOC-007', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-8', 4, 'HP', 'HP-DOC-008', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-9', 4, 'HP', 'HP-DOC-009', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-10', 4, 'HP', 'HP-DOC-010', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-11', 4, 'HP', 'HP-DOC-011', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('DOC-12', 4, 'HP', 'HP-DOC-012', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('MOU-001', 5, 'Logitech', 'HP-MSE-001', 'Active', 1, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-002', 5, 'Logitech', 'HP-MSE-002', 'Active', 2, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-003', 5, 'Logitech', 'HP-MSE-003', 'Active', 3, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-004', 5, 'Logitech', 'HP-MSE-004', 'Active', 4, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-005', 5, 'Logitech', 'HP-MSE-005', 'Active', 5, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-006', 5, 'Logitech', 'HP-MSE-006', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-007', 5, 'Logitech', 'HP-MSE-007', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-008', 5, 'Logitech', 'HP-MSE-008', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-009', 5, 'Logitech', 'ACER-MSE-001', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-010', 5, 'Logitech', 'ACER-MSE-002', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-011', 5, 'Logitech', 'ACER-MSE-003', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-012', 5, 'Logitech', 'ACER-MSE-004', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-013', 5, 'Logitech', 'HP-MSE-009', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-014', 5, 'Logitech', 'HP-MSE-010', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-015', 5, 'Logitech', 'HP-MSE-011', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-016', 5, 'Logitech', 'HP-MSE-012', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('KEY-001', 6, 'Logitech', 'LG-KBD-001', 'Active', NULL, 'New', 'Office', 'Seed keyboard', datetime('now')),
('PHN-001', 7, 'Apple', 'IPH-001', 'Active', NULL, 'New', 'Office', 'Seed phone', datetime('now')),
('HDM-001', 9, 'Generic', 'HDM-001', 'Active', NULL, 'New', 'Office', 'Seed HDMI cable', datetime('now'));


INSERT INTO LoginUsers
(
    EmployeeId,
    EmailAddress, 
    Username,
    PasswordHash,
    Role,
    IsActive
)
VALUES
(1, 'admin@toontown.com', 'admin', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Admin', 1),
(2, 'bugs-bunny@toontown.com', 'Bugs Bunny', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Admin', 1),
(24, 'rodger-rabbit@toontown.com', 'Rodger Rabbit', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Compliance', 1),
(25, 'jessica-rabbit@toontown.com', 'Jessica Rabbit', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'The Master', 1),
(3, 'daffy-duck@toontown.com', 'Daffy Duck', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Human Resources', 1);



-- Asset Request Recprd 
INSERT INTO AssetRequestRecord(
EmployeeId, 
AssetTypeId,
DateOfRequest,
RequestedVia, 
ApprovedByLoginUserId,
ApprovedOn, 
Notes,
RequestCompleted
)
VALUES 
(1, 4, datetime('now'), 'Email', 1, datetime('now'), 'Request for xyz equipment', 0),
(2, 7, datetime('now'), 'Email', 1, datetime('now'), 'Request for abc equipment', 0),
(2, 9, datetime('now'), 'Verbal', 1, datetime('now'), 'Request for ... equipment', 0),
(3, 9, datetime('now'), 'Email', 1, datetime('now'), 'Request for x equipment', 0),
(1, 2, datetime('now'), 'Email', 2, datetime('now'), 'Request for x equipment', 1),
(1, 3, datetime('now'), 'Email', 3, datetime('now'), 'Request for x equipment', 1),
(4, 7, datetime('now'), 'Email', 2, datetime('now'), 'Request for x equipment', 1);
