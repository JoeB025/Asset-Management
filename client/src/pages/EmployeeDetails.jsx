import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getEmployeeById, getEmployeeAssets } from "../api/employeeApi";
import { returnInventoryItem } from "../api/inventoryApi";
import AssignAssetForm from "../components/employee/AssignAssetForm";
import ReassignAssetForm from "../components/inventory/ReAssignAssetForm";
import { Link } from "react-router-dom";

export default function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [assets, setAssets] = useState([]);
  const [showReassign, setShowReassign] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // 1. Keep a standalone function ONLY if child components (like AssignAssetForm) need to trigger a refresh.
  const refreshData = async () => {
    const data = await getEmployeeById(id);
    const assetData = await getEmployeeAssets(id);
    setEmployee(data);
    setAssets(assetData);
  };

  // Return items to storage 
  const handleReturnToStorage = async (inventoryId) => {

  if (!window.confirm("Return this asset to storage?")) {
    return;
  }

  await returnInventoryItem({
    InventoryId: inventoryId,
    EmployeeId: employee.Id,
    Notes: "Returned from employee page"
  });

  await refreshData();

};

  // 2. Run the effect when the ID changes
  useEffect(() => {
    let isMounted = true;

    async function fetchEmployeeData() {
      const data = await getEmployeeById(id);
      const assetData = await getEmployeeAssets(id);
      
      // Prevent setting state if the component unmounted while fetching
      if (isMounted) {
        setEmployee(data);
        setAssets(assetData);
      }
    }

    fetchEmployeeData();

    // Cleanup function to prevent race conditions
    return () => {
      isMounted = false;
    };
  }, [id]); // Only re-run if the URL ID changes

  if (!employee) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  return (
    <>
      <h1>
        {employee.FirstName} {employee.LastName}
      </h1>

      <p><strong>Email:</strong> {employee.Email}</p>
      <p><strong>Job Title:</strong> {employee.JobTitle}</p>
      <p><strong>Team:</strong> {employee.Team}</p>
      <p><strong>Works From Home:</strong> {employee.WorksFromHome ? "Yes" : "No"}</p>

      <hr />

      {/* Pass the refresh function down so the form can update the parent state after a successful assignment */}
      <AssignAssetForm
        employeeId={employee.Id}
        onAssigned={refreshData} 
      />

      <h2>Assigned Assets</h2>

      {assets.length === 0 ? (
        <p>No assets assigned.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Asset Tag</th>
              <th>Manufacturer</th>
              <th>Status</th>
              <th>Condition</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
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
                <td>
                  <button onClick={() => handleReturnToStorage(asset.Id)}>
                    Return To Storage
                  </button>
                  <button onClick={() => { setSelectedAsset(asset); setShowReassign(true); }} >
                    Reassign 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}




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




    </>
  );
}