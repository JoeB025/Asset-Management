InventorySystem
│
├── Client 
│   └── src
│       ├── api/
│       │   ├── assetRequestApi.js
│       │   ├── assetTypeApi.js
│       │   ├── authApi.js
│       │   ├── axiosClient.js
│       │   ├── dashboardApi.js
│       │   ├── employeeApi.js
│       │   ├── inventoryApi.js
│       │   └── userApi.js
│       │
│       ├── components/
│       │   ├── assetRequests/
│       │   │   ├── AssetRequestForm.jsx
│       │   │   └── AssetRequestTable.jsx
│       │   ├── employee/
│       │   │   ├── AssignAssetForm.jsx
│       │   │   ├── EmployeeForm.jsx
│       │   │   ├── EmployeeRow.jsx
│       │   │   └── EmployeeTable.jsx
│       │   ├── inventory/
│       │   │   ├── InventoryForm.jsx
│       │   │   ├── InventoryHistory.jsx
│       │   │   ├── InventoryRow.jsx
│       │   │   ├── InventoryTable.jsx
│       │   │   └── ReAssignAssetForm.jsx
│       │   ├── layout/
│       │   │   └── layout.jsx
│       │   └── users/
│       │       ├── ResetPasswordForm.jsx
│       │       ├── UserForm.jsx
│       │       └── UserTable.jsx
│       │
│       ├── constants/
│       │   ├── jobTitles.js
│       │   └── teams.js
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       ├── pages/
│       │   ├── AssetRequests.jsx
│       │   ├── AssetTypes.jsx
│       │   ├── Dashboard.jsx
│       │   ├── DeletedInventory.jsx
│       │   ├── EmployeeDetails.jsx
│       │   ├── Employees.jsx
│       │   ├── Inventory.jsx
│       │   ├── InventoryDetails.jsx
│       │   ├── Login.jsx
│       │   └── Users.tsx
│       │
│       ├── routes/
│       │   ├── AppRoutes.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── styles/
│       │   └── theme.js
│       │
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
└── Server
    │
    ├── Authentication & Security
    │   ├── middleware/authMiddleware.js
    │   ├── utils/jwt.js
    │   └── utils/hash.js
    │
    ├── Routes & Endpoints
    │   ├── routes/authRoutes.js
    │   ├── routes/userRoutes.js
    │   ├── routes/employeeRoutes.js
    │   ├── routes/inventoryRoutes.js
    │   ├── routes/assetTypeRoutes.js
    │   ├── routes/assetRequestRoutes.js
    │   └── routes/dashboardRoutes.js
    │
    ├── Business Logic (Services)
    │   ├── services/authService.js
    │   ├── services/userService.js
    │   ├── services/employeeService.js
    │   ├── services/inventoryService.js
    │   ├── services/assetTypeService.js
    │   ├── services/assetRequestService.js
    │   └── services/dashboardService.js
    │
    ├── Controllers
    │   └── controllers/authController.js
    │
    ├── SQLite Database & Configuration
    │   ├── config/db.js
    │   └── database/
    │       ├── db.js
    │       ├── schema.sql
    │       ├── seed.sql
    │       ├── seed.js
    │       └── inventory.db
    │
    ├── app.js
    └── server.js# Asset-Management
