import { useEffect, useState } from "react";

import {
  getAssetTypes,
  createAssetType,
  deleteAssetType
} from "../api/assetTypeApi";

import DataTable from "../components/ui/DataTable";
import PageHeader from "../components/ui/PageHeader";
import { toast } from "react-toastify";

export default function AssetTypes() {

  const [assetTypes, setAssetTypes] = useState([]);
  const [newAssetType, setNewAssetType] = useState("");

  const loadAssetTypes = async () => {
    const data = await getAssetTypes();
    setAssetTypes(data);
  };

  useEffect(() => {
    loadAssetTypes();
  }, []);

  const handleAdd = async () => {
    if (!newAssetType.trim()) return;

    try {
      await createAssetType(newAssetType);
      setNewAssetType("");
      await loadAssetTypes();
      toast.success("Asset type created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create asset type");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this asset type?");
    if (!confirmed) return;

    try {
      await deleteAssetType(id);
      await loadAssetTypes();
      toast.success("Asset type deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete asset type");
    }
  };

  const columns = [
    { key: "name", label: "Asset Type" },
    { key: "assigned", label: "Assigned" },
    { key: "storage", label: "In Storage" },
    { key: "total", label: "Total Active" },
    { key: "actions", label: "Actions" }
  ];

  return (
    <div className="app-page">

      <PageHeader
        title="Asset Types"
        subtitle="Manage asset categories and usage"
      />

      {/* ADD NEW TYPE */}
      <div className="card" style={{ display: "flex", gap: "10px" }}>

        <input
          className="form-input"
          type="text"
          placeholder="New Asset Type"
          value={newAssetType}
          onChange={(e) => setNewAssetType(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleAdd}>
          Add Asset Type
        </button>

      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={assetTypes}
        emptyMessage="No asset types found"
        renderRow={(type) => (
          <tr key={type.Id}>

            <td>{type.Name}</td>
            <td>{type.AssignedCount}</td>
            <td>{type.StorageCount}</td>
            <td>{type.TotalActive}</td>

            <td style={{ display: "flex", gap: "8px" }}>

              <button
                className="btn btn-danger"
                disabled={type.TotalActive > 0}
                onClick={() => handleDelete(type.Id)}
              >
                Delete
              </button>

            </td>

          </tr>
        )}
      />

    </div>
  );
}