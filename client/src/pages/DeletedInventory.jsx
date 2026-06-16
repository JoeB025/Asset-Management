import { useEffect, useState } from "react";
import { getDeletedInventory } from "../api/inventoryApi";

import DataTable from "../components/ui/DataTable";
import PageHeader from "../components/ui/PageHeader";
import Loader from "../components/ui/Loader";

export default function DeletedInventory() {

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadAssets = async () => {
      try {
        const data = await getDeletedInventory();
        setAssets(data);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();

  }, []);

  if (loading) {
    return <Loader text="Loading deleted assets..." />;
  }

  const columns = [
    { key: "tag", label: "Asset Tag" },
    { key: "type", label: "Type" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "status", label: "Status" }
  ];

  return (
    <div className="app-page">

      <PageHeader
        title="Deleted Assets"
        subtitle="Archive of removed inventory items"
      />

      <DataTable
        columns={columns}
        data={assets}
        emptyMessage="No deleted assets found"
        renderRow={(asset) => (
          <tr key={asset.Id}>

            <td>{asset.AssetTag}</td>
            <td>{asset.AssetTypeName}</td>
            <td>{asset.Manufacturer}</td>
            <td>{asset.Status}</td>

          </tr>
        )}
      />

    </div>
  );
}