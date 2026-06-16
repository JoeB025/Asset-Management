import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InventoryHistory from "../components/inventory/InventoryHistory";
import { getInventoryItem, deleteInventoryItem } from "../api/inventoryApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; 



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

  const confirmed = window.confirm("Are you sure you want to delete this asset?");

  if (!confirmed) {
    return;
  }

  try {
    await deleteInventoryItem(asset.Id);
    toast.success("Asset Deleted"); 
    navigate("/inventory");

  } catch (error) {
     toast.error(error.response?.data?.message || "Failed to delete the asset");
  }

};


  if (!asset) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );

  }



  return (
    <>

      <h1>
        {asset.AssetTypeName}      
      </h1>
      <h2>
        {asset.AssetTag}
      </h2>
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
          {asset.AssignedEmployeeId ? (
          <Link to={`/employees/${asset.AssignedEmployeeId}`}>
            {asset.AssignedEmployeeName}
          </Link>
        ) : (
          "In Storage"
        )} 
      </p>

      <hr />

        <button onClick={handleDelete}>
          Delete Asset
        </button>
      <hr />

      <InventoryHistory
        inventoryId={asset.Id}
      />

    </>
  );

}