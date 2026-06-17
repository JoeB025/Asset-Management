import { useEffect, useState } from "react";
import { getAvailableInventory, getAvailableInventoryByAssetType } from "../api/inventoryApi";
import { getAssetTypes } from "../api/assetTypeApi";
import PageHeader from "../components/ui/PageHeader";
import UnassignedAssetsTable from "../components/unassignedAssets/UnassignedAssetsTable";


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

      const data =
        await getAvailableInventoryByAssetType(value);

      setAssets(data);

    }
  };

  return (
    <div className="app-page">

      <PageHeader
        title="Unassigned Assets"
        subtitle="Assets currently available for allocation"
      />

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