import { useEffect, useState } from "react";

import { createInventoryItem } from "../../api/inventoryApi";
import { getAssetTypes } from "../../api/assetTypeApi";

export default function InventoryForm({ onCreated }) {

  const [assetTypes, setAssetTypes] = useState([]);

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

    await createInventoryItem({

      ...formData,

      Status: "Active",
      Condition: "New",
      CurrentLocation: "Storage",

      AssignedEmployeeId: null,
      DateAssigned: null

    });

    onCreated();

  };

  return (

    <form onSubmit={handleSubmit}>

      <h3>Add Asset</h3>

      <div>

        <label>Asset Tag</label>

        <input
          type="text"
          name="AssetTag"
          value={formData.AssetTag}
          onChange={handleChange}
          required
        />

      </div>

      <br />

      <div>

        <label>Asset Type</label>

        <select
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

      <br />

      <div>

        <label>Manufacturer</label>

        <input
          type="text"
          name="Manufacturer"
          value={formData.Manufacturer}
          onChange={handleChange}
        />

      </div>

      <br />

      <div>

        <label>Serial Number</label>

        <input
          type="text"
          name="SerialNumber"
          value={formData.SerialNumber}
          onChange={handleChange}
        />

      </div>

      <br />

      <div>

        <label>Purchase Date</label>

        <input
          type="date"
          name="PurchaseDate"
          value={formData.PurchaseDate}
          onChange={handleChange}
        />

      </div>

      <br />

      <div>

        <label>Notes</label>

        <textarea
          name="Notes"
          value={formData.Notes}
          onChange={handleChange}
        />

      </div>

      <br />

      <button type="submit">
        Create Asset
      </button>

    </form>

  );

}