import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import InventoryHistory from "../components/inventory/InventoryHistory";
import { getInventoryItem, deleteInventoryItem } from "../api/inventoryApi";




export default function InventoryDetails() {

  const { id } = useParams();

  const [asset, setAsset] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAsset = async () => {
      const data =
        await getInventoryItem(id);
      setAsset(data);
    };
    loadAsset();
  }, [id]);




const handleDelete = async () => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this asset?"
  );

  if (!confirmed) {
    return;
  }

  try {

    await deleteInventoryItem(asset.Id);

    alert("Asset deleted");

    navigate("/inventory");

  } catch (error) {

    console.error(error);

    alert("Failed to delete asset");

  }

};





  if (!asset) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );

  }










  return (
    <Layout>

      <h1>
        {asset.AssetTag}
      </h1>

      <p>
        <strong>Asset Type:</strong>{" "}
        {asset.AssetTypeName}
      </p>

      <p>
        <strong>Manufacturer:</strong>{" "}
        {asset.Manufacturer}
      </p>

      <p>
        <strong>Serial Number:</strong>{" "}
        {asset.SerialNumber}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {asset.Status}
      </p>

      <p>
        <strong>Condition:</strong>{" "}
        {asset.Condition}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {asset.CurrentLocation}
      </p>

      <p>
        <strong>Assigned To:</strong>{" "}
        {asset.AssignedEmployeeName || "In Storage"}
      </p>

      <hr />


        <button onClick={handleDelete}>
          Delete Asset
        </button>
      <hr />


      <InventoryHistory
        inventoryId={asset.Id}
      />

    </Layout>
  );

}