import { useEffect, useState } from "react";
import { getAvailableInventory, getAvailableInventoryByAssetType } from "../api/inventoryApi";
import { getAssetTypes } from "../api/assetTypeApi";
import PageHeader from "../components/ui/PageHeader";
import UnassignedAssetsTable from "../components/unassignedAssets/UnassignedAssetsTable";
import ExportButton from "../components/ui/ExportButton";
import { exportAvailableInventory } from "../api/exportApi";


export default function UnassignedAssets() {

  const [assets, setAssets] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState("");


 const loadAssets = async () => {
    const data = await getAvailableInventory();
    setAssets(data);
  };

  const loadAssetTypes = async () => {
    const data = await getAssetTypes();
    setAssetTypes(data);
  };


// handle exporting list of unassigned assets to excel 
const handleExport = async () => {
  try {
    // const blob = await exportAvailableInventory();
    const blob = await exportAvailableInventory(selectedAssetType);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "UnassignedAssets.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error("Export failed:", err);
  }
};

  useEffect(() => {

    loadAssets();
    loadAssetTypes();

  }, []);

 

  const handleAssetTypeChange = async (e) => {

    const value = e.target.value;
    setSelectedAssetType(value);

    if (!value) {

      const data = await getAvailableInventory();
      setAssets(data);

    } else {

      const data = await getAvailableInventoryByAssetType(value);
      setAssets(data);

    }
  };

  return (
    <div className="app-page">


      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <PageHeader
          title="Unassigned Assets"
          subtitle="Assets currently available for allocation"
        />

        <ExportButton
          text="Export"
          onClick={handleExport}
        />
      </div>





      <div className="card">

        <div className="form-group">

          <label>Asset Type</label>

          <select
            className="form-select"
            value={selectedAssetType}
            onChange={handleAssetTypeChange}
          >
            <option value="">
              All Asset Types
            </option>

            {assetTypes.map(type => (
              <option
                key={type.Id}
                value={type.Id}
              >
                {type.Name}
              </option>
            ))}

          </select>

        </div>

      </div>

      <UnassignedAssetsTable
        assets={assets}
      />

    </div>
  );
}