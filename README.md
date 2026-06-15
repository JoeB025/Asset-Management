InventorySystem
│
├── Client -- Not built yet
│
└── Server
    │
    ├── Authentication
    │   ├── Login
    │   ├── JWT
    │   └── Protected Routes
    │
    ├── Employees
    │   ├── Get All
    │   ├── Get By Id
    │   ├── Create
    │   ├── Update
    │   └── Soft Delete
    │
    ├── Inventory
    │   ├── Get All
    │   ├── Create
    │   ├── Assign
    │   └── History
    │
    └── SQLite Database





    SERVER STRUCTURE

/config
  db.js

/controllers
  authController.js

/services
  authService.js
  userService.js
  inventoryService.js
  employeeService.js
  assetTypeService.js
  assetRequestService.js
  dashboardService.js

/routes
  authRoutes.js
  userRoutes.js
  inventoryRoutes.js
  employeeRoutes.js
  assetTypeRoutes.js
  assetRequestRoutes.js
  dashboardRoutes.js

/middleware
  authMiddleware.js

/utils
  jwt.js
  hash.js

/database
  db.js
  schema.sql
  seed.sql
  seed.js
  inventory.db

/app.js
/server.js