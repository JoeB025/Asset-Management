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

('Administration', 'Account', 'Office Administrator', 'Administration', 0, 'admin@whitehallgroup.co.uk', 1),
('Toni', 'Duckworth', 'Office Administrator', 'Administration', 0, 'Toni.Duckworth@whitehallgroup.co.uk', 1),
('Jane', 'Davies', 'Director', 'Management', 0, 'jane.davies@whitehallgroup.co.uk', 1), 
('Richard', 'Mattison', 'Director', 'Management', 0, 'richard.mattison@whitehallgroup.co.uk', 1),
('Joel', 'Garrigan', 'HR Manager', 'Human Resources', 0, 'joel.garrigan@whitehallgroup.co.uk', 1),
('James', 'Latchford', 'Central Operations Team Leader', 'Finance', 0, 'james.latchford@whitehallgroup.co.uk', 1),
('Vanessa', 'Peters', 'New Business Administrator', 'New Business', 0, 'vanessa.peters@whitehallgroup.co.uk', 1),
('Helen', 'White', 'Client Services Consultant', 'Pensions', 0, 'helen.white@whitehallgroup.co.uk', 1),
('Joshua', 'Molloy', 'Banking and Payroll Officer', 'Finance', 1, 'joshua.molloy@whitehallgroup.co.uk', 1), 
('Emma', 'Taylor', 'Team Leader', 'Pensions', 0, 'emma.taylor@whitehallgroup.co.uk', 1),
('Tony', 'Vardy', 'Compliance Manager', 'Compliance', 0, 'tony.vardy@whitehallgroup.co.uk', 1),
('Suzanne', 'Walker', 'Technical Manager', 'Management', 1, 'suzanne.walker@whitehallgroup.co.uk', 1),
('Josh', 'Peel', 'Client Services Consultant', 'Pensions', 1, 'josh.peel@whitehallgroup.co.uk', 1),
('Andrew', 'Gichero', 'Client Services Consultant', 'Management', 1, 'andrew.gichero@whitehallgroup.co.uk', 1),
('Anya', 'Edyvean', 'Account Manager', 'Pensions', 0, 'anya.edyvean@whitehallgroup.co.uk', 1),
('Leoni', 'Whitehead', 'Pension Administrator', 'Pensions', 0, 'leoni.whitehead@whitehallgroup.co.uk', 1),
('Matthew', 'Bolton', 'Pension Administrator', 'Pensions', 0, 'matthew.bolton@whitehallgroup.co.uk', 1),
('Olivia', 'Healey', 'Pension Administrator', 'Pensions', 0, 'olivia.healey@whitehallgroup.co.uk', 1),
('Jasmine', 'Howard', 'Pension Administrator', 'Pensions', 0, 'jasmine.howard@whitehallgroup.co.uk', 1),
('Tegan', 'Lowe', 'Pension Administrator', 'Pensions', 0, 'tegan.lowe@whitehallgroup.co.uk', 1),
('Paul', 'Dootson', 'New Business Administrator', 'New Business', 0, 'paul.dootson@whitehallgroup.co.uk', 1),
('Jon', 'Kelly-Evans', 'Software Architect', 'IT', 1, 'itsupport@whitehallgroup.co.uk', 1),
('Claire', 'Fort', 'Account Manager', 'Pensions', 0, 'claire.fort@whitehallgroup.co.uk', 1),
('Victoria', 'Edwards', 'New Business Administrator', 'New Business', 0, 'victoria.edwards@whitehallgroup.co.uk', 1); 


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
('WHG-PC-1', 1, 'Dell', 'DL-PC-001', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-2', 1, 'Dell', 'DL-PC-002', 'Active', 2, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-3', 1, 'HP', 'HP-PC-003', 'Active', 3, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-4', 1, 'HP', 'HP-PC-004', 'Active', 4, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-5', 1, 'HP', 'HP-PC-005', 'Active', 5, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-6', 1, 'HP', 'HP-PC-006', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-7', 1, 'HP', 'HP-PC-007', 'Active', 6, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-8', 1, 'HP', 'HP-PC-008', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-9', 1, 'HP', 'HP-PC-009', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-10', 1, 'HP', 'HP-PC-010', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-11', 1, 'HP', 'HP-PC-011', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-12', 1, 'HP', 'HP-PC-012', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-13', 1, 'HP', 'HP-PC-013', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-14', 1, 'HP', 'HP-PC-014', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-PC-15', 1, 'HP', 'HP-PC-015', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('WHG-TOW-1', 2, 'Lenovo', 'LN-TWR-001', 'Active', NULL, 'New', 'Office', 'Seed tower', datetime('now')),
('WHG-TOW-2', 2, 'Lenovo', 'LN-TWR-002', 'Active', 1, 'New', 'Office', 'Seed tower', datetime('now')),
('WHG-TOW-3', 2, 'Lenovo', 'LN-TWR-003', 'Active', NULL, 'New', 'Office', 'Seed tower', datetime('now')),
('WHG-MON-1', 3, 'Dell', 'DL-MON-001', 'Active', 1, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-2', 3, 'Dell', 'DL-MON-002', 'Active', 2, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-3', 3, 'HP', 'HP-MON-001', 'Active', 2, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-4', 3, 'HP', 'HP-MON-002', 'Active', 2, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-5', 3, 'HP', 'HP-MON-003', 'Active', 3, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-6', 3, 'HP', 'HP-MON-004', 'Active', 3, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-7', 3, 'HP', 'HP-MON-005', 'Active', 4, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-8', 3, 'HP', 'HP-MON-006', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-9', 3, 'HP', 'HP-MON-007', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-10', 3, 'HP', 'HP-MON-008', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-12', 3, 'ACER', 'ACER-MON-001', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-13', 3, 'ACER', 'ACER-MON-002', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-14', 3, 'ACER', 'ACER-MON-003', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-15', 3, 'ACER', 'ACER-MON-004', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-16', 3, 'ACER', 'HP-MON-009', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-17', 3, 'ACER', 'HP-MON-010', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-MON-18', 3, 'ACER', 'HP-MON-011', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('WHG-DOC-1', 4, 'HP', 'HP-DOC-001', 'Active', NULL, 'Used', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-2', 4, 'HP', 'HP-DOC-002', 'Active', 1, 'Used', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-3', 4, 'HP', 'HP-DOC-003', 'Active', 2, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-4', 4, 'HP', 'HP-DOC-004', 'Active', 3, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-5', 4, 'HP', 'HP-DOC-005', 'Active', 4, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-6', 4, 'HP', 'HP-DOC-006', 'Active', 5, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-7', 4, 'HP', 'HP-DOC-007', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-8', 4, 'HP', 'HP-DOC-008', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-9', 4, 'HP', 'HP-DOC-009', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-10', 4, 'HP', 'HP-DOC-010', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-11', 4, 'HP', 'HP-DOC-011', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-DOC-12', 4, 'HP', 'HP-DOC-012', 'Active', NULL, 'New', 'Office', 'Seed HP Doc', datetime('now')), 
('WHG-MOU-001', 5, 'Logitech', 'HP-MSE-001', 'Active', 1, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-002', 5, 'Logitech', 'HP-MSE-002', 'Active', 2, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-003', 5, 'Logitech', 'HP-MSE-003', 'Active', 3, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-004', 5, 'Logitech', 'HP-MSE-004', 'Active', 4, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-005', 5, 'Logitech', 'HP-MSE-005', 'Active', 5, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-006', 5, 'Logitech', 'HP-MSE-006', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-007', 5, 'Logitech', 'HP-MSE-007', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-008', 5, 'Logitech', 'HP-MSE-008', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-009', 5, 'Logitech', 'ACER-MSE-001', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-010', 5, 'Logitech', 'ACER-MSE-002', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-011', 5, 'Logitech', 'ACER-MSE-003', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-012', 5, 'Logitech', 'ACER-MSE-004', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-013', 5, 'Logitech', 'HP-MSE-009', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-014', 5, 'Logitech', 'HP-MSE-010', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-015', 5, 'Logitech', 'HP-MSE-011', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-MOU-016', 5, 'Logitech', 'HP-MSE-012', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('WHG-KEY-001', 6, 'Logitech', 'LG-KBD-001', 'Active', NULL, 'New', 'Office', 'Seed keyboard', datetime('now')),
('WHG-PHN-001', 7, 'Apple', 'IPH-001', 'Active', NULL, 'New', 'Office', 'Seed phone', datetime('now')),
('WHG-HDM-001', 9, 'Generic', 'HDM-001', 'Active', NULL, 'New', 'Office', 'Seed HDMI cable', datetime('now'));



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
(1, 'admin@whitehallgroup.co.uk', 'admin', '$2b$10$qfacMEiLoDc8bZEzHL8wyeyZdz39YgdJ98AJXZICxIu3SDCgR/sGi', 'Admin', 1),
(2, 'tony.vardy@whitehallgroup.co.uk', 'Tony Vardy', '$2b$10$qfacMEiLoDc8bZEzHL8wyeyZdz39YgdJ98AJXZICxIu3SDCgR/sGi', 'Compliance', 1),
(3, 'itsupport@whitehallgroup.co.uk', 'Jon Kelly-Evans', '$2b$10$qfacMEiLoDc8bZEzHL8wyeyZdz39YgdJ98AJXZICxIu3SDCgR/sGi', 'The Master', 1),
(4, 'joel.garrigan@whitehallgroup.co.uk', 'Joel Garrigan', '$2b$10$qfacMEiLoDc8bZEzHL8wyeyZdz39YgdJ98AJXZICxIu3SDCgR/sGi', 'Human Resources', 1);



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
