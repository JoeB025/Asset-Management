import { useEffect, useState } from "react";
import { getAvailableInventoryByAssetType, assignInventoryItem } from "../../api/inventoryApi";
import { getAssetTypes } from "../../api/assetTypeApi"

export default function AssignAssetForm({
  employeeId,
  onAssigned
}) {
  const [assetTypes, setAssetTypes] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");

  useEffect(() => {
    const loadAssetTypes = async () => {
      const data = await getAssetTypes();
      setAssetTypes(data);
    };

    loadAssetTypes();
  }, []);

  useEffect(() => {
    if (!selectedAssetType) return;

    const loadAssets = async () => {
      const data = await getAvailableInventoryByAssetType(selectedAssetType);
      setAssets(data);
    };

    loadAssets();
  }, [selectedAssetType]);

  const handleAssign = async () => {
    if (!selectedAsset) return;

    await assignInventoryItem({
      InventoryId: selectedAsset,
      AssignedEmployeeId: employeeId,
      Notes: "Assigned from employee page"
    });

    setSelectedAsset("");
    onAssigned();
  };

  return (
    <div className="form">
      <h3 className="form-title">Assign Asset</h3>
      <div className="form-group">
        <label>Asset Type</label>
        <select
          className="form-select"
          value={selectedAssetType}
          onChange={(e) => {
            setSelectedAssetType(e.target.value);
            setSelectedAsset("");
          }}
        >
          <option value="">Select Asset Type</option>

          {assetTypes.map(type => (
            <option key={type.Id} value={type.Id}>
              {type.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Available Assets</label>
        <select
          className="form-select"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          disabled={!selectedAssetType}
        >
          <option value="">Select Asset</option>

          {assets.map(asset => (
            <option key={asset.Id} value={asset.Id}>
              {asset.AssetTag}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button
          className="btn btn-primary"
          onClick={handleAssign}
          type="button"
        >
          Assign
        </button>
      </div>

    </div>
  );
}