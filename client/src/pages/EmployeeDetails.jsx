import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployeeById, getEmployeeAssets } from "../api/employeeApi";
import { returnInventoryItem } from "../api/inventoryApi";
import AssignAssetForm from "../components/employee/AssignAssetForm";
import ReassignAssetForm from "../components/inventory/ReAssignAssetForm";
import DataTable from "../components/ui/DataTable";
import PageHeader from "../components/ui/PageHeader";
import { toast } from "react-toastify";

export default function EmployeeDetails() {

  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [assets, setAssets] = useState([]);
  const [showReassign, setShowReassign] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const refreshData = async () => {
    const data = await getEmployeeById(id);
    const assetData = await getEmployeeAssets(id);
    setEmployee(data);
    setAssets(assetData);
  };

  const handleReturnToStorage = async (inventoryId) => {

    if (!window.confirm("Return this asset to storage?")) return;

    try {
      await returnInventoryItem({
        InventoryId: inventoryId,
        EmployeeId: employee.Id,
        Notes: "Returned from employee page"
      });

      toast.success("Asset returned to storage");

      await refreshData();

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to return asset");
    }
  };

  useEffect(() => {

    let isMounted = true;

    async function fetchEmployeeData() {
      const data = await getEmployeeById(id);
      const assetData = await getEmployeeAssets(id);

      if (isMounted) {
        setEmployee(data);
        setAssets(assetData);
      }
    }

    fetchEmployeeData();

    return () => {
      isMounted = false;
    };

  }, [id]);

  if (!employee) {
    return (
      <div className="app-page">
        <p>Loading...</p>
      </div>
    );
  }

  const columns = [
    { key: "asset", label: "Asset" },
    { key: "tag", label: "Asset Tag" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "status", label: "Status" },
    { key: "condition", label: "Condition" },
    { key: "location", label: "Location" },
    { key: "actions", label: "Actions" }
  ];

  return (
   <div className="app-page">

  <PageHeader
    title={`${employee.FirstName} ${employee.LastName}`}
    subtitle={`${employee.JobTitle} • ${employee.Team}`}
  />

  <div className="page-section">
    <div className="card">
      <p><strong>Email:</strong> {employee.Email}</p>
      <p><strong>Works From Home:</strong> {employee.WorksFromHome ? "Yes" : "No"}</p>
    </div>
  </div>

  <div className="page-section">
    <div className="card">
      <AssignAssetForm
        employeeId={employee.Id}
        onAssigned={refreshData}
      />
    </div>
  </div>

  <div className="page-section">
    <h2 className="section-title">Assigned Assets</h2>

      <DataTable
        columns={columns}
        data={assets}
        emptyMessage="No assets assigned"
        renderRow={(asset) => (
          <tr key={asset.Id}>

            <td>{asset.AssetTypeName}</td>

            <td>
              <Link to={`/inventory/${asset.Id}`}>
                {asset.AssetTag}
              </Link>
            </td>

            <td>{asset.Manufacturer}</td>
            <td>{asset.Status}</td>
            <td>{asset.Condition}</td>
            <td>{asset.CurrentLocation}</td>

            <td style={{ display: "flex", gap: "8px" }}>

              <button
                className="btn btn-secondary"
                onClick={() => handleReturnToStorage(asset.Id)}
              >
                Return
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedAsset(asset);
                  setShowReassign(true);
                }}
              >
                Reassign
              </button>

            </td>

          </tr>
        )}
      />
      </div>

      {/* REASSIGN MODAL */}
      {showReassign && selectedAsset && (
        <ReassignAssetForm
          inventoryId={selectedAsset.Id}
          currentEmployeeId={employee.Id}
          onClose={() => {
            setShowReassign(false);
            setSelectedAsset(null);
          }}
          onReassigned={refreshData}
        />
      )}

    </div>
  );
}