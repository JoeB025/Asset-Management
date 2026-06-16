import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createInventoryItem } from "../../api/inventoryApi";
import { getAssetTypes } from "../../api/assetTypeApi";

export default function InventoryForm({ onCreated }) {

  const [assetTypes, setAssetTypes] = useState([]);
  const [error, setError] = useState(""); 

  const [formData, setFormData] = useState({
    AssetTag: "",
    AssetTypeId: "",
    Manufacturer: "",
    SerialNumber: "",
    PurchaseDate: "",
    Notes: ""
  });

  useEffect(() => {

    const loadAssetTypes = async () => {

      const data = await getAssetTypes();

      setAssetTypes(data);

    };

    loadAssetTypes();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError(""); 

    try {
          await createInventoryItem({

      ...formData,  

      Status: "Active",
      Condition: "New",
      CurrentLocation: "Storage",
      AssignedEmployeeId: null,
      DateAssigned: null
    });

     toast.success("Asset created successfully");

    setFormData({
      AssetTag: "",
      AssetTypeId: "",
      Manufacturer: "",
      SerialNumber: "", 
      PurchaseDate: "",
      Notes: ""
    })

    onCreated();
    } catch (error) {
    
      const message = error.response?.data?.message || "Failed to create asset";
      toast.error(message);
      setError(message);

    }
  };

  return (
  <div className="card">

    <form
      className="form"
      onSubmit={handleSubmit}
    >

      <h3>Add Asset</h3>

      <div className="form-group">

        <label>Asset Tag</label>

        <input
          className="form-input"
          type="text"
          name="AssetTag"
          value={formData.AssetTag}
          onChange={handleChange}
          required
        />

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

      </div>

      <div className="form-group">

        <label>Asset Type</label>

        <select
          className="form-select"
          name="AssetTypeId"
          value={formData.AssetTypeId}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Asset Type
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

      <div className="form-group">

        <label>Manufacturer</label>

        <input
          className="form-input"
          type="text"
          name="Manufacturer"
          value={formData.Manufacturer}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Serial Number</label>

        <input
          className="form-input"
          type="text"
          name="SerialNumber"
          value={formData.SerialNumber}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Purchase Date</label>

        <input
          className="form-input"
          type="date"
          name="PurchaseDate"
          value={formData.PurchaseDate}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Notes</label>

        <textarea
          className="form-textarea"
          name="Notes"
          value={formData.Notes}
          onChange={handleChange}
        />

      </div>

      <div className="form-actions">

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Asset
        </button>

      </div>

    </form>

  </div>
);

}