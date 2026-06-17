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
import AssetRequests from "../pages/AssetRequests";
import Users from "../pages/Users";
import Layout from "../components/layout/layout";
import UnassignedAssets from "../pages/UnassignedAssets";

function AppLayout({ children }) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED + LAYOUT WRAPPED ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

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
        path="/asset-types"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AssetTypes />
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



      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}