import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInventory } from "../api/inventoryApi";
import { getAssetTypes } from "../api/assetTypeApi";
import InventoryForm from "../components/inventory/InventoryForm";
import PageHeader from "../components/ui/PageHeader";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadInventory = async () => {
    const data = await getInventory();
    setInventory(data);
  };

  const loadAssetTypes = async () => {
    const data = await getAssetTypes();
    setAssetTypes(data);
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([loadInventory(), loadAssetTypes()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filteredInventory = selectedAssetType
    ? inventory.filter((item) => item.AssetTypeId === Number(selectedAssetType))
    : inventory;

  if (loading) {
    return <Loader text="Loading inventory..." />;
  }

  return (
    <div className="app-page">

      <PageHeader
        title="Inventory"
        subtitle="Manage company assets and devices"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Asset"}
          </button>
        }
      />

      {/* FILTER BAR */}
      <div className="card" style={{ display: "flex", gap: "24px", alignItems: "flex-center" }}>
        <div className="form-group">
          <label>Asset Type Filter</label>
          <select
            className="form-select"
            value={selectedAssetType}
            onChange={(e) => setSelectedAssetType(e.target.value)}
          >
            <option value="">All Asset Types</option>
            {assetTypes.map((type) => (
              <option key={type.Id} value={type.Id}>
                {type.Name}
              </option>
            ))}
          </select>
        </div>
      </div>


      {/* FORM */}
      {showForm && (
        <InventoryForm
          onCreated={() => {
            loadInventory();
            setShowForm(false);
          }}
        />
      )}

      {/* TABLE */}
      {filteredInventory.length === 0 ? (
        <EmptyState
          title="No Assets Found"
          message="No inventory items match your filter."
        />
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Asset Type</th>
                <th>Asset Tag</th>
                <th>Manufacturer</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.Id}>
                  <td>{item.AssetTypeName}</td>
                  <td>{item.AssetTag}</td>
                  <td>{item.Manufacturer}</td>
                  <td>{item.Status}</td>
                  <td>
                    {item.AssignedEmployeeName
                      ? item.AssignedEmployeeName
                      : "Storage"}
                  </td>
                  <td>
                    <Link to={`/inventory/${item.Id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}