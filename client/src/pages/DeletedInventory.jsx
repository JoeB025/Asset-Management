import { useEffect, useState } from "react";
import { getDeletedInventory } from "../api/inventoryApi";

export default function DeletedInventory() {

  const [assets, setAssets] = useState([]);

  useEffect(() => {

    const loadAssets = async () => {

      const data =
        await getDeletedInventory();

      setAssets(data);

    };

    loadAssets();

  }, []);

  return (
    <>

      <h1>Deleted Assets</h1>

      <table border="1" cellPadding="8">

        <thead>
          <tr>
            <th>Asset Tag</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {assets.map(asset => (

            <tr key={asset.Id}>

              <td>{asset.AssetTag}</td>
              <td>{asset.AssetTypeName}</td>
              <td>{asset.Manufacturer}</td>
              <td>{asset.Status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </>
  );
}