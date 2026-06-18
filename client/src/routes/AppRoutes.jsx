import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Inventory from "../pages/Inventory";
import AssetTypes from "../pages/AssetTypes";
import EmployeeDetails from "../pages/EmployeeDetails";
import InventoryDetails from "../pages/InventoryDetails";
import DeletedInventory from "../pages/DeletedInventory";
import AssetRequests from "../pages/AssetRequests";
import Users from "../pages/Users";
import UnassignedAssets from "../pages/UnassignedAssets";
import AssignedAssets from "../pages/AssignedAssets";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/layout";

function AppLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />

      {/* ROOT → always go dashboard (ProtectedRoute will handle auth) */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEES */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Employees />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <EmployeeDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* INVENTORY */}
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Inventory />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <InventoryDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* ASSET TYPES */}
      <Route
        path="/asset-types"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AssetTypes />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN / SYSTEM */}
      <Route
        path="/deleted-assets"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DeletedInventory />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/asset-requests"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AssetRequests />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Users />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* INVENTORY FILTER VIEWS */}
      <Route
        path="/inventory/available"
        element={
          <ProtectedRoute>
            <AppLayout>
              <UnassignedAssets />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory/assigned"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AssignedAssets />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
}

