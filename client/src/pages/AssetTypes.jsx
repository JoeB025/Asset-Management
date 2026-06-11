import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import {
  getAssetTypes,
  createAssetType,
  deleteAssetType
} from "../api/assetTypeApi";

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

    if (!newAssetType.trim()) {
      return;
    }

    await createAssetType(newAssetType);

    setNewAssetType("");

    await loadAssetTypes();

  };



const handleDelete = async (id) => {

  const confirmed = window.confirm("Delete this asset type?");

  if (!confirmed) {
    return;
  }

  try {
    await deleteAssetType(id);
    await loadAssetTypes();
  } catch (error) {
    alert(error.response?.data?.message || "Unable to delete asset type");
  }

};


  return (
    <Layout>

      <h1>Asset Types</h1>

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          placeholder="New Asset Type"
          value={newAssetType}
          onChange={(e) => setNewAssetType(e.target.value)}
        />

        <button
          onClick={handleAdd}
          style={{
            marginLeft: "10px"
          }}
        >
          Add Asset Type
        </button>
      </div>

      <br />



    {assetTypes.length === 0 ? (
  <p>No asset types found.</p>
) : (  

    <table border="1" cellPadding="8">

  <thead>
    <tr>
      <th>Asset Type</th>
      <th>Assigned</th>
      <th>In Storage</th>
      <th>Total Active</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>

    {assetTypes.map(type => (

      <tr key={type.Id}>

        <td>{type.Name}</td>

        <td>{type.AssignedCount}</td>

        <td>{type.StorageCount}</td>

        <td>{type.TotalActive}</td>

        <td>

          <button
            disabled={type.TotalActive > 0}
            onClick={() => handleDelete(type.Id)}
          >
            Delete
          </button>

        </td>

      </tr>

    ))}

  </tbody>

</table>

  )}

    </Layout>
  );

}