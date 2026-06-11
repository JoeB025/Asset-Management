import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getInventory } from "../api/inventoryApi";
import InventoryForm from "../components/inventory/InventoryForm";
import { getAssetTypes } from "../api/assetTypeApi";

export default function Inventory() {

  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [assetTypes, setAssetTypes] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState(""); 


const loadInventory = async () => {
  const data = await getInventory();
  setInventory(data);
};


const loadAssetTypes = async () => {
  const data = await getAssetTypes();
  setAssetTypes(data);
};


useEffect(() => {
  loadInventory();
  loadAssetTypes();
}, []);
// ESLint still kicking off about this. doesnt cause any issues, 


// Create a list of filtered inventory. 
const filteredInventory = selectedAssetType ? inventory.filter(item => item.AssetTypeId === Number(selectedAssetType)) : inventory;


  return (
    <Layout>

      <h1>Inventory</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Asset"}
      </button>

      {showForm && (
        <InventoryForm onCreated={() => { loadInventory(); setShowForm(false); }}/>
      )}


      <div>
        <label>Asset Type</label>
        <select
          value={selectedAssetType}
          onChange={(e) =>
            setSelectedAssetType(
              e.target.value
            )
          }
        >
          <option value="">All Asset Types</option>
          {assetTypes.map(type => (
            <option 
              key={type.Id}
              value={type.Id}> 
              {type.Name}
            </option>
          ))}
        </select>
      </div>


      <br />  


      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Asset type</th>
            <th>Asset Tag</th>
            <th>Manufacturer</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.Id}>
              <td>{item.AssetTypeName}</td>
              <td>{item.AssetTag}</td>
              <td>{item.Manufacturer}</td>
              <td>{item.Status}</td>
              <td>{item.AssignedEmployeeName != null ? item.AssignedEmployeeName : 'Storage'}</td>
              <td><Link to={`/inventory/${item.Id}`}>View</Link></td>
            </tr>

          ))}

        </tbody>

      </table>

    </Layout>
  );

}