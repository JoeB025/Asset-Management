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

('Admin', 'Account', 'Office Administrator', 'Administration', 0, 'admin@toontown.com', 1),
('Bugs', 'Bunny', 'Accountant', 'Finance', 0, 'bugs-bunny@toontown.com', 1),
('Daffy', 'Duck', 'Office Administrator', 'Administration', 0, 'daffy-duck@toontown.com', 1),
('Lola', 'Bunny', 'Director', 'Management', 0, 'lola-bunny@toontown.com', 1),
('Porky', 'Pig', 'Director', 'Management', 0, 'porky-pig@toontown.com', 1),
('Elmer', 'Fudd', 'HR Manager', 'Human Resources', 0, 'elmer-fudd@toontown.com', 1),
('Yosemite', 'Sam', 'Operations Supervisor', 'Operations', 0, 'yosemite-sam@toontown.com', 1),
('Tweety', 'Bird', 'Sales Administrator', 'Sales', 0, 'tweety-bird@toontown.com', 1),
('Sylvester', 'Cat', 'Customer Service Representative', 'Customer Service', 0, 'sylvester-cat@toontown.com', 1),
('Foghorn', 'Leghorn', 'Junior Accountant', 'Finance', 1, 'foghorn-leghorn@toontown.com', 1),
('Marvin', 'Martian', 'Team Leader', 'Management', 0, 'marvin-martian@toontown.com', 1),
('Wile', 'Coyote', 'Technical Specialist', 'IT', 0, 'wile-coyote@toontown.com', 1),
('Road', 'Runner', 'Technical Specialist', 'IT', 1, 'road-runner@toontown.com', 1),
('Speedy', 'Gonzales', 'Customer Service Representative', 'Customer Service', 1, 'speedy-gonzales@toontown.com', 1),
('Taz', 'Devil', 'Team Leader', 'Management', 1, 'taz-devil@toontown.com', 1),
('Granny', 'Granny', 'Account Manager', 'Sales', 0, 'granny-granny@toontown.com', 1),
('Penelope', 'Pussycat', 'Administrative Assistant', 'Administration', 0, 'penelope-pussycat@toontown.com', 1),
('Gossamer', 'Monster', 'Administrative Assistant', 'Administration', 0, 'gossamer-monster@toontown.com', 1),
('Hector', 'Bulldog', 'Administrative Assistant', 'Administration', 0, 'hector-bulldog@toontown.com', 1),
('Barnyard', 'Dawg', 'Administrative Assistant', 'Administration', 0, 'barnyard-dawg@toontown.com', 1),
('Charlie', 'Dog', 'Administrative Assistant', 'Administration', 0, 'charlie-dog@toontown.com', 1),
('Sam', 'Sheepdog', 'Sales Administrator', 'Sales', 0, 'sam-sheepdog@toontown.com', 1),
('Michigan', 'J.Frog', 'Software Developer', 'IT', 1, 'michigan-j.frog@toontown.com', 1),
('Roger', 'Rabbit', 'Account Manager', 'Sales', 0, 'roger-rabbit@toontown.com', 1),
('Jessica', 'Rabbit', 'Sales Administrator', 'Sales', 0, 'jessica-rabbit@toontown.com', 1);


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
-- Laptops / PCs
('PC-1', 1, 'Dell', 'DL-XPS-9A12F1', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-2', 1, 'Dell', 'DL-OPT-77B21C', 'Active', 2, 'New', 'Office', 'Issued laptop', datetime('now')),
('PC-3', 1, 'HP', 'HP-ELT-00392X', 'Active', 3, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-4', 1, 'HP', 'HP-PRO-00411Z', 'Active', 4, 'New', 'Office', 'Issued laptop', datetime('now')),
('PC-5', 1, 'Lenovo', 'LN-TNK-005A7Q', 'Active', 5, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-6', 1, 'Lenovo', 'LN-TNK-006B9M', 'Active', NULL, 'New', 'Office', 'Unassigned laptop', datetime('now')),
('PC-7', 1, 'Asus', 'AS-VB-007QW1', 'Active', 6, 'New', 'Office', 'Issued laptop', datetime('now')),
('PC-8', 1, 'Asus', 'AS-ROG-008T2K', 'Active', NULL, 'New', 'Office', 'Spare laptop', datetime('now')),
('PC-9', 1, 'MSI', 'MSI-GF-009L8P', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-10', 1, 'MSI', 'MSI-MP-010Z4Q', 'Active', NULL, 'New', 'Office', 'Spare laptop', datetime('now')),
('PC-11', 1, 'Acer', 'AC-NIT-011R3D', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-12', 1, 'Acer', 'AC-ASP-012M9V', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-13', 1, 'Samsung', 'SM-BK-013F2A', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-14', 1, 'Samsung', 'SM-GX-014H7T', 'Active', NULL, 'New', 'Office', 'Seed laptop', datetime('now')),
('PC-15', 1, 'Microsoft', 'MS-SUR-015P1X', 'Active', NULL, 'New', 'Office', 'Surface device', datetime('now')),

-- Towers
('TOW-1', 2, 'Lenovo', 'LN-TWR-001A9', 'Active', NULL, 'New', 'Office', 'Seed tower', datetime('now')),
('TOW-2', 2, 'Dell', 'DL-TWR-002F3', 'Active', 1, 'New', 'Office', 'Issued tower', datetime('now')),
('TOW-3', 2, 'HP', 'HP-TWR-003Z8', 'Active', NULL, 'New', 'Office', 'Seed tower', datetime('now')),

-- Monitors
('MON-1', 3, 'Dell', 'DL-U241-001X', 'Active', 1, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-2', 3, 'Dell', 'DL-P241-002T', 'Active', 2, 'New', 'Office', 'Issued monitor', datetime('now')),
('MON-3', 3, 'HP', 'HP-Z24-003M', 'Active', 2, 'New', 'Office', 'Issued monitor', datetime('now')),
('MON-4', 3, 'HP', 'HP-Z27-004Q', 'Active', 2, 'New', 'Office', 'Issued monitor', datetime('now')),
('MON-5', 3, 'LG', 'LG-ULTR-005B', 'Active', 3, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-6', 3, 'LG', 'LG-ULTR-006C', 'Active', 3, 'New', 'Office', 'Issued monitor', datetime('now')),
('MON-7', 3, 'Samsung', 'SM-ODYS-007A', 'Active', 4, 'New', 'Office', 'Issued monitor', datetime('now')),
('MON-8', 3, 'Samsung', 'SM-ODYS-008F', 'Active', NULL, 'New', 'Office', 'Spare monitor', datetime('now')),
('MON-9', 3, 'Acer', 'AC-VG-009L', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-10', 3, 'Acer', 'AC-VG-010P', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-12', 3, 'Acer', 'AC-VG-012Q', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-13', 3, 'Acer', 'AC-VG-013W', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-14', 3, 'Acer', 'AC-VG-014Z', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-15', 3, 'Acer', 'AC-VG-015H', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-16', 3, 'LG', 'LG-ULTR-016A', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-17', 3, 'LG', 'LG-ULTR-017B', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),
('MON-18', 3, 'LG', 'LG-ULTR-018C', 'Active', NULL, 'New', 'Office', 'Seed monitor', datetime('now')),

-- Docking Stations
('DOC-1', 4, 'HP', 'HP-DCK-001A', 'Active', NULL, 'Used', 'Office', 'HP dock', datetime('now')),
('DOC-2', 4, 'HP', 'HP-DCK-002B', 'Active', 1, 'Used', 'Office', 'Issued dock', datetime('now')),
('DOC-3', 4, 'Dell', 'DL-DCK-003C', 'Active', 2, 'New', 'Office', 'Dell dock', datetime('now')),
('DOC-4', 4, 'Dell', 'DL-DCK-004D', 'Active', 3, 'New', 'Office', 'Issued dock', datetime('now')),
('DOC-5', 4, 'Lenovo', 'LN-DCK-005E', 'Active', 4, 'New', 'Office', 'ThinkPad dock', datetime('now')),
('DOC-6', 4, 'Lenovo', 'LN-DCK-006F', 'Active', 5, 'New', 'Office', 'ThinkPad dock', datetime('now')),
('DOC-7', 4, 'HP', 'HP-DCK-007G', 'Active', NULL, 'New', 'Office', 'Spare dock', datetime('now')),
('DOC-8', 4, 'HP', 'HP-DCK-008H', 'Active', NULL, 'New', 'Office', 'Spare dock', datetime('now')),
('DOC-9', 4, 'Dell', 'DL-DCK-009J', 'Active', NULL, 'New', 'Office', 'Spare dock', datetime('now')),
('DOC-10', 4, 'Dell', 'DL-DCK-010K', 'Active', NULL, 'New', 'Office', 'Spare dock', datetime('now')),
('DOC-11', 4, 'Lenovo', 'LN-DCK-011L', 'Active', NULL, 'New', 'Office', 'Spare dock', datetime('now')),
('DOC-12', 4, 'Lenovo', 'LN-DCK-012M', 'Active', NULL, 'New', 'Office', 'Spare dock', datetime('now')),

-- Mice
('MOU-001', 5, 'Logitech', 'LG-MSE-001A', 'Active', 1, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-002', 5, 'Logitech', 'LG-MSE-002B', 'Active', 2, 'New', 'Office', 'Issued mouse', datetime('now')),
('MOU-003', 5, 'Logitech', 'LG-MSE-003C', 'Active', 3, 'New', 'Office', 'Issued mouse', datetime('now')),
('MOU-004', 5, 'Logitech', 'LG-MSE-004D', 'Active', 4, 'New', 'Office', 'Issued mouse', datetime('now')),
('MOU-005', 5, 'Logitech', 'LG-MSE-005E', 'Active', 5, 'New', 'Office', 'Issued mouse', datetime('now')),
('MOU-006', 5, 'Microsoft', 'MS-MSE-006F', 'Active', NULL, 'New', 'Office', 'Spare mouse', datetime('now')),
('MOU-007', 5, 'Microsoft', 'MS-MSE-007G', 'Active', NULL, 'New', 'Office', 'Spare mouse', datetime('now')),
('MOU-008', 5, 'HP', 'HP-MSE-008H', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-009', 5, 'Acer', 'AC-MSE-009J', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-010', 5, 'Acer', 'AC-MSE-010K', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-011', 5, 'Acer', 'AC-MSE-011L', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-012', 5, 'Acer', 'AC-MSE-012M', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-013', 5, 'Logitech', 'LG-MSE-013N', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-014', 5, 'Logitech', 'LG-MSE-014P', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-015', 5, 'Logitech', 'LG-MSE-015Q', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),
('MOU-016', 5, 'Logitech', 'LG-MSE-016R', 'Active', NULL, 'New', 'Office', 'Seed mouse', datetime('now')),

-- Keyboards
('KEY-001', 6, 'Logitech', 'LG-KBD-001A', 'Active', NULL, 'New', 'Office', 'Seed keyboard', datetime('now')),
('Key-002', 6, 'Logitech', 'LG-KBD-001B', 'Active', NULL, 'New', 'Office', 'Seed keyboard', datetime('now')),
('KEY-003', 6, 'Apple', 'AP-KBD-001A', 'Active', NULL, 'New', 'Office', 'Seed keyboard', datetime('now')), 
('Key-004', 6, 'Dell', 'DE-KBD-001A', 'Active', NULL, 'New', 'Office', 'Seed keyboard', datetime('now')), 


-- Phones
('PHN-001', 7, 'Apple', 'APL-IP-001X', 'Active', NULL, 'New', 'Office', 'Seed phone', datetime('now')),
('PHN-002', 7, 'Apple', 'APL-PL-002X', 'Active', Null, 'New', 'Office', 'Seed phone', datetime('now')), 

-- Cables
('HDM-001', 9, 'Generic', 'GEN-HDM-001', 'Active', NULL, 'New', 'Office', 'Seed HDMI cable', datetime('now'));

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
(1, 'admin@toontown.com', 'Admin Account', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Office Administrator', 1),
(2, 'bugs-bunny@toontown.com', 'Bugs Bunny', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Accountant', 1),
(24, 'rodger-rabbit@toontown.com', 'Rodger Rabbit', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Account Manager', 1),
(25, 'jessica-rabbit@toontown.com', 'Jessica Rabbit', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Sales Administrator', 1),
(3, 'daffy-duck@toontown.com', 'Daffy Duck', '$2b$10$4qMYYYsWPySxN8NB0TUzwupE5rtpJNTcMn4LuulM9RUWut132rzaS', 'Office Administrator', 1);



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
