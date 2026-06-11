import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Employees from "../pages/Employees";
import Inventory from "../pages/Inventory";
import AssetTypes from "../pages/AssetTypes";
import EmployeeDetails from "../pages/EmployeeDetails";
import InventoryDetails from "../pages/InventoryDetails"; 
import DeletedInventory from "../pages/DeletedInventory";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />


      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/asset-types"
        element={
          <ProtectedRoute>
            <AssetTypes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        }
      />


      <Route
        path="/inventory/:id"
        element={
          <ProtectedRoute>
            <InventoryDetails />
          </ProtectedRoute>
      }
      />

      <Route 
        path="/deleted-assets"
        element={
          <ProtectedRoute>
            <DeletedInventory />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
}